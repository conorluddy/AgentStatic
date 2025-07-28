/**
 * Asset optimization utilities using Sharp
 *
 * Provides high-performance image processing capabilities for
 * AgentStatic with TypeScript type safety and optimization presets.
 */

import sharp from 'sharp';
import type { ImageOptimizeOptions } from '@/types/partial.js';

/**
 * Sharp configuration presets for common use cases
 */
export const SHARP_PRESETS = {
  thumbnail: { width: 300, height: 300, quality: 80, format: 'webp' as const },
  gallery: { width: 800, height: 600, quality: 85, format: 'webp' as const },
  hero: { width: 1920, height: 1080, quality: 90, format: 'webp' as const },
  avatar: { width: 150, height: 150, quality: 85, format: 'webp' as const },
} as const;

/**
 * Default Sharp configuration for AgentStatic
 */
export const DEFAULT_SHARP_CONFIG = {
  quality: 85,
  format: 'webp' as const,
  fit: 'cover' as const,
  withMetadata: false, // Remove EXIF data by default for smaller files
  progressive: true, // Progressive JPEG loading
  optimizeScans: true, // Optimize scan order
  mozjpeg: true, // Use mozjpeg encoder for better compression
} as const;

/**
 * Create optimized image with Sharp
 *
 * @param inputPath - Path to source image
 * @param outputPath - Path for optimized image
 * @param options - Optimization options
 * @returns Promise resolving to optimization metadata
 */
export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ImageOptimizeOptions = {}
): Promise<{
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  format: string;
  width: number;
  height: number;
}> {
  const {
    width,
    height,
    quality = DEFAULT_SHARP_CONFIG.quality,
    format = DEFAULT_SHARP_CONFIG.format,
    fit = DEFAULT_SHARP_CONFIG.fit,
  } = options;

  // Get original file metadata for comparison
  const originalMetadata = await sharp(inputPath).metadata();
  const originalSize = originalMetadata.size || 0;

  // Create Sharp instance with optimizations
  let processor = sharp(inputPath, {
    failOnError: false, // Don't fail on corrupt images
    animated: false, // Disable animation for performance
  });

  // Apply resize if dimensions provided
  if (width || height) {
    processor = processor.resize(width, height, {
      fit,
      withoutEnlargement: true, // Don't upscale images
      background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
    });
  }

  // Apply format-specific optimizations
  switch (format) {
    case 'webp':
      processor = processor.webp({
        quality,
        effort: 6, // Maximum compression effort
        nearLossless: quality > 90,
      });
      break;
    case 'avif':
      processor = processor.avif({
        quality,
        effort: 9, // Maximum compression effort for AVIF
      });
      break;
    case 'jpeg':
      processor = processor.jpeg({
        quality,
        progressive: DEFAULT_SHARP_CONFIG.progressive,
        mozjpeg: DEFAULT_SHARP_CONFIG.mozjpeg,
        optimiseScans: DEFAULT_SHARP_CONFIG.optimizeScans,
      });
      break;
    case 'png':
      processor = processor.png({
        quality,
        compressionLevel: 9, // Maximum PNG compression
        progressive: true,
        palette: true, // Use palette optimization when possible
      });
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  // Remove metadata for smaller file sizes
  if (DEFAULT_SHARP_CONFIG.withMetadata) {
    processor = processor.withMetadata();
  }

  // Process the image
  const {
    size: optimizedSize,
    width: finalWidth,
    height: finalHeight,
  } = await processor.toFile(outputPath);

  const compressionRatio =
    originalSize > 0
      ? ((originalSize - optimizedSize) / originalSize) * 100
      : 0;

  return {
    originalSize,
    optimizedSize,
    compressionRatio,
    format,
    width: finalWidth || 0,
    height: finalHeight || 0,
  };
}

/**
 * Generate responsive image srcset with multiple sizes
 *
 * @param inputPath - Path to source image
 * @param outputDir - Directory for optimized variants
 * @param baseName - Base name for output files
 * @param options - Optimization options
 * @returns Promise resolving to srcset string and file paths
 */
export async function generateResponsiveImages(
  inputPath: string,
  outputDir: string,
  baseName: string,
  options: ImageOptimizeOptions = {}
): Promise<{
  srcset: string;
  files: Array<{ path: string; width: number; size: number }>;
}> {
  const { format = 'webp', quality = 85 } = options;

  // Common responsive breakpoints
  const breakpoints = [320, 640, 768, 1024, 1280, 1920];
  const files: Array<{ path: string; width: number; size: number }> = [];
  const srcsetParts: string[] = [];

  for (const width of breakpoints) {
    const filename = `${baseName}-${width}w.${format}`;
    const outputPath = `${outputDir}/${filename}`;

    try {
      const result = await optimizeImage(inputPath, outputPath, {
        ...options,
        width,
        quality,
        format,
      });

      files.push({
        path: outputPath,
        width,
        size: result.optimizedSize,
      });

      srcsetParts.push(`${filename} ${width}w`);
    } catch (error) {
      console.warn(`Failed to generate ${width}px variant:`, error);
    }
  }

  return {
    srcset: srcsetParts.join(', '),
    files,
  };
}

/**
 * Get image metadata using Sharp
 *
 * @param imagePath - Path to image file
 * @returns Promise resolving to image metadata
 */
export async function getImageMetadata(imagePath: string) {
  const metadata = await sharp(imagePath).metadata();

  return {
    format: metadata.format,
    width: metadata.width || 0,
    height: metadata.height || 0,
    channels: metadata.channels,
    hasAlpha: metadata.hasAlpha,
    size: metadata.size || 0,
    density: metadata.density,
    colorSpace: metadata.space,
    exif: metadata.exif,
    icc: metadata.icc,
  };
}

/**
 * Batch optimize multiple images with progress tracking
 *
 * @param images - Array of input/output path pairs
 * @param options - Optimization options
 * @param onProgress - Progress callback
 * @returns Promise resolving to optimization results
 */
export async function batchOptimizeImages(
  images: Array<{ input: string; output: string }>,
  options: ImageOptimizeOptions = {},
  onProgress?: (completed: number, total: number) => void
) {
  const results = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (!image) continue;

    const { input, output } = image;

    try {
      const result = await optimizeImage(input, output, options);
      results.push({ success: true, input, output, ...result });
    } catch (error) {
      results.push({ success: false, input, output, error });
    }

    onProgress?.(i + 1, images.length);
  }

  return results;
}

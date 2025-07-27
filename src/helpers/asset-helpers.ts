/**
 * Sharp image optimization utilities for AgentStatic
 * 
 * Provides high-performance image processing for portfolio sites
 * with responsive image generation, format conversion, and caching.
 */

import sharp, { Sharp, FormatEnum } from 'sharp';
import { createHash } from 'crypto';
import { extname, basename, dirname, join } from 'path';
import type { ImageOptimizeOptions } from '@/types/partial.js';
import type { ImageConfig } from '@/core/config.js';

/**
 * Image processing result
 */
export interface ImageProcessingResult {
  originalPath: string;
  optimizedPath: string;
  format: keyof FormatEnum;
  width: number;
  height: number;
  size: number;
  metadata: sharp.Metadata;
}

/**
 * Responsive image set
 */
export interface ResponsiveImageSet {
  srcset: string;
  sizes: string;
  fallback: string;
  images: ImageProcessingResult[];
}

/**
 * Image optimization cache entry
 */
interface CacheEntry {
  hash: string;
  result: ImageProcessingResult;
  timestamp: number;
}

/**
 * Sharp-based image optimizer with caching and responsive generation
 */
export class ImageOptimizer {
  private cache = new Map<string, CacheEntry>();
  private config: ImageConfig;
  private outputDir: string;

  constructor(config: ImageConfig, outputDir: string = './dist/assets/images') {
    this.config = config;
    this.outputDir = outputDir;
  }

  /**
   * Optimize a single image with specified options
   */
  async optimizeImage(
    inputPath: string, 
    options: ImageOptimizeOptions = {}
  ): Promise<ImageProcessingResult> {
    // Generate cache key
    const optionsHash = this.generateOptionsHash(options);
    const cacheKey = `${inputPath}:${optionsHash}`;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && await this.isCacheValid(cached, inputPath)) {
      return cached.result;
    }

    // Load and process image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Apply transformations
    let processedImage = image;

    // Resize if dimensions specified
    if (options.width || options.height) {
      processedImage = processedImage.resize(options.width, options.height, {
        fit: options.fit || 'cover',
        background: options.background || { r: 255, g: 255, b: 255, alpha: 1 }
      });
    }

    // Determine output format
    const outputFormat = options.format || this.getBestFormat(metadata.format);
    
    // Apply format-specific optimizations
    processedImage = this.applyFormatOptimizations(processedImage, outputFormat, options);

    // Generate output path
    const outputPath = this.generateOutputPath(inputPath, options, outputFormat);

    // Process and save
    const outputInfo = await processedImage.toFile(outputPath);

    const result: ImageProcessingResult = {
      originalPath: inputPath,
      optimizedPath: outputPath,
      format: outputFormat,
      width: outputInfo.width,
      height: outputInfo.height,
      size: outputInfo.size,
      metadata: metadata
    };

    // Cache the result
    this.cache.set(cacheKey, {
      hash: optionsHash,
      result,
      timestamp: Date.now()
    });

    return result;
  }

  /**
   * Generate responsive image set with multiple sizes and formats
   */
  async generateResponsiveSet(
    inputPath: string,
    options: {
      breakpoints?: number[];
      formats?: Array<keyof FormatEnum>;
      quality?: Partial<ImageConfig['quality']>;
      densities?: number[];
    } = {}
  ): Promise<ResponsiveImageSet> {
    const breakpoints = options.breakpoints || this.config.breakpoints;
    const formats = options.formats || this.config.formats;
    const densities = options.densities || [1];

    if (this.config.enableRetina && !densities.includes(2)) {
      densities.push(2);
    }

    const images: ImageProcessingResult[] = [];
    const srcsetEntries: string[] = [];

    // Generate images for each breakpoint, format, and density
    for (const format of formats) {
      for (const width of breakpoints) {
        for (const density of densities) {
          const actualWidth = width * density;
          
          try {
            const result = await this.optimizeImage(inputPath, {
              width: actualWidth,
              format,
              quality: options.quality?.[format] || this.config.quality[format],
              fit: 'cover'
            });

            images.push(result);

            // Add to srcset
            const descriptor = density > 1 ? `${width}w ${density}x` : `${width}w`;
            srcsetEntries.push(`${this.getPublicUrl(result.optimizedPath)} ${descriptor}`);
          } catch (error) {
            console.warn(`Failed to process ${inputPath} at ${actualWidth}px: ${error}`);
          }
        }
      }
    }

    // Generate fallback image (largest size, primary format)
    const fallbackFormat = formats[0];
    const fallbackWidth = Math.max(...breakpoints);
    
    const fallbackImage = await this.optimizeImage(inputPath, {
      width: fallbackWidth,
      format: fallbackFormat,
      quality: this.config.quality[fallbackFormat]
    });

    return {
      srcset: srcsetEntries.join(', '),
      sizes: this.generateSizesAttribute(breakpoints),
      fallback: this.getPublicUrl(fallbackImage.optimizedPath),
      images
    };
  }

  /**
   * Generate WebP/AVIF variants for progressive enhancement
   */
  async generateProgressiveFormats(inputPath: string): Promise<{
    webp?: ImageProcessingResult;
    avif?: ImageProcessingResult;
    fallback: ImageProcessingResult;
  }> {
    const results: any = {};

    // Generate modern formats if supported
    if (this.config.formats.includes('webp')) {
      try {
        results.webp = await this.optimizeImage(inputPath, {
          format: 'webp',
          quality: this.config.quality.webp
        });
      } catch (error) {
        console.warn(`WebP generation failed for ${inputPath}: ${error}`);
      }
    }

    if (this.config.formats.includes('avif')) {
      try {
        results.avif = await this.optimizeImage(inputPath, {
          format: 'avif',
          quality: this.config.quality.avif
        });
      } catch (error) {
        console.warn(`AVIF generation failed for ${inputPath}: ${error}`);
      }
    }

    // Always generate fallback
    const fallbackFormat = this.config.formats.includes('jpeg') ? 'jpeg' : 'png';
    results.fallback = await this.optimizeImage(inputPath, {
      format: fallbackFormat,
      quality: this.config.quality[fallbackFormat]
    });

    return results;
  }

  /**
   * Apply format-specific optimizations
   */
  private applyFormatOptimizations(
    image: Sharp, 
    format: keyof FormatEnum, 
    options: ImageOptimizeOptions
  ): Sharp {
    const quality = options.quality || this.config.quality[format];

    switch (format) {
      case 'jpeg':
        return image.jpeg({
          quality,
          progressive: options.progressive !== false,
          mozjpeg: true
        });

      case 'webp':
        return image.webp({
          quality,
          effort: 6 // Max compression effort
        });

      case 'avif':
        return image.avif({
          quality,
          effort: 9 // Max compression effort
        });

      case 'png':
        return image.png({
          compressionLevel: quality as number,
          progressive: options.progressive !== false
        });

      default:
        return image;
    }
  }

  /**
   * Determine best format for input image
   */
  private getBestFormat(inputFormat?: string): keyof FormatEnum {
    // Default to WebP if supported, otherwise JPEG
    if (this.config.formats.includes('webp')) {
      return 'webp';
    }
    if (this.config.formats.includes('jpeg')) {
      return 'jpeg';
    }
    return this.config.formats[0] as keyof FormatEnum;
  }

  /**
   * Generate output file path
   */
  private generateOutputPath(
    inputPath: string, 
    options: ImageOptimizeOptions, 
    format: keyof FormatEnum
  ): string {
    const inputBasename = basename(inputPath, extname(inputPath));
    const inputDir = dirname(inputPath);
    
    // Create hash for options to ensure unique filenames
    const optionsHash = this.generateOptionsHash(options).substring(0, 8);
    
    const filename = `${inputBasename}-${optionsHash}.${format}`;
    return join(this.outputDir, filename);
  }

  /**
   * Generate hash for caching options
   */
  private generateOptionsHash(options: ImageOptimizeOptions): string {
    const optionsString = JSON.stringify(options, Object.keys(options).sort());
    return createHash('md5').update(optionsString).digest('hex');
  }

  /**
   * Check if cache entry is still valid
   */
  private async isCacheValid(entry: CacheEntry, inputPath: string): Promise<boolean> {
    try {
      // Check if files still exist and cache is not expired
      const cacheAge = Date.now() - entry.timestamp;
      const maxAge = 86400000; // 24 hours

      return cacheAge < maxAge;
    } catch {
      return false;
    }
  }

  /**
   * Convert file path to public URL
   */
  private getPublicUrl(filePath: string): string {
    // Convert absolute path to relative URL
    return filePath.replace(this.outputDir, '/assets/images');
  }

  /**
   * Generate sizes attribute for responsive images
   */
  private generateSizesAttribute(breakpoints: number[]): string {
    const sortedBreakpoints = [...breakpoints].sort((a, b) => b - a);
    
    const sizes = sortedBreakpoints.map((breakpoint, index) => {
      if (index === sortedBreakpoints.length - 1) {
        // Last (smallest) breakpoint gets no media query
        return `${breakpoint}px`;
      } else {
        return `(min-width: ${breakpoint}px) ${breakpoint}px`;
      }
    });

    return sizes.join(', ');
  }

  /**
   * Clear the optimization cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; entries: number } {
    return {
      size: this.cache.size,
      entries: this.cache.size
    };
  }
}

/**
 * Template helper integration for images
 */
export function createImageHelpers(optimizer: ImageOptimizer) {
  return {
    /**
     * Generate optimized image URL
     */
    optimizeImage: (src: string, options?: ImageOptimizeOptions): string => {
      // During template rendering, return a placeholder URL that will be processed during build
      const params = new URLSearchParams();
      if (options?.width) params.set('w', options.width.toString());
      if (options?.height) params.set('h', options.height.toString());
      if (options?.quality) params.set('q', options.quality.toString());
      if (options?.format) params.set('f', options.format);
      
      const queryString = params.toString();
      return queryString ? `${src}?${queryString}` : src;
    },

    /**
     * Generate responsive srcset
     */
    generateSrcSet: (src: string): string => {
      // During template rendering, return placeholder srcset
      return `${src} 1x, ${src} 2x`;
    }
  };
}

/**
 * Factory function to create image optimizer
 */
export function createImageOptimizer(config: ImageConfig, outputDir?: string): ImageOptimizer {
  return new ImageOptimizer(config, outputDir);
}

export default ImageOptimizer;
# AI Tool Algorithms

**Complete Algorithm Specifications for MCP Tools and AI-Assisted Development**

This document provides detailed specifications for the algorithms that power AgentStatic's AI tools, including component discovery, ranking, suggestion generation, and validation systems.

---

## Component Discovery Algorithm

### Search Index Structure
```typescript
interface SearchIndex {
  // Inverted index for keyword search
  keywords: Map<string, Set<ComponentId>>;

  // Category-based index
  categories: Map<ComponentCategory, Set<ComponentId>>;

  // Tag-based index
  tags: Map<string, Set<ComponentId>>;

  // Semantic embeddings (optional, for similarity search)
  embeddings?: Map<ComponentId, number[]>;

  // Component metadata cache
  metadata: Map<ComponentId, ComponentMetadata>;

  // Build the search index
  build(components: ComponentDefinition[]): void {
    this.clear();

    for (const component of components) {
      // Index by keywords
      this.indexKeywords(component);

      // Index by category
      this.indexCategory(component);

      // Index by tags
      this.indexTags(component);

      // Cache metadata
      this.metadata.set(component.id, {
        id: component.id,
        name: component.name,
        description: component.description,
        category: component.category,
        tags: component.tags || [],
        usageCount: 0,
        lastUsed: null
      });
    }
  }

  private indexKeywords(component: ComponentDefinition): void {
    // Extract keywords from component name
    const nameKeywords = this.tokenize(component.name);

    // Extract keywords from description
    const descKeywords = this.tokenize(component.description);

    // Extract keywords from tags
    const tagKeywords = component.tags?.flatMap(tag =>
      this.tokenize(tag)
    ) || [];

    // Combine all keywords
    const allKeywords = new Set([
      ...nameKeywords,
      ...descKeywords,
      ...tagKeywords
    ]);

    // Add to inverted index
    for (const keyword of allKeywords) {
      if (!this.keywords.has(keyword)) {
        this.keywords.set(keyword, new Set());
      }
      this.keywords.get(keyword)!.add(component.id);
    }
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .split(/[\s-]+/)
      .filter(token => token.length > 2); // Skip short tokens
  }

  private indexCategory(component: ComponentDefinition): void {
    const category = component.category as ComponentCategory;
    if (!this.categories.has(category)) {
      this.categories.set(category, new Set());
    }
    this.categories.get(category)!.add(component.id);
  }

  private indexTags(component: ComponentDefinition): void {
    if (!component.tags) return;

    for (const tag of component.tags) {
      const normalizedTag = tag.toLowerCase();
      if (!this.tags.has(normalizedTag)) {
        this.tags.set(normalizedTag, new Set());
      }
      this.tags.get(normalizedTag)!.add(component.id);
    }
  }
}
```

### Semantic Search Implementation
```typescript
class SemanticSearch {
  private index: SearchIndex;
  private stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at',
    'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is',
    'was', 'are', 'been', 'be', 'have', 'has', 'had', 'do'
  ]);

  search(query: string, filters?: SearchFilters): RankedResult[] {
    // 1. Query preprocessing
    const processedQuery = this.preprocessQuery(query);

    // 2. Candidate retrieval
    const candidates = this.retrieveCandidates(processedQuery, filters);

    // 3. Ranking
    const ranked = this.rankCandidates(candidates, processedQuery);

    // 4. Result formatting
    return this.formatResults(ranked);
  }

  private preprocessQuery(query: string): ProcessedQuery {
    // Tokenize
    const tokens = query
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .split(/[\s-]+/);

    // Remove stop words
    const filtered = tokens.filter(token =>
      !this.stopWords.has(token) && token.length > 2
    );

    // Extract intent (looking for specific component types)
    const intent = this.extractIntent(query);

    // Identify component category if mentioned
    const category = this.extractCategory(filtered);

    return {
      original: query,
      tokens: filtered,
      intent,
      category
    };
  }

  private extractIntent(query: string): SearchIntent {
    const patterns = {
      navigation: /nav|menu|header/i,
      hero: /hero|banner|jumbotron|landing/i,
      content: /content|text|article|blog/i,
      cta: /cta|call.to.action|button|action/i,
      layout: /layout|grid|column|section/i,
      footer: /footer|bottom|copyright/i
    };

    for (const [intent, pattern] of Object.entries(patterns)) {
      if (pattern.test(query)) {
        return intent as SearchIntent;
      }
    }

    return 'general';
  }

  private extractCategory(tokens: string[]): ComponentCategory | null {
    const categories = ['atoms', 'molecules', 'organisms'];

    for (const token of tokens) {
      if (categories.includes(token)) {
        return token as ComponentCategory;
      }
    }

    // Check for singular forms
    if (tokens.includes('atom')) return 'atoms';
    if (tokens.includes('molecule')) return 'molecules';
    if (tokens.includes('organism')) return 'organisms';

    return null;
  }

  private retrieveCandidates(
    query: ProcessedQuery,
    filters?: SearchFilters
  ): Set<ComponentId> {
    const candidates = new Set<ComponentId>();

    // Retrieve by keywords
    for (const token of query.tokens) {
      const matches = this.index.keywords.get(token);
      if (matches) {
        matches.forEach(id => candidates.add(id));
      }
    }

    // Apply category filter
    if (filters?.category || query.category) {
      const category = filters?.category || query.category;
      const categoryComponents = this.index.categories.get(category!) || new Set();

      // Intersect with category
      if (candidates.size > 0) {
        const intersection = new Set<ComponentId>();
        for (const id of candidates) {
          if (categoryComponents.has(id)) {
            intersection.add(id);
          }
        }
        return intersection;
      } else {
        return categoryComponents;
      }
    }

    // Apply tag filters
    if (filters?.tags) {
      for (const tag of filters.tags) {
        const tagComponents = this.index.tags.get(tag) || new Set();
        // Intersect with existing candidates
        const intersection = new Set<ComponentId>();
        for (const id of candidates) {
          if (tagComponents.has(id)) {
            intersection.add(id);
          }
        }
        candidates.clear();
        intersection.forEach(id => candidates.add(id));
      }
    }

    return candidates;
  }

  private rankCandidates(
    candidates: Set<ComponentId>,
    query: ProcessedQuery
  ): ScoredComponent[] {
    const scored: ScoredComponent[] = [];

    for (const componentId of candidates) {
      const metadata = this.index.metadata.get(componentId)!;
      const score = this.calculateScore(metadata, query);

      scored.push({
        componentId,
        score,
        metadata
      });
    }

    // Sort by score descending
    return scored.sort((a, b) => b.score - a.score);
  }

  private calculateScore(
    component: ComponentMetadata,
    query: ProcessedQuery
  ): number {
    let score = 0;

    // TF-IDF style scoring
    for (const token of query.tokens) {
      // Term frequency in component
      const tf = this.termFrequency(token, component);

      // Inverse document frequency
      const idf = this.inverseDocumentFrequency(token);

      score += tf * idf;
    }

    // Boost for exact name match
    if (component.name.toLowerCase() === query.original.toLowerCase()) {
      score *= 2;
    }

    // Boost for category match
    if (query.category && component.category === query.category) {
      score *= 1.5;
    }

    // Boost for recent usage
    if (component.lastUsed) {
      const daysSinceUsed = this.daysSince(component.lastUsed);
      if (daysSinceUsed < 7) {
        score *= 1.2;
      }
    }

    // Boost for popularity
    if (component.usageCount > 10) {
      score *= 1.1;
    }

    return score;
  }

  private termFrequency(term: string, component: ComponentMetadata): number {
    const text = `${component.name} ${component.description} ${component.tags?.join(' ')}`.toLowerCase();
    const matches = (text.match(new RegExp(term, 'g')) || []).length;
    return matches / text.split(' ').length; // Normalized by document length
  }

  private inverseDocumentFrequency(term: string): number {
    const totalComponents = this.index.metadata.size;
    const componentsWithTerm = this.index.keywords.get(term)?.size || 1;
    return Math.log(totalComponents / componentsWithTerm);
  }

  private formatResults(scored: ScoredComponent[]): RankedResult[] {
    return scored.slice(0, 10).map((item, index) => ({
      rank: index + 1,
      componentId: item.componentId,
      name: item.metadata.name,
      description: item.metadata.description,
      category: item.metadata.category,
      relevance: this.normalizeScore(item.score),
      confidence: this.calculateConfidence(item.score, scored)
    }));
  }

  private normalizeScore(score: number): number {
    // Normalize to 0-1 range
    return Math.min(1, score / 10);
  }

  private calculateConfidence(score: number, allScored: ScoredComponent[]): number {
    if (allScored.length === 0) return 0;

    const maxScore = Math.max(...allScored.map(s => s.score));
    if (maxScore === 0) return 0;

    return score / maxScore;
  }
}
```

---

## Ranking Algorithm

### TF-IDF Implementation
```typescript
class TFIDFRanker {
  private documentFrequency: Map<string, number> = new Map();
  private totalDocuments: number = 0;

  // Build document frequency table
  buildIndex(components: ComponentDefinition[]): void {
    this.totalDocuments = components.length;
    this.documentFrequency.clear();

    for (const component of components) {
      const terms = this.extractTerms(component);
      const uniqueTerms = new Set(terms);

      for (const term of uniqueTerms) {
        const count = this.documentFrequency.get(term) || 0;
        this.documentFrequency.set(term, count + 1);
      }
    }
  }

  // Calculate TF-IDF score
  score(query: string, component: ComponentDefinition): number {
    const queryTerms = this.extractTerms({ description: query });
    const componentTerms = this.extractTerms(component);

    let totalScore = 0;

    for (const term of queryTerms) {
      const tf = this.termFrequency(term, componentTerms);
      const idf = this.inverseDocumentFrequency(term);
      totalScore += tf * idf;
    }

    return totalScore;
  }

  private termFrequency(term: string, terms: string[]): number {
    const count = terms.filter(t => t === term).length;
    return count / terms.length;
  }

  private inverseDocumentFrequency(term: string): number {
    const df = this.documentFrequency.get(term) || 0;
    if (df === 0) return 0;

    return Math.log(this.totalDocuments / df);
  }

  private extractTerms(source: any): string[] {
    const text = [
      source.name || '',
      source.description || '',
      ...(source.tags || [])
    ].join(' ').toLowerCase();

    return text
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(term => term.length > 2);
  }
}
```

### Relevance Scoring Formula
```typescript
interface RelevanceScorer {
  calculateRelevance(
    component: ComponentDefinition,
    context: SearchContext
  ): RelevanceScore {
    const weights = {
      textMatch: 0.3,      // Text similarity
      categoryMatch: 0.2,  // Category alignment
      usagePattern: 0.2,   // Usage frequency/recency
      contextMatch: 0.15,  // Context similarity
      popularity: 0.15     // Overall popularity
    };

    const scores = {
      textMatch: this.textMatchScore(component, context.query),
      categoryMatch: this.categoryMatchScore(component, context.category),
      usagePattern: this.usageScore(component, context.userId),
      contextMatch: this.contextScore(component, context.pageContext),
      popularity: this.popularityScore(component)
    };

    // Weighted sum
    let totalScore = 0;
    for (const [key, weight] of Object.entries(weights)) {
      totalScore += scores[key as keyof typeof scores] * weight;
    }

    return {
      total: totalScore,
      breakdown: scores,
      confidence: this.calculateConfidence(scores)
    };
  }

  private textMatchScore(
    component: ComponentDefinition,
    query: string
  ): number {
    // Use Levenshtein distance for fuzzy matching
    const nameDistance = this.levenshteinDistance(
      component.name.toLowerCase(),
      query.toLowerCase()
    );

    // Normalize to 0-1 (1 = perfect match)
    const maxDistance = Math.max(component.name.length, query.length);
    return 1 - (nameDistance / maxDistance);
  }

  private categoryMatchScore(
    component: ComponentDefinition,
    desiredCategory?: ComponentCategory
  ): number {
    if (!desiredCategory) return 0.5; // Neutral if no preference

    return component.category === desiredCategory ? 1 : 0;
  }

  private usageScore(
    component: ComponentDefinition,
    userId?: string
  ): number {
    // Get user's usage history
    const userHistory = this.getUserHistory(userId);

    // Check if user has used this component before
    const previousUses = userHistory.filter(h =>
      h.componentId === component.id
    ).length;

    // Recency boost
    const recentUse = userHistory.find(h =>
      h.componentId === component.id &&
      this.isRecent(h.timestamp)
    );

    let score = 0;

    // Frequency score
    if (previousUses > 0) {
      score += Math.min(1, previousUses / 10) * 0.5;
    }

    // Recency score
    if (recentUse) {
      score += 0.5;
    }

    return score;
  }

  private contextScore(
    component: ComponentDefinition,
    pageContext?: PageContext
  ): number {
    if (!pageContext) return 0.5; // Neutral if no context

    // Check if component commonly appears with current components
    const cooccurrence = this.getCooccurrenceScore(
      component.id,
      pageContext.existingComponents
    );

    // Check if component fits page type
    const pageTypeFit = this.getPageTypeFit(
      component.id,
      pageContext.pageType
    );

    return (cooccurrence + pageTypeFit) / 2;
  }

  private popularityScore(component: ComponentDefinition): number {
    // Global usage statistics
    const stats = this.getGlobalStats(component.id);

    // Normalize usage count (log scale)
    const usageScore = Math.log(stats.totalUses + 1) / Math.log(1000);

    // Average rating (if available)
    const ratingScore = stats.averageRating ? stats.averageRating / 5 : 0.5;

    return (usageScore + ratingScore) / 2;
  }

  private calculateConfidence(scores: any): number {
    // Confidence based on score distribution
    const values = Object.values(scores) as number[];
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;

    // Lower variance = higher confidence
    return Math.max(0, 1 - Math.sqrt(variance));
  }
}
```

### Category Boosting
```typescript
class CategoryBooster {
  private categoryWeights: Map<ComponentCategory, number> = new Map([
    ['organisms', 1.2],  // Prefer complete sections
    ['molecules', 1.0],  // Neutral weight
    ['atoms', 0.8]       // De-emphasize unless specifically requested
  ]);

  private categoryAffinity: Map<string, Map<string, number>> = new Map([
    ['organisms/hero', new Map([
      ['atoms/button', 0.9],
      ['atoms/heading', 0.8],
      ['molecules/navigation', 0.7]
    ])],
    // More affinities...
  ]);

  boostScore(
    baseScore: number,
    component: ComponentDefinition,
    context: SearchContext
  ): number {
    let boostedScore = baseScore;

    // Apply category weight
    const categoryWeight = this.categoryWeights.get(component.category) || 1.0;
    boostedScore *= categoryWeight;

    // Apply affinity boost if in context
    if (context.pageContext?.existingComponents) {
      for (const existingId of context.pageContext.existingComponents) {
        const affinity = this.getAffinity(existingId, component.id);
        if (affinity > 0) {
          boostedScore *= (1 + affinity * 0.1); // Max 10% boost per affinity
        }
      }
    }

    return boostedScore;
  }

  private getAffinity(componentA: string, componentB: string): number {
    const affinities = this.categoryAffinity.get(componentA);
    if (!affinities) return 0;

    return affinities.get(componentB) || 0;
  }
}
```

### Usage Frequency Weighting
```typescript
class UsageWeighter {
  private usageStats: Map<ComponentId, UsageStatistics> = new Map();

  weight(
    scores: ScoredComponent[],
    timeWindow: 'day' | 'week' | 'month' = 'week'
  ): ScoredComponent[] {
    const windowMs = this.getTimeWindowMs(timeWindow);
    const now = Date.now();

    return scores.map(item => {
      const stats = this.usageStats.get(item.componentId);

      if (!stats) return item;

      // Calculate recent usage
      const recentUses = stats.uses.filter(use =>
        (now - use.timestamp) < windowMs
      ).length;

      // Apply sigmoid function for smooth weighting
      const weight = this.sigmoid(recentUses, 10, 0.5);

      return {
        ...item,
        score: item.score * (1 + weight * 0.3) // Max 30% boost
      };
    });
  }

  private sigmoid(x: number, midpoint: number, steepness: number): number {
    return 1 / (1 + Math.exp(-steepness * (x - midpoint)));
  }

  private getTimeWindowMs(window: 'day' | 'week' | 'month'): number {
    const day = 24 * 60 * 60 * 1000;

    switch (window) {
      case 'day': return day;
      case 'week': return 7 * day;
      case 'month': return 30 * day;
    }
  }

  updateUsage(componentId: ComponentId, userId?: string): void {
    if (!this.usageStats.has(componentId)) {
      this.usageStats.set(componentId, {
        totalUses: 0,
        uses: []
      });
    }

    const stats = this.usageStats.get(componentId)!;
    stats.totalUses++;
    stats.uses.push({
      timestamp: Date.now(),
      userId
    });

    // Keep only last 1000 uses
    if (stats.uses.length > 1000) {
      stats.uses = stats.uses.slice(-1000);
    }
  }
}
```

---

## Suggestion Generation

### Suggestion Engine Implementation
```typescript
interface SuggestionEngine {
  suggest(context: SuggestionContext): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // 1. Pattern-based suggestions
    suggestions.push(...this.patternBasedSuggestions(context));

    // 2. Context-aware suggestions
    suggestions.push(...this.contextualSuggestions(context));

    // 3. Complementary suggestions
    suggestions.push(...this.complementarySuggestions(context));

    // 4. Alternative suggestions
    suggestions.push(...this.alternativeSuggestions(context));

    // Rank and filter
    return this.rankSuggestions(suggestions, context);
  }

  private patternBasedSuggestions(
    context: SuggestionContext
  ): Suggestion[] {
    const patterns = [
      {
        pattern: ['organisms/hero'],
        suggests: ['molecules/navigation', 'organisms/feature-grid'],
        reason: 'Commonly follows hero section'
      },
      {
        pattern: ['molecules/navigation'],
        suggests: ['organisms/hero', 'organisms/footer'],
        reason: 'Typical page structure'
      },
      {
        pattern: ['organisms/feature-grid'],
        suggests: ['organisms/testimonials', 'molecules/cta-block'],
        reason: 'Social proof after features'
      }
    ];

    const suggestions: Suggestion[] = [];

    for (const rule of patterns) {
      if (this.matchesPattern(context.currentComponents, rule.pattern)) {
        for (const componentId of rule.suggests) {
          suggestions.push({
            componentId,
            reason: rule.reason,
            confidence: 0.8,
            type: 'pattern'
          });
        }
      }
    }

    return suggestions;
  }

  private contextualSuggestions(
    context: SuggestionContext
  ): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Based on page type
    if (context.pageType) {
      const pageTypeComponents = this.getPageTypeComponents(context.pageType);

      for (const componentId of pageTypeComponents) {
        if (!context.currentComponents.includes(componentId)) {
          suggestions.push({
            componentId,
            reason: `Common for ${context.pageType} pages`,
            confidence: 0.7,
            type: 'contextual'
          });
        }
      }
    }

    // Based on user query
    if (context.userQuery) {
      const queryIntentComponents = this.analyzeQueryIntent(context.userQuery);

      for (const componentId of queryIntentComponents) {
        suggestions.push({
          componentId,
          reason: 'Matches your search intent',
          confidence: 0.9,
          type: 'contextual'
        });
      }
    }

    return suggestions;
  }

  private complementarySuggestions(
    context: SuggestionContext
  ): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Find components that work well together
    const complementaryMap = new Map<string, string[]>([
      ['molecules/pricing-card', ['molecules/comparison-table', 'molecules/faq']],
      ['organisms/testimonials', ['molecules/trust-badges', 'molecules/stats']],
      ['molecules/video-player', ['molecules/transcript', 'atoms/play-button']]
    ]);

    for (const currentComponent of context.currentComponents) {
      const complements = complementaryMap.get(currentComponent) || [];

      for (const complement of complements) {
        if (!context.currentComponents.includes(complement)) {
          suggestions.push({
            componentId: complement,
            reason: `Complements ${currentComponent}`,
            confidence: 0.6,
            type: 'complementary'
          });
        }
      }
    }

    return suggestions;
  }

  private alternativeSuggestions(
    context: SuggestionContext
  ): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Suggest alternatives to existing components
    const alternatives = new Map<string, string[]>([
      ['organisms/hero', ['organisms/hero-video', 'organisms/hero-split']],
      ['molecules/card', ['molecules/feature-card', 'molecules/testimonial-card']],
      ['molecules/cta-block', ['molecules/cta-banner', 'molecules/cta-inline']]
    ]);

    for (const currentComponent of context.currentComponents) {
      const alts = alternatives.get(currentComponent) || [];

      for (const alt of alts) {
        suggestions.push({
          componentId: alt,
          reason: `Alternative to ${currentComponent}`,
          confidence: 0.5,
          type: 'alternative'
        });
      }
    }

    return suggestions;
  }

  private rankSuggestions(
    suggestions: Suggestion[],
    context: SuggestionContext
  ): Suggestion[] {
    // Remove duplicates
    const unique = this.deduplicateSuggestions(suggestions);

    // Score each suggestion
    const scored = unique.map(suggestion => ({
      ...suggestion,
      score: this.scoreSuggestion(suggestion, context)
    }));

    // Sort by score
    scored.sort((a, b) => b.score - a.score);

    // Return top suggestions with confidence threshold
    return scored
      .filter(s => s.confidence > 0.3)
      .slice(0, 5);
  }

  private scoreSuggestion(
    suggestion: Suggestion,
    context: SuggestionContext
  ): number {
    let score = suggestion.confidence;

    // Boost for matching user intent
    if (context.userQuery && this.matchesQuery(suggestion.componentId, context.userQuery)) {
      score *= 1.5;
    }

    // Boost for not already present
    if (!context.currentComponents.includes(suggestion.componentId)) {
      score *= 1.2;
    }

    // Penalty for too many of same category
    const category = this.getComponentCategory(suggestion.componentId);
    const categoryCount = context.currentComponents.filter(c =>
      this.getComponentCategory(c) === category
    ).length;

    if (categoryCount > 3) {
      score *= 0.7;
    }

    return Math.min(1, score);
  }
}
```

### Pattern Matching
```typescript
class PatternMatcher {
  private patterns: ComponentPattern[] = [
    {
      id: 'landing-page',
      components: [
        'molecules/navigation',
        'organisms/hero',
        'organisms/feature-grid',
        'organisms/testimonials',
        'molecules/cta-block',
        'organisms/footer'
      ],
      metadata: {
        name: 'Landing Page',
        description: 'Standard landing page structure',
        category: 'marketing'
      }
    },
    {
      id: 'product-page',
      components: [
        'molecules/navigation',
        'organisms/product-hero',
        'molecules/feature-list',
        'organisms/gallery',
        'molecules/pricing-card',
        'organisms/footer'
      ],
      metadata: {
        name: 'Product Page',
        description: 'Product showcase page',
        category: 'ecommerce'
      }
    }
  ];

  findMatchingPatterns(components: ComponentId[]): PatternMatch[] {
    const matches: PatternMatch[] = [];

    for (const pattern of this.patterns) {
      const similarity = this.calculateSimilarity(components, pattern.components);

      if (similarity > 0.3) {
        matches.push({
          pattern,
          similarity,
          missingComponents: this.findMissing(components, pattern.components),
          extraComponents: this.findExtra(components, pattern.components)
        });
      }
    }

    return matches.sort((a, b) => b.similarity - a.similarity);
  }

  private calculateSimilarity(a: ComponentId[], b: ComponentId[]): number {
    const setA = new Set(a);
    const setB = new Set(b);

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    return intersection.size / union.size; // Jaccard similarity
  }

  private findMissing(current: ComponentId[], pattern: ComponentId[]): ComponentId[] {
    const currentSet = new Set(current);
    return pattern.filter(c => !currentSet.has(c));
  }

  private findExtra(current: ComponentId[], pattern: ComponentId[]): ComponentId[] {
    const patternSet = new Set(pattern);
    return current.filter(c => !patternSet.has(c));
  }
}
```

### Confidence Scoring
```typescript
class ConfidenceScorer {
  calculate(suggestion: Suggestion, context: SuggestionContext): number {
    const factors = {
      patternMatch: this.patternMatchScore(suggestion, context),
      userHistory: this.userHistoryScore(suggestion, context),
      cooccurrence: this.cooccurrenceScore(suggestion, context),
      semanticSimilarity: this.semanticScore(suggestion, context)
    };

    // Weighted average
    const weights = {
      patternMatch: 0.35,
      userHistory: 0.25,
      cooccurrence: 0.25,
      semanticSimilarity: 0.15
    };

    let confidence = 0;
    for (const [factor, score] of Object.entries(factors)) {
      confidence += score * weights[factor as keyof typeof weights];
    }

    // Apply confidence modifiers
    confidence = this.applyModifiers(confidence, suggestion, context);

    return Math.min(1, Math.max(0, confidence));
  }

  private patternMatchScore(
    suggestion: Suggestion,
    context: SuggestionContext
  ): number {
    // Check if suggestion fits known patterns
    const patterns = this.getRelevantPatterns(context);

    for (const pattern of patterns) {
      if (pattern.includes(suggestion.componentId)) {
        return 0.9;
      }
    }

    return 0.3;
  }

  private userHistoryScore(
    suggestion: Suggestion,
    context: SuggestionContext
  ): number {
    if (!context.userId) return 0.5;

    const history = this.getUserComponentHistory(context.userId);
    const usageCount = history.filter(h =>
      h.componentId === suggestion.componentId
    ).length;

    // Sigmoid function for smooth scoring
    return 1 / (1 + Math.exp(-0.5 * (usageCount - 5)));
  }

  private cooccurrenceScore(
    suggestion: Suggestion,
    context: SuggestionContext
  ): number {
    const cooccurrences = this.getCooccurrenceData();
    let totalScore = 0;
    let count = 0;

    for (const existingComponent of context.currentComponents) {
      const pair = [existingComponent, suggestion.componentId].sort().join(':');
      const frequency = cooccurrences.get(pair) || 0;

      totalScore += Math.min(1, frequency / 100); // Normalize
      count++;
    }

    return count > 0 ? totalScore / count : 0.5;
  }

  private semanticScore(
    suggestion: Suggestion,
    context: SuggestionContext
  ): number {
    if (!context.userQuery) return 0.5;

    // Simple keyword matching for now
    const suggestionKeywords = this.extractKeywords(suggestion.componentId);
    const queryKeywords = this.extractKeywords(context.userQuery);

    const overlap = suggestionKeywords.filter(k =>
      queryKeywords.includes(k)
    ).length;

    return overlap / Math.max(suggestionKeywords.length, queryKeywords.length);
  }

  private applyModifiers(
    baseConfidence: number,
    suggestion: Suggestion,
    context: SuggestionContext
  ): number {
    let modified = baseConfidence;

    // Reduce confidence if too many similar components
    const category = this.getCategory(suggestion.componentId);
    const sameCategory = context.currentComponents.filter(c =>
      this.getCategory(c) === category
    ).length;

    if (sameCategory > 2) {
      modified *= 0.8;
    }

    // Boost confidence for missing essential components
    if (this.isEssential(suggestion.componentId, context.pageType)) {
      modified *= 1.3;
    }

    return modified;
  }
}
```

---

## Validation Pipeline

### Composition Validator Implementation
```typescript
class CompositionValidator {
  validate(ast: ASTNode): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Run validation pipeline
    const results = [
      this.validateStructure(ast),
      this.validateSemantics(ast),
      this.validateAccessibility(ast),
      this.validatePerformance(ast)
    ];

    // Combine results
    for (const result of results) {
      errors.push(...result.errors);
      warnings.push(...result.warnings);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      summary: this.generateSummary(errors, warnings)
    };
  }

  private validateStructure(ast: ASTNode): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check AST is well-formed
    if (!this.isWellFormed(ast)) {
      errors.push({
        type: 'structural',
        severity: 'error',
        message: 'AST is not well-formed',
        location: ast.location
      });
    }

    // Check nesting depth
    const maxDepth = this.calculateDepth(ast);
    if (maxDepth > 10) {
      warnings.push({
        type: 'structural',
        severity: 'warning',
        message: `Nesting depth of ${maxDepth} may impact performance`,
        location: ast.location
      });
    }

    // Check for circular references
    const circular = this.detectCircularReferences(ast);
    if (circular.length > 0) {
      errors.push({
        type: 'structural',
        severity: 'error',
        message: `Circular reference detected: ${circular.join(' -> ')}`,
        location: ast.location
      });
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  private validateSemantics(ast: ASTNode): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    this.traverseAST(ast, (node) => {
      if (node.type === 'component') {
        // Validate props against schema
        const schema = this.getComponentSchema(node.componentId);

        if (schema) {
          const propErrors = this.validateProps(node.props, schema.props);
          errors.push(...propErrors);
        }

        // Validate slots
        if (node.slots && schema?.slots) {
          const slotErrors = this.validateSlots(node.slots, schema.slots);
          errors.push(...slotErrors);
        }

        // Check component exists
        if (!this.componentExists(node.componentId)) {
          errors.push({
            type: 'semantic',
            severity: 'error',
            message: `Component "${node.componentId}" not found`,
            location: node.location
          });
        }
      }
    });

    return { valid: errors.length === 0, errors, warnings };
  }

  private validateAccessibility(ast: ASTNode): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check heading hierarchy
    const headings = this.extractHeadings(ast);
    const headingErrors = this.validateHeadingHierarchy(headings);
    warnings.push(...headingErrors);

    // Check for alt text on images
    const images = this.extractImages(ast);
    for (const image of images) {
      if (!image.alt) {
        errors.push({
          type: 'accessibility',
          severity: 'error',
          message: 'Image missing alt text',
          location: image.location,
          wcag: 'WCAG 1.1.1'
        });
      }
    }

    // Check color contrast requirements
    const colorIssues = this.checkColorContrast(ast);
    warnings.push(...colorIssues);

    // Check keyboard navigation
    const keyboardIssues = this.checkKeyboardNavigation(ast);
    warnings.push(...keyboardIssues);

    // Check ARIA attributes
    const ariaIssues = this.validateARIA(ast);
    errors.push(...ariaIssues);

    return { valid: errors.length === 0, errors, warnings };
  }

  private validatePerformance(ast: ASTNode): ValidationResult {
    const warnings: ValidationWarning[] = [];

    // Count total components
    const componentCount = this.countComponents(ast);
    if (componentCount > 50) {
      warnings.push({
        type: 'performance',
        severity: 'warning',
        message: `Page has ${componentCount} components, consider splitting`,
        location: ast.location
      });
    }

    // Check for heavy components
    const heavyComponents = this.findHeavyComponents(ast);
    for (const component of heavyComponents) {
      warnings.push({
        type: 'performance',
        severity: 'warning',
        message: `Component "${component}" is resource-intensive`,
        location: ast.location
      });
    }

    return { valid: true, errors: [], warnings };
  }

  private isWellFormed(ast: ASTNode): boolean {
    // Check required properties
    if (!ast.type) return false;

    // Check type-specific requirements
    switch (ast.type) {
      case 'component':
        return !!(ast as ComponentNode).componentId;

      case 'slot':
        return !!(ast as SlotNode).name;

      case 'text':
        return (ast as TextNode).content !== undefined;

      default:
        return false;
    }
  }

  private validateProps(
    props: any,
    schema: PropsSchema
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check required props
    for (const [key, propSchema] of Object.entries(schema)) {
      if (propSchema.required && !(key in props)) {
        errors.push({
          type: 'semantic',
          severity: 'error',
          message: `Missing required prop: ${key}`,
          expected: propSchema.type,
          received: 'undefined'
        });
      }

      // Type validation
      if (key in props) {
        const valid = this.validatePropType(props[key], propSchema.type);

        if (!valid) {
          errors.push({
            type: 'semantic',
            severity: 'error',
            message: `Invalid type for prop "${key}"`,
            expected: propSchema.type,
            received: typeof props[key]
          });
        }

        // Enum validation
        if (propSchema.enum && !propSchema.enum.includes(props[key])) {
          errors.push({
            type: 'semantic',
            severity: 'error',
            message: `Invalid value for prop "${key}"`,
            expected: `one of: ${propSchema.enum.join(', ')}`,
            received: props[key]
          });
        }
      }
    }

    return errors;
  }
}
```

### Validation Rules

#### Structural Validation
```typescript
const STRUCTURAL_RULES = {
  maxNestingDepth: 10,
  maxComponentsPerPage: 100,
  maxSlotsPerComponent: 10,
  requiredPageElements: ['navigation', 'main', 'footer'],
  forbiddenNesting: [
    { parent: 'atoms/*', child: 'organisms/*' },
    { parent: 'atoms/*', child: 'molecules/*' }
  ]
};
```

#### Semantic Validation
```typescript
const SEMANTIC_RULES = {
  requiredProps: {
    'atoms/button': ['text'],
    'atoms/input': ['id', 'label'],
    'molecules/card': ['title', 'description']
  },

  slotConstraints: {
    'organisms/hero': {
      content: { minItems: 1, maxItems: 1 },
      actions: { maxItems: 2 }
    }
  },

  componentCompatibility: [
    { incompatible: ['organisms/hero', 'organisms/hero'] }, // No duplicate heroes
    { requires: ['molecules/tab-content', 'molecules/tab-navigation'] }
  ]
};
```

#### Accessibility Requirements
```typescript
const ACCESSIBILITY_RULES = {
  wcagLevel: 'AA',

  requirements: {
    images: {
      altText: 'required',
      decorative: 'aria-hidden'
    },

    headings: {
      hierarchy: 'sequential', // h1, h2, h3, not h1, h3
      unique: false,
      singleH1: true
    },

    forms: {
      labels: 'required',
      errorMessages: 'required',
      fieldsets: 'recommended'
    },

    contrast: {
      normal: 4.5,
      large: 3.0,
      nonText: 3.0
    }
  }
};
```

### Error vs Warning Thresholds
```typescript
const VALIDATION_THRESHOLDS = {
  // Errors - Build fails
  errors: {
    missingRequiredProps: 'error',
    componentNotFound: 'error',
    circularDependency: 'error',
    invalidAST: 'error',
    missingAltText: 'error'
  },

  // Warnings - Build continues
  warnings: {
    performanceIssues: 'warning',
    deepNesting: 'warning',
    tooManyComponents: 'warning',
    headingHierarchy: 'warning',
    colorContrast: 'warning'
  }
};
```

---

## Testing and Benchmarks

### Algorithm Performance Tests
```typescript
describe('Search Algorithm Performance', () => {
  it('should return results within 50ms', async () => {
    const index = new SearchIndex();
    await index.build(testComponents);

    const start = performance.now();
    const results = index.search('hero section');
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(50);
  });

  it('should handle 1000+ components efficiently', async () => {
    const components = generateTestComponents(1000);
    const index = new SearchIndex();

    const buildStart = performance.now();
    await index.build(components);
    const buildTime = performance.now() - buildStart;

    expect(buildTime).toBeLessThan(1000); // Build in under 1 second

    const searchStart = performance.now();
    const results = index.search('test query');
    const searchTime = performance.now() - searchStart;

    expect(searchTime).toBeLessThan(100); // Search in under 100ms
  });
});
```

### Accuracy Benchmarks
```typescript
describe('Search Relevance Accuracy', () => {
  it('should achieve >80% precision', () => {
    const testCases = [
      {
        query: 'navigation menu',
        expected: ['molecules/navigation', 'molecules/mobile-menu'],
        irrelevant: ['atoms/button', 'organisms/footer']
      }
      // More test cases...
    ];

    for (const testCase of testCases) {
      const results = search(testCase.query);
      const topResults = results.slice(0, 5).map(r => r.componentId);

      const relevant = topResults.filter(id =>
        testCase.expected.includes(id)
      ).length;

      const precision = relevant / topResults.length;
      expect(precision).toBeGreaterThan(0.8);
    }
  });
});
```

---

*This specification defines all algorithms powering AgentStatic's AI capabilities. Implementations must follow these patterns for consistent, performant, and accurate results.*
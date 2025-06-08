import { useEffect, useState } from 'react';

interface SEOAuditResult {
  score: number;
  issues: string[];
  recommendations: string[];
  passed: string[];
}

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
}

// SEO Audit Hook for monitoring optimization effectiveness
export const useSEOAudit = () => {
  const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runSEOAudit = async () => {
    setIsLoading(true);
    try {
      const audit = await performSEOAudit();
      const performance = await measurePerformance();
      
      setAuditResult(audit);
      setPerformanceMetrics(performance);
    } catch (error) {
      console.error('SEO Audit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Run audit on component mount
    runSEOAudit();
  }, []);

  return {
    auditResult,
    performanceMetrics,
    isLoading,
    runSEOAudit
  };
};

// Comprehensive SEO audit function
async function performSEOAudit(): Promise<SEOAuditResult> {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const passed: string[] = [];
  let score = 100;

  // Check Meta Tags
  const title = document.querySelector('title')?.textContent;
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
  const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
  
  if (!title || title.length < 30) {
    issues.push('Title tag missing or too short');
    score -= 10;
  } else if (title.length > 60) {
    recommendations.push('Title tag should be under 60 characters for better display in search results');
    score -= 2;
  } else {
    passed.push('Title tag optimized');
  }

  if (!metaDescription || metaDescription.length < 120) {
    issues.push('Meta description missing or too short');
    score -= 10;
  } else if (metaDescription.length > 160) {
    recommendations.push('Meta description should be under 160 characters');
    score -= 2;
  } else {
    passed.push('Meta description optimized');
  }

  if (!metaKeywords) {
    recommendations.push('Consider adding meta keywords for legacy SEO support');
    score -= 1;
  } else {
    passed.push('Meta keywords present');
  }

  // Check Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
  const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

  if (!ogTitle || !ogDescription || !ogImage) {
    issues.push('Incomplete Open Graph tags');
    score -= 8;
  } else {
    passed.push('Open Graph tags complete');
  }

  // Check Twitter Cards
  const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');

  if (!twitterCard || !twitterTitle) {
    issues.push('Twitter Card tags missing');
    score -= 5;
  } else {
    passed.push('Twitter Cards implemented');
  }

  // Check Structured Data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (!structuredData) {
    issues.push('Structured data (JSON-LD) missing');
    score -= 15;
  } else {
    try {
      JSON.parse(structuredData.textContent || '');
      passed.push('Valid structured data found');
    } catch {
      issues.push('Invalid structured data JSON');
      score -= 10;
    }
  }

  // Check Canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('Canonical URL missing');
    score -= 5;
  } else {
    passed.push('Canonical URL set');
  }

  // Check Heading Structure
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push('No H1 tag found');
    score -= 10;
  } else if (h1Tags.length > 1) {
    recommendations.push('Multiple H1 tags found - consider using only one per page');
    score -= 3;
  } else {
    passed.push('Proper H1 structure');
  }

  // Check Images Alt Text
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });

  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} images missing alt text`);
    score -= imagesWithoutAlt * 2;
  } else if (images.length > 0) {
    passed.push('All images have alt text');
  }

  // Check Internal Links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
  if (internalLinks.length < 3) {
    recommendations.push('Add more internal links for better SEO');
    score -= 3;
  } else {
    passed.push('Good internal linking structure');
  }

  // Check for HTTPS
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    issues.push('Site not served over HTTPS');
    score -= 15;
  } else {
    passed.push('HTTPS implemented');
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
    passed
  };
}

// Performance measurement using Web Vitals
async function measurePerformance(): Promise<PerformanceMetrics> {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {};    // Get basic performance metrics
    const perfEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfEntries) {
      metrics.ttfb = perfEntries.responseStart - perfEntries.requestStart;
      metrics.fcp = perfEntries.loadEventEnd - perfEntries.fetchStart;
    }

    // Use Web Vitals API if available
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => metrics.cls = metric.value);
      getFID((metric) => metrics.fid = metric.value);
      getFCP((metric) => metrics.fcp = metric.value);
      getLCP((metric) => metrics.lcp = metric.value);
      getTTFB((metric) => metrics.ttfb = metric.value);

      // Wait a bit for metrics to be collected
      setTimeout(() => {
        resolve({
          fcp: metrics.fcp || 0,
          lcp: metrics.lcp || 0,
          cls: metrics.cls || 0,
          fid: metrics.fid || 0,
          ttfb: metrics.ttfb || 0
        });
      }, 1000);
    }).catch(() => {
      // Fallback if web-vitals not available
      resolve({
        fcp: metrics.fcp || 0,
        lcp: metrics.lcp || 0,
        cls: 0,
        fid: 0,
        ttfb: metrics.ttfb || 0
      });
    });
  });
}

// SEO Score Calculator
export const calculateSEOScore = (auditResult: SEOAuditResult, performanceMetrics: PerformanceMetrics): number => {
  let score = auditResult.score;

  // Adjust score based on Core Web Vitals
  if (performanceMetrics.lcp > 2500) score -= 10;
  if (performanceMetrics.fid > 100) score -= 8;
  if (performanceMetrics.cls > 0.1) score -= 8;
  if (performanceMetrics.fcp > 1800) score -= 5;
  if (performanceMetrics.ttfb > 800) score -= 5;

  return Math.max(0, Math.min(100, score));
};

// SEO Recommendations Generator
export const generateSEORecommendations = (auditResult: SEOAuditResult, performanceMetrics: PerformanceMetrics): string[] => {
  const recommendations: string[] = [...auditResult.recommendations];

  // Performance-based recommendations
  if (performanceMetrics.lcp > 2500) {
    recommendations.push('Optimize Largest Contentful Paint (LCP) - compress images and improve server response time');
  }
  
  if (performanceMetrics.fid > 100) {
    recommendations.push('Reduce First Input Delay (FID) - minimize JavaScript execution time');
  }
  
  if (performanceMetrics.cls > 0.1) {
    recommendations.push('Improve Cumulative Layout Shift (CLS) - ensure proper image dimensions and avoid layout shifts');
  }
  
  if (performanceMetrics.fcp > 1800) {
    recommendations.push('Optimize First Contentful Paint (FCP) - reduce render-blocking resources');
  }
  
  if (performanceMetrics.ttfb > 800) {
    recommendations.push('Improve Time to First Byte (TTFB) - optimize server response time');
  }

  return recommendations;
};

export default {
  useSEOAudit,
  calculateSEOScore,
  generateSEORecommendations
};

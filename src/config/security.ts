// Security headers for enhanced SEO and trust signals
export const securityHeaders = {
  // Content Security Policy for XSS protection
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://api.coingecko.com https://www.google-analytics.com;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `,
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // Strict Transport Security
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Referrer Policy for privacy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  
  // Cache Control for static assets
  'Cache-Control': 'public, max-age=31536000, immutable'
};

// Meta tags for security and SEO
export const securityMetaTags = {
  // Prevent Google Translate on financial content
  'google': 'notranslate',
  
  // Security policy
  'Content-Security-Policy': securityHeaders['Content-Security-Policy'],
  
  // Prevent password managers from auto-filling
  'autocomplete': 'off',
  
  // Format detection
  'format-detection': 'telephone=no, address=no, email=no',
    // Apple web app capable
  'apple-mobile-web-app-capable': 'yes',
  'apple-mobile-web-app-status-bar-style': 'black-translucent',
  
  // Microsoft tile
  'msapplication-TileColor': '#7b61ff',
  'msapplication-TileImage': '/ms-icon-144x144.png',
  
  // Theme color for different platforms
  'theme-color': '#7b61ff',
  'msapplication-navbutton-color': '#7b61ff'
};

// Service Worker for SEO performance boost
export const serviceWorkerConfig = {
  swSrc: '/sw.js',
  swDest: 'service-worker.js',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.coingecko\.com\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 300 // 5 minutes
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets'
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
        }
      }
    }
  ]
};

// Performance monitoring configuration
export const performanceConfig = {
  // Core Web Vitals thresholds
  vitalsThresholds: {
    CLS: 0.1,      // Cumulative Layout Shift
    FID: 100,      // First Input Delay (ms)
    LCP: 2500,     // Largest Contentful Paint (ms)
    FCP: 1800,     // First Contentful Paint (ms)
    TTFB: 800      // Time to First Byte (ms)
  },
  
  // Performance budgets
  budgets: {
    javascript: 250 * 1024,    // 250KB
    css: 50 * 1024,            // 50KB
    images: 500 * 1024,        // 500KB
    fonts: 100 * 1024,         // 100KB
    total: 1000 * 1024         // 1MB total
  },
  
  // Critical rendering path
  criticalResources: [
    '/static/css/main.css',
    '/static/js/main.js'
  ]
};

// SEO monitoring endpoints
export const seoMonitoring = {
  endpoints: [
    'https://astralbridge.org/',
    'https://astralbridge.org/docs',
    'https://astralbridge.org/faq'
  ],
  
  checks: [
    'meta-tags',
    'structured-data',
    'performance',
    'accessibility',
    'mobile-friendly',
    'ssl-certificate',
    'sitemap',
    'robots-txt'
  ],
  
  tools: [
    'Google PageSpeed Insights',
    'Google Mobile-Friendly Test',
    'Google Rich Results Test',
    'Google Search Console',
    'Lighthouse CI'
  ]
};

export default {
  securityHeaders,
  securityMetaTags,
  serviceWorkerConfig,
  performanceConfig,
  seoMonitoring
};

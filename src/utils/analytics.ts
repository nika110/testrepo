import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

// Google Analytics tracking
export const GA_TRACKING_ID = 'GA_MEASUREMENT_ID'; // Replace with your actual Google Analytics Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function () {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date().toISOString());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track bridge transactions
export const trackBridgeTransaction = (
  sourceChain: string,
  destinationChain: string,
  amount: string,
  token: string
) => {
  trackEvent('bridge_initiated', 'bridge', `${sourceChain}_to_${destinationChain}`, parseFloat(amount));
  trackEvent('token_bridged', 'bridge', token);
};

// Track wallet connections
export const trackWalletConnection = (walletType: string) => {
  trackEvent('wallet_connected', 'wallet', walletType);
};

// Performance tracking hook
export const usePageTracking = () => {
  useEffect(() => {
    // Track page load time
    const trackPageLoad = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        trackEvent('page_load_time', 'performance', window.location.pathname, loadTime);
      }
    };

    // Track Core Web Vitals
    const trackWebVitals = () => {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => trackEvent('CLS', 'web_vitals', undefined, metric.value));
        getFID((metric) => trackEvent('FID', 'web_vitals', undefined, metric.value));
        getFCP((metric) => trackEvent('FCP', 'web_vitals', undefined, metric.value));
        getLCP((metric) => trackEvent('LCP', 'web_vitals', undefined, metric.value));
        getTTFB((metric) => trackEvent('TTFB', 'web_vitals', undefined, metric.value));
      });
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
      trackWebVitals();
    } else {
      window.addEventListener('load', () => {
        trackPageLoad();
        trackWebVitals();
      });
    }
  }, []);
};

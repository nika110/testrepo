// SEO Configuration for Astral Bridge
export const seoConfig = {
  defaultTitle: "Astral Bridge - Lightning Fast Cross-Chain Crypto Bridge | Solana, Ethereum, BSC",
  titleTemplate: "%s | Astral Bridge",
  defaultDescription: "Transfer crypto assets between Solana, Ethereum, BSC and other leading blockchains with unparalleled speed, security, and lowest fees. Experience cross-chain bridging in seconds.",
  siteUrl: "https://astralbridge.org",
  defaultImage: "https://astralbridge.org/og-image.png",
  twitter: {
    handle: "@AstralBridge",
    site: "@AstralBridge",
    cardType: "summary_large_image",
  },
  facebook: {
    appId: "YOUR_FACEBOOK_APP_ID", // Replace with actual Facebook App ID if you have one
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: "Astral Bridge",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "application-name",
      content: "Astral Bridge",
    },
    {
      name: "msapplication-TileColor",
      content: "#7b61ff",
    },
    {
      name: "theme-color",
      content: "#7b61ff",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
};

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Astral Bridge",
  "url": "https://astralbridge.org",
  "logo": "https://astralbridge.org/logo512.png",
  "description": "Lightning fast cross-chain cryptocurrency bridge for transferring assets between multiple blockchains",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/AstralBridge",
    "https://github.com/astralbridge",
    "https://discord.gg/astralbridge",
    "https://t.me/astralbridge"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "support@astralbridge.org"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Astral Bridge",
  "url": "https://astralbridge.org",
  "description": "Lightning fast cross-chain cryptocurrency bridge",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://astralbridge.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ Schema for common questions
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Astral Bridge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astral Bridge is a lightning-fast cross-chain cryptocurrency bridge that enables seamless asset transfers between Solana, Ethereum, BSC, Polygon, and other leading blockchains with unparalleled speed, security, and the lowest fees in DeFi."
      }
    },
    {
      "@type": "Question",
      "name": "Which blockchains does Astral Bridge support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astral Bridge supports major blockchains including Solana, Ethereum, Binance Smart Chain (BSC), Polygon, Avalanche, and more. We continuously add support for new networks based on user demand."
      }
    },
    {
      "@type": "Question",
      "name": "How fast are cross-chain transfers with Astral Bridge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astral Bridge enables cross-chain transfers in seconds, not minutes or hours. Our optimized protocol ensures the fastest bridging speeds in the market."
      }
    },
    {
      "@type": "Question",
      "name": "What are the fees for using Astral Bridge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astral Bridge offers the lowest fees in DeFi with our optimized bridging technology and dynamic fee structure. Users can save up to 90% compared to traditional bridges."
      }
    },
    {
      "@type": "Question",
      "name": "Is Astral Bridge secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Astral Bridge employs bank-grade security with multi-layer protection, advanced cryptography, and audited smart contracts. Your assets are protected by industry-leading security measures."
      }
    }
  ]
};

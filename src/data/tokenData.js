export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  chains: string[];
  type: string;
  coingeckoId?: string; // Added CoinGecko ID for API calls
}

// Initial token data with hardcoded prices as fallback
export const tokenData: Token[] = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'eth',
    price: 1875.42,
    chains: ['ethereum', 'arbitrum', 'optimism', 'base'],
    type: 'layer1',
    coingeckoId: 'ethereum'
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    logo: 'usdt',
    price: 1.00,
    chains: ['ethereum', 'solana', 'bsc', 'polygon', 'arbitrum'],
    type: 'stablecoins',
    coingeckoId: 'tether'
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'usdc',
    price: 1.00,
    chains: ['ethereum', 'solana', 'bsc', 'polygon', 'arbitrum', 'optimism', 'base', 'avalanche'],
    type: 'stablecoins',
    coingeckoId: 'usd-coin'
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    logo: 'bnb',
    price: 218.45,
    chains: ['bsc', 'ethereum'],
    type: 'layer1',
    coingeckoId: 'binancecoin'
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    logo: 'sol',
    price: 42.62,
    chains: ['solana', 'ethereum', 'bsc'],
    type: 'layer1',
    coingeckoId: 'solana'
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    logo: 'matic',
    price: 0.52,
    chains: ['polygon', 'ethereum'],
    type: 'layer1',
    coingeckoId: 'matic-network'
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    logo: 'avax',
    price: 10.27,
    chains: ['avalanche', 'ethereum', 'bsc'],
    type: 'layer1',
    coingeckoId: 'avalanche-2'
  },
  {
    id: 'shib',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    logo: 'shib',
    price: 0.000008,
    chains: ['ethereum', 'bsc', 'polygon'],
    type: 'defi',
    coingeckoId: 'shiba-inu'
  },
  {
    id: 'link',
    symbol: 'LINK',
    name: 'Chainlink',
    logo: 'link',
    price: 13.81,
    chains: ['ethereum', 'bsc', 'polygon', 'avalanche', 'arbitrum'],
    type: 'defi',
    coingeckoId: 'chainlink'
  },
  {
    id: 'aave',
    symbol: 'AAVE',
    name: 'Aave',
    logo: 'aave',
    price: 58.75,
    chains: ['ethereum', 'polygon', 'avalanche'],
    type: 'defi',
    coingeckoId: 'aave'
  },
  {
    id: 'sand',
    symbol: 'SAND',
    name: 'The Sandbox',
    logo: 'sand',
    price: 0.32,
    chains: ['ethereum', 'polygon'],
    type: 'gaming',
    coingeckoId: 'the-sandbox'
  },
  {
    id: 'mana',
    symbol: 'MANA',
    name: 'Decentraland',
    logo: 'mana',
    price: 0.29,
    chains: ['ethereum', 'polygon'],
    type: 'gaming',
    coingeckoId: 'decentraland'
  }
];

// Helper to map our token IDs to CoinGecko IDs
export const getCoingeckoId = (tokenId: string): string | undefined => {
  const token = tokenData.find(t => t.id === tokenId);
  return token?.coingeckoId;
};

// Function to fetch token prices from CoinGecko API
export const fetchTokenPrices = async (): Promise<void> => {
  try {
    // Get all CoinGecko IDs to fetch
    const ids = tokenData.map(token => token.coingeckoId).filter(Boolean).join(',');
    
    // Fetch data from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch token prices');
    }
    
    const data = await response.json();
    
    // Update token prices
    tokenData.forEach(token => {
      if (token.coingeckoId && data[token.coingeckoId]) {
        token.price = data[token.coingeckoId].usd;
      }
    });
    
    console.log('Token prices updated from CoinGecko');
  } catch (error) {
    console.error('Error fetching token prices:', error);
    // Fallback to hardcoded prices
  }
};

// Initialize prices - call this on app startup
export const initializeTokenPrices = (): void => {
  fetchTokenPrices().catch(error => {
    console.error('Failed to initialize token prices:', error);
  });
  
  // Set up periodic refresh (every 5 minutes)
  setInterval(() => {
    fetchTokenPrices().catch(error => {
      console.error('Failed to refresh token prices:', error);
    });
  }, 5 * 60 * 1000);
}; 
// Chain and Token Data
const chainData = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'ethereum',
    chainId: '1',
    networkType: 'Mainnet',
    explorerUrl: 'https://etherscan.io'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    logo: 'solana',
    chainId: 'N/A',
    networkType: 'Mainnet',
    explorerUrl: 'https://explorer.solana.com'
  },
  {
    id: 'bsc',
    name: 'Binance Smart Chain',
    shortName: 'BSC',
    symbol: 'BNB',
    logo: 'bsc',
    chainId: '56',
    networkType: 'Mainnet',
    explorerUrl: 'https://bscscan.com'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    logo: 'polygon',
    chainId: '137',
    networkType: 'Mainnet',
    explorerUrl: 'https://polygonscan.com'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ETH',
    logo: 'arbitrum',
    chainId: '42161',
    networkType: 'Mainnet',
    explorerUrl: 'https://arbiscan.io'
  },
  {
    id: 'optimism',
    name: 'Optimism',
    symbol: 'ETH',
    logo: 'optimism',
    chainId: '10',
    networkType: 'Mainnet',
    explorerUrl: 'https://optimistic.etherscan.io'
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'ETH',
    logo: 'base',
    chainId: '8453',
    networkType: 'Mainnet',
    explorerUrl: 'https://basescan.org'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    logo: 'avalanche',
    chainId: '43114',
    networkType: 'Mainnet',
    explorerUrl: 'https://snowtrace.io'
  }
];

const tokenData = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'eth',
    price: 1875.42,
    chains: ['ethereum', 'arbitrum', 'optimism', 'base'],
    type: 'layer1'
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    logo: 'usdt',
    price: 1.00,
    chains: ['ethereum', 'solana', 'bsc', 'polygon', 'arbitrum'],
    type: 'stablecoins'
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'usdc',
    price: 1.00,
    chains: ['ethereum', 'solana', 'bsc', 'polygon', 'arbitrum', 'optimism', 'base', 'avalanche'],
    type: 'stablecoins'
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    logo: 'bnb',
    price: 218.45,
    chains: ['bsc', 'ethereum'],
    type: 'layer1'
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    logo: 'sol',
    price: 42.62,
    chains: ['solana', 'ethereum', 'bsc'],
    type: 'layer1'
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    logo: 'matic',
    price: 0.52,
    chains: ['polygon', 'ethereum'],
    type: 'layer1'
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    logo: 'avax',
    price: 10.27,
    chains: ['avalanche', 'ethereum', 'bsc'],
    type: 'layer1'
  },
  {
    id: 'shib',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    logo: 'shib',
    price: 0.000008,
    chains: ['ethereum', 'bsc', 'polygon'],
    type: 'defi'
  },
  {
    id: 'link',
    symbol: 'LINK',
    name: 'Chainlink',
    logo: 'link',
    price: 13.81,
    chains: ['ethereum', 'bsc', 'polygon', 'avalanche', 'arbitrum'],
    type: 'defi'
  },
  {
    id: 'aave',
    symbol: 'AAVE',
    name: 'Aave',
    logo: 'aave',
    price: 58.75,
    chains: ['ethereum', 'polygon', 'avalanche'],
    type: 'defi'
  },
  {
    id: 'sand',
    symbol: 'SAND',
    name: 'The Sandbox',
    logo: 'sand',
    price: 0.32,
    chains: ['ethereum', 'polygon'],
    type: 'gaming'
  },
  {
    id: 'mana',
    symbol: 'MANA',
    name: 'Decentraland',
    logo: 'mana',
    price: 0.29,
    chains: ['ethereum', 'polygon'],
    type: 'gaming'
  }
];

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
  // Initialize particle animation
  initParticles();
  
  // Initialize animations
  initAnimations();
  
  // Initialize chain carousel
  initChainCarousel();
  
  // Initialize hover effects
  initHoverEffects();
  
  // Initialize chain swap
  initChainSwap();
  
  // Handle inputs and form interactions
  initFormInteractions();
  
  // Initialize dropdowns
  initDropdowns();
  
  // Initialize pages
  initPages();
});

// Initialize dropdowns
function initDropdowns() {
  // Populate chain dropdowns
  populateChainDropdowns();
  
  // Populate token dropdown
  populateTokenDropdown();
  
  // Handle dropdown toggle
  const dropdownTriggers = document.querySelectorAll('[data-dropdown]');
  
  dropdownTriggers.forEach(trigger => {
    const dropdownId = trigger.getAttribute('data-dropdown');
    const dropdown = document.getElementById(dropdownId);
    
    if (!dropdown) return;
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Close all other dropdowns
      document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
        if (menu.id !== dropdownId) {
          menu.classList.remove('active');
        }
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle('active');
      
      // Position the dropdown
      positionDropdown(trigger, dropdown);
    });
    
    // Search functionality
    const searchInput = dropdown.querySelector('.dropdown-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (text.includes(query)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
      
      // Prevent dropdown closing when clicking inside search
      searchInput.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.active').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
}

// Position dropdown relative to its trigger
function positionDropdown(trigger, dropdown) {
  const triggerRect = trigger.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const dropdownHeight = dropdown.offsetHeight;
  
  // Determine if dropdown should appear below or above the trigger
  const spaceBelow = windowHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  
  if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
    // Position above
    dropdown.style.top = `${triggerRect.top - dropdownHeight}px`;
  } else {
    // Position below
    dropdown.style.top = `${triggerRect.bottom}px`;
  }
  
  dropdown.style.left = `${triggerRect.left}px`;
  dropdown.style.width = `${Math.max(trigger.offsetWidth, 280)}px`;
}

// Populate chain dropdowns with chainData
function populateChainDropdowns() {
  const fromChainList = document.querySelector('#from-chain-dropdown .chains-list');
  const toChainList = document.querySelector('#to-chain-dropdown .chains-list');
  
  if (!fromChainList || !toChainList) return;
  
  chainData.forEach(chain => {
    const chainItem = createChainDropdownItem(chain);
    
    // Clone for both dropdowns
    fromChainList.appendChild(chainItem);
    toChainList.appendChild(chainItem.cloneNode(true));
  });
  
  // Add click event to chain items
  document.querySelectorAll('.chains-list .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      const chainId = this.getAttribute('data-id');
      const chain = chainData.find(c => c.id === chainId);
      
      if (!chain) return;
      
      const dropdownMenu = this.closest('.dropdown-menu');
      const triggerId = dropdownMenu.id;
      const triggerElement = document.querySelector(`[data-dropdown="${triggerId}"]`);
      
      // Update the trigger element with selected chain
      updateChainSelector(triggerElement, chain);
      
      // Close the dropdown
      dropdownMenu.classList.remove('active');
    });
  });
}

// Create a chain dropdown item
function createChainDropdownItem(chain) {
  const item = document.createElement('div');
  item.className = 'dropdown-item';
  item.setAttribute('data-id', chain.id);
  
  const icon = document.createElement('div');
  icon.className = `dropdown-item-icon chain-icon-small ${chain.id}`;
  
  const content = document.createElement('div');
  content.className = 'dropdown-item-content';
  
  const primary = document.createElement('div');
  primary.className = 'dropdown-item-primary';
  primary.textContent = chain.shortName || chain.name;
  
  const secondary = document.createElement('div');
  secondary.className = 'dropdown-item-secondary';
  secondary.textContent = chain.networkType;
  
  content.appendChild(primary);
  content.appendChild(secondary);
  
  item.appendChild(icon);
  item.appendChild(content);
  
  return item;
}

// Update chain selector with selected chain
function updateChainSelector(selector, chain) {
  const iconElement = selector.querySelector('.chain-icon');
  const nameElement = selector.querySelector('span:not(.chain-network)') || selector.querySelector('.chain-name');
  const networkElement = selector.querySelector('.chain-network');
  
  // Remove all chain-specific classes from the icon element
  iconElement.className = 'chain-icon';
  // Add specific chain class
  iconElement.classList.add(chain.id);
  
  // Update SVG content based on chain ID
  if (chain.id === 'ethereum') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
        <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fill-opacity="0.6"/>
        <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
        <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fill-opacity="0.6"/>
        <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white"/>
        <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fill-opacity="0.2"/>
        <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fill-opacity="0.6"/>
      </svg>
    `;
  } else if (chain.id === 'solana') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6.5 22.5L9.5 26.5L25.5 26.5L28.5 22.5L6.5 22.5Z" fill="url(#solanaGradient1)"/>
        <path d="M6.5 16L9.5 20H25.5L28.5 16H6.5Z" fill="url(#solanaGradient2)"/>
        <path d="M6.5 9.5L9.5 5.5L25.5 5.5L28.5 9.5L6.5 9.5Z" fill="url(#solanaGradient3)"/>
        <defs>
          <linearGradient id="solanaGradient1" x1="6.5" y1="24.5" x2="28.5" y2="24.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00F7FF"/>
            <stop offset="1" stop-color="#7B61FF"/>
          </linearGradient>
          <linearGradient id="solanaGradient2" x1="6.5" y1="18" x2="28.5" y2="18" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7B61FF"/>
            <stop offset="1" stop-color="#FF3BFF"/>
          </linearGradient>
          <linearGradient id="solanaGradient3" x1="6.5" y1="7.5" x2="28.5" y2="7.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF3BFF"/>
            <stop offset="1" stop-color="#00F7FF"/>
          </linearGradient>
        </defs>
      </svg>
    `;
  } else if (chain.id === 'polygon') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#8247E5"/>
        <path d="M15.9 10.05L13.2 8.55C12.9 8.4 12.45 8.4 12.15 8.55L9.45 10.05C9.15 10.2 8.85 10.5 8.85 10.95V13.8C8.85 14.1 9 14.4 9.45 14.7L12.15 16.2C12.45 16.35 12.9 16.35 13.2 16.2L15.9 14.7C16.2 14.55 16.5 14.25 16.5 13.8V10.95C16.5 10.5 16.2 10.2 15.9 10.05ZM15.45 13.35L13.35 14.55C13.2 14.7 12.9 14.7 12.6 14.55L10.5 13.35C10.35 13.2 10.2 13.05 10.2 12.75V10.5C10.2 10.35 10.35 10.2 10.5 10.05L12.6 8.85C12.75 8.7 13.05 8.7 13.35 8.85L15.45 10.05C15.6 10.2 15.75 10.35 15.75 10.5V12.75C15.75 13.05 15.6 13.2 15.45 13.35Z" fill="white"/>
        <path d="M7.35 9.45L5.55 8.25C5.4 8.1 5.1 8.1 4.8 8.25L3 9.45C2.85 9.6 2.7 9.75 2.7 10.05V12.3C2.7 12.6 2.85 12.75 3 12.9L4.8 14.1C4.95 14.25 5.25 14.25 5.55 14.1L7.35 12.9C7.5 12.75 7.65 12.6 7.65 12.3V10.05C7.65 9.75 7.5 9.6 7.35 9.45Z" fill="white"/>
        <path d="M20.7 9.45L18.9 8.25C18.75 8.1 18.45 8.1 18.15 8.25L16.35 9.45C16.2 9.6 16.05 9.75 16.05 10.05V12.3C16.05 12.6 16.2 12.75 16.35 12.9L18.15 14.1C18.3 14.25 18.6 14.25 18.9 14.1L20.7 12.9C20.85 12.75 21 12.6 21 12.3V10.05C21 9.75 20.85 9.6 20.7 9.45Z" fill="white"/>
      </svg>
    `;
  } else if (chain.id === 'bsc') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
        <path d="M16 6.99994L19.0447 10.0458L13.1733 15.9172L10.1286 12.8725L16 6.99994Z" fill="white"/>
        <path d="M19.0447 21.9514L16 25.0001L10.1286 19.1275L13.1733 16.0827L19.0447 21.9514Z" fill="white"/>
        <path d="M22.1647 13.8353L25.2094 16.8799L19.3378 22.7528L16.293 19.7082L22.1647 13.8353Z" fill="white"/>
        <path d="M6.7906 13.8353L9.83528 10.7905L15.707 16.6634L12.6622 19.708L6.7906 13.8353Z" fill="white"/>
        <path d="M16 12.501L19.0447 15.5469L16 18.5916L12.9553 15.5469L16 12.501Z" fill="white"/>
      </svg>
    `;
  } else if (chain.id === 'arbitrum') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#213147"/>
        <path d="M21.1211 12.4211L16.7813 4.60913C16.5491 4.19786 16.0164 4.19786 15.7841 4.60913L13.067 9.5906L11.7031 7.10006L9.86354 10.3438L7.90151 13.8391L6.10579 17.125C5.88448 17.5136 6.10273 18 6.54702 18H7.90395L12.1648 10.3281L17.7639 21.1531C17.8731 21.3485 18.0812 21.4675 18.304 21.4675H24.8983L21.1211 12.4211ZM20.1023 16.1954L21.0804 18.1563H18.4953L17.5172 16.1954L16.2823 13.6954L17.2603 11.7344L18.2384 9.77349L20.1023 13.6954L21.9661 17.6172L24.7861 22.7813L25.7642 24.7422H23.1791L20.4012 19.6328L19.4232 17.6719L18.4451 15.711L17.4671 13.75L16.489 11.7891L15.5109 9.82818L12.7331 4.71881H15.3182L16.2962 6.6797L17.2743 8.64068L18.2523 10.6016L19.2304 12.5625L20.1023 14.2344L21.0804 16.1954Z" fill="white"/>
      </svg>
    `;
  } else if (chain.id === 'optimism') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#FF0420"/>
        <path d="M9.2 19.6V11H12.9C13.7 11 14.4 11.1 15 11.4C15.6 11.7 16 12.1 16.4 12.7C16.7 13.3 16.9 13.9 16.9 14.7C16.9 15.5 16.7 16.1 16.4 16.7C16 17.3 15.6 17.7 15 18C14.4 18.3 13.7 18.4 12.9 18.4H10.6V19.7H9.2V19.6ZM10.6 17.2H12.8C13.9 17.2 14.7 16.9 15.2 16.4C15.7 15.9 16 15.3 16 14.6C16 13.9 15.8 13.3 15.2 12.8C14.7 12.3 13.9 12.1 12.8 12.1H10.6V17.2Z" fill="white"/>
        <path d="M19.9 19.8C19.1 19.8 18.5 19.6 17.9 19.2C17.3 18.8 17 18.3 16.9 17.6H18.4C18.5 17.9 18.7 18.2 19 18.3C19.3 18.5 19.7 18.6 20.1 18.6C20.5 18.6 20.9 18.5 21.1 18.3C21.3 18.1 21.5 17.9 21.5 17.6C21.5 17.3 21.4 17.1 21.1 17C20.9 16.9 20.5 16.7 19.9 16.6C19.4 16.5 18.9 16.3 18.5 16.2C18.1 16.1 17.8 15.8 17.5 15.5C17.2 15.2 17.1 14.8 17.1 14.3C17.1 13.9 17.2 13.5 17.4 13.2C17.6 12.9 17.9 12.6 18.3 12.4C18.7 12.2 19.1 12.1 19.7 12.1C20.5 12.1 21.1 12.3 21.6 12.7C22.1 13.1 22.4 13.6 22.5 14.3H21C20.9 14 20.7 13.7 20.5 13.6C20.2 13.4 19.9 13.3 19.5 13.3C19.1 13.3 18.8 13.4 18.6 13.6C18.4 13.8 18.2 14 18.2 14.3C18.2 14.5 18.3 14.7 18.4 14.9C18.5 15 18.7 15.1 18.9 15.2C19.1 15.3 19.4 15.3 19.7 15.4C20.2 15.5 20.7 15.7 21.1 15.8C21.5 15.9 21.8 16.2 22.1 16.5C22.4 16.8 22.5 17.2 22.5 17.7C22.5 18.1 22.4 18.5 22.2 18.8C22 19.1 21.7 19.4 21.3 19.6C20.9 19.7 20.4 19.8 19.9 19.8Z" fill="white"/>
      </svg>
    `;
  } else if (chain.id === 'base') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#0052FF"/>
        <path d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM16 19.3C14.16 19.3 12.7 17.84 12.7 16C12.7 14.16 14.16 12.7 16 12.7C17.84 12.7 19.3 14.16 19.3 16C19.3 17.84 17.84 19.3 16 19.3Z" fill="white"/>
      </svg>
    `;
  } else if (chain.id === 'avalanche') {
    iconElement.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#E84142"/>
        <path d="M20.5178 12.0358L16.0018 5L11.4858 12.0358L16.0018 16.3333L20.5178 12.0358Z" fill="white"/>
        <path d="M11.4858 12.0358L7 16.3333L11.4858 20.6309L16.0018 16.3333L11.4858 12.0358Z" fill="white" fill-opacity="0.8"/>
        <path d="M20.4879 12.0661L16.0018 16.3333L20.4879 20.6309L24.9738 16.3333L20.4879 12.0661Z" fill="white" fill-opacity="0.8"/>
        <path d="M11.4858 20.6309L16.0018 24.9285L20.5178 20.6309L16.0018 16.3333L11.4858 20.6309Z" fill="white" fill-opacity="0.6"/>
      </svg>
    `;
  }
  
  // Update name
  nameElement.textContent = chain.shortName || chain.name;
  
  // Update network if element exists
  if (networkElement) {
    networkElement.textContent = chain.networkType;
  }
}

// Populate token dropdown with tokenData
function populateTokenDropdown() {
  const tokenList = document.querySelector('#token-dropdown .tokens-list');
  
  if (!tokenList) return;
  
  tokenData.forEach(token => {
    const tokenItem = createTokenDropdownItem(token);
    tokenList.appendChild(tokenItem);
  });
  
  // Add click event to token items
  document.querySelectorAll('.tokens-list .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      const tokenId = this.getAttribute('data-id');
      const token = tokenData.find(t => t.id === tokenId);
      
      if (!token) return;
      
      const dropdownMenu = this.closest('.dropdown-menu');
      const triggerId = dropdownMenu.id;
      const triggerElement = document.querySelector(`[data-dropdown="${triggerId}"]`);
      
      // Update the trigger element with selected token
      updateTokenSelector(triggerElement, token);
      
      // Close the dropdown
      dropdownMenu.classList.remove('active');
    });
  });
}

// Create a token dropdown item
function createTokenDropdownItem(token) {
  const item = document.createElement('div');
  item.className = 'dropdown-item';
  item.setAttribute('data-id', token.id);
  
  const icon = document.createElement('div');
  icon.className = `dropdown-item-icon token-icon-small ${token.id}`;
  
  const content = document.createElement('div');
  content.className = 'dropdown-item-content';
  
  const primary = document.createElement('div');
  primary.className = 'dropdown-item-primary';
  primary.textContent = token.name;
  
  const secondary = document.createElement('div');
  secondary.className = 'dropdown-item-secondary';
  secondary.textContent = token.symbol;
  
  content.appendChild(primary);
  content.appendChild(secondary);
  
  item.appendChild(icon);
  item.appendChild(content);
  
  return item;
}

// Update token selector with selected token
function updateTokenSelector(selector, token) {
  const iconElement = selector.querySelector('.token-icon');
  const nameElement = selector.querySelector('.token-name') || selector.querySelector('span:not(.token-symbol)');
  const symbolElement = selector.querySelector('.token-symbol') || selector.querySelector('.currency-indicator');
  
  // Update icon
  iconElement.className = 'token-icon';
  iconElement.classList.add(token.id);
  
  // Update name if element exists
  if (nameElement) {
    nameElement.textContent = token.name;
  }
  
  // Update symbol
  if (symbolElement) {
    symbolElement.textContent = token.symbol;
  }
}

// Initialize page-specific functionality
function initPages() {
  // Bridge page
  if (document.querySelector('.bridge-tabs')) {
    initBridgeTabs();
  }
  
  // Explore page
  if (document.querySelector('.filter-tabs')) {
    initExploreTabs();
  }
  
  // Docs page - nothing specific yet
}

// Initialize bridge tabs
function initBridgeTabs() {
  const tabButtons = document.querySelectorAll('.bridge-tab');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update tab button active state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding content and hide others
      document.querySelectorAll('.bridge-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`${tabId}-tab-content`).classList.remove('hidden');
    });
  });
}

// Initialize explore tabs
function initExploreTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update tab active state
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding section and hide others
      document.querySelectorAll('.explore-section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(`${filter}-section`).classList.add('active');
    });
  });
  
  // Token filters
  const tokenFilters = document.querySelectorAll('.token-filter');
  
  tokenFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      tokenFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      const filterType = this.getAttribute('data-token-filter');
      
      // Filter token table rows - this would be implemented with real data
      console.log(`Filtering tokens by: ${filterType}`);
    });
  });
}

// Particle animation setup
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Configure particle settings
  const particleCount = 100;
  const particleArray = [];
  const connectionDistance = 150;
  const mouseInfluenceRadius = 120;
  
  // Mouse position tracking
  const mouse = {
    x: null,
    y: null,
    radius: mouseInfluenceRadius
  };
  
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 20) + 1;
      this.color = this.getRandomColor();
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }
    
    getRandomColor() {
      const colors = [
        'rgba(123, 97, 255, 0.7)',  // Purple
        'rgba(0, 247, 255, 0.7)',   // Cyan
        'rgba(255, 59, 255, 0.7)',  // Magenta
        'rgba(255, 255, 255, 0.5)'  // White
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    
    update() {
      // Move particles
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Boundary check
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
      
      // Mouse interaction
      if (mouse.x != undefined && mouse.y != undefined) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceX = dx / distance;
          const forceY = dy / distance;
          const maxForce = mouse.radius;
          const force = (maxForce - distance) / maxForce;
          const directionX = forceX * force * this.density;
          const directionY = forceY * force * this.density;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Return to original position
          if (Math.abs(this.x - this.baseX) > 0.1) {
            const dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (Math.abs(this.y - this.baseY) > 0.1) {
            const dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }
    }
  }
  
  // Initialize particles
  function init() {
    particleArray.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particleArray.push(new Particle());
    }
  }
  
  // Connect particles with lines
  function connect() {
    let opacityValue = 1;
    
    for (let a = 0; a < particleArray.length; a++) {
      for (let b = a; b < particleArray.length; b++) {
        const dx = particleArray[a].x - particleArray[b].x;
        const dy = particleArray[a].y - particleArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          opacityValue = 1 - (distance / connectionDistance);
          
          // Create gradient
          const gradient = ctx.createLinearGradient(
            particleArray[a].x,
            particleArray[a].y,
            particleArray[b].x,
            particleArray[b].y
          );
          
          gradient.addColorStop(0, particleArray[a].color);
          gradient.addColorStop(1, particleArray[b].color);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.globalAlpha = opacityValue;
          ctx.beginPath();
          ctx.moveTo(particleArray[a].x, particleArray[a].y);
          ctx.lineTo(particleArray[b].x, particleArray[b].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
      particleArray[i].draw();
    }
    
    connect();
    requestAnimationFrame(animate);
  }
  
  init();
  animate();
}

// Initialize animations
function initAnimations() {
  // Add stagger fade-in animation classes
  const elementsToAnimate = document.querySelectorAll('.hero h1, .hero p, .bridge-card, .feature-card, .flow-node');
  
  elementsToAnimate.forEach((el, index) => {
    el.classList.add('stagger-fade-in');
    el.classList.add(`delay-${Math.min(index + 1, 6)}`);
  });
  
  // Add holographic effect to cards
  const cards = document.querySelectorAll('.bridge-card, .feature-card, .chain-card');
  cards.forEach(card => {
    card.classList.add('holographic');
  });
}

// Chain carousel rotation
function initChainCarousel() {
  const carousel = document.querySelector('.chain-carousel');
  if (!carousel) return;
  
  const chains = document.querySelectorAll('.chain-card');
  const positions = [
    { transform: 'translate3d(-180px, -100px, 0) scale(0.8)', opacity: 0.6, zIndex: 1 },
    { transform: 'translate3d(-50%, -50%, 100px) scale(1)', opacity: 1, zIndex: 3 },
    { transform: 'translate3d(80px, -100px, 0) scale(0.8)', opacity: 0.6, zIndex: 2 }
  ];
  
  let currentIndex = 1; // Solana is active by default (index 1)
  
  // Auto rotate every 4 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % 3;
    updateCarousel();
  }, 4000);
  
  // Manual rotation on click
  chains.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
  
  function updateCarousel() {
    chains.forEach((card) => {
      card.classList.remove('active');
    });
    
    chains.forEach((card, index) => {
      const position = (index - currentIndex + 3) % 3;
      Object.assign(card.style, {
        transform: positions[position].transform,
        opacity: positions[position].opacity,
        zIndex: positions[position].zIndex
      });
      
      if (position === 1) {
        card.classList.add('active');
      }
    });
  }
}

// Hover effects for buttons and cards
function initHoverEffects() {
  // Magnetic effect for buttons
  const buttons = document.querySelectorAll('.cta-button, .connect-wallet');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 8;
      const moveY = (y - centerY) / 8;
      
      btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
  
  // Chain selector hover effect
  const chainSelectors = document.querySelectorAll('.chain-selector');
  
  chainSelectors.forEach(selector => {
    selector.addEventListener('mouseenter', () => {
      selector.style.transform = 'translateY(-2px)';
      selector.style.boxShadow = '0 8px 16px rgba(123, 97, 255, 0.2)';
    });
    
    selector.addEventListener('mouseleave', () => {
      selector.style.transform = '';
      selector.style.boxShadow = '';
    });
  });
}

// Chain swap functionality
function initChainSwap() {
  const swapButton = document.querySelector('.swap-chains');
  if (!swapButton) return;
  
  const fromSelector = document.querySelector('.chain-selector.from');
  const toSelector = document.querySelector('.chain-selector.to');
  
  swapButton.addEventListener('click', () => {
    // Clone the selectors
    const fromHTML = fromSelector.innerHTML;
    const toHTML = toSelector.innerHTML;
    
    // Animate swap
    fromSelector.style.transform = 'translateX(150%)';
    toSelector.style.transform = 'translateX(-150%)';
    
    setTimeout(() => {
      // Swap content
      fromSelector.innerHTML = toHTML;
      toSelector.innerHTML = fromHTML;
      
      // Reset position with no transition
      fromSelector.style.transition = 'none';
      toSelector.style.transition = 'none';
      
      fromSelector.style.transform = 'translateX(-150%)';
      toSelector.style.transform = 'translateX(150%)';
      
      setTimeout(() => {
        // Restore transition and animate back
        fromSelector.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        toSelector.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        fromSelector.style.transform = '';
        toSelector.style.transform = '';
      }, 50);
    }, 200);
  });
}

// Form interactions
function initFormInteractions() {
  const amountInput = document.getElementById('amount');
  if (!amountInput) return;
  
  // Floating label effect
  amountInput.addEventListener('focus', () => {
    const label = document.querySelector('label[for="amount"]');
    label.style.fontSize = '0.75rem';
    label.style.color = 'var(--color-cyan)';
  });
  
  amountInput.addEventListener('blur', () => {
    const label = document.querySelector('label[for="amount"]');
    if (!amountInput.value) {
      label.style.fontSize = '';
      label.style.color = '';
    }
  });
  
  // Connect wallet button
  const connectWalletBtn = document.querySelector('.connect-wallet');
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', () => {
      connectWalletBtn.textContent = 'Connecting...';
      
      setTimeout(() => {
        connectWalletBtn.textContent = 'Connected';
        connectWalletBtn.style.background = 'linear-gradient(to right, var(--color-cyan), var(--color-purple))';
        
        // Add a checkmark icon
        const icon = document.createElement('span');
        icon.innerHTML = ' ✓';
        connectWalletBtn.appendChild(icon);
        
        connectWalletBtn.disabled = true;
      }, 1500);
    });
  }
  
  // Preview bridge button
  const previewBtn = document.querySelector('.preview-bridge');
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      const amountInput = document.getElementById('amount');
      
      if (!amountInput.value) {
        amountInput.classList.add('error');
        amountInput.placeholder = 'Please enter an amount';
        
        setTimeout(() => {
          amountInput.classList.remove('error');
          amountInput.placeholder = '0.00';
        }, 2000);
        
        return;
      }
      
      previewBtn.textContent = 'Preparing...';
      previewBtn.disabled = true;
      
      setTimeout(() => {
        previewBtn.textContent = 'Preview Bridge';
        previewBtn.disabled = false;
        
        // In a real application, this would show a modal with transaction details
        alert('Bridge Preview: This would show transaction details in a production app');
      }, 1500);
    });
  }
}

// Add cursor effect
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
  
  const cursorOuter = document.createElement('div');
  cursorOuter.classList.add('cursor-follower');
  document.body.appendChild(cursorOuter);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    
    setTimeout(() => {
      cursorOuter.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, 80);
  });
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .chain-selector, .token-selector');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorOuter.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorOuter.classList.remove('active');
    });
  });
  
  // Add cursor styles
  const style = document.createElement('style');
  style.innerHTML = `
    .cursor {
      position: fixed;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--color-cyan);
      pointer-events: none;
      z-index: 9999;
      transform: translate3d(-50%, -50%, 0);
      mix-blend-mode: difference;
      transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
    }
    
    .cursor-follower {
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(123, 97, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.6;
      transform: translate3d(-50%, -50%, 0);
      transition: transform 0.3s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease;
    }
    
    .cursor.active {
      transform: translate3d(-50%, -50%, 0) scale(1.5);
      background-color: var(--color-magenta);
      mix-blend-mode: screen;
    }
    
    .cursor-follower.active {
      transform: translate3d(-50%, -50%, 0) scale(0.5);
      background-color: rgba(0, 247, 255, 0.1);
      border-color: var(--color-purple);
    }
    
    @media (max-width: 768px) {
      .cursor, .cursor-follower {
        display: none;
      }
    }
    
    .amount-input.error {
      border-color: rgba(255, 100, 100, 0.5);
      animation: shake 0.5s;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  
  document.head.appendChild(style);
});

// Add parallax effect on scroll
window.addEventListener('DOMContentLoaded', () => {
  // Add parallax styles
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      position: relative;
      overflow-x: hidden;
    }
    
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(123, 97, 255, 0.15), transparent 70%),
                  radial-gradient(circle at 85% 25%, rgba(0, 247, 255, 0.1), transparent 50%),
                  radial-gradient(circle at 15% 75%, rgba(255, 59, 255, 0.1), transparent 50%);
      z-index: -1;
      pointer-events: none;
    }
  `;
  
  document.head.appendChild(style);
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for background
    document.body.style.setProperty(
      '--bg-position',
      `calc(50% + ${scrollPosition * 0.05}px) calc(50% + ${scrollPosition * 0.03}px)`
    );
    
    // Parallax effect for elements
    const parallaxElements = document.querySelectorAll('.hero-visual, .flow-diagram');
    
    parallaxElements.forEach(el => {
      const speed = el.classList.contains('hero-visual') ? 0.1 : 0.05;
      const yPos = -(scrollPosition * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
});

// Add custom cursor to cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card, .bridge-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize coordinates
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate rotation (max 5 degrees)
      const rotateX = (0.5 - yPercent) * 5;
      const rotateY = (xPercent - 0.5) * 5;
      
      // Apply transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Add gradient highlight
      card.style.setProperty('--x', `${xPercent * 100}%`);
      card.style.setProperty('--y', `${yPercent * 100}%`);
      card.classList.add('hover-effect');
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.classList.remove('hover-effect');
    });
  });
  
  // Add hover effect styles
  const style = document.createElement('style');
  style.innerHTML = `
    .hover-effect::after {
      opacity: 1;
      background: radial-gradient(
        circle at var(--x) var(--y),
        rgba(255, 255, 255, 0.15),
        transparent 50%
      );
    }
  `;
  
  document.head.appendChild(style);
}); 
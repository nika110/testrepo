import React, { useState, useEffect, useRef } from 'react';
import { tokenData } from '../data/tokenData';
import ReactDOM from 'react-dom';

// Add keyframes for dropdown animation
const dropdownAnimationStyles = `
  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  chains: string[];
  type: string;
}

interface TokenSelectorProps {
  selectedToken: string;
  onTokenSelect: (tokenId: string) => void;
  sourceChain?: string;
  destinationChain?: string;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ 
  selectedToken, 
  onTokenSelect, 
  sourceChain, 
  destinationChain 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tokenSelectorRef = useRef<HTMLDivElement>(null);
  
  // For debugging
  console.log('TokenSelector Props:', { sourceChain, destinationChain, selectedToken });
  
  // Determine which token is the main token for the destination chain
  const getMainTokenForChain = (chainId: string | undefined): string => {
    if (!chainId) return 'eth';
    
    switch(chainId) {
      case 'ethereum':
      case 'arbitrum':
      case 'optimism':
      case 'base':
        return 'eth';
      case 'solana':
        return 'sol';
      case 'polygon':
        return 'matic';
      case 'bsc':
        return 'bnb';
      case 'avalanche':
        return 'avax';
      default:
        return 'eth';
    }
  };
  
  // Get all tokens that can be used for bridging between the selected chains
  const getAvailableTokens = (): Token[] => {
    const allTokens = tokenData as Token[];
    
    // If neither chain is specified, show all tokens
    if (!sourceChain && !destinationChain) {
      return allTokens;
    }
    
    // First get tokens available on both chains (if both are specified)
    let tokens: Token[] = [];
    
    if (sourceChain && destinationChain) {
      // Find all tokens available on both chains
      tokens = allTokens.filter(token => 
        token.chains.includes(sourceChain) && token.chains.includes(destinationChain)
      );
      
      console.log(`Tokens available on both ${sourceChain} and ${destinationChain}:`, tokens.map(t => t.symbol));
      
      // If there are no tokens available on both chains, show tokens from the source chain
      if (tokens.length === 0) {
        tokens = allTokens.filter(token => token.chains.includes(sourceChain));
      }
    } else if (sourceChain) {
      // If only source chain is specified
      tokens = allTokens.filter(token => token.chains.includes(sourceChain));
    } else if (destinationChain) {
      // If only destination chain is specified
      tokens = allTokens.filter(token => token.chains.includes(destinationChain));
    }
    
    // Always include the main token of the destination chain if it exists
    if (destinationChain) {
      const mainTokenId = getMainTokenForChain(destinationChain);
      const mainToken = allTokens.find(t => t.id === mainTokenId);
      
      if (mainToken && !tokens.some(t => t.id === mainTokenId)) {
        // Add it at the beginning of the array
        tokens = [mainToken, ...tokens];
      }
    }
    
    // Deduplicate tokens (just in case)
    const uniqueTokens: Token[] = [];
    const tokenIds = new Set<string>();
    
    for (const token of tokens) {
      if (!tokenIds.has(token.id)) {
        tokenIds.add(token.id);
        uniqueTokens.push(token);
      }
    }
    
    console.log('Final available tokens:', uniqueTokens.map(t => t.symbol));
    return uniqueTokens;
  };
  
  // Get the available and filtered tokens
  const availableTokens = getAvailableTokens();
  const selectedTokenData = (tokenData as Token[]).find(token => token.id === selectedToken);
  
  // IMPORTANT: Don't force select SOL when availableTokens change, respect user selection
  useEffect(() => {
    console.log('Effect triggered: chains or available tokens changed');
    
    // If the selected token doesn't exist in the available tokens, select a new one
    const tokenExists = availableTokens.some(token => token.id === selectedToken);
    console.log('Current token exists in available tokens:', tokenExists);
    
    if (!tokenExists && availableTokens.length > 0) {
      // Try to select the main token of the destination chain
      if (destinationChain) {
        const mainTokenId = getMainTokenForChain(destinationChain);
        const mainTokenAvailable = availableTokens.some(token => token.id === mainTokenId);
        
        if (mainTokenAvailable) {
          console.log(`Selecting main token ${mainTokenId} for ${destinationChain}`);
          onTokenSelect(mainTokenId);
          return;
        }
      }
      
      // Otherwise select the first available
      console.log('Selecting first available token:', availableTokens[0].id);
      onTokenSelect(availableTokens[0].id);
    }
  }, [sourceChain, destinationChain, availableTokens]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };
  
  const handleTokenSelect = (tokenId: string) => {
    console.log('User selected token in dropdown:', tokenId);
    // Directly update the selected token in the parent component
    onTokenSelect(tokenId);
    setIsOpen(false);
  };
  
  const filteredTokens = availableTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Render the token SVG for the token icon
  const renderTokenSVG = (tokenId: string) => {
    switch(tokenId) {
      case 'eth':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#627EEA"/>
            <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.6"/>
            <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
            <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fillOpacity="0.6"/>
            <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white"/>
            <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fillOpacity="0.2"/>
            <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fillOpacity="0.6"/>
          </svg>
        );
      case 'sol':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#100F14"/>
            <path d="M6.5 22.5L9.5 26.5L25.5 26.5L28.5 22.5L6.5 22.5Z" fill="url(#solGradient1)"/>
            <path d="M6.5 16L9.5 20H25.5L28.5 16H6.5Z" fill="url(#solGradient2)"/>
            <path d="M6.5 9.5L9.5 5.5L25.5 5.5L28.5 9.5L6.5 9.5Z" fill="url(#solGradient3)"/>
            <defs>
              <linearGradient id="solGradient1" x1="6.5" y1="24.5" x2="28.5" y2="24.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F7FF"/>
                <stop offset="1" stopColor="#7B61FF"/>
              </linearGradient>
              <linearGradient id="solGradient2" x1="6.5" y1="18" x2="28.5" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B61FF"/>
                <stop offset="1" stopColor="#FF3BFF"/>
              </linearGradient>
              <linearGradient id="solGradient3" x1="6.5" y1="7.5" x2="28.5" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3BFF"/>
                <stop offset="1" stopColor="#00F7FF"/>
              </linearGradient>
            </defs>
          </svg>
        );
      case 'bnb':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
            <path d="M16 6.99994L19.0447 10.0458L13.1733 15.9172L10.1286 12.8725L16 6.99994Z" fill="white"/>
            <path d="M19.0447 21.9514L16 25.0001L10.1286 19.1275L13.1733 16.0827L19.0447 21.9514Z" fill="white"/>
            <path d="M22.1647 13.8353L25.2094 16.8799L19.3378 22.7528L16.293 19.7082L22.1647 13.8353Z" fill="white"/>
            <path d="M6.7906 13.8353L9.83528 10.7905L15.707 16.6634L12.6622 19.708L6.7906 13.8353Z" fill="white"/>
            <path d="M16 12.501L19.0447 15.5469L16 18.5916L12.9553 15.5469L16 12.501Z" fill="white"/>
          </svg>
        );
      case 'matic':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#8247E5"/>
            <path d="M20.12 11.414l-5.054-2.915c-.625-.361-1.641-.361-2.28 0L7.733 11.414c-.326.19-.508.53-.508.883v8.467c0 .352.182.694.508.883l5.053 2.914c.626.362 1.642.362 2.28 0l5.054-2.914c.326-.19.507-.53.507-.883v-8.467c0-.354-.181-.693-.507-.883zm-5.826-1C15.006 10.143 15.747 10 16 10c.253 0 .994.143 1.707.414l4.386 2.527c.15.086.2.204.2.29 0 .087-.05.205-.2.292l-4.386 2.526c-.713.271-1.454.414-1.707.414-.253 0-.994-.143-1.707-.414l-4.386-2.526c-.15-.087-.2-.205-.2-.291 0-.087.05-.205.2-.291l4.386-2.527z" fill="white"/>
          </svg>
        );
      case 'avax':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#E84142"/>
            <path d="M20.5178 12.0358L16.0018 5L11.4858 12.0358L16.0018 16.3333L20.5178 12.0358Z" fill="white"/>
            <path d="M11.4858 12.0358L7 16.3333L11.4858 20.6309L16.0018 16.3333L11.4858 12.0358Z" fill="white" fillOpacity="0.8"/>
            <path d="M20.4879 12.0661L16.0018 16.3333L20.4879 20.6309L24.9738 16.3333L20.4879 12.0661Z" fill="white" fillOpacity="0.8"/>
            <path d="M11.4858 20.6309L16.0018 24.9285L20.5178 20.6309L16.0018 16.3333L11.4858 20.6309Z" fill="white" fillOpacity="0.6"/>
          </svg>
        );
      case 'usdt':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#26A17B"/>
            <path d="M17.922 17.333v-.002c-.112.008-.246.013-.388.013-1.076 0-1.948-.176-1.948-.394v-.876c.603.157 1.282.237 1.95.234.196 0 .393-.008.588-.023.955-.073 1.837-.27 2.582-.574.226-.094.476-.203.708-.326v1.06c0 .33-1.21.894-3.492.894v-.006zm0-1.99v.001c-.114.01-.242.012-.388.012-1.076 0-1.948-.174-1.948-.393v-.876c.603.156 1.282.236 1.95.234.196 0 .393-.007.588-.023.955-.072 1.837-.269 2.582-.574a7.25 7.25 0 00.708-.324v1.059c0 .328-1.21.893-3.492.893v-.01zM22.498 10.5h-13v.875c0 .119.38.328.708.554.9.516 2.555 1.073 4.797 1.073.218 0 .436-.004.648-.012h.023c1.317-.056 2.47-.286 3.33-.613a5.9 5.9 0 001.148-.547c.32-.224.494-.43.494-.55v-.78H22.5V10.5h-.002zm-3.302 4.336c-.19.015-.387.022-.583.022a10.71 10.71 0 01-1.95-.234v.877c0 .218.872.393 1.95.393.142 0 .276-.004.388-.013v.005c2.28 0 3.491-.564 3.491-.894V14.07v-.006a7.668 7.668 0 01-.705.324c-.747.305-1.628.502-2.584.575-.007 0-.007 0-.007 0v-.001zm-2.533-3.212a10.151 10.151 0 01-1.95-.234c-.607-.157-1.119-.381-1.424-.627h-.013v.78c0 .12.177.328.497.553.452.317 1.162.549 1.947.647v.8c-.177-.024-.358-.055-.539-.094a6.454 6.454 0 01-1.905-.65v.876c0 .218.872.393 1.95.393.142 0 .276-.005.387-.013 2.281 0 3.492-.565 3.492-.894v-.833a6.853 6.853 0 01-2.442.295v-.8c.196 0 .394-.007.59-.022.954-.073 1.836-.27 2.582-.575a7.65 7.65 0 00.707-.324V11a7.863 7.863 0 01-1.949.583 12.18 12.18 0 01-1.433.04z" fill="white"/>
          </svg>
        );
      case 'usdc':
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#2775CA"/>
            <path d="M20.022 13.826c0-2.576-1.578-3.44-4.734-3.74v-2.44h-1.97v2.4c-.515 0-1.04.01-1.56.03v-2.43h-1.97v2.472c-.394.02-.784.03-1.16.03h-2.616l.396 2.183s1.453-.03 1.433 0c.806 0 1.071.46 1.14.866v8.996c-.03.263-.179.668-.746.669.02.019-1.434 0-1.434 0l-.394 2.443h2.575c.41 0 .816 0 1.208.01v2.5h1.97v-2.472c.536.01 1.06.01 1.57.01v2.452h1.97v-2.501c3.245-.194 5.33-1.05 5.598-4.268.217-2.597-.977-3.756-2.92-4.223 1.04-.443 1.75-1.344 1.75-3.048zm-8.221 5.795v-2.924h2.457c.974 0 3.235-.192 3.235 1.462 0 1.543-2.182 1.462-2.892 1.462h-2.8zm3.106-5.487h-3.107v-2.627h3.166c1.237 0 2.625.26 2.625 1.313 0 1.383-1.798 1.314-2.684 1.314z" fill="white"/>
          </svg>
        );
      default:
        // For other tokens (like SHIB, LINK, etc.) you could add more SVGs
        // or use a generic token icon
        return (
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#718096"/>
            <circle cx="16" cy="16" r="12" fill="#4A5568" stroke="white" strokeWidth="0.5"/>
            <path d="M11 14L16 10L21 14L16 18L11 14Z" fill="white"/>
            <path d="M11 18L16 22L21 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };
  
  // Create dropdown portal component
  const DropdownPortal = () => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    
    // Update position when dropdown opens or window resizes
    useEffect(() => {
      const updatePosition = () => {
        if (tokenSelectorRef.current) {
          const rect = tokenSelectorRef.current.getBoundingClientRect();
          
          // Determine if we need to right-align or left-align the dropdown
          // We want it to appear directly below the token selector, centered if possible
          const viewportWidth = window.innerWidth;
          const spaceToRight = viewportWidth - rect.right;
          const spaceToLeft = rect.left;
          
          // Check if we're in the token selector to the right of the input
          // In this case we need special positioning to avoid overlapping the button
          const isRightTokenSelector = rect.right > viewportWidth / 2;
          
          let left = rect.left;
          if (isRightTokenSelector) {
            // If it's the right token selector, align with the right edge
            left = rect.left - 200 + rect.width;
          } else {
            // For normal positioning
            // If there's not enough space to the right, align right edge with token selector right edge
            if (spaceToRight < 120) {
              left = rect.right - 240;
            }
          }
          
          // Ensure the dropdown stays within the viewport
          left = Math.max(10, Math.min(viewportWidth - 250, left));
          
          // Calculate position so dropdown appears directly below the token selector button
          setPosition({
            top: rect.bottom + 4, // Small offset for visual separation
            left,
            width: rect.width
          });
        }
      };
      
      // Initial position update
      updatePosition();
      
      // Update position on window resize
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }, [isOpen]);

    // Check if document is defined (for SSR)
    if (typeof document === 'undefined') {
      return null;
    }
    
    return ReactDOM.createPortal(
      <>
        {/* Add the animation keyframes */}
        <style>{dropdownAnimationStyles}</style>
        <div 
          ref={dropdownRef}
          className="dropdown-menu active" 
          style={{ 
            position: 'fixed', 
            zIndex: 99999,
            top: `${position.top}px`,
            left: `${position.left}px`,
            maxHeight: '250px',
            overflowY: 'auto',
            width: '240px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            background: 'rgba(20, 20, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(123, 97, 255, 0.3)',
            borderRadius: '12px',
            animation: 'dropdownFadeIn 0.2s ease-out'
          }}
        >
          <div className="dropdown-search">
            <input 
              type="text" 
              className="dropdown-search-input" 
              placeholder="Search token..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="dropdown-list tokens-list">
            {filteredTokens.length > 0 ? (
              filteredTokens.map(token => (
                <div 
                  key={token.id} 
                  className="dropdown-item" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTokenSelect(token.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`dropdown-item-icon token-icon-small`}>
                    {renderTokenSVG(token.id)}
                  </div>
                  <div className="dropdown-item-content">
                    <div className="dropdown-item-primary">{token.symbol}</div>
                    <div className="dropdown-item-secondary">{token.name}</div>
                  </div>
                  <div className="dropdown-item-price">${token.price.toFixed(2)}</div>
                </div>
              ))
            ) : (
              <div className="dropdown-item">
                <div className="dropdown-item-content">
                  <div className="dropdown-item-primary">No tokens available</div>
                  <div className="dropdown-item-secondary">Try selecting different chains</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>,
      document.body
    );
  };
  
  return (
    <div className="token-selector-wrapper" style={{ position: 'relative' }}>
      <div className="token-selector" ref={tokenSelectorRef} onClick={toggleDropdown}>
        <div className={`token-icon ${selectedTokenData?.id || 'eth'}`}>
          {renderTokenSVG(selectedTokenData?.id || 'eth')}
        </div>
        <span>{selectedTokenData?.symbol || 'Select Token'}</span>
        <div className="selector-arrow">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <>
          {/* Try portal first for best positioning */}
          <DropdownPortal />
          
          {/* Fallback if portal doesn't work */}
          <div 
            style={{ 
              position: 'absolute',
              zIndex: 999,
              top: '100%',
              right: 0,
              marginTop: '4px',
              visibility: 'hidden' // Hidden by default, only shown if JS fails to detect
            }}
            className="token-selector-fallback"
          >
            <div
              className="dropdown-menu active" 
              style={{ 
                maxHeight: '250px',
                overflowY: 'auto',
                width: '240px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                background: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(123, 97, 255, 0.3)',
                borderRadius: '12px',
              }}
            >
              <div className="dropdown-search">
                <input 
                  type="text" 
                  className="dropdown-search-input" 
                  placeholder="Search token..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="dropdown-list tokens-list">
                {filteredTokens.length > 0 ? (
                  filteredTokens.map(token => (
                    <div 
                      key={token.id} 
                      className="dropdown-item" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTokenSelect(token.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`dropdown-item-icon token-icon-small`}>
                        {renderTokenSVG(token.id)}
                      </div>
                      <div className="dropdown-item-content">
                        <div className="dropdown-item-primary">{token.symbol}</div>
                        <div className="dropdown-item-secondary">{token.name}</div>
                      </div>
                      <div className="dropdown-item-price">${token.price.toFixed(2)}</div>
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item">
                    <div className="dropdown-item-content">
                      <div className="dropdown-item-primary">No tokens available</div>
                      <div className="dropdown-item-secondary">Try selecting different chains</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSelector; 
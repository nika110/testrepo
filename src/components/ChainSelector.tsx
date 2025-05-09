import React, { useState, useEffect, useRef } from 'react';
import { chainData } from '../data/chainData';

interface ChainSelectorProps {
  label?: string;
  selectedChain: string;
  onChainSelect: (chainId: string) => void;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({ label, selectedChain, onChainSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedChainData = chainData.find(chain => chain.id === selectedChain);
  
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
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };
  
  const handleChainSelect = (chainId: string) => {
    onChainSelect(chainId);
    setIsOpen(false);
  };
  
  const filteredChains = chainData.filter(chain => 
    chain.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (chain.shortName && chain.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Render the appropriate chain SVG based on the selected chain ID
  const renderChainSVG = (chainId: string) => {
    switch(chainId) {
      case 'ethereum':
        return (
          <>
            <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
            <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.6"/>
            <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
            <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fillOpacity="0.6"/>
            <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white"/>
            <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fillOpacity="0.2"/>
            <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fillOpacity="0.6"/>
          </>
        );
      case 'solana':
        return (
          <>
            <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#100F14"/>
            <path d="M6.5 22.5L9.5 26.5L25.5 26.5L28.5 22.5L6.5 22.5Z" fill="url(#solanaGradient1)"/>
            <path d="M6.5 16L9.5 20H25.5L28.5 16H6.5Z" fill="url(#solanaGradient2)"/>
            <path d="M6.5 9.5L9.5 5.5L25.5 5.5L28.5 9.5L6.5 9.5Z" fill="url(#solanaGradient3)"/>
            <defs>
              <linearGradient id="solanaGradient1" x1="6.5" y1="24.5" x2="28.5" y2="24.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F7FF"/>
                <stop offset="1" stopColor="#7B61FF"/>
              </linearGradient>
              <linearGradient id="solanaGradient2" x1="6.5" y1="18" x2="28.5" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B61FF"/>
                <stop offset="1" stopColor="#FF3BFF"/>
              </linearGradient>
              <linearGradient id="solanaGradient3" x1="6.5" y1="7.5" x2="28.5" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3BFF"/>
                <stop offset="1" stopColor="#00F7FF"/>
              </linearGradient>
            </defs>
          </>
        );
      case 'bsc':
        return (
          <>
            <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
            <path d="M16 6.99994L19.0447 10.0458L13.1733 15.9172L10.1286 12.8725L16 6.99994Z" fill="white"/>
            <path d="M19.0447 21.9514L16 25.0001L10.1286 19.1275L13.1733 16.0827L19.0447 21.9514Z" fill="white"/>
            <path d="M22.1647 13.8353L25.2094 16.8799L19.3378 22.7528L16.293 19.7082L22.1647 13.8353Z" fill="white"/>
            <path d="M6.7906 13.8353L9.83528 10.7905L15.707 16.6634L12.6622 19.708L6.7906 13.8353Z" fill="white"/>
            <path d="M16 12.501L19.0447 15.5469L16 18.5916L12.9553 15.5469L16 12.501Z" fill="white"/>
          </>
        );
      case 'polygon':
        return (
          <>
            <circle cx="16" cy="16" r="16" fill="#8247E5"/>
            <path d="M20.12 11.414l-5.054-2.915c-.625-.361-1.641-.361-2.28 0L7.733 11.414c-.326.19-.508.53-.508.883v8.467c0 .352.182.694.508.883l5.053 2.914c.626.362 1.642.362 2.28 0l5.054-2.914c.326-.19.507-.53.507-.883v-8.467c0-.354-.181-.693-.507-.883zm-5.826-1C15.006 10.143 15.747 10 16 10c.253 0 .994.143 1.707.414l4.386 2.527c.15.086.2.204.2.29 0 .087-.05.205-.2.292l-4.386 2.526c-.713.271-1.454.414-1.707.414-.253 0-.994-.143-1.707-.414l-4.386-2.526c-.15-.087-.2-.205-.2-.291 0-.087.05-.205.2-.291l4.386-2.527z" fill="white"/>
          </>
        );
      case 'arbitrum':
        return (
          <>
            <circle cx="16" cy="16" r="16" fill="#213147"/>
            <path d="M21.1211 12.4211L16.7813 4.60913C16.5491 4.19786 16.0164 4.19786 15.7841 4.60913L13.067 9.5906L11.7031 7.10006L9.86354 10.3438L7.90151 13.8391L6.10579 17.125C5.88448 17.5136 6.10273 18 6.54702 18H7.90395L12.1648 10.3281L17.7639 21.1531C17.8731 21.3485 18.0812 21.4675 18.304 21.4675H24.8983L21.1211 12.4211ZM20.1023 16.1954L21.0804 18.1563H18.4953L17.5172 16.1954L16.2823 13.6954L17.2603 11.7344L18.2384 9.77349L20.1023 13.6954L21.9661 17.6172L24.7861 22.7813L25.7642 24.7422H23.1791L20.4012 19.6328L19.4232 17.6719L18.4451 15.711L17.4671 13.75L16.489 11.7891L15.5109 9.82818L12.7331 4.71881H15.3182L16.2962 6.6797L17.2743 8.64068L18.2523 10.6016L19.2304 12.5625L20.1023 14.2344L21.0804 16.1954Z" fill="white"/>
          </>
        );
      case 'optimism':
        return (
          <>
            <circle cx="16" cy="16" r="16" fill="#FF0420"/>
            <path d="M9.2 19.6V11H12.9C13.7 11 14.4 11.1 15 11.4C15.6 11.7 16 12.1 16.4 12.7C16.7 13.3 16.9 13.9 16.9 14.7C16.9 15.5 16.7 16.1 16.4 16.7C16 17.3 15.6 17.7 15 18C14.4 18.3 13.7 18.4 12.9 18.4H10.6V19.7H9.2V19.6ZM10.6 17.2H12.8C13.9 17.2 14.7 16.9 15.2 16.4C15.7 15.9 16 15.3 16 14.6C16 13.9 15.8 13.3 15.2 12.8C14.7 12.3 13.9 12.1 12.8 12.1H10.6V17.2Z" fill="white"/>
            <path d="M19.9 19.8C19.1 19.8 18.5 19.6 17.9 19.2C17.3 18.8 17 18.3 16.9 17.6H18.4C18.5 17.9 18.7 18.2 19 18.3C19.3 18.5 19.7 18.6 20.1 18.6C20.5 18.6 20.9 18.5 21.1 18.3C21.3 18.1 21.5 17.9 21.5 17.6C21.5 17.3 21.4 17.1 21.1 17C20.9 16.9 20.5 16.7 19.9 16.6C19.4 16.5 18.9 16.3 18.5 16.2C18.1 16.1 17.8 15.8 17.5 15.5C17.2 15.2 17.1 14.8 17.1 14.3C17.1 13.9 17.2 13.5 17.4 13.2C17.6 12.9 17.9 12.6 18.3 12.4C18.7 12.2 19.1 12.1 19.7 12.1C20.5 12.1 21.1 12.3 21.6 12.7C22.1 13.1 22.4 13.6 22.5 14.3H21C20.9 14 20.7 13.7 20.5 13.6C20.2 13.4 19.9 13.3 19.5 13.3C19.1 13.3 18.8 13.4 18.6 13.6C18.4 13.8 18.2 14 18.2 14.3C18.2 14.5 18.3 14.7 18.4 14.9C18.5 15 18.7 15.1 18.9 15.2C19.1 15.3 19.4 15.3 19.7 15.4C20.2 15.5 20.7 15.7 21.1 15.8C21.5 15.9 21.8 16.2 22.1 16.5C22.4 16.8 22.5 17.2 22.5 17.7C22.5 18.1 22.4 18.5 22.2 18.8C22 19.1 21.7 19.4 21.3 19.6C20.9 19.7 20.4 19.8 19.9 19.8Z" fill="white"/>
          </>
        );
      case 'base':
        return (
          <>
            <circle cx="16" cy="16" r="16" fill="#0052FF"/>
            <path d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM16 19.3C14.16 19.3 12.7 17.84 12.7 16C12.7 14.16 14.16 12.7 16 12.7C17.84 12.7 19.3 14.16 19.3 16C19.3 17.84 17.84 19.3 16 19.3Z" fill="white"/>
          </>
        );
      case 'avalanche':
        return (
          <>
            <circle cx="16" cy="16" r="16" fill="#E84142"/>
            <path d="M20.5178 12.0358L16.0018 5L11.4858 12.0358L16.0018 16.3333L20.5178 12.0358Z" fill="white"/>
            <path d="M11.4858 12.0358L7 16.3333L11.4858 20.6309L16.0018 16.3333L11.4858 12.0358Z" fill="white" fillOpacity="0.8"/>
            <path d="M20.4879 12.0661L16.0018 16.3333L20.4879 20.6309L24.9738 16.3333L20.4879 12.0661Z" fill="white" fillOpacity="0.8"/>
            <path d="M11.4858 20.6309L16.0018 24.9285L20.5178 20.6309L16.0018 16.3333L11.4858 20.6309Z" fill="white" fillOpacity="0.6"/>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="chain-selector-wrapper" ref={dropdownRef}>
      {label && <label>{label}</label>}
      <div className="chain-selector" onClick={toggleDropdown}>
        <div className={`chain-icon ${selectedChainData?.id || 'ethereum'}`}>
          <svg viewBox="0 0 32 32" fill="none">
            {renderChainSVG(selectedChainData?.id || 'ethereum')}
          </svg>
        </div>
        <span>{selectedChainData?.shortName || selectedChainData?.name || 'Select Network'}</span>
        <div className="selector-arrow">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu active" style={{ position: 'absolute', zIndex: 100 }}>
          <div className="dropdown-search">
            <input 
              type="text" 
              className="dropdown-search-input" 
              placeholder="Search chain..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="dropdown-list chains-list">
            {filteredChains.map(chain => (
              <div 
                key={chain.id} 
                className="dropdown-item" 
                onClick={() => handleChainSelect(chain.id)}
              >
                <div className={`dropdown-item-icon chain-icon-small`}>
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {renderChainSVG(chain.id)}
                  </svg>
                </div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-primary">{chain.shortName || chain.name}</div>
                  <div className="dropdown-item-secondary">{chain.networkType}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainSelector; 
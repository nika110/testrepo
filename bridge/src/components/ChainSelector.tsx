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
  
  return (
    <div className="chain-selector-wrapper" ref={dropdownRef}>
      {label && <label>{label}</label>}
      <div className="chain-selector" onClick={toggleDropdown}>
        <div className={`chain-icon ${selectedChainData?.id || 'ethereum'}`}>
          {/* Chain SVG would go here, but I'll simplify for now */}
          <svg viewBox="0 0 32 32" fill="none">
            {selectedChainData?.id === 'ethereum' && (
              <>
                <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
                <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.6"/>
                <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
                <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fillOpacity="0.6"/>
                <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white"/>
                <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fillOpacity="0.2"/>
                <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fillOpacity="0.6"/>
              </>
            )}
            {selectedChainData?.id === 'solana' && (
              <>
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
            )}
            {/* Add more blockchain icons as needed */}
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
                <div className={`dropdown-item-icon chain-icon-small ${chain.id}`}></div>
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
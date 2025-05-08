import React, { useState, useEffect, useRef } from 'react';
import { tokenData } from '../data/tokenData';

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
  
  const selectedTokenData = tokenData.find(token => token.id === selectedToken);
  
  // Filter tokens based on chains if provided
  const availableTokens = tokenData.filter(token => {
    if (sourceChain && destinationChain) {
      return token.chains.includes(sourceChain) && token.chains.includes(destinationChain);
    } else if (sourceChain) {
      return token.chains.includes(sourceChain);
    }
    return true;
  });
  
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
  
  const handleTokenSelect = (tokenId: string) => {
    onTokenSelect(tokenId);
    setIsOpen(false);
  };
  
  const filteredTokens = availableTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="token-selector-wrapper" ref={dropdownRef}>
      <div className="token-selector" onClick={toggleDropdown}>
        <div className={`token-icon ${selectedTokenData?.id || 'eth'}`}>
          {/* Token icon would go here */}
      
        </div>
        <span>{selectedTokenData?.symbol || 'Select Token'}</span>
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
              placeholder="Search token..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="dropdown-list tokens-list">
            {filteredTokens.map(token => (
              <div 
                key={token.id} 
                className="dropdown-item" 
                onClick={() => handleTokenSelect(token.id)}
              >
                <div className={`dropdown-item-icon token-icon-small ${token.id}`}></div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-primary">{token.symbol}</div>
                  <div className="dropdown-item-secondary">{token.name}</div>
                </div>
                <div className="dropdown-item-price">${token.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSelector; 
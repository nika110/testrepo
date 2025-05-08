import React, { useState } from 'react';
import { tokenData } from '../data/tokenData';
import { chainData } from '../data/chainData';

const Tokens: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Filter tokens based on type and search query
  const filteredTokens = tokenData.filter(token => {
    // Filter by type
    if (activeFilter !== 'all' && token.type !== activeFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !token.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !token.symbol.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTokens = filteredTokens.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <main>
      <section className="page-header">
        <h1 className="gradient-text">Supported Tokens</h1>
        <p>Explore the expanding universe of tokens available on Astral Bridge</p>
      </section>
      
      <div className="token-filters-section">
        <div className="token-filters">
          <button 
            className={`token-filter ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Tokens
          </button>
          <button 
            className={`token-filter ${activeFilter === 'layer1' ? 'active' : ''}`}
            onClick={() => setActiveFilter('layer1')}
          >
            Layer 1
          </button>
          <button 
            className={`token-filter ${activeFilter === 'stablecoins' ? 'active' : ''}`}
            onClick={() => setActiveFilter('stablecoins')}
          >
            Stablecoins
          </button>
          <button 
            className={`token-filter ${activeFilter === 'defi' ? 'active' : ''}`}
            onClick={() => setActiveFilter('defi')}
          >
            DeFi
          </button>
          <button 
            className={`token-filter ${activeFilter === 'gaming' ? 'active' : ''}`}
            onClick={() => setActiveFilter('gaming')}
          >
            Gaming
          </button>
        </div>
        
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search tokens..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="tokens-grid">
        {currentTokens.map(token => (
          <div key={token.id} className="token-card glass-card">
            <div className="token-header">
              <div className={`token-icon ${token.id}`}></div>
              <div className="token-title">
                <h3>{token.name}</h3>
                <div className="token-symbol">{token.symbol}</div>
              </div>
              <div className="token-price">
                <div className="price-value">${token.price.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="token-info">
              <div className="token-info-row">
                <div className="info-label">Type</div>
                <div className="info-value">
                  {token.type === 'layer1' ? 'Layer 1' :
                   token.type === 'stablecoins' ? 'Stablecoin' :
                   token.type === 'defi' ? 'DeFi' : 
                   token.type === 'gaming' ? 'Gaming & Metaverse' : token.type}
                </div>
              </div>
              
              <div className="token-info-row">
                <div className="info-label">Available on</div>
                <div className="chain-icons">
                  {token.chains.slice(0, 4).map(chainId => (
                    <div 
                      key={chainId} 
                      className={`chain-icon-mini ${chainId}`} 
                      title={chainData.find(c => c.id === chainId)?.name}
                    ></div>
                  ))}
                  {token.chains.length > 4 && (
                    <div className="chain-more">+{token.chains.length - 4}</div>
                  )}
                </div>
              </div>
              
              <div className="token-info-row">
                <div className="info-label">Chains</div>
                <div className="info-value chains-list">
                  {token.chains.slice(0, 3).map((chainId, index) => (
                    <React.Fragment key={chainId}>
                      {index > 0 && ', '}
                      {chainData.find(c => c.id === chainId)?.shortName || 
                       chainData.find(c => c.id === chainId)?.name}
                    </React.Fragment>
                  ))}
                  {token.chains.length > 3 && `, +${token.chains.length - 3} more`}
                </div>
              </div>
            </div>
            
            <div className="token-actions">
              <button className="bridge-token-btn">Bridge {token.symbol}</button>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show max 5 page numbers
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={index}
                    className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={index} className="page-ellipsis">...</span>;
              }
              return null;
            })}
          </div>
          
          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
      
      <section className="token-bridge-cta">
        <div className="cta-content">
          <h2>Can't Find Your Token?</h2>
          <p>We're constantly adding new tokens to our bridge. If you don't see the token you're looking for, let us know!</p>
          <button className="cta-button request-token">Request a Token</button>
        </div>
      </section>
    </main>
  );
};

export default Tokens; 
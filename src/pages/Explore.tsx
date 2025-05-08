import React, { useState } from 'react';
import { chainData } from '../data/chainData';
import { tokenData } from '../data/tokenData';

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chains');
  const [activeTokenFilter, setActiveTokenFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const filteredTokens = tokenData.filter(token => {
    // Filter by type
    if (activeTokenFilter !== 'all' && token.type !== activeTokenFilter) {
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
        <h1 className="gradient-text">Explore Astral Bridge</h1>
        <p>Discover supported chains, assets, and track cross-chain activity</p>
      </section>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'chains' ? 'active' : ''}`}
            onClick={() => setActiveTab('chains')}
          >
            Chains
          </button>
          <button 
            className={`tab ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            Tokens
          </button>
          <button 
            className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Bridge Stats
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'chains' && (
            <div className="chains-grid">
              {chainData.map(chain => (
                <div key={chain.id} className="chain-info-card glass-card">
                  <div className={`chain-icon ${chain.id}`}>
                    {/* Chain SVG rendered here */}
                  </div>
                  <h3>{chain.name}</h3>
                  <div className="chain-stats">
                    <div className="chain-stat">
                      <span className="stat-label">Chain ID</span>
                      <span className="stat-value">{chain.chainId}</span>
                    </div>
                    <div className="chain-stat">
                      <span className="stat-label">Network</span>
                      <span className="stat-value">{chain.networkType}</span>
                    </div>
                    <div className="chain-stat">
                      <span className="stat-label">Symbol</span>
                      <span className="stat-value">{chain.symbol}</span>
                    </div>
                  </div>
                  <a href={chain.explorerUrl} className="explorer-link" target="_blank" rel="noopener noreferrer">
                    Explorer
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'tokens' && (
            <>
              <div className="token-filters-section">
                <div className="token-filters">
                  <button 
                    className={`token-filter ${activeTokenFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTokenFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`token-filter ${activeTokenFilter === 'layer1' ? 'active' : ''}`}
                    onClick={() => setActiveTokenFilter('layer1')}
                  >
                    Layer 1
                  </button>
                  <button 
                    className={`token-filter ${activeTokenFilter === 'stablecoins' ? 'active' : ''}`}
                    onClick={() => setActiveTokenFilter('stablecoins')}
                  >
                    Stablecoins
                  </button>
                  <button 
                    className={`token-filter ${activeTokenFilter === 'defi' ? 'active' : ''}`}
                    onClick={() => setActiveTokenFilter('defi')}
                  >
                    DeFi
                  </button>
                  <button 
                    className={`token-filter ${activeTokenFilter === 'gaming' ? 'active' : ''}`}
                    onClick={() => setActiveTokenFilter('gaming')}
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
                        <div className="info-label">Available on</div>
                        <div className="chain-icons">
                          {token.chains.slice(0, 4).map(chainId => (
                            <div key={chainId} className={`chain-icon-mini ${chainId}`} title={chainData.find(c => c.id === chainId)?.name}></div>
                          ))}
                          {token.chains.length > 4 && (
                            <div className="chain-more">+{token.chains.length - 4}</div>
                          )}
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
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
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
            </>
          )}
          
          {activeTab === 'stats' && (
            <div className="stats-container">
              <div className="stats-cards">
                <div className="stat-card glass-card">
                  <h3>Total Volume</h3>
                  <div className="stat-value">$1.72B</div>
                  <div className="stat-chart"></div>
                </div>
                
                <div className="stat-card glass-card">
                  <h3>Daily Transactions</h3>
                  <div className="stat-value">12,458</div>
                  <div className="stat-chart"></div>
                </div>
                
                <div className="stat-card glass-card">
                  <h3>Unique Users</h3>
                  <div className="stat-value">48,214</div>
                  <div className="stat-chart"></div>
                </div>
                
                <div className="stat-card glass-card">
                  <h3>Average Fee</h3>
                  <div className="stat-value">$2.14</div>
                  <div className="stat-chart"></div>
                </div>
              </div>
              
              <div className="bridge-activity glass-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {/* Activity would be listed here */}
                  <div className="activity-empty">
                    <p>Connect your wallet to see your bridge activity</p>
                    <button className="connect-wallet">Connect Wallet</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Explore; 
import React from 'react';
import { chainData } from '../data/chainData';
import { tokenData } from '../data/tokenData';

const Networks: React.FC = () => {
  return (
    <main>
      <section className="page-header">
        <h1 className="gradient-text">Supported Networks</h1>
        <p>Learn about all the blockchains integrated with Astral Bridge</p>
      </section>
      
      <section className="networks-grid">
        {chainData.map(chain => {
          // Count tokens available on this chain
          const tokensOnChain = tokenData.filter(token => token.chains.includes(chain.id)).length;
          
          return (
            <div key={chain.id} className="network-card glass-card">
              <div className="network-header">
                <div className={`chain-icon ${chain.id}`}>
                  {/* Chain SVG would render here based on chain.id */}
                </div>
                <div className="network-title">
                  <h2>{chain.name}</h2>
                  <div className="network-type">{chain.networkType}</div>
                </div>
              </div>
              
              <div className="network-details">
                <div className="detail-row">
                  <div className="detail-label">Chain ID:</div>
                  <div className="detail-value">{chain.chainId}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Native Token:</div>
                  <div className="detail-value">{chain.symbol}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Supported Assets:</div>
                  <div className="detail-value">{tokensOnChain} tokens</div>
                </div>
              </div>
              
              <div className="network-actions">
                <a 
                  href={chain.explorerUrl} 
                  className="network-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Explorer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <button className="bridge-to-btn">Bridge to {chain.shortName || chain.name}</button>
              </div>
              
              <div className="network-integrations">
                <h3>Information</h3>
                <p>
                  {chain.id === 'ethereum' && "Ethereum is the largest smart contract platform and the original home of DeFi. It offers the most liquidity and widest selection of tokens."}
                  {chain.id === 'solana' && "Solana is a high-performance blockchain with fast confirmations and low fees, ideal for DeFi applications and NFTs."}
                  {chain.id === 'polygon' && "Polygon is an Ethereum Layer 2 scaling solution enabling faster and cheaper transactions while maintaining Ethereum's security."}
                  {chain.id === 'bsc' && "Binance Smart Chain (BSC) offers EVM compatibility with higher throughput and lower fees than Ethereum mainnet."}
                  {chain.id === 'arbitrum' && "Arbitrum is an Ethereum Layer 2 solution using optimistic rollups to achieve lower fees and higher throughput."}
                  {chain.id === 'optimism' && "Optimism is an Ethereum Layer 2 solution that uses optimistic rollups to reduce gas costs while maintaining security."}
                  {chain.id === 'base' && "Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users onchain."}
                  {chain.id === 'avalanche' && "Avalanche is a layer one blockchain that functions as a platform for decentralized applications and custom blockchain networks."}
                </p>
              </div>
            </div>
          );
        })}
      </section>
      
      <section className="networks-features">
        <h2 className="section-title gradient-text">Network Integration Features</h2>
        
        <div className="features-grid networks-features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="url(#networkGradient1)" strokeWidth="2"/>
                <path d="M3.6 9H20.4" stroke="url(#networkGradient1)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3.6 15H20.4" stroke="url(#networkGradient1)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 20.4C14.6392 20.4 16.8 16.6392 16.8 12C16.8 7.36081 14.6392 3.6 12 3.6C9.36081 3.6 7.2 7.36081 7.2 12C7.2 16.6392 9.36081 20.4 12 20.4Z" stroke="url(#networkGradient1)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="networkGradient1" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7b61ff"/>
                    <stop offset="1" stopColor="#00f7ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Instant Finality</h3>
            <p>Fast block confirmations ensure your assets are quickly available on the destination chain</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#networkGradient2)" strokeWidth="2"/>
                <path d="M12 8V16" stroke="url(#networkGradient2)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 12H16" stroke="url(#networkGradient2)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="networkGradient2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f7ff"/>
                    <stop offset="1" stopColor="#ff3bff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Multi-Chain Support</h3>
            <p>Transfer assets seamlessly between any of our supported blockchains in a single transaction</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="url(#networkGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="url(#networkGradient3)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="networkGradient3" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff3bff"/>
                    <stop offset="1" stopColor="#7b61ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Native Integration</h3>
            <p>Get true native tokens on many chains, not just wrapped versions, for better compatibility</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Networks; 
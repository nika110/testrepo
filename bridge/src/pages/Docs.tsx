import React, { useState } from 'react';

const Docs: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState('intro');
  
  return (
    <main className="docs-page">
      <div className="docs-sidebar">
        <h3>Documentation</h3>
        <nav className="docs-nav">
          <div className="nav-section">
            <h4>Getting Started</h4>
            <ul>
              <li>
                <button 
                  className={activeTopic === 'intro' ? 'active' : ''} 
                  onClick={() => setActiveTopic('intro')}
                >
                  Introduction
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'quick-start' ? 'active' : ''} 
                  onClick={() => setActiveTopic('quick-start')}
                >
                  Quick Start
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'connect-wallet' ? 'active' : ''} 
                  onClick={() => setActiveTopic('connect-wallet')}
                >
                  Connect Your Wallet
                </button>
              </li>
            </ul>
          </div>
          
          <div className="nav-section">
            <h4>Bridge Operations</h4>
            <ul>
              <li>
                <button 
                  className={activeTopic === 'how-it-works' ? 'active' : ''} 
                  onClick={() => setActiveTopic('how-it-works')}
                >
                  How Bridging Works
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'send-assets' ? 'active' : ''} 
                  onClick={() => setActiveTopic('send-assets')}
                >
                  Send Assets
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'receive-assets' ? 'active' : ''} 
                  onClick={() => setActiveTopic('receive-assets')}
                >
                  Receive Assets
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'fees' ? 'active' : ''} 
                  onClick={() => setActiveTopic('fees')}
                >
                  Bridge Fees
                </button>
              </li>
            </ul>
          </div>
          
          <div className="nav-section">
            <h4>Networks & Assets</h4>
            <ul>
              <li>
                <button 
                  className={activeTopic === 'supported-chains' ? 'active' : ''} 
                  onClick={() => setActiveTopic('supported-chains')}
                >
                  Supported Chains
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'supported-tokens' ? 'active' : ''} 
                  onClick={() => setActiveTopic('supported-tokens')}
                >
                  Supported Tokens
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'network-specifics' ? 'active' : ''} 
                  onClick={() => setActiveTopic('network-specifics')}
                >
                  Network Specifics
                </button>
              </li>
            </ul>
          </div>
          
          <div className="nav-section">
            <h4>Advanced</h4>
            <ul>
              <li>
                <button 
                  className={activeTopic === 'api' ? 'active' : ''} 
                  onClick={() => setActiveTopic('api')}
                >
                  API Documentation
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'security' ? 'active' : ''} 
                  onClick={() => setActiveTopic('security')}
                >
                  Security Model
                </button>
              </li>
              <li>
                <button 
                  className={activeTopic === 'troubleshooting' ? 'active' : ''} 
                  onClick={() => setActiveTopic('troubleshooting')}
                >
                  Troubleshooting
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <div className="docs-content">
        {activeTopic === 'intro' && (
          <article>
            <h1>Introduction to Astral Bridge</h1>
            <p className="intro-text">
              Astral Bridge is a high-performance cross-chain bridge, enabling seamless asset transfers between Solana and other leading blockchains including Ethereum, Polygon, Binance Smart Chain, and more.
            </p>
            
            <h2>Why Use Astral Bridge?</h2>
            <div className="docs-cards">
              <div className="docs-card">
                <h3>Speed</h3>
                <p>Complete cross-chain transfers in seconds, not minutes or hours, thanks to our optimized relay infrastructure.</p>
              </div>
              
              <div className="docs-card">
                <h3>Security</h3>
                <p>Bank-grade security with multi-layer protection, advanced cryptography, and fully audited smart contracts.</p>
              </div>
              
              <div className="docs-card">
                <h3>Low Fees</h3>
                <p>Minimize costs with our optimized bridging technology and dynamic fee structure that adapts to network conditions.</p>
              </div>
            </div>
            
            <h2>Core Features</h2>
            <ul className="feature-list">
              <li>Bridge assets between 8+ major blockchains</li>
              <li>Support for 50+ tokens and growing</li>
              <li>Simple, intuitive user interface</li>
              <li>Transaction status tracking and history</li>
              <li>24/7 automated bridge operation</li>
              <li>Advanced security measures</li>
            </ul>
            
            <div className="next-steps">
              <h3>Ready to get started?</h3>
              <p>Follow our <button onClick={() => setActiveTopic('quick-start')}>Quick Start Guide</button> to make your first cross-chain transfer.</p>
            </div>
          </article>
        )}
        
        {activeTopic === 'how-it-works' && (
          <article>
            <h1>How Astral Bridge Works</h1>
            <p className="intro-text">
              Understanding the mechanism behind Astral Bridge helps you make informed decisions about your cross-chain transfers.
            </p>
            
            <h2>The Bridge Architecture</h2>
            <p>
              Astral Bridge employs a hybrid architecture combining the security of lock-and-mint with the speed of validator networks:
            </p>
            
            <div className="architecture-diagram">
              <div className="diagram-placeholder">
                [Architecture Diagram]
              </div>
            </div>
            
            <h3>Step 1: Lock or Burn</h3>
            <p>
              When transferring from the source chain, your assets are either locked in a secure smart contract (for most chains) or burned (for certain token standards that support it).
            </p>
            
            <h3>Step 2: Verification</h3>
            <p>
              A decentralized network of validators confirms the transaction on the source chain. Multiple validators must reach consensus before proceeding.
            </p>
            
            <h3>Step 3: Mint or Release</h3>
            <p>
              Once verified, equivalent tokens are either minted on the destination chain (if you're receiving wrapped tokens) or released from the bridge reserves (if receiving native tokens).
            </p>
            
            <h2>Security Measures</h2>
            <ul>
              <li><strong>Multi-signature control:</strong> All bridge operations require multiple authorized signatures.</li>
              <li><strong>Threshold signatures:</strong> Distributed key generation means no single party has complete control.</li>
              <li><strong>Oracle verification:</strong> External oracles validate cross-chain state.</li>
              <li><strong>Rate limiting:</strong> Maximum transfer amounts protect against large exploits.</li>
              <li><strong>Audited contracts:</strong> All smart contracts undergo rigorous security audits.</li>
            </ul>
            
            <h2>Token Representation</h2>
            <p>
              Tokens bridged to another blockchain are typically represented in one of two ways:
            </p>
            
            <h3>Wrapped Tokens</h3>
            <p>
              Most bridged assets exist as "wrapped" versions on the destination chain, backed 1:1 by the locked assets on the source chain. These follow the token standard of the destination chain (e.g., ERC-20 on Ethereum).
            </p>
            
            <h3>Native Tokens</h3>
            <p>
              For tokens that naturally exist on multiple chains (like USDC), Astral Bridge can deliver the native version rather than a wrapped token, providing better liquidity and integration.
            </p>
          </article>
        )}
        
        {/* Add more content sections for other topics */}
        
        {(activeTopic !== 'intro' && activeTopic !== 'how-it-works') && (
          <article className="placeholder-content">
            <h1>{activeTopic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
            <p>This documentation section is coming soon.</p>
          </article>
        )}
      </div>
    </main>
  );
};

export default Docs; 
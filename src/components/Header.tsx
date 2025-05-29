import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from './WalletProvider';
import WalletModal from './WalletModal';
import '../styles.css';

const Header: React.FC = () => {
  const { isConnected, address, walletType, disconnect } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  const getWalletIcon = () => {
    if (walletType === 'metamask') {
      return (
        <img 
          src="/images/MetaMask-icon.svg" 
          alt="MetaMask" 
          width="20" 
          height="20"
          className="wallet-icon"
        />
      );
    } else if (walletType === 'phantom') {
      return (
        <img 
          src="/images/Phantom-Icon_App_512x512.png" 
          alt="Phantom" 
          width="20" 
          height="20"
          className="wallet-icon"
        />
      );
    }
    return null;
  };

  return (
    <>
      <header>
        <div className="logo-container">
          <Link to="/">
            <svg className="logo" viewBox="0 0 128 128" fill="none">
              <path d="M64 16C37.49 16 16 37.49 16 64C16 90.51 37.49 112 64 112C90.51 112 112 90.51 112 64C112 37.49 90.51 16 64 16ZM64 96C46.33 96 32 81.67 32 64C32 46.33 46.33 32 64 32C81.67 32 96 46.33 96 64C96 81.67 81.67 96 64 96Z" fill="url(#logoGradient)"/>
              <defs>
                <linearGradient id="logoGradient" x1="16" y1="16" x2="112" y2="112" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7b61ff" />
                  <stop offset="50%" stopColor="#00f7ff" />
                  <stop offset="100%" stopColor="#ff3bff" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">Astral Bridge</span>
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/docs" className="nav-link">Docs</Link></li>
          </ul>
          
          {isConnected ? (
            <div className="wallet-connected" onClick={() => setShowAccountMenu(!showAccountMenu)}>
              <div className="wallet-info">
                {getWalletIcon()}
                <span className="wallet-address">{formatAddress(address!)}</span>
              </div>
              <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {showAccountMenu && (
                <div className="account-menu">
                  <div className="account-info">
                    <div className="account-header">
                      {getWalletIcon()}
                      <div>
                        <div className="wallet-type">{walletType === 'metamask' ? 'MetaMask' : 'Phantom'}</div>
                        <div className="full-address">{address}</div>
                      </div>
                    </div>
                  </div>
                  <button className="disconnect-button" onClick={() => {
                    disconnect();
                    setShowAccountMenu(false);
                  }}>
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="connect-wallet"
              onClick={() => setIsWalletModalOpen(true)}
            >
              Connect Wallet
            </button>
          )}
        </nav>
      </header>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};

export default Header; 
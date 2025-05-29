import React from 'react';
import { useWallet } from './WalletProvider';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connectMetaMask, connectPhantom, error, setError } = useWallet();

  const handleMetaMaskConnect = async () => {
    await connectMetaMask();
    if (!error) {
      onClose();
    }
  };

  const handlePhantomConnect = async () => {
    await connectPhantom();
    if (!error) {
      onClose();
    }
  };

  const clearError = () => {
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Connect Your Wallet</h2>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="wallet-modal-content">
          <p className="wallet-description">
            Choose your preferred wallet to connect to Astral Bridge
          </p>          {error && (
            <div className="wallet-error">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{error}</span>
              <button className="error-dismiss" onClick={clearError} title="Dismiss error">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}

          <div className="wallet-options">            <button className="wallet-option" onClick={handleMetaMaskConnect}>
              <div className="wallet-icon metamask-icon">
                <img 
                  src="/images/MetaMask-icon.svg" 
                  alt="MetaMask" 
                  width="48" 
                  height="48"
                />
              </div>
              <div className="wallet-info">
                <h3>MetaMask</h3>
                <p>Connect to Ethereum & EVM chains</p>
              </div>
              <div className="wallet-arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            <button className="wallet-option" onClick={handlePhantomConnect}>
              <div className="wallet-icon phantom-icon">
                <img 
                  src="/images/Phantom-Icon_App_512x512.png" 
                  alt="Phantom" 
                  width="48" 
                  height="48"
                />
              </div>
              <div className="wallet-info">
                <h3>Phantom</h3>
                <p>Connect to Solana network</p>
              </div>
              <div className="wallet-arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          <div className="wallet-footer">
            <p>New to wallets? <a href="https://ethereum.org/wallets/" target="_blank" rel="noopener noreferrer">Learn more</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;

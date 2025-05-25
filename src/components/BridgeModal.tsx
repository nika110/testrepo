import React, { useState, useEffect } from 'react';
import Toast from './Toast';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceChain: string;
  destinationChain: string;
  amount: string;
  selectedToken: string;
  recipientAddress: string;
}

interface DepositAddress {
  [key: string]: string;
}

const BridgeModal: React.FC<BridgeModalProps> = ({
  isOpen,
  onClose,
  sourceChain,
  destinationChain,
  amount,
  selectedToken,
  recipientAddress
}) => {
  const [currentStep, setCurrentStep] = useState(1);  const [isChecking, setIsChecking] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Mock deposit addresses for each chain
  const depositAddresses: DepositAddress = {
    ethereum: '0x742C1F8E89D55A1e90E82A54DcEa76F6e7b0F6D1',
    solana: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
    bsc: '0x9E8F4B2E1E6C8A7D3F0B5A4C2E9D1F8E7B6A5C4D',
    polygon: '0xA1B2C3D4E5F6789012345678901234567890ABCD',
    arbitrum: '0xDEF123456789ABCDEF123456789ABCDEF123456',
    optimism: '0x456789ABCDEF123456789ABCDEF123456789ABC',
    base: '0x789ABCDEF123456789ABCDEF123456789ABCDE',
    avalanche: '0xFEDCBA0987654321FEDCBA0987654321FEDCBA'
  };

  const getChainName = (chainId: string): string => {
    const chainNames: { [key: string]: string } = {
      ethereum: 'Ethereum',
      solana: 'Solana',
      bsc: 'Binance Smart Chain',
      polygon: 'Polygon',
      arbitrum: 'Arbitrum',
      optimism: 'Optimism',
      base: 'Base',
      avalanche: 'Avalanche'
    };
    return chainNames[chainId] || chainId;
  };

  const getTokenSymbol = (tokenId: string): string => {
    const tokenSymbols: { [key: string]: string } = {
      eth: 'ETH',
      sol: 'SOL',
      usdc: 'USDC',
      usdt: 'USDT',
      bnb: 'BNB',
      matic: 'MATIC',
      avax: 'AVAX'
    };
    return tokenSymbols[tokenId] || tokenId.toUpperCase();
  };

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsChecking(false);
      setIsDistributing(false);
      setTransactionHash('');
    }
  }, [isOpen]);

  const handleSentConfirmation = () => {
    setCurrentStep(2);
    setIsChecking(true);
    
    // Mock checking process
    setTimeout(() => {
      setIsChecking(false);
      // Generate mock transaction hash
      const mockHash = `0x${Math.random().toString(16).substring(2, 66)}`;
      setTransactionHash(mockHash);
      setCurrentStep(3);
      setIsDistributing(true);
      
      // Mock distribution process
      setTimeout(() => {
        setIsDistributing(false);
      }, 4000);
    }, 3000);
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({
        isVisible: true,
        message: 'Address copied to clipboard!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        isVisible: true,
        message: 'Failed to copy address',
        type: 'error'
      });
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const renderStep1 = () => (
    <div className="modal-step">
      <div className="step-header">
        <div className="step-icon send-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>Send Your Assets</h3>
        <p>Send your {getTokenSymbol(selectedToken)} to the deposit address below</p>
      </div>

      <div className="transaction-details">
        <div className="detail-row">
          <span className="label">Amount to Send:</span>
          <span className="value amount-highlight">{amount} {getTokenSymbol(selectedToken)}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">From Network:</span>
          <span className="value">{getChainName(sourceChain)}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">To Network:</span>
          <span className="value">{getChainName(destinationChain)}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Recipient:</span>
          <span className="value address-value">{recipientAddress}</span>
        </div>
      </div>

      <div className="deposit-address-section">
        <h4>Deposit Address ({getChainName(sourceChain)})</h4>
        <div className="address-container">
          <div className="address-display">
            <span className="address-text">{depositAddresses[sourceChain]}</span>
            <button 
              className="copy-button"
              onClick={() => copyToClipboard(depositAddresses[sourceChain])}
              title="Copy address"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.24264C20 6.44699 19.6839 5.68393 19.1213 5.12132L16.8787 2.87868C16.3161 2.31607 15.553 2 14.7574 2H10C8.89543 2 8 2.89543 8 4Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V9C4 7.89543 4.89543 7 6 7H8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="warning-message">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Only send {getTokenSymbol(selectedToken)} on {getChainName(sourceChain)} network to this address. Sending other tokens or using wrong network will result in permanent loss.</p>
        </div>
      </div>

      <button 
        className="cta-button confirm-sent-button"
        onClick={handleSentConfirmation}
      >
        I Have Sent The Assets
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="modal-step">
      <div className="step-header">
        <div className="step-icon checking-icon">
          {isChecking ? (
            <div className="spinner"></div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <h3>{isChecking ? 'Verifying Transaction' : 'Transaction Confirmed'}</h3>
        <p>
          {isChecking 
            ? 'Checking the blockchain for your transaction...' 
            : 'Your transaction has been verified on the blockchain'
          }
        </p>
      </div>

      <div className="verification-details">
        <div className="detail-row">
          <span className="label">Amount Received:</span>
          <span className="value amount-highlight">{amount} {getTokenSymbol(selectedToken)}</span>
        </div>
        
        {!isChecking && transactionHash && (
          <div className="detail-row">
            <span className="label">Transaction Hash:</span>
            <span className="value hash-value">{transactionHash.substring(0, 10)}...{transactionHash.substring(transactionHash.length - 8)}</span>
          </div>
        )}
        
        <div className="detail-row">
          <span className="label">Status:</span>
          <span className={`value status ${isChecking ? 'pending' : 'confirmed'}`}>
            {isChecking ? 'Verifying...' : 'Confirmed'}
          </span>
        </div>
      </div>

      {isChecking && (
        <div className="checking-animation">
          <div className="blockchain-blocks">
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <p>This usually takes 1-2 minutes...</p>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="modal-step">
      <div className="step-header">
        <div className="step-icon distributing-icon">
          {isDistributing ? (
            <div className="spinner"></div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 16L3 12M3 12L7 8M3 12H21M17 8L21 12M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <h3>{isDistributing ? 'Processing Bridge' : 'Bridge Completed!'}</h3>
        <p>
          {isDistributing 
            ? 'Bridging your assets to the destination network...' 
            : 'Your assets have been successfully bridged'
          }
        </p>
      </div>

      <div className="distribution-details">
        <div className="detail-row">
          <span className="label">Bridged Amount:</span>
          <span className="value amount-highlight">{amount} {getTokenSymbol(selectedToken)}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">To Network:</span>
          <span className="value">{getChainName(destinationChain)}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Recipient Address:</span>
          <span className="value address-value">{recipientAddress}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Status:</span>
          <span className={`value status ${isDistributing ? 'processing' : 'completed'}`}>
            {isDistributing ? 'Processing...' : 'Completed'}
          </span>
        </div>
      </div>

      {isDistributing && (
        <div className="bridge-animation">
          <div className="bridge-visual">
            <div className="source-chain">{getChainName(sourceChain)}</div>
            <div className="bridge-arrow">
              <div className="arrow-line"></div>
              <div className="moving-token"></div>
            </div>
            <div className="dest-chain">{getChainName(destinationChain)}</div>
          </div>
          <p>Bridging in progress...</p>
        </div>
      )}

      {!isDistributing && (
        <div className="success-actions">
          <button 
            className="cta-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bridge-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Bridge Transaction</h2>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="step-progress">
          <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <span>1</span>
            <label>Send</label>
          </div>
          <div className={`step-line ${currentStep > 1 ? 'completed' : ''}`}></div>
          <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <span>2</span>
            <label>Verify</label>
          </div>
          <div className={`step-line ${currentStep > 2 ? 'completed' : ''}`}></div>
          <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <label>Complete</label>
          </div>
        </div>

        <div className="modal-content">          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
        
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={closeToast}
        />
      </div>
    </div>
  );
};

export default BridgeModal;

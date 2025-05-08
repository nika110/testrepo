import React, { useState } from 'react';
import ChainSelector from './ChainSelector';
import TokenSelector from './TokenSelector';

const BridgeForm: React.FC = () => {
  const [sourceChain, setSourceChain] = useState('ethereum');
  const [destinationChain, setDestinationChain] = useState('solana');
  const [selectedToken, setSelectedToken] = useState('eth');
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  
  const handleSwapChains = () => {
    setSourceChain(destinationChain);
    setDestinationChain(sourceChain);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Bridge Preview:', {
      sourceChain,
      destinationChain,
      selectedToken,
      amount,
      recipientAddress
    });
    // This would typically trigger a confirmation modal or the next step
  };
  
  return (
    <div className="bridge-card">
      <div className="card-header">
        <h3>Bridge Assets</h3>
      </div>
      
      <div className="bridge-form">
        <div className="chain-selector-container">
          <ChainSelector
            selectedChain={sourceChain}
            onChainSelect={setSourceChain}
          />

          <button className="swap-chains" onClick={handleSwapChains}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 16L3 12M3 12L7 8M3 12H21M17 8L21 12M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <ChainSelector
            selectedChain={destinationChain}
            onChainSelect={setDestinationChain}
          />
        </div>

        <div className="amount-input-container">
          <label htmlFor="amount">Amount</label>
          <div className="amount-input">
            <input 
              type="text" 
              id="amount" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TokenSelector
              selectedToken={selectedToken}
              onTokenSelect={setSelectedToken}
              sourceChain={sourceChain}
              destinationChain={destinationChain}
            />
          </div>
        </div>

        <div className="address-input-container">
          <label htmlFor="receiver-address">Recipient Address</label>
          <div className="address-input">
            <input 
              type="text" 
              id="receiver-address" 
              placeholder="Enter destination wallet address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
        </div>

        <button 
          className="cta-button preview-bridge"
          onClick={handleSubmit}
        >
          Preview Bridge
        </button>
      </div>
    </div>
  );
};

export default BridgeForm; 
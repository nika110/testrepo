import React, { useState, useEffect } from 'react';
import ChainSelector from './ChainSelector';
import TokenSelector from './TokenSelector';
import { tokenData, Token } from '../data/tokenData';

const BridgeForm: React.FC = () => {
  const [sourceChain, setSourceChain] = useState('ethereum');
  const [destinationChain, setDestinationChain] = useState('solana');
  const [selectedToken, setSelectedToken] = useState('sol'); // Default to SOL for ETH to SOL bridging
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  
  // Get the main token for a given chain
  const getMainTokenForChain = (chainId: string): string => {
    switch(chainId) {
      case 'ethereum':
      case 'arbitrum':
      case 'optimism':
      case 'base':
        return 'eth';
      case 'solana':
        return 'sol';
      case 'polygon':
        return 'matic';
      case 'bsc':
        return 'bnb';
      case 'avalanche':
        return 'avax';
      default:
        return 'eth';
    }
  };
  
  // Initialize with the main token for Solana when bridging from Ethereum to Solana
  useEffect(() => {
    console.log('Initial setup: ETH->SOL with SOL token');
    if (sourceChain === 'ethereum' && destinationChain === 'solana') {
      // Check if SOL is available for bridging (it should be in tokenData)
      const solToken = tokenData.find(token => token.id === 'sol');
      if (solToken && solToken.chains.includes('ethereum') && solToken.chains.includes('solana')) {
        console.log('Setting initial token to SOL for ETH->SOL');
        setSelectedToken('sol');
      }
    }
  }, []);
  
  // Handle destination chain change
  const handleDestinationChainChange = (chainId: string) => {
    console.log(`Changing destination chain from ${destinationChain} to ${chainId}`);
    
    // Set the destination chain immediately
    setDestinationChain(chainId);
    
    // Don't automatically change the token if there was a user selection,
    // only change the token if the current one isn't compatible with the new chain
    const currentTokenData = tokenData.find(token => token.id === selectedToken);
    const isCurrentTokenValid = currentTokenData && currentTokenData.chains.includes(chainId);
    
    if (!isCurrentTokenValid) {
      // Try to select the main token of the destination chain if available
      const mainToken = getMainTokenForChain(chainId);
      const mainTokenData = tokenData.find(token => token.id === mainToken);
      
      if (mainTokenData && mainTokenData.chains.includes(sourceChain)) {
        console.log(`Setting token to ${mainToken} for destination chain ${chainId}`);
        setSelectedToken(mainToken);
        return;
      }
      
      // If main token is not available, find any token that works with both chains
      const availableTokens = tokenData.filter(token => 
        token.chains.includes(sourceChain) && token.chains.includes(chainId)
      );
      
      if (availableTokens.length > 0) {
        console.log(`Setting token to ${availableTokens[0].id} as fallback`);
        setSelectedToken(availableTokens[0].id);
      }
    }
  };
  
  // Handle source chain change
  const handleSourceChainChange = (chainId: string) => {
    console.log(`Changing source chain from ${sourceChain} to ${chainId}`);
    
    // Set the source chain immediately
    setSourceChain(chainId);
    
    // Don't automatically change the token if there was a user selection,
    // only change the token if the current one isn't compatible with the new chain
    const currentTokenData = tokenData.find(token => token.id === selectedToken);
    const isCurrentTokenValid = currentTokenData && currentTokenData.chains.includes(chainId);
    
    if (!isCurrentTokenValid) {
      // Try the main token of the destination chain
      const mainToken = getMainTokenForChain(destinationChain);
      const mainTokenData = tokenData.find(token => token.id === mainToken);
      
      if (mainTokenData && mainTokenData.chains.includes(chainId)) {
        console.log(`Setting token to ${mainToken} for destination chain ${destinationChain}`);
        setSelectedToken(mainToken);
        return;
      }
      
      // If that doesn't work, select any token available on the new source chain
      const sourceTokens = tokenData.filter(token => token.chains.includes(chainId));
      if (sourceTokens.length > 0) {
        console.log(`Setting token to ${sourceTokens[0].id} as fallback`);
        setSelectedToken(sourceTokens[0].id);
      }
    }
  };
  
  // Handle swapping source and destination chains
  const handleSwapChains = () => {
    const oldSource = sourceChain;
    const oldDestination = destinationChain;
    
    console.log(`Swapping chains: ${oldSource} <-> ${oldDestination}`);
    setSourceChain(oldDestination);
    setDestinationChain(oldSource);
    
    // Check if current token works with swapped chains
    const currentTokenData = tokenData.find(token => token.id === selectedToken);
    const isCurrentTokenValid = currentTokenData && 
                                currentTokenData.chains.includes(oldDestination) && 
                                currentTokenData.chains.includes(oldSource);
    
    if (!isCurrentTokenValid) {
      // Try the main token of the new destination chain (old source)
      const mainToken = getMainTokenForChain(oldSource);
      const mainTokenData = tokenData.find(token => token.id === mainToken);
      
      if (mainTokenData && mainTokenData.chains.includes(oldDestination)) {
        console.log(`Setting token to ${mainToken} after swap`);
        setSelectedToken(mainToken);
      } else {
        // Find any token that works for both chains
        const availableTokens = tokenData.filter(token => 
          token.chains.includes(oldDestination) && token.chains.includes(oldSource)
        );
        
        if (availableTokens.length > 0) {
          console.log(`Setting token to ${availableTokens[0].id} as fallback after swap`);
          setSelectedToken(availableTokens[0].id);
        }
      }
    }
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
  
  // Handle token selection in TokenSelector - very important to respect user choices
  const handleTokenSelect = (tokenId: string) => {
    console.log(`User selected token: ${tokenId}`);
    
    // Ensure we directly set the user's selected token without any conditional logic
    // This is key to fixing the USDC selection issue
    setSelectedToken(tokenId);
  };
  
  // For debugging - log state changes
  useEffect(() => {
    console.log('BridgeForm State Updated:', { sourceChain, destinationChain, selectedToken });
  }, [sourceChain, destinationChain, selectedToken]);
  
  return (
    <div className="bridge-card">
      <div className="card-header">
        <h3>Bridge Assets</h3>
      </div>
      
      <div className="bridge-form">
        <div className="chain-selector-container">
          <ChainSelector
            selectedChain={sourceChain}
            onChainSelect={handleSourceChainChange}
          />

          <button className="swap-chains" onClick={handleSwapChains}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 16L3 12M3 12L7 8M3 12H21M17 8L21 12M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <ChainSelector
            selectedChain={destinationChain}
            onChainSelect={handleDestinationChainChange}
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
              onTokenSelect={handleTokenSelect}
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
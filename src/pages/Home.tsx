import React, { useState } from 'react';
import BridgeForm from '../components/BridgeForm';
import BridgeModal from '../components/BridgeModal';
import FeatureCard from '../components/FeatureCard';
import HowItWorks from '../components/HowItWorks';
import ChainCarousel from '../components/ChainCarousel';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    sourceChain: '',
    destinationChain: '',
    amount: '',
    selectedToken: '',
    recipientAddress: ''
  });

  const handleOpenModal = (data: {
    sourceChain: string;
    destinationChain: string;
    amount: string;
    selectedToken: string;
    recipientAddress: string;
  }) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 className="gradient-text">Seamless Cross-Chain Bridging</h1>
          <p>Transfer assets between Solana and other leading blockchains with unparalleled speed and security</p>
          
          <BridgeForm onOpenModal={handleOpenModal} />
        </div>

        <div className="hero-visual">
          <ChainCarousel />
        </div>
      </section>
      
      <section className="features">
        <h2 className="section-title gradient-text">Why Choose Astral Bridge</h2>
        
        <div className="features-grid">
          <FeatureCard
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="url(#featureGradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="featureGradient1" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7b61ff"/>
                    <stop offset="1" stopColor="#00f7ff"/>
                  </linearGradient>
                </defs>
              </svg>
            }
            title="Lightning Fast"
            description="Experience cross-chain transfers in seconds, not minutes or hours"
          />
          
          <FeatureCard
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#featureGradient2)" strokeWidth="2"/>
                <path d="M9 12L11 14L15 10" stroke="url(#featureGradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="featureGradient2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f7ff"/>
                    <stop offset="1" stopColor="#ff3bff"/>
                  </linearGradient>
                </defs>
              </svg>
            }
            title="Bank-Grade Security"
            description="Multi-layer protection with advanced cryptography and audited smart contracts"
          />
          
          <FeatureCard
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 8H19C20.1046 8 21 8.89543 21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8H6M15 4H9C8.44772 4 8 4.44772 8 5V8H16V5C16 4.44772 15.5523 4 15 4Z" stroke="url(#featureGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="featureGradient3" x1="3" y1="4" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff3bff"/>
                    <stop offset="1" stopColor="#7b61ff"/>
                  </linearGradient>
                </defs>
              </svg>
            }
            title="Lowest Fees"
            description="Minimize costs with our optimized bridging technology and dynamic fee structure"
          />
        </div>
      </section>      <HowItWorks />
      
      {/* Bridge Modal - rendered at page level for proper overlay */}
      <BridgeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sourceChain={modalData.sourceChain}
        destinationChain={modalData.destinationChain}
        amount={modalData.amount}
        selectedToken={modalData.selectedToken}
        recipientAddress={modalData.recipientAddress}
      />
    </main>
  );
};

export default Home; 
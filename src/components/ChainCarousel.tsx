import React, { useState, useEffect } from 'react';
import { chainData } from '../data/chainData';

const ChainCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Solana active
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % chainData.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="chain-carousel">
      {chainData.slice(0, 3).map((chain, index) => (
        <div 
          key={chain.id} 
          className={`chain-card ${chain.id} ${index === activeIndex ? 'active' : ''}`}
        >
          <div className="chain-inner">
            {chain.id === 'ethereum' && (
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#627EEA"/>
                <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.6"/>
                <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white"/>
                <path d="M12.3735 16.476V20.996L18 13.212L12.3735 16.476Z" fill="white" fillOpacity="0.6"/>
                <path d="M12.3735 20.996V16.4753L6.75 13.212L12.3735 20.996Z" fill="white"/>
                <path d="M12.3735 15.4297L17.9963 12.165L12.3735 9.654V15.4297Z" fill="white" fillOpacity="0.2"/>
                <path d="M6.75 12.165L12.3735 15.4297V9.654L6.75 12.165Z" fill="white" fillOpacity="0.6"/>
              </svg>
            )}
            
            {chain.id === 'solana' && (
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4.5 16.5L7 19.5L19.5 19.5L22 16.5L4.5 16.5Z" fill="url(#solanaGradient4)"/>
                <path d="M4.5 12L7 15H19.5L22 12H4.5Z" fill="url(#solanaGradient5)"/>
                <path d="M4.5 7.5L7 4.5L19.5 4.5L22 7.5L4.5 7.5Z" fill="url(#solanaGradient6)"/>
                <defs>
                  <linearGradient id="solanaGradient4" x1="4.5" y1="18" x2="22" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F7FF"/>
                    <stop offset="1" stopColor="#7B61FF"/>
                  </linearGradient>
                  <linearGradient id="solanaGradient5" x1="4.5" y1="13.5" x2="22" y2="13.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7B61FF"/>
                    <stop offset="1" stopColor="#FF3BFF"/>
                  </linearGradient>
                  <linearGradient id="solanaGradient6" x1="4.5" y1="6" x2="22" y2="6" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3BFF"/>
                    <stop offset="1" stopColor="#00F7FF"/>
                  </linearGradient>
                </defs>
              </svg>
            )}
            
            {chain.id === 'polygon' && (
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#8247E5"/>
                <path d="M15.9 10.05L13.2 8.55C12.9 8.4 12.45 8.4 12.15 8.55L9.45 10.05C9.15 10.2 8.85 10.5 8.85 10.95V13.8C8.85 14.1 9 14.4 9.45 14.7L12.15 16.2C12.45 16.35 12.9 16.35 13.2 16.2L15.9 14.7C16.2 14.55 16.5 14.25 16.5 13.8V10.95C16.5 10.5 16.2 10.2 15.9 10.05ZM15.45 13.35L13.35 14.55C13.2 14.7 12.9 14.7 12.6 14.55L10.5 13.35C10.35 13.2 10.2 13.05 10.2 12.75V10.5C10.2 10.35 10.35 10.2 10.5 10.05L12.6 8.85C12.75 8.7 13.05 8.7 13.35 8.85L15.45 10.05C15.6 10.2 15.75 10.35 15.75 10.5V12.75C15.75 13.05 15.6 13.2 15.45 13.35Z" fill="white"/>
                <path d="M7.35 9.45L5.55 8.25C5.4 8.1 5.1 8.1 4.8 8.25L3 9.45C2.85 9.6 2.7 9.75 2.7 10.05V12.3C2.7 12.6 2.85 12.75 3 12.9L4.8 14.1C4.95 14.25 5.25 14.25 5.55 14.1L7.35 12.9C7.5 12.75 7.65 12.6 7.65 12.3V10.05C7.65 9.75 7.5 9.6 7.35 9.45Z" fill="white"/>
                <path d="M20.7 9.45L18.9 8.25C18.75 8.1 18.45 8.1 18.15 8.25L16.35 9.45C16.2 9.6 16.05 9.75 16.05 10.05V12.3C16.05 12.6 16.2 12.75 16.35 12.9L18.15 14.1C18.3 14.25 18.6 14.25 18.9 14.1L20.7 12.9C20.85 12.75 21 12.6 21 12.3V10.05C21 9.75 20.85 9.6 20.7 9.45Z" fill="white"/>
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChainCarousel; 
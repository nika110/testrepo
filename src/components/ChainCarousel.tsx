import React, { useState, useEffect, useCallback } from 'react';
import { chainData } from '../data/chainData';

interface Chain {
  id: string;
  name: string;
  symbol: string;
  shortName?: string;
  logo: string;
  chainId: string;
  networkType: string;
  explorerUrl: string;
}

const ChainCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Solana active
  const [isPaused, setIsPaused] = useState(false);
  
  // Display first 5 chains for better variety
  const displayChains: Chain[] = chainData.slice(0, 5);
  
  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % displayChains.length);
  }, [displayChains.length]);
  
  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + displayChains.length) % displayChains.length);
  }, [displayChains.length]);
  
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextSlide();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-rotation after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Render the appropriate chain SVG based on the chain ID
  const renderChainSVG = (chainId: string) => {
    switch(chainId) {
      case 'ethereum':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#627EEA"/>
            <path d="M12.373 3V9.653L17.996 12.165L12.373 3Z" fill="white" fillOpacity="0.6"/>
            <path d="M12.373 3L6.75 12.165L12.373 9.653V3Z" fill="white"/>
            <path d="M12.373 16.476V20.996L18 13.212L12.373 16.476Z" fill="white" fillOpacity="0.6"/>
            <path d="M12.373 20.996V16.475L6.75 13.212L12.373 20.996Z" fill="white"/>
            <path d="M12.373 15.43L17.996 12.165L12.373 9.654V15.43Z" fill="white" fillOpacity="0.2"/>
            <path d="M6.75 12.165L12.373 15.43V9.654L6.75 12.165Z" fill="white" fillOpacity="0.6"/>
          </>
        );
      case 'solana':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#14112b"/>
            <path d="M4.5 16.5L7 19.5L19.5 19.5L22 16.5L4.5 16.5Z" fill="url(#solanaGradient1)"/>
            <path d="M4.5 12L7 15H19.5L22 12H4.5Z" fill="url(#solanaGradient2)"/>
            <path d="M4.5 7.5L7 4.5L19.5 4.5L22 7.5L4.5 7.5Z" fill="url(#solanaGradient3)"/>
            <defs>
              <linearGradient id="solanaGradient1" x1="4.5" y1="18" x2="22" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F7FF"/>
                <stop offset="1" stopColor="#7B61FF"/>
              </linearGradient>
              <linearGradient id="solanaGradient2" x1="4.5" y1="13.5" x2="22" y2="13.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B61FF"/>
                <stop offset="1" stopColor="#FF3BFF"/>
              </linearGradient>
              <linearGradient id="solanaGradient3" x1="4.5" y1="6" x2="22" y2="6" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3BFF"/>
                <stop offset="1" stopColor="#00F7FF"/>
              </linearGradient>
            </defs>
          </>
        );
      case 'bsc':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#F3BA2F"/>
            <path d="M12 5.25L14.273 7.534L9.382 12.437L7.109 10.154L12 5.25Z" fill="white"/>
            <path d="M14.273 16.466L12 18.75L7.109 13.846L9.382 11.563L14.273 16.466Z" fill="white"/>
            <path d="M16.618 10.346L18.891 12.629L14 17.533L11.727 15.25L16.618 10.346Z" fill="white"/>
            <path d="M5.109 10.346L7.382 8.063L12.273 12.967L10 15.25L5.109 10.346Z" fill="white"/>
            <path d="M12 9.375L14.273 11.658L12 13.942L9.727 11.658L12 9.375Z" fill="white"/>
          </>
        );
      case 'polygon':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#8247E5"/>
            <path d="M15.09 8.54L12.11 6.91C11.69 6.7 11.15 6.7 10.73 6.91L7.75 8.54C7.46 8.7 7.25 9.01 7.25 9.37V12.55C7.25 12.79 7.36 13.02 7.55 13.17L10.53 14.8C10.81 14.95 11.35 14.95 11.77 14.8L14.75 13.17C15.04 13.02 15.25 12.71 15.25 12.35V9.17C15.25 8.93 15.14 8.7 14.95 8.55L15.09 8.54Z" fill="white"/>
            <path d="M6.09 7.54L4.91 6.91C4.69 6.8 4.31 6.8 4.09 6.91L2.91 7.54C2.76 7.65 2.65 7.8 2.65 8.0V9.8C2.65 10.0 2.76 10.15 2.91 10.26L4.09 10.89C4.24 10.98 4.56 10.98 4.91 10.89L6.09 10.26C6.24 10.15 6.35 10.0 6.35 9.8V8.0C6.35 7.8 6.24 7.65 6.09 7.54Z" fill="white"/>
            <path d="M21.09 7.54L19.91 6.91C19.69 6.8 19.31 6.8 19.09 6.91L17.91 7.54C17.76 7.65 17.65 7.8 17.65 8.0V9.8C17.65 10.0 17.76 10.15 17.91 10.26L19.09 10.89C19.24 10.98 19.56 10.98 19.91 10.89L21.09 10.26C21.24 10.15 21.35 10.0 21.35 9.8V8.0C21.35 7.8 21.24 7.65 21.09 7.54Z" fill="white"/>
          </>
        );
      case 'arbitrum':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#213147"/>
            <path d="M15.84 9.32L12.59 3.46C12.44 3.15 12.01 3.15 11.86 3.46L9.8 7.19L8.78 5.33L7.4 7.76L5.93 10.38L4.58 12.84C4.41 13.13 4.58 13.5 4.91 13.5H5.93L9.13 7.75L13.32 15.86C13.4 15.99 13.56 16.1 13.73 16.1H18.67L15.84 9.32ZM15.08 12.15L15.81 13.62H13.87L13.14 12.15L12.21 10.27L12.95 8.8L13.68 7.33L15.08 10.27L16.47 13.21L18.59 17.09L19.32 18.56H17.38L15.3 14.76L14.57 13.29L13.84 11.82L13.1 10.35L12.37 8.88L11.63 7.41L9.55 3.61H11.49L12.22 5.08L12.96 6.55L13.69 8.02L14.43 9.49L15.08 10.68L15.81 12.15Z" fill="white"/>
          </>
        );
      case 'optimism':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#FF0420"/>
            <path d="M6.9 14.7V8.25H9.675C10.275 8.25 10.8 8.325 11.25 8.55C11.7 8.775 12.0 9.075 12.3 9.525C12.525 9.975 12.675 10.425 12.675 11.025C12.675 11.625 12.525 12.075 12.3 12.525C12.0 12.975 11.7 13.275 11.25 13.5C10.8 13.725 10.275 13.8 9.675 13.8H7.95V14.7H6.9ZM7.95 12.9H9.6C10.425 12.9 11.025 12.675 11.4 12.3C11.775 11.925 12 11.475 12 11.025C12 10.575 11.85 10.125 11.4 9.75C11.025 9.45 10.425 9.3 9.6 9.3H7.95V12.9Z" fill="white"/>
            <path d="M14.925 14.85C14.325 14.85 13.875 14.7 13.425 14.4C12.975 14.1 12.75 13.725 12.675 13.2H13.8C13.875 13.425 14.025 13.65 14.25 13.725C14.475 13.875 14.775 13.95 15.075 13.95C15.375 13.95 15.675 13.875 15.825 13.725C15.975 13.575 16.125 13.425 16.125 13.2C16.125 13.05 16.05 12.9 15.825 12.825C15.675 12.75 15.375 12.6 14.925 12.525C14.625 12.45 14.325 12.3 14.1 12.225C13.875 12.15 13.65 11.925 13.5 11.7C13.35 11.475 13.275 11.175 13.275 10.875C13.275 10.575 13.35 10.275 13.5 10.05C13.65 9.825 13.875 9.6 14.175 9.45C14.475 9.3 14.775 9.225 15.225 9.225C15.825 9.225 16.275 9.375 16.65 9.675C16.95 9.975 17.175 10.35 17.25 10.8H16.125C16.05 10.575 15.9 10.425 15.75 10.35C15.525 10.2 15.3 10.125 15.0 10.125C14.7 10.125 14.475 10.2 14.325 10.35C14.175 10.5 14.025 10.65 14.025 10.8C14.025 10.95 14.1 11.1 14.175 11.175C14.25 11.25 14.4 11.325 14.55 11.4C14.7 11.475 14.925 11.55 15.075 11.625C15.375 11.7 15.675 11.85 15.9 11.925C16.125 12.0 16.35 12.225 16.5 12.45C16.65 12.675 16.725 12.975 16.725 13.275C16.725 13.575 16.65 13.875 16.5 14.1C16.35 14.325 16.125 14.55 15.825 14.7C15.525 14.85 15.225 14.85 14.925 14.85Z" fill="white"/>
          </>
        );
      case 'base':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#0052FF"/>
            <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12C4.5 16.14 7.86 19.5 12 19.5C16.14 19.5 19.5 16.14 19.5 12C19.5 7.86 16.14 4.5 12 4.5ZM12 14.475C10.62 14.475 9.525 13.38 9.525 12C9.525 10.62 10.62 9.525 12 9.525C13.38 9.525 14.475 10.62 14.475 12C14.475 13.38 13.38 14.475 12 14.475Z" fill="white"/>
          </>
        );
      case 'avalanche':
        return (
          <>
            <circle cx="12" cy="12" r="12" fill="#E84142"/>
            <path d="M15.388 9.027L12.001 3.75L8.614 9.027L12.001 12.25L15.388 9.027Z" fill="white"/>
            <path d="M8.614 9.027L5.25 12.25L8.614 15.473L12.001 12.25L8.614 9.027Z" fill="white" fillOpacity="0.8"/>
            <path d="M15.366 9.055L12.001 12.25L15.366 15.473L18.731 12.25L15.366 9.055Z" fill="white" fillOpacity="0.8"/>
            <path d="M8.614 15.473L12.001 18.696L15.388 15.473L12.001 12.25L8.614 15.473Z" fill="white" fillOpacity="0.6"/>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="chain-carousel" 
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
         aria-label="Interactive blockchain network carousel">
      {displayChains.map((chain, index) => (
        <div 
          key={chain.id} 
          className={`chain-card ${chain.id} ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleCardClick(index)}
          role="button"
          tabIndex={0}
          aria-label={`Select ${chain.name} blockchain`}
          aria-pressed={index === activeIndex}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(index);
            }
          }}
        >          <div className="chain-inner">
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              aria-hidden="true"
            >
              {renderChainSVG(chain.id)}
            </svg>
            <div className="chain-info">
              <h4>{chain.shortName || chain.name}</h4>
              <p>{chain.symbol}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Carousel indicators */}
      <div className="carousel-indicators" role="tablist">
        {displayChains.map((chain, index) => (
          <button
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${chain.name}`}
            aria-controls={`chain-card-${chain.id}`}
          />
        ))}
      </div>
      
      {/* Navigation hint */}
      <div className="navigation-hint">
        Use <span className="hint-keys">← →</span> arrow keys or click to navigate
      </div>
    </div>
  );
};

export default ChainCarousel;
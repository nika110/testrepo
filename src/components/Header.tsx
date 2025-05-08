import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header: React.FC = () => {
  return (
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
          <li><Link to="/explore" className="nav-link">Explore</Link></li>
          <li><Link to="/docs" className="nav-link">Docs</Link></li>
          <li><Link to="/networks" className="nav-link">Networks</Link></li>
          <li><Link to="/tokens" className="nav-link">Tokens</Link></li>
        </ul>
        <button className="connect-wallet">Connect Wallet</button>
      </nav>
    </header>
  );
};

export default Header; 
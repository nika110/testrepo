import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            <svg className="logo" viewBox="0 0 128 128" fill="none">
              <path d="M64 16C37.49 16 16 37.49 16 64C16 90.51 37.49 112 64 112C90.51 112 112 90.51 112 64C112 37.49 90.51 16 64 16ZM64 96C46.33 96 32 81.67 32 64C32 46.33 46.33 32 64 32C81.67 32 96 46.33 96 64C96 81.67 81.67 96 64 96Z" fill="url(#logoGradient)"/>
            </svg>
            <span className="logo-text">Astral Bridge</span>
          </Link>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><Link to="/">Bridge</Link></li>
            </ul>
          </div>
            <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/docs">API</Link></li>
            </ul>
          </div>
            <div className="footer-column">
            <h4>Company</h4>
      
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Astral Bridge. All rights reserved.</p>        <div className="social-links">
          <a href="https://twitter.com/astralbridge" className="social-link" aria-label="Follow us on Twitter">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
      
       
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
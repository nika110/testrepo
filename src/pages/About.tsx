import React from 'react';

const About: React.FC = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="gradient-text">Building the Infrastructure for a Multi-Chain Future</h1>
            <p className="hero-subtitle">
              Astral Bridge is the leading cross-chain infrastructure platform, enabling secure, 
              fast, and cost-effective asset transfers across blockchain networks.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">$2.1B+</span>
                <span className="stat-label">Total Volume Bridged</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">150K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Supported Networks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At Astral Bridge, we believe in a future where blockchain networks seamlessly communicate and 
              collaborate. Our mission is to eliminate the barriers between different blockchain ecosystems, 
              enabling users to transfer assets freely and securely across multiple networks.
            </p>
            <p>
              Founded in 2023, we've built the most advanced cross-chain bridge technology that combines 
              lightning-fast speeds, bank-grade security, and the lowest fees in the industry.
            </p>
          </div>
          <div className="about-visual">
            <div className="mission-graphic">
              <svg viewBox="0 0 400 300" fill="none">
                <defs>
                  <linearGradient id="aboutGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7b61ff"/>
                    <stop offset="50%" stopColor="#00f7ff"/>
                    <stop offset="100%" stopColor="#ff3bff"/>
                  </linearGradient>
                  <linearGradient id="aboutGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff3bff"/>
                    <stop offset="100%" stopColor="#7b61ff"/>
                  </linearGradient>
                </defs>
                
                {/* Network nodes */}
                <circle cx="80" cy="80" r="30" fill="url(#aboutGradient1)" opacity="0.8"/>
                <circle cx="320" cy="80" r="30" fill="url(#aboutGradient1)" opacity="0.8"/>
                <circle cx="80" cy="220" r="30" fill="url(#aboutGradient1)" opacity="0.8"/>
                <circle cx="320" cy="220" r="30" fill="url(#aboutGradient1)" opacity="0.8"/>
                <circle cx="200" cy="150" r="40" fill="url(#aboutGradient2)"/>
                
                {/* Connecting lines */}
                <line x1="110" y1="80" x2="170" y2="130" stroke="url(#aboutGradient1)" strokeWidth="3" opacity="0.6"/>
                <line x1="290" y1="80" x2="230" y2="130" stroke="url(#aboutGradient1)" strokeWidth="3" opacity="0.6"/>
                <line x1="110" y1="220" x2="170" y2="170" stroke="url(#aboutGradient1)" strokeWidth="3" opacity="0.6"/>
                <line x1="290" y1="220" x2="230" y2="170" stroke="url(#aboutGradient1)" strokeWidth="3" opacity="0.6"/>
                
                {/* Bridge symbol in center */}
                <text x="200" y="158" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">AB</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2 className="section-title gradient-text">Our Values</h2>
        <div className="values-grid">
          <div className="value-card glass-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#valueGradient1)" strokeWidth="2"/>
                <path d="M9 12L11 14L15 10" stroke="url(#valueGradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="valueGradient1" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7b61ff"/>
                    <stop offset="1" stopColor="#00f7ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Security First</h3>
            <p>Every protocol we build is rigorously audited and tested to ensure the highest level of security for user funds.</p>
          </div>

          <div className="value-card glass-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="url(#valueGradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="valueGradient2" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f7ff"/>
                    <stop offset="1" stopColor="#ff3bff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Innovation</h3>
            <p>We continuously push the boundaries of what's possible in cross-chain technology and user experience.</p>
          </div>

          <div className="value-card glass-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="url(#valueGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="url(#valueGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.1911 16.7032C21.6667 16.0524 20.9391 15.5993 20.125 15.4142" stroke="url(#valueGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.41421C16.8604 3.58893 17.6309 4.0667 18.1653 4.7635C18.6997 5.4603 18.9667 6.33045 18.9667 7.22632C18.9667 8.12218 18.6997 8.99233 18.1653 9.68913C17.6309 10.3859 16.8604 10.8637 16 11.0384" stroke="url(#valueGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="valueGradient3" x1="1" y1="3" x2="23" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff3bff"/>
                    <stop offset="1" stopColor="#7b61ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Community</h3>
            <p>We build for the community, with transparency and user feedback at the heart of our development process.</p>
          </div>

          <div className="value-card glass-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#valueGradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="url(#valueGradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="url(#valueGradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="valueGradient4" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f7ff"/>
                    <stop offset="1" stopColor="#7b61ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Scalability</h3>
            <p>Our infrastructure is designed to handle massive volume while maintaining optimal performance and reliability.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title gradient-text">Leadership Team</h2>
        <div className="team-grid">
          <div className="team-member glass-card">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>Alex Chen</h3>
            <p className="member-role">CEO & Co-Founder</p>
            <p className="member-bio">Former blockchain engineer at Ethereum Foundation with 8+ years in DeFi protocol development.</p>
          </div>

          <div className="team-member glass-card">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>Sarah Rodriguez</h3>
            <p className="member-role">CTO & Co-Founder</p>
            <p className="member-bio">Security expert and former Lead Developer at ConsenSys, specializing in cross-chain protocols.</p>
          </div>

          <div className="team-member glass-card">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>Marcus Johnson</h3>
            <p className="member-role">Head of Operations</p>
            <p className="member-bio">Operations veteran from traditional finance, bringing institutional-grade processes to DeFi.</p>
          </div>

          <div className="team-member glass-card">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>Dr. Emily Wang</h3>
            <p className="member-role">Head of Research</p>
            <p className="member-bio">PhD in Cryptography from MIT, leading research in zero-knowledge proofs and cross-chain security.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title gradient-text">By The Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-number gradient-text">$2.1B+</div>
            <div className="stat-label">Total Volume Bridged</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number gradient-text">150K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number gradient-text">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number gradient-text">8</div>
            <div className="stat-label">Supported Networks</div>
          </div>
        </div>
      </section>

      <section className="investors-section">
        <h2 className="section-title gradient-text">Backed By Leading Investors</h2>
        <div className="investors-grid">
          <div className="investor-card glass-card">
            <h3>Paradigm Ventures</h3>
            <p>Leading crypto investment firm</p>
          </div>
          <div className="investor-card glass-card">
            <h3>Coinbase Ventures</h3>
            <p>Strategic blockchain investments</p>
          </div>
          <div className="investor-card glass-card">
            <h3>Andreessen Horowitz</h3>
            <p>Premier technology venture capital</p>
          </div>
          <div className="investor-card glass-card">
            <h3>Binance Labs</h3>
            <p>Blockchain ecosystem fund</p>
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="join-content glass-card">
          <h2>Join Our Mission</h2>
          <p>
            We're building the future of cross-chain infrastructure. If you're passionate about 
            blockchain technology and want to help shape the decentralized future, we'd love to hear from you.
          </p>          <div className="join-actions">
            <a href="/careers" className="cta-button">View Open Positions</a>
            <a href="mailto:careers@astralbridge.io" className="secondary-button">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

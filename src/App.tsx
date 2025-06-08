import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles.css';

// Pages
import Home from './pages/Home';
import Docs from './pages/Docs';
import FAQ from './pages/FAQ';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Particles from './components/Particles';
import { WalletProvider } from './components/WalletProvider';

// Token data
import { initializeTokenPrices } from './data/tokenData';

function App() {
  // Initialize token prices from CoinGecko on app startup
  useEffect(() => {
    initializeTokenPrices();
  }, []);
  
  return (
    <HelmetProvider>
      <WalletProvider>
        <Router>
          <Particles />
          <Header />      
          <Routes>            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
          <Footer />
        </Router>
      </WalletProvider>
    </HelmetProvider>
  );
}

export default App;

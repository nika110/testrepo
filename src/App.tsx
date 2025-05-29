import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

// Pages
import Home from './pages/Home';
import Docs from './pages/Docs';
import About from './pages/About';

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
    <WalletProvider>
      <Router>
        <Particles />
        <Header />      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </WalletProvider>
  );
}

export default App;

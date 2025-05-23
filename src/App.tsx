import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

// Pages
import Home from './pages/Home';
import Docs from './pages/Docs';
import Networks from './pages/Networks';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Particles from './components/Particles';

// Token data
import { initializeTokenPrices } from './data/tokenData';

function App() {
  // Initialize token prices from CoinGecko on app startup
  useEffect(() => {
    initializeTokenPrices();
  }, []);

  return (
    <Router>
      <Particles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/networks" element={<Networks />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

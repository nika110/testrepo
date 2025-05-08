import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Docs from './pages/Docs';
import Networks from './pages/Networks';
import Tokens from './pages/Tokens';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Particles from './components/Particles';

function App() {
  return (
    <Router>
      <Particles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/networks" element={<Networks />} />
        <Route path="/tokens" element={<Tokens />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

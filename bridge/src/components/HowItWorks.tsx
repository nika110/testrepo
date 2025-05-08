import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="visualizer">
      <h2 className="section-title gradient-text">How It Works</h2>
      
      <div className="flow-diagram">
        <div className="flow-node">
          <div className="node-circle">1</div>
          <div className="node-content">
            <h4>Connect Wallet</h4>
            <p>Link your wallet to initiate secure transfers</p>
          </div>
        </div>
        
        <div className="flow-path"></div>
        
        <div className="flow-node">
          <div className="node-circle">2</div>
          <div className="node-content">
            <h4>Choose Networks</h4>
            <p>Select source and destination blockchains</p>
          </div>
        </div>
        
        <div className="flow-path"></div>
        
        <div className="flow-node">
          <div className="node-circle">3</div>
          <div className="node-content">
            <h4>Bridge Assets</h4>
            <p>Confirm transaction and receive funds in minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 
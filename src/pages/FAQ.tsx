import React from 'react';
import SEO from '../components/SEO';

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: "What is Astral Bridge?",
      answer: "Astral Bridge is a lightning-fast cross-chain cryptocurrency bridge that allows you to transfer digital assets between different blockchains including Solana, Ethereum, BSC, and more with unparalleled speed and security."
    },
    {
      question: "Which blockchains does Astral Bridge support?",
      answer: "Astral Bridge supports major blockchains including Solana, Ethereum, Binance Smart Chain (BSC), Polygon, Avalanche, and more. We're constantly adding support for new networks based on user demand."
    },
    {
      question: "How fast are bridge transactions?",
      answer: "Most bridge transactions complete within 1-3 minutes, depending on network congestion. Our advanced routing algorithms ensure the fastest possible transfers while maintaining maximum security."
    },
    {
      question: "What are the fees for using Astral Bridge?",
      answer: "Our bridge fees are among the lowest in the industry, typically ranging from 0.1% to 0.3% of the transaction amount, plus network gas fees. Exact fees are shown before confirming any transaction."
    },
    {
      question: "Is Astral Bridge secure?",
      answer: "Yes, security is our top priority. We use industry-leading security measures including multi-signature wallets, smart contract audits, and decentralized validation to ensure your assets are always safe."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account creation required! Simply connect your Web3 wallet (MetaMask, Phantom, WalletConnect, etc.) to start bridging assets immediately."
    },
    {
      question: "What tokens can I bridge?",
      answer: "You can bridge popular tokens like USDC, USDT, ETH, SOL, BNB, and many more. Our platform automatically detects supported tokens in your wallet."
    },
    {
      question: "What happens if my transaction fails?",
      answer: "In the rare case of a failed transaction, our automatic refund system will return your assets to the original wallet. You can also contact our 24/7 support team for assistance."
    }
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return (
    <>
      <SEO 
        title="FAQ - Frequently Asked Questions | Astral Bridge"
        description="Get answers to common questions about Astral Bridge cross-chain crypto bridge. Learn about supported blockchains, fees, security, and how to bridge tokens safely."
        keywords="astral bridge faq, cross-chain bridge questions, crypto bridge help, bridge support, solana ethereum bridge faq"
        structuredData={faqStructuredData}
      />
      
      <main className="faq-page" role="main">
        <section className="faq-header">
          <h1 className="gradient-text">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Everything you need to know about using Astral Bridge for cross-chain cryptocurrency transfers
          </p>
        </section>

        <div className="faq-container" aria-label="Frequently Asked Questions">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="faq-item"
              itemScope 
              itemType="https://schema.org/Question"
            >
              <h2 
                className="faq-question"
                itemProp="name"
              >
                {faq.question}
              </h2>
              <div 
                className="faq-answer"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="faq-support">
          <h2 className="support-title">Still have questions?</h2>
          <p className="support-subtitle">
            Our support team is available 24/7 to help you with any bridge-related questions
          </p>
          <div className="support-buttons">
            <a
              href="https://x.com/astralbridge"
              className="cta-button discord-button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our X community for support"
            >
              contact us on X
            </a>
         
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;

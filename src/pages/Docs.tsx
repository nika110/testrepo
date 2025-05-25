import React from 'react';
import '../styles.css';

const Docs: React.FC = () => {
  return (
    <div className="docs-container">
      <div className="docs-content">
        {/* Header Section */}
        <div className="docs-header">
          <h1>Astral Bridge API Documentation</h1>
          <p className="docs-subtitle">
            Complete API reference for integrating cross-chain bridge functionality
          </p>
        </div>

        {/* Introduction Section */}
        <section className="docs-section">
          <h2>Introduction</h2>
          <p>
            The Astral Bridge API provides seamless cross-chain asset bridging capabilities. 
            Our REST API enables developers to integrate bridging functionality into their applications
            with support for multiple blockchain networks.
          </p>
          <div className="api-info">
            <div className="api-base">
              <strong>Base URL:</strong> <code>https://api.astralbridge.io/v1</code>
            </div>
            <div className="api-features">
              <h4>Key Features:</h4>
              <ul>
                <li>Cross-chain asset transfers</li>
                <li>Real-time transaction tracking</li>
                <li>Comprehensive network support</li>
                <li>Webhook notifications</li>
                <li>Rate limiting and security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section className="docs-section">
          <h2>Authentication</h2>
          <p>
            All API requests require authentication using an API key. Include your API key 
            in the request headers.
          </p>
          <div className="code-block">
            <pre><code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.astralbridge.io/v1/quote`}</code></pre>
          </div>
          <div className="auth-info">
            <h4>Rate Limits:</h4>
            <ul>
              <li>100 requests per minute for authenticated users</li>
              <li>10 requests per minute for unauthenticated requests</li>
              <li>Rate limit headers included in all responses</li>
            </ul>
          </div>
        </section>

        {/* Bridge API Section */}
        <section className="docs-section">
          <h2>Bridge API</h2>
          
          <div className="endpoint-group">
            <h3>Get Quote</h3>
            <div className="endpoint-details">
              <span className="method get">GET</span>
              <span className="path">/bridge/quote</span>
            </div>
            <p>Get a quote for bridging assets between chains.</p>
            
            <h4>Parameters:</h4>
            <div className="params-table">
              <table>
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>fromChain</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Source chain ID</td>
                  </tr>
                  <tr>
                    <td>toChain</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Destination chain ID</td>
                  </tr>
                  <tr>
                    <td>token</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Token contract address</td>
                  </tr>
                  <tr>
                    <td>amount</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Amount to bridge (in wei)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>Example Request:</h4>
            <div className="code-block">
              <pre><code>{`curl "https://api.astralbridge.io/v1/bridge/quote?fromChain=1&toChain=56&token=0xA0b86a33E6Cc8&amount=1000000000000000000" \\
     -H "Authorization: Bearer YOUR_API_KEY"`}</code></pre>
            </div>

            <h4>Example Response:</h4>
            <div className="code-block">
              <pre><code>{`{
  "quoteId": "quote_123456789",
  "fromChain": "1",
  "toChain": "56",
  "token": "0xA0b86a33E6Cc8",
  "amount": "1000000000000000000",
  "estimatedFee": "5000000000000000",
  "estimatedTime": "300",
  "route": {
    "steps": [
      {
        "protocol": "astral",
        "fromChain": "1",
        "toChain": "56"
      }
    ]
  },
  "expiresAt": "2024-12-07T12:35:00Z"
}`}</code></pre>
            </div>
          </div>

          <div className="endpoint-group">
            <h3>Initiate Bridge</h3>
            <div className="endpoint-details">
              <span className="method post">POST</span>
              <span className="path">/bridge/initiate</span>
            </div>
            <p>Initiate a bridge transaction using a valid quote.</p>

            <h4>Request Body:</h4>
            <div className="code-block">
              <pre><code>{`{
  "quoteId": "quote_123456789",
  "recipient": "0x742d35Cc6634C0532925a3b8D6C8e4C1C0F...",
  "slippage": "0.5"
}`}</code></pre>
            </div>

            <h4>Example Response:</h4>
            <div className="code-block">
              <pre><code>{`{
  "transactionId": "tx_987654321",
  "status": "pending",
  "txHash": "0x1234567890abcdef...",
  "estimatedCompletion": "2024-12-07T12:40:00Z"
}`}</code></pre>
            </div>
          </div>

          <div className="endpoint-group">
            <h3>Transaction Status</h3>
            <div className="endpoint-details">
              <span className="method get">GET</span>
              <span className="path">/bridge/status/:transactionId</span>
            </div>
            <p>Get the current status of a bridge transaction.</p>

            <h4>Example Response:</h4>
            <div className="code-block">
              <pre><code>{`{
  "transactionId": "tx_987654321",
  "status": "completed",
  "fromTxHash": "0x1234567890abcdef...",
  "toTxHash": "0xfedcba0987654321...",
  "completedAt": "2024-12-07T12:38:45Z"
}`}</code></pre>
            </div>
          </div>
        </section>

        {/* Webhooks Section */}
        <section className="docs-section">
          <h2>Webhooks</h2>
          <p>
            Configure webhooks to receive real-time notifications about bridge transaction updates.
          </p>

          <h3>Webhook Payload Example:</h3>
          <div className="code-block">
            <pre><code>{`{
  "event": "bridge.completed",
  "transactionId": "tx_987654321",
  "timestamp": "2024-12-07T12:38:45Z",
  "data": {
    "status": "completed",
    "fromChain": "1",
    "toChain": "56",
    "amount": "1000000000000000000",
    "recipient": "0x742d35Cc6634C0532925a3b8D6C8e4C1C0F...",
    "fromTxHash": "0x1234567890abcdef...",
    "toTxHash": "0xfedcba0987654321..."
  }
}`}</code></pre>
          </div>

          <h3>Webhook Security:</h3>
          <p>All webhook payloads are signed with your webhook secret. Verify the signature using:</p>
          <div className="code-block">
            <pre><code>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const digest = hmac.digest('hex');
  return signature === \`sha256=\${digest}\`;
}`}</code></pre>
          </div>
        </section>

        {/* SDKs Section */}
        <section className="docs-section">
          <h2>SDKs</h2>
          <p>Official SDKs are available for popular programming languages:</p>

          <div className="sdk-grid">
            <div className="sdk-card">
              <h4>JavaScript/TypeScript</h4>
              <div className="code-block">
                <pre><code>{`npm install @astral/bridge-sdk

import { AstralBridge } from '@astral/bridge-sdk';

const bridge = new AstralBridge({
  apiKey: 'your-api-key'
});

const quote = await bridge.getQuote({
  fromChain: '1',
  toChain: '56',
  token: '0xA0b86a33E6Cc8',
  amount: '1000000000000000000'
});`}</code></pre>
              </div>
            </div>

            <div className="sdk-card">
              <h4>Python</h4>
              <div className="code-block">
                <pre><code>{`pip install astral-bridge

from astral_bridge import AstralBridge

bridge = AstralBridge(api_key='your-api-key')

quote = bridge.get_quote(
    from_chain='1',
    to_chain='56',
    token='0xA0b86a33E6Cc8',
    amount='1000000000000000000'
)`}</code></pre>
              </div>
            </div>

            <div className="sdk-card">
              <h4>Go</h4>
              <div className="code-block">
                <pre><code>{`go get github.com/astral/bridge-go

import "github.com/astral/bridge-go"

client := bridge.NewClient("your-api-key")

quote, err := client.GetQuote(&bridge.QuoteRequest{
    FromChain: "1",
    ToChain:   "56",
    Token:     "0xA0b86a33E6Cc8",
    Amount:    "1000000000000000000",
})`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Error Handling Section */}
        <section className="docs-section">
          <h2>Error Handling</h2>
          <p>The API uses conventional HTTP response codes to indicate success or failure.</p>

          <div className="error-codes">
            <h4>Common Error Codes:</h4>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>400</td>
                  <td>Bad Request - Invalid parameters</td>
                </tr>
                <tr>
                  <td>401</td>
                  <td>Unauthorized - Invalid API key</td>
                </tr>
                <tr>
                  <td>429</td>
                  <td>Rate Limited - Too many requests</td>
                </tr>
                <tr>
                  <td>500</td>
                  <td>Internal Server Error</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4>Error Response Format:</h4>
          <div className="code-block">
            <pre><code>{`{
  "error": {
    "code": "INVALID_CHAIN",
    "message": "The specified chain is not supported",
    "details": {
      "supportedChains": ["1", "56", "137", "42161"]
    }
  }
}`}</code></pre>
          </div>

          <div className="best-practices">
            <h4>Best Practices:</h4>
            <ul>
              <li>Always check response status codes</li>
              <li>Implement exponential backoff for retries</li>
              <li>Handle rate limiting gracefully</li>
              <li>Validate quotes before initiating transactions</li>
              <li>Use webhooks for transaction status updates</li>
            </ul>
          </div>
        </section>

        {/* Support Section */}
        <section className="docs-section">
          <h2>Support</h2>
          <p>Need help? Reach out to our developer support team:</p>
          <div className="support-info">
            <ul>
              <li><strong>Email:</strong> developers@astralbridge.io</li>
              <li><strong>Discord:</strong> Join our developer community</li>
              <li><strong>GitHub:</strong> Report issues and contribute</li>
              <li><strong>Documentation:</strong> Additional guides and tutorials</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Docs;
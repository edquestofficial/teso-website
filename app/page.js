'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Show modal after 2 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetCode = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setMessage({ type: '', text: '' });

      try {
        // EmailJS configuration - Replace these with your actual credentials
        const serviceID = 'service_ynesp7r';
        const templateID = 'template_24nl9ue';
        const publicKey = '7ke9kvtOkZ-_B0vh0';

        // Template parameters
        const templateParams = {
          to_email: email,
          to_name: 'Valued Customer',
          message: 'Congratulations! You will get 10% discount forever on all Teso purchases. Welcome to our sustainable fashion community!',
          discount_code: 'TESO10LIFE',
        };

        // Send email using EmailJS
        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        setMessage({ type: 'success', text: `Coupon code sent to ${email}!` });
        setEmail('');

        // Close modal after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage({ type: '', text: '' });
        }, 2000);
      } catch (error) {
        console.error('EmailJS Error:', error);
        setMessage({ type: 'error', text: 'Failed to send email. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="menu-icon">☰</div>

        <nav className="nav-tabs">
          <div className="nav-tab active">Women</div>
          <div className="nav-tab">Men</div>
        </nav>

        <div className="header-actions">
          <span className="brand-text">HomeHygiene Holiday Dining</span>
          <button className="promo-badge" onClick={() => setIsModalOpen(true)}>
            Get Lifetime 10% Off
          </button>
          <span className="icon-btn">🔍</span>
          <span className="icon-btn">👤</span>
          <span className="icon-btn">🛒</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          {/* Hero Title */}
          <div className="hero-title">
            <h1>
              Launching soon<br />
              with purpose <span className="leaf-emoji">🌿</span>
            </h1>
          </div>



          {/* Teso Logo Overlay */}
          <div className="tdo-overlay">
            <Image
              src="/teso.svg"
              alt="Teso logo"
              width={800}
              height={300}
              priority
            />
          </div>



          {/* Product Card */}
          <div className="product-card">
            <h3>Summer Tops</h3>
            <p className="product-price">Rs 1150</p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
      </main>

      {/* Modal/Popup */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            ✕
          </button>

          <h2>
            Your 10% coupon will<br />
            be sent to your inbox<br />
            with 0% wastage
          </h2>

          <form className="email-form" onSubmit={handleGetCode}>
            <input
              type="email"
              className="email-input"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" className="get-code-btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Get Code'}
            </button>
          </form>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="modal-footer">
            <p>We are growing faster</p>
            <small>Get 10% off on all your *teso purchases — for life</small>
          </div>
        </div>
      </div>
    </>
  );
}

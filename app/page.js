'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  // Show modal after 2 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleGetCode = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setMessage({ type: '', text: '' });

      try {
        // EmailJS configuration
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

        // Redirect to thank you page
        router.push('/thankyou');
      } catch (error) {
        console.error('EmailJS Error:', error);
        setMessage({ type: 'error', text: 'Failed to send email. Please try again.' });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="page-container">
      {/* Background with tree.svg */}
      <div className="page-background"></div>

      {/* Main Content - Launching Soon */}
      <div className="home-content">
        <h1 className="home-title">
          Launching soon<br />
          with purpose <span className="leaf-emoji">🌿</span>
        </h1>
      </div>

      {/* Modal/Popup */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={() => setIsModalOpen(true)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* TESO Logo */}
          <div className="modal-logo">
            <img
              src="/teso.svg"
              alt="TESO Logo"
              width={150}
              height={60}
            />
          </div>

          {/* Title Section */}
          <div className="modal-title-section">
            <h1>
              Launching soon<br />
              with purpose <span className="leaf-emoji">🌿</span>
            </h1>
          </div>

          {/* Orange Section */}
          <div className="modal-form-section">
            <h2 className="modal-heading">
              Your 10% coupon will be sent<br />
              to your inbox<br />
              <span className="highlight-text">with 0% wastage</span>
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
              <p className="footer-title">We are growing faster</p>
              <p className="footer-subtitle">Get 10% off on all your Teso purchases — for life.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

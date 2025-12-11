'use client';

import { useRouter } from 'next/navigation';

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className="page-container">
      {/* Background with tree.svg */}
      <div className="page-background"></div>

      {/* Thank You Content */}
      <div className="thankyou-container">
        {/* TESO Logo */}
        <div className="thankyou-logo">
          <img
            src="/teso.svg"
            alt="TESO Logo"
            width={200}
            height={80}
          />
        </div>

        {/* Hurray Message */}
        <h1 className="thankyou-title">
          Hurray!<span className="leaf-emoji">🌿</span>
        </h1>

        {/* Subtitle */}
        <p className="thankyou-subtitle">
          Your coupon comes with <span className="italic-text">no expiry day</span><br />
          <strong>Enjoy your exclusive benefits</strong>
        </p>

        {/* Go to Mail Button */}
        <button className="mail-btn">
          Go to Mail
        </button>
      </div>
    </div>
  );
}

// src/components/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const categories = [
  { full: "Encryption and Transmission Issues", short: "Encryption" },
  { full: "Key and Credential Management", short: "Key Management" },
  { full: "Randomness and Entropy Issues", short: "Randomness" },
  { full: "Certificate and Trust Chain Weaknesses", short: "Certificates" },
  { full: "Sensitive Information Exposure", short: "Data Exposure" },
  { full: "Authentication and Access Control", short: "Authentication" },
  { full: "Data Integrity and Tampering Protections", short: "Data Integrity" },
  { full: "Algorithm Selection and Negotiation Weaknesses", short: "Algorithms" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (short: string) => {
    const path = '/' + short.toLowerCase().replace(/\s+/g, '-');
    setIsOpen(false);
    navigate(path);
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    navigate('/safecrypto/');
  };

  

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <button
          className="logo-button"
          aria-label="Go to homepage"
          onClick={handleLogoClick}
          > 
          🛡️ CodeGuard
        </button>
        
        </div>
      

      <button
        className="burger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {categories.map((cat, idx) => (
          <li key={idx}>
            <button onClick={() => handleClick(cat.short)}>
              {cat.short}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

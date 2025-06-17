// src/components/CategoryBox.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryBox.css';

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

export default function CategoryBox() {
  const navigate = useNavigate();

  const handleClick = (short: string) => {
    const path = '/' + short.toLowerCase().replace(/\s+/g, '-');
    navigate(path);
  };

  return (
    <div className="category-container">
      {categories.map((cat, idx) => (
        <div key={idx} className="category-card">
          <button onClick={() => handleClick(cat.short)}>
            {cat.short}
          </button>
        </div>
      ))}
    </div>
  );
}

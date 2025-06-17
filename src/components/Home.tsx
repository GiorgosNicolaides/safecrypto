// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import covsawLogo from '../assets/COVSAW.png'; 

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 30000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="star-wars">
        <div className="crawl">
          <h1>A Thesis By George Nicolaides</h1>
          <p>Classification of Cryptographic Vulnerabilities and Security Assessment of Web Applications.</p>
          <p>This project explores cryptographic flaws through CWEs and offers practical examples of secure Python coding. Its goal is to raise awareness and improve the security of modern web applications.</p>
          <p>The project is structured around a series of categories, each addressing specific cryptographic vulnerabilities and their mitigations.</p>
          <p>The categories include Encryption and Transmission Issues, Key and Credential Management, Randomness and Entropy Issues, Certificate and Trust Chain Weaknesses, Sensitive Information Exposure, Authentication and Access Control, Data Integrity and Tampering Protections, Algorithm Selection and Negotiation Weaknesses, Device and Hardware-Level Weaknesses, and Cryptographic Implementation Issues.</p>
          <p>Each category provides a detailed overview of the vulnerabilities, their potential impact, and practical examples of secure coding practices in Python.</p>
          <p>The project is available on GitHub, where you can explore the code, examples, and detailed explanations of each category.</p>
        </div>
      </div>

      {showLogo && (
        <div className="covsaw-logo-wrapper">
          <img src={covsawLogo} alt="COVSAW Logo" className="covsaw-logo" />
        </div>
      )}
    </div>
  );
}

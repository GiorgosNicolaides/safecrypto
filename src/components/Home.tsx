// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import covsawLogo from '../assets/COVSAW-removebg-preview.png'; 

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
          <h1>A Thesis by George Nicolaides</h1>
          <p>
  <strong>Classification of Cryptographic Vulnerabilities and Security Assessment of Web Applications</strong>
</p>
<p>
  This project systematically explores cryptographic weaknesses through the lens of CWE (Common Weakness Enumeration) and provides practical examples of secure Python coding. The core aim is to raise awareness and improve the security posture of modern web applications.
</p>
<p>
  The content is organized into key categories, each addressing a specific class of cryptographic vulnerabilities and effective mitigation strategies.
</p>
<p>
  Topics covered include Encryption and Transmission Issues, Key and Credential Management, Randomness and Entropy, Certificate and Trust Chain Weaknesses, Sensitive Data Exposure, Authentication and Access Control, Data Integrity, Algorithm Selection, Device and Hardware Security, and Cryptographic Implementation Pitfalls.
</p>
<p>
  Each section features detailed explanations, real-world impact analysis, and hands-on Python code samples illustrating both insecure patterns and best practices.
</p>
<p>
  The full project—including source code, example cases, and further documentation—is available on <a href="https://github.com/GiorgosNicolaides/safecrypto" target="_blank" rel="noopener">GitHub</a>.
</p>

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

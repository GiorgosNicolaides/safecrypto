// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/safecrypto/');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="logo-button"
          aria-label="Go to homepage"
          onClick={handleLogoClick}
        >
          🛡️ CodeGuard
        </button>
      </div>

      <div className="navbar-right">
        <button onClick={() => handleNavClick('/cwe-examples')}>CWE Examples</button>
        <button onClick={() => handleNavClick('/info')}>Info</button>
        <button onClick={() => handleNavClick('/tools')}>Tools</button>
        <button onClick={() => handleNavClick('/docs')}>Docs</button>
      </div>
    </nav>
  );
}

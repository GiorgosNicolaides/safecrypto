// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
  <nav className="navbar">
  <div className="navbar-left">
    <button
      className="logo-button"
      onClick={handleLogoClick}
      aria-label="Go to homepage"
    >
      CodeGuard
    </button>
  </div>

  <div className="navbar-center">
    <button onClick={() => handleNavClick('/cwe-examples')}>Examples</button>
    <button onClick={() => handleNavClick('/info')}>Info</button>
    <button onClick={() => handleNavClick('/tools')}>Tools</button>
    <button onClick={() => handleNavClick('/docs')}>Docs</button>
  </div>
</nav>
  );
}

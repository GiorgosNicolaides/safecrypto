import React from 'react';
import '../styles/BackgroundWrapper.css';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="space-background">
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />
      <div className="content">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;

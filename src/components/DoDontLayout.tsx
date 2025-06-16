import React from 'react';
import '../styles/DoDontLayout.css';

interface DoDontLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const DoDontLayout: React.FC<DoDontLayoutProps> = ({ left, right }) => (
  <div className="do-dont-container">
    <div className="do-column">
      {left}
    </div>
    <div className="dont-column">
      {right}
    </div>
  </div>
);

export default DoDontLayout;

import React from 'react';
import '../styles/AvoidList.css';

interface AvoidListProps {
  title: string;
  items: string[];
}

const AvoidList: React.FC<AvoidListProps> = ({ title, items }) => (
  <div className="avoid-list">
    <h3>❌ {title}</h3>
    <ul>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  </div>
);

export default AvoidList;

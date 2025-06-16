// src/components/SubCategoryPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper';
import TypingText from './TypingText';
import '../styles/SubCategoryPage.css'; // Ensure you have the correct path to your CSS file

export interface CWEEntry {
  id: string;
  title: string;
  path: string;
}

interface SubCategoryPageProps {
  title: string;
  description: string;
  cwes: CWEEntry[];
}

const SubCategoryPage: React.FC<SubCategoryPageProps> = ({
  title,
  description,
  cwes
}) => {
  const navigate = useNavigate();

  return (
    <BackgroundWrapper>
      <div className="subcategory-container">
        <h1>{title}</h1>

        <ul className="cwe-list">
          {cwes.map(cwe => (
            <li
              key={cwe.id}
              className="cwe-item"
              onClick={() => navigate(cwe.path)}
            >
              <span className="cwe-id">{cwe.id}</span>
              <span className="cwe-title">{cwe.title}</span>
            </li>
          ))}
        </ul>
        <TypingText text={description} typingSpeed={40} lineDelay={800} />

      </div>
    </BackgroundWrapper>
  );
};

export default SubCategoryPage;

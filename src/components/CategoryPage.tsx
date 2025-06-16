import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryPage.css'; // Ensure you have this CSS file for styling

interface CategoryOption {
  title: string;
  path: string;
  position: 'left' | 'right' | 'center'; // optional but helpful for color variation
}

interface CategoryPageProps {
  options: CategoryOption[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ options }) => {
  const navigate = useNavigate();

  return (
    <div className="category-container">
      {options.map(({ title, path, position }) => (
        <div
          key={path}
          className={`choice-box ${position}`}
          onClick={() => navigate(path)}
        >
          <h2>{title}</h2>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;

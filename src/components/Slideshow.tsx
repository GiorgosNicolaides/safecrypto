// src/components/Slideshow.tsx
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import '../styles/Slideshow.css';

interface SlideshowProps {
  slides: ReactNode[];
}

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current + slides.length - 1) % slides.length);

  return (
    <div className="slideshow">
      <button className="nav prev" onClick={prev}>‹</button>
      <div className="slide-container">
        {slides[current]}
      </div>
      <button className="nav next" onClick={next}>›</button>
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;

import React, { useEffect, useState } from 'react';
import '../styles/TypingText.css'; // Προσθήκη CSS αρχείου

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
  lineDelay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  typingSpeed = 50,
  lineDelay = 1000
}) => {
  const lines = text.split('.').map(line => line.trim()).filter(line => line.length > 0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    if (charIndex < lines[currentLineIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + lines[currentLineIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + '\n');
        setCurrentLineIndex(prev => prev + 1);
        setCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLineIndex, lines, typingSpeed, lineDelay]);

  return (
    <pre className="typing-text">
      {displayedText}
    </pre>
  );
};

export default TypingText;

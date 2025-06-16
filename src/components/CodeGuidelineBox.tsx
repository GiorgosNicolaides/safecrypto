import React from 'react';
import '../styles/CodeGuidelineBox.css';

interface CodeGuidelineBoxProps {
  code: string;
  guidelines: string[];
}

const CodeGuidelineBox: React.FC<CodeGuidelineBoxProps> = ({ code, guidelines }) => (
  <div className="code-guideline-box">
    <pre className="code-block">
      <code>{code}</code>
    </pre>
    <div className="guidelines">
      <h3>✔️ Best Practices</h3>
      <ul>
        {guidelines.map((pt, i) => <li key={i}>{pt}</li>)}
      </ul>
    </div>
  </div>
);

export default CodeGuidelineBox;

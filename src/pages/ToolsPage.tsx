// src/pages/ToolsPage.tsx
import React from 'react';
import BackgroundWrapper from '../components/BackgroundWrapper';
import '../styles/ToolsPage.css';

interface Tool {
  name: string;
  description: string;
  url: string;
}

const tools: Tool[] = [
  {
    name: "Semgrep",
    description: "Lightweight, open-source static analysis tool that supports custom rules for finding security issues, including cryptographic misuses.",
    url: "https://semgrep.dev/",
  },
  {
    name: "Bandit",
    description: "Python-specific static analyzer that inspects code for security issues, particularly common cryptographic and input-handling vulnerabilities.",
    url: "https://bandit.readthedocs.io/",
  },
  {
    name: "ChatGPT (as SAST)",
    description: "LLMs can support static code analysis by reasoning about logic, structure, and vulnerabilities — especially for complex patterns or logic flaws.",
    url: "https://openai.com/chatgpt",
  },
  {
    name: "COVSAW",
    description: "Custom tool designed for cryptographic vulnerability detection and static analysis.",
    url: "#", // Placeholder
  },
  // (Προαιρετικά) Μπορούμε να προσθέσουμε και άλλα εργαλεία όπως:
  {
    name: "CodeQL",
    description: "Static analysis engine developed by GitHub for writing queries that identify vulnerabilities across codebases.",
    url: "https://codeql.github.com/",
  },
  {
    name: "SonarQube",
    description: "Widely used static code quality and security analyzer with support for multiple languages.",
    url: "https://www.sonarsource.com/products/sonarqube/",
  },
];

export default function ToolsPage() {
  return (
    <BackgroundWrapper>
      <div className="tools-page">
        <h1>🛠️ Static Code Analysis Tools</h1>
        <p>
          Below is a curated list of tools used for static analysis in the context of software security and cryptographic vulnerability detection.
        </p>

        <div className="tools-grid">
          {tools.map((tool, idx) => (
            <div key={idx} className="tool-card">
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                Visit Site ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </BackgroundWrapper>
  );
}

// src/pages/DocsPage.tsx
import React from 'react';
import BackgroundWrapper from '../components/BackgroundWrapper';
import '../styles/DocsPage.css';

interface DocEntry {
  title: string;
  description: string;
  url: string;
}

const docs: DocEntry[] = [
  {
    title: "Intro to Cryptography",
    description: "A beginner-friendly explanation of basic cryptographic principles, including symmetric/asymmetric encryption, hashing, and key management.",
    url: "https://cryptography.io/en/latest/",
  },
  {
    title: "OWASP Cryptographic Failures",
    description: "The OWASP Top 10 entry for cryptographic weaknesses — updated regularly and packed with examples.",
    url: "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
  },
  {
    title: "NIST Cryptographic Standards",
    description: "Official guidelines and recommendations by NIST on approved algorithms and key lengths.",
    url: "https://csrc.nist.gov/publications/sp",
  },
  {
    title: "Thesis (Cryptographic Vulnerabilities and Security Assessment of Web Applications)",
    description: "My final year thesis on cryptographic weaknesses and static code analysis. [Link to be added]",
    url: "#", // placeholder for now
  },
];

export default function DocsPage() {
  return (
    <BackgroundWrapper>
      <div className="docs-page">
        <h1>📚 Documentation</h1>
        <p>
          This page includes useful documentation and references about cryptography, secure coding, and my thesis research.
        </p>

        <div className="docs-grid">
          {docs.map((doc, idx) => (
            <div key={idx} className="doc-card">
              <h2>{doc.title}</h2>
              <p>{doc.description}</p>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                Read More ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </BackgroundWrapper>
  );
}

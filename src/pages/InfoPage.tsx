// src/pages/InfoPage.tsx
import React from 'react';
import BackgroundWrapper from '../components/BackgroundWrapper';
import TypingText from '../components/TypingText';
import '../styles/InfoPage.css';

export default function InfoPage() {
  return (
    <BackgroundWrapper>
      <div className="info-page">
        <TypingText text="ℹ️ Cryptographic Security & Site Guide" />

        <section>
          <h2>Deep Dive: The CIA Triad</h2>

          <p>
            Cryptographic systems are built upon foundational security principles known as the <strong>CIA triad</strong>: <strong>Confidentiality</strong>, <strong>Integrity</strong>, and <strong>Authenticity</strong>. These three pillars define the goals and responsibilities of secure communication and data handling.
          </p>

          <h3>🔐 Confidentiality</h3>
          <p>
            Confidentiality ensures that sensitive information is only accessible to those who are authorized to access it. It protects data from unauthorized reading, interception, or exposure.
          </p>
          <ul>
            <li>Implemented via encryption (e.g., AES, ChaCha20, RSA).</li>
            <li>Risks: weak ciphers (e.g., DES), exposed keys, lack of TLS.</li>
            <li>Use strong algorithms and secure key storage (HSMs, vaults).</li>
          </ul>

          <h3>🧬 Integrity</h3>
          <p>
            Integrity ensures that the data remains unaltered during storage or transmission. It protects against both accidental and malicious modification.
          </p>
          <ul>
            <li>Enforced via hashes (SHA-256), MACs, digital signatures.</li>
            <li>Avoid weak hashes like MD5 or SHA-1.</li>
            <li>Use authenticated encryption modes like AES-GCM.</li>
          </ul>

          <h3>✅ Authenticity</h3>
          <p>
            Authenticity guarantees that the entity you're communicating with is who it claims to be. It also ensures that data comes from a verified source.
          </p>
          <ul>
            <li>Implemented via digital signatures and certificates (PKI).</li>
            <li>Validate certificates, avoid self-signed certs in production.</li>
            <li>Protect against spoofing and weak identity validation.</li>
          </ul>

          <h3>🧩 Why All Three Matter</h3>
          <p>
            These principles are interconnected:
          </p>
          <ul>
            <li><strong>Confidentiality</strong> without <strong>Integrity</strong> may hide corrupted or malicious data.</li>
            <li><strong>Integrity</strong> without <strong>Authenticity</strong> cannot verify the source of the data.</li>
            <li><strong>Authenticity</strong> without <strong>Confidentiality</strong> leaves private data exposed.</li>
          </ul>
          <p>
            A secure cryptographic system must address all three pillars simultaneously.
          </p>
        </section>
        <section>
  <h2>What Are CWEs?</h2>
  <p>
    CWE stands for <strong>Common Weakness Enumeration</strong>. It is a community-developed list of software and hardware weakness types that may lead to exploitable vulnerabilities.
  </p>
  <p>
    Each CWE represents a specific type of flaw — for example, <em>"Improper Initialization"</em> or <em>"Use of Hard-coded Cryptographic Key"</em>. These weaknesses are not specific bugs, but rather generalized patterns that often result in security issues.
  </p>
  <p>
    CWEs are maintained by the <strong><a href="https://cwe.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Corporation</a></strong> and are widely used by:
  </p>
  <ul>
    <li>Security researchers and auditors to classify findings.</li>
    <li>Developers to understand common pitfalls in secure coding.</li>
    <li>Tools (like static analyzers and scanners) to standardize reports.</li>
    <li>Organizations and government agencies to prioritize remediation.</li>
  </ul>
  <p>
    In this platform, we focus on CWEs related to <strong>cryptographic security</strong>. These include misuses of cryptographic libraries, use of outdated or broken algorithms, key management flaws, and randomness issues — all of which are mapped to specific CWE identifiers.
  </p>
</section>


     
        
      </div>
    </BackgroundWrapper>
  );
}

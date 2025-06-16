// src/pages/cwe/CWE760.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE760: React.FC = () => {
  const bestPractices = [
    'Generate a cryptographically secure, per‐user salt using a CSPRNG (e.g., `crypto.randomBytes`, `SecureRandom`).',
    'Ensure each salt is unique and unpredictable, and store it alongside the hash (e.g., `"salt:hash"`).',
    'Use an adaptive, salted password‐hashing function (bcrypt, Argon2, PBKDF2, scrypt) which manages salts automatically.',
    'Incorporate the salt into the hash input (e.g., `hash(salt ∥ password)`) rather than using fixed or guessable values.',
    'Periodically increase cost parameters (iterations, memory) to keep ahead of evolving hardware capabilities.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js – PBKDF2 with a random, per-user salt
import { randomBytes, pbkdf2Sync } from 'crypto';

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');                    // 128-bit random salt
  const derived = pbkdf2Sync(password, salt, 100_000, 64, 'sha512')
    .toString('hex');
  return \`\${salt}:\${derived}\`;                                   // store "salt:hash"
}`,

    `# ✅ Good: Python – bcrypt (auto-generates a unique salt)
import bcrypt

def hash_password(password: str) -> bytes:
    # bcrypt.gensalt() creates a random salt with a default cost factor
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password: str, stored: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), stored)`
  ];

  const badPractices = [
    'Using a static, hard-coded salt (e.g., `"mysalt"`, application constant) for all users.',
    'Deriving the salt from predictable values (username, email, timestamp).',
    'Omitting the salt entirely and hashing only the password with a fast hash (MD5, SHA-1).',
    'Reusing the same salt across multiple passwords, enabling rainbow-table attacks.',
    'Rolling your own salt scheme with insufficient entropy or weak RNG.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: unsalted SHA-256 hash (no salt at all)
import { createHash } from 'crypto';

function hashPassword(password: string) {
  return createHash('sha256').update(password).digest('hex');
}`,

    `# ❌ Bad: predictable salt from username
import hashlib

def hash_password(username: str, password: str) -> str:
    salt = username  # attacker knows every username
    return hashlib.sha256((salt + password).encode()).hexdigest()`
  ];

  return (
    <BackgroundWrapper>
      <DoDontLayout
        left={
          <>
            <div style={{ textAlign: 'left', color: '#ffe81f' }}>
              <h3>✔️ Best Practices</h3>
              <ul>
                {bestPractices.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <Slideshow
              slides={goodCodeSamples.map((code, i) => (
                <pre
                  key={i}
                  style={{
                    background: '#222',
                    color: '#fff',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    width: '100%'
                  }}
                >
                  <code>{code}</code>
                </pre>
              ))}
            />
          </>
        }
        right={
          <>
            <div style={{ textAlign: 'left', color: '#ffe81f' }}>
              <h3>❌ Bad Practices</h3>
              <ul>
                {badPractices.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <Slideshow
              slides={badCodeSamples.map((code, i) => (
                <pre
                  key={i}
                  style={{
                    background: '#222',
                    color: '#fff',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    width: '100%'
                  }}
                >
                  <code>{code}</code>
                </pre>
              ))}
            />
          </>
        }
      />

      <section
        style={{
          maxWidth: 800,
          margin: '2rem auto',
          color: '#fff',
          fontFamily: 'sans-serif',
          lineHeight: 1.6
        }}
      >
        <h2 style={{ color: '#ffe81f', textAlign: 'center' }}>
          Understanding CWE-760
        </h2>
        <p>
          CWE-760, “Use of a One-Way Hash with a Predictable Salt,” occurs when a product applies
          a cryptographic hash (e.g., for passwords) but uses a salt value that is static or
          predictable—undermining the effectiveness of salting and enabling pre-computation attacks
          like rainbow tables :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-5552:</strong> DocuTrac Office Therapy installer used a hard-coded
            salt “S@l+&pepper” in its .NET installer’s <code>Crypt()</code> routines, allowing
            attackers to pre-compute hashes and defeat password protection :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2021-26113:</strong> FortiWAN before 4.5.9 employed a predictable salt
            for password hashing, which permitted offline guessing of stored passwords by
            adversaries who obtained the password file :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always use a unique, high-entropy salt per user generated
          by a CSPRNG, integrate it into a slow, adaptive hashing algorithm (bcrypt, Argon2, PBKDF2),
          and store only the salt and hash—never a predictable or constant salt value.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE760;

// src/pages/cwe/CWE759.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE759: React.FC = () => {
  const bestPractices = [
    'Generate a unique, high-entropy salt for each password using a CSPRNG and include it in the hashing input.',
    'Prepend or append the salt to the plaintext (e.g., `H(salt ∥ password)`), then store the salt alongside the hash.',
    'Prefer adaptive, salted hash functions (e.g., bcrypt, scrypt, PBKDF2, Argon2) which manage salts automatically.',
    'Use sufficient cost parameters (iterations, memory, parallelism) to slow down brute-force attacks.',
    'Rotate hashing parameters over time as hardware improves, and migrate existing hashes with new salts when practical.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js using PBKDF2 with a random salt
import { randomBytes, pbkdf2Sync } from 'crypto';

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');            // 128-bit salt
  const hash = pbkdf2Sync(password, salt, 100_000, 64, 'sha512')
    .toString('hex');
  return \`\${salt}:\${hash}\`;                             // store "salt:hash"
}`,

    `# ✅ Good: Python using bcrypt (automatically salts)
import bcrypt

def hash_password(password: str) -> bytes:
    # bcrypt.gensalt() generates a salt with configurable cost factor (default 12)
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed  # store as returned; includes salt and cost`
  ];

  const badPractices = [
    'Using a one-way hash function (MD5, SHA-1, SHA-256) directly on the password without any salt.',
    'Reusing a static or predictable salt (e.g., constant value) for all passwords.',
    'Storing only the hash and omitting the salt, preventing unique per-password randomness.',
    'Rolling your own salt scheme with weak RNG or insufficient length.',
    'Failing to upgrade to adaptive hash functions, leaving unsalted hashes vulnerable to rainbow tables.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: unsalted SHA-256 hash (vulnerable to rainbow table attacks)
import { createHash } from 'crypto';

function hashPassword(password: string) {
  return createHash('sha256')
    .update(password)
    .digest('hex');
}`,

    `# ❌ Bad: MD5 without salt in Python
import hashlib

def hash_password(password: str) -> str:
    return hashlib.md5(password.encode('utf-8')).hexdigest()`
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
          Understanding CWE-759
        </h2>
        <p>
          CWE-759, “Use of a One-Way Hash without a Salt,” occurs when an application applies a
          cryptographic hash to sensitive inputs (such as passwords) but fails to incorporate a
          unique salt, making pre-computed attacks like rainbow tables feasible :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-8453:</strong> Certain PLANET Technology switch models use an insecure hash
            to store admin passwords without any salt. An attacker with file access can retrieve the
            hash and crack the password offline :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2021-21253:</strong> OnlineVotingSystem ≤1.1.1 hashed user passwords without a
            salt, exposing them to dictionary and rainbow table attacks; patched in v1.1.2 by adding
            a random salt :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always combine each password with a per-user random salt before
          hashing, or use adaptive, salted hash libraries (bcrypt, scrypt, PBKDF2, Argon2) which handle
          salts automatically. Store the salt alongside the hash and periodically increase hashing
          cost parameters to stay ahead of advancing hardware.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE759;

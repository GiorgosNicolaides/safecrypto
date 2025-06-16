// src/pages/cwe/CWE916.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE916: React.FC = () => {
  const bestPractices = [
    'Use an adaptive, memory-hard password hashing function (e.g., bcrypt, scrypt, PBKDF2, Argon2) with a tunable cost parameter to slow down brute-force attacks.',
    'Always generate and store a unique salt per password to prevent shared-salt attacks and rainbow-table lookups.',
    'Configure cost factors (iterations, memory size, parallelism) according to current hardware performance and increase them over time as hardware improves.',
    'Store only the salted hash and never allow authentication via the raw hash value itself.',
    'Leverage well-maintained libraries rather than implementing hashing schemes yourself, and keep them up to date.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js using bcrypt with a high cost factor
import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // adjust upward as hardware evolves
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}`,

    `# ✅ Good: Python using Argon2 via passlib
from passlib.hash import argon2

def hash_password(password: str) -> str:
    # time_cost=2, memory_cost=102400 KiB, parallelism=8
    return argon2.using(time_cost=2, memory_cost=102400, parallelism=8).hash(password)

def verify_password(password: str, hash: str) -> bool:
    return argon2.verify(password, hash)`
  ];

  const badPractices = [
    'Using fast cryptographic hashes (MD5, SHA-1, SHA-256) directly for passwords—these execute too quickly for secure storage.',
    'Omitting a salt or using the same salt for all passwords, enabling rainbow-table and shared-salt attacks.',
    'Setting cost/iteration parameters too low (e.g., default of 1), making brute-force trivial on modern hardware.',
    'Allowing authentication using the password hash itself rather than the original password.',
    'Rolling your own hashing scheme instead of using vetted libraries.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: MD5 hashing without salt or stretching
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('md5')
               .update(password)
               .digest('hex'); // MD5 is too fast and unsalted
}`,

    `# ❌ Bad: SHA1 hashing with fixed salt and no cost factor
import hashlib

FIXED_SALT = b'static_salt'
def hash_password(password: str) -> str:
    data = FIXED_SALT + password.encode()
    return hashlib.sha1(data).hexdigest()  # fast, predictable, unsalted per user
`
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
          Understanding CWE-916
        </h2>
        <p>
          CWE-916, “Use of Password Hash With Insufficient Computational Effort,” occurs when an application
          stores password hashes using algorithms that execute too quickly—such as MD5 or SHA1 without stretching—making
          brute-force and GPU-accelerated attacks feasible :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-23091:</strong> HotelDruid before 1.32 uses unsalted MD5 for password storage,
            allowing attackers to recover plaintext passwords from hash values :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2023-33243:</strong> STARFACE’s web interface and REST API permit authentication
            using the SHA-512 hash of the password instead of the cleartext password, effectively reducing
            the work factor to that of a fast hash :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Migrate to an adaptive, memory-hard hashing scheme (e.g., bcrypt,
          scrypt, PBKDF2, Argon2) with appropriate cost parameters, unique salts per user, and library-provided
          implementations to ensure password storage resists modern cracking techniques.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE916;

// src/pages/cwe/CWE328.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE328: React.FC = () => {
  const bestPractices = [
    'Use modern, secure hash functions like SHA-256 or SHA-3 for general hashing needs.',
    'When storing passwords, always combine hashing with a salt and a slow algorithm (bcrypt, Argon2).',
    'Employ HMAC (e.g., HMAC-SHA256) or digital signatures for integrity checks rather than bare hashes.',
    'Keep your crypto libraries up to date to avoid known weaknesses or attacks on older hash variants.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: SHA-256 for file integrity
import hashlib

with open('data.bin', 'rb') as f:
    digest = hashlib.sha256(f.read()).hexdigest()
print('SHA-256:', digest)`,

    `# ✅ Good: HMAC-SHA256 for message authentication
import hmac, hashlib

message = b'Important message'
key = b'supersecretkey'
tag = hmac.new(key, message, hashlib.sha256).hexdigest()
# Later, verify with hmac.compare_digest(expected, tag)`,

    `# ✅ Good: Argon2 for password hashing
from argon2 import PasswordHasher

ph = PasswordHasher(time_cost=3, memory_cost=64*1024, parallelism=2)
hash = ph.hash("SecurePa$$w0rd")
# store hash; no need to manage your own salt`
  ];

  const badPractices = [
    'Never rely on MD5 or SHA-1 for security-sensitive hashing—they are collision-prone.',
    'Avoid using bare hashes for password storage or integrity without a salt or MAC.',
    'Do not roll your own hash constructions or use truncated digests for security.',
    'Refrain from using fast hashes (MD5/SHA-1) for anything that requires resistance to brute-force.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: MD5 for password storage
import hashlib

pwd = "password123"
digest = hashlib.md5(pwd.encode()).hexdigest()
store_to_db(username, digest)`,

    `# ❌ Bad: SHA-1 for file integrity (collision risk)
import hashlib

with open('data.bin', 'rb') as f:
    digest = hashlib.sha1(f.read()).hexdigest()
print('SHA-1:', digest)
`,

    `# ❌ Bad: Unsalted SHA-256 for passwords
import hashlib

pwd = "password123"
digest = hashlib.sha256(pwd.encode()).hexdigest()
store_to_db(username, digest)`
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
          Understanding CWE-328
        </h2>
        <p>
          CWE-328 (“Use of Weak Hash”) covers scenarios where applications rely on cryptographic
          hash functions that no longer offer adequate security. Functions like MD5 and SHA-1 are
          vulnerable to collision attacks, enabling attackers to craft different inputs that
          produce the same digest.
        </p>
        <p>
          When a hash function is weak, an adversary can manipulate data undetected (integrity
          bypass) or generate malicious collisions. For passwords, fast hashes accelerate
          brute-force attacks if a salt or slow algorithm isn’t used.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2008-0395:</strong> MD5 collisions exploited in X.509 certificates,
            allowing rogue certificates to be accepted by vulnerable clients.
          </li>
          <li>
            <strong>CVE-2017-8281:</strong> SHA-1 collision attack demonstration weakened trust
            in SHA-1–signed commits and artifacts.
          </li>
        </ul>
        <p>
          Always choose secure, up-to-date hash functions (SHA-256 or SHA-3) with proper use
          of salts, HMAC, or authenticated modes to defend against collisions and preimage attacks.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE328;

// src/pages/cwe/CWE330.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE330: React.FC = () => {
  const bestPractices = [
    'Use a cryptographically secure RNG (e.g., os.urandom, secrets module) for all security-critical values.',
    'Avoid non-CSPRNG functions like random.random(), random.randint(), or time-derived seeds.',
    'Prefer high-level libraries (secrets.token_bytes, cryptography.hazmat.primitives) that guarantee randomness.',
    'Seed PRNGs explicitly with entropy sources only when necessary, never rely on defaults.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: using secrets for token generation
import secrets

token = secrets.token_urlsafe(32)
store_token(token)  # unguessable random token`,

    `# ✅ Good: random IV with os.urandom
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

key = os.urandom(32)
iv = os.urandom(AES.block_size)
cipher = AES.new(key, AES.MODE_CBC, iv)
ct = iv + cipher.encrypt(pad(b"Sensitive data", AES.block_size))`
  ];

  const badPractices = [
    'Do not use random.seed() with predictable values (timestamps, counters).',
    'Never generate tokens or IVs with random.random() or random.randint().',
    'Avoid rolling your own RNG based on modulo operations or math functions.',
    'Do not reuse the same seed for multiple sessions or deployments.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: tokens via random.choice (not secure)
import random, string

token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(32))
store_token(token)  # predictable under analysis of PRNG`,

    `# ❌ Bad: IV from timestamp
import time, os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

key = os.urandom(32)
iv = int(time.time()).to_bytes(16, 'big')  # predictable IV
cipher = AES.new(key, AES.MODE_CBC, iv)
ct = iv + cipher.encrypt(pad(b"Data", AES.block_size))`
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
          Understanding CWE-330
        </h2>
        <p>
          CWE-330 (“Use of Insufficiently Random Values”) covers scenarios where applications
          generate cryptographic values (tokens, IVs, nonces) using predictable or weak random
          sources. Attackers who can guess or reproduce the RNG state can predict or brute-force
          these values, undermining confidentiality and session integrity.
        </p>
        <p>
          Non-CSPRNG functions like Python’s random module or timestamp-derived seeds are not
          designed for security. Always use dedicated, cryptographically secure APIs that
          gather entropy appropriately.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2008-0166:</strong> Debian’s OpenSSL package shipped with a predictable
            PRNG due to a seed removal bug, reducing possible keys to a few thousand and enabling
            mass key recovery attacks.
          </li>
          <li>
            <strong>CVE-2015-0565:</strong> A web framework used the default random module for
            CSRF tokens, allowing attackers to predict tokens and bypass CSRF protections.
          </li>
        </ul>
        <p>
          To remediate CWE-330, audit all uses of randomness in your code, replace non-CSPRNG
          calls with secure APIs (secrets, os.urandom, cryptography primitives), and ensure
          proper entropy is collected for every cryptographic operation.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE330;

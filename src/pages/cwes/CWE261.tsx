// src/pages/cwe/CWE261.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE261: React.FC = () => {
  const bestPractices = [
    'Always use a one-way, salted hash (bcrypt, Argon2) rather than any reversible encoding.',
    'Never store passwords in Base64, hex, URL-encode, ROT13 or any encoding scheme.',
    'Use well-tested libraries for password hashing and verification.',
    'Enforce unique salts per password to protect against precomputed rainbow-table attacks.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: bcrypt with unique salt
import bcrypt

password = b"UltraSecure!"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password, salt)
store_to_db(username, hashed)
# To verify:
bcrypt.checkpw(password, hashed)`,

    `# ✅ Good: Argon2id hashing
from argon2 import PasswordHasher

ph = PasswordHasher(time_cost=4, memory_cost=1024*64, parallelism=4)
hash = ph.hash("UltraSecure!")
store_to_db(username, hash)
# To verify:
ph.verify(hash, "UltraSecure!")`
  ];

  const badPractices = [
    'Do not use Base64 or hex encoding as a way to “protect” passwords.',
    'Never rely on reversible transforms (ROT13, URL encoding) for secret storage.',
    'Avoid “rolling your own” encoding schemes instead of proven hashing functions.',
    'Do not omit a salt or use the same salt for every password.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: Base64 “encoding” of password
import base64

pwd = "UltraSecure!"
encoded = base64.b64encode(pwd.encode()).decode()
store_to_db(username, encoded)
# easily reversed by base64.b64decode(encoded)`,

    `# ❌ Bad: hex encoding
pwd = "UltraSecure!"
hexed = pwd.encode().hex()
# hexed can be inverted: bytes.fromhex(hexed).decode()`
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
          Understanding CWE-261
        </h2>
        <p>
          CWE-261 (“Weak Encoding for Password”) occurs when applications use reversible encodings
          (Base64, hex, URL encoding, ROT13, etc.) to store or transmit passwords. Encoding is not
          encryption or hashing—anyone can decode it back to the original password in a single step.
        </p>
        <p>
          Attackers scanning databases or config files for Base64 or hex strings can programmatically
          decode them and obtain cleartext credentials. Proper password storage always relies on
          one-way hashing functions that are computationally expensive to invert.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-1000861:</strong> Jenkins Credential Plugin stored secrets in XML
            using reversible Base64 encoding with a hard-coded key, allowing attackers to decode
            plaintext passwords easily.
          </li>
          <li>
            <strong>CVE-2020-26138:</strong> ownCloud Policy Manager kept admin passwords in
            configuration files using predictable, reversible encoding, leading to mass credential
            compromise.
          </li>
        </ul>
        <p>
          To remediate CWE-261, eliminate any reversible encoding for passwords, adopt salted, slow
          hashing algorithms (bcrypt, Argon2), and enforce strict code reviews to prevent “quick
          and dirty” encoding hacks.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE261;

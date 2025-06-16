// src/pages/cwe/CWE257.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE257: React.FC = () => {
  const bestPractices = [
    'Use one-way hashing (bcrypt, Argon2) instead of reversible encryption.',
    'Never store encryption keys alongside the encrypted passwords.',
    'Apply a unique salt per user to ensure every hash is distinct.',
    'Enforce strong password policies and rotate keys regularly.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: bcrypt (one-way) hashing
import bcrypt

password = b"UltraSecret!"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password, salt)
store_to_db(username, hashed)`,
    `# ✅ Good: Argon2id hashing (no recovery)
from argon2 import PasswordHasher

ph = PasswordHasher(time_cost=3, memory_cost=64*1024, parallelism=2)
hash = ph.hash("UltraSecret!")
store_to_db(username, hash)`
  ];

  const badPractices = [
    'Do not use reversible encryption for password storage.',
    'Never hard-code or expose the encryption key in application code.',
    'Avoid storing passwords in a format you can decrypt programmatically.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: Fernet reversible encryption with hard-coded key
from cryptography.fernet import Fernet

key = b"hardcoded_insecure_key_1234"
cipher = Fernet(key)
encrypted = cipher.encrypt(b"UltraSecret!")
store_to_db(username, encrypted)`,
    `# ❌ Bad: Custom symmetric AES encrypt/decrypt
from Crypto.Cipher import AES

key = b"thisisasecretkey"
cipher = AES.new(key, AES.MODE_ECB)
encrypted = cipher.encrypt(pad("UltraSecret!", 16))
# decrypt(encrypted) returns original password`
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

      {/* Explanation Section */}
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
          Understanding CWE-257
        </h2>
        <p>
          CWE-257 (“Storing Passwords in a Recoverable Format”) describes storing user credentials
          using reversible encryption or encoding schemes. An attacker who gains access to the
          encryption key or decryption routine can recover every password in cleartext.
        </p>
        <p>
          Unlike one-way hashing, recoverable storage puts you at risk of mass credential theft
          whenever your key or code is compromised.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-1000861:</strong> Jenkins stored credentials in XML configs using
            Fernet encryption with a bundled key, allowing attackers to decrypt passwords at will.
          </li>
          <li>
            <strong>CVE-2020-26138:</strong> ownCloud kept user passwords in database fields
            encrypted with a reversible algorithm and static key, enabling easy recovery.
          </li>
        </ul>
        <p>
          Always choose one-way hashing for password storage. If reversible encryption is ever
          necessary (e.g., API tokens), ensure keys are stored securely, rotated frequently, and
          never co-located with application logic.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE257;

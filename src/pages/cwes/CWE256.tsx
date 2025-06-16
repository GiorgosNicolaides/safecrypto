import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE256: React.FC = () => {
  const bestPractices = [
    'Always store only a salted hash of the password, never the plaintext.',
    'Use a slow, memory-hard hashing algorithm such as bcrypt or Argon2.',
    'Apply a unique salt per user to defeat rainbow-table attacks.',
    'Implement rate limiting and account lockout after repeated failed login attempts.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: bcrypt with unique salt
import bcrypt

password = b"SuperSecret123"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password, salt)
store_to_db(username, hashed)`,
    `# ✅ Good: Argon2id for password hashing
from argon2 import PasswordHasher

ph = PasswordHasher(time_cost=3, memory_cost=64*1024, parallelism=2)
hash = ph.hash("SuperSecret123")
store_to_db(username, hash)`
  ];

  const badPractices = [
    'Never log or display plaintext passwords in logs, error messages, or UIs.',
    'Do not send passwords in URLs, query parameters, or over unencrypted channels.',
    'Avoid using reversible encryption for password storage—always hash passwords.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: Storing plaintext password
user = {
    "username": "alice",
    "password": "SuperSecret123"
}
db.insert(user)`,
    `# ❌ Bad: Using a fast, insecure hash (MD5)
import hashlib

hashed = hashlib.md5("SuperSecret123".encode()).hexdigest()
store_to_db(username, hashed)`,
    `# ❌ Bad: Reversible encryption with hard-coded key
from cryptography.fernet import Fernet

key = b"hardcoded_insecure_key_1234"
cipher = Fernet(key)
encrypted = cipher.encrypt(b"SuperSecret123")
store_to_db(username, encrypted)`
  ];

  return (
    <BackgroundWrapper>
      <DoDontLayout
        left={
          <>
            <div style={{ textAlign: 'left', color: '#ffe81f' }}>
              <h3>✔️ Best Practices</h3>
              <ul>
                {bestPractices.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
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
                {badPractices.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
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
        <h2 style={{ color: '#ffe81f', textAlign: 'center' }}>Understanding CWE-256</h2>
        <p>
          CWE-256 (“Plaintext Storage of a Password”) refers to keeping user passwords in cleartext—whether
          in a database, config file, or memory. Any breach of that storage instantly exposes valid passwords,
          enabling attackers to hijack accounts and escalate privileges.
        </p>
        <p>
          By using strong, salted hashing algorithms (like bcrypt or Argon2), you force attackers to spend
          significant compute time and memory to crack each password, drastically reducing the risk of mass
          credential compromise.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2017-16544:</strong> Cisco Firepower Management Center stored admin passwords in
            plaintext backups, allowing attackers to recover credentials and seize control.
          </li>
          <li>
            <strong>CVE-2018-5730:</strong> Aruba ClearPass exposed RADIUS secrets and user passwords in
            cleartext config files, enabling straightforward credential theft.
          </li>
        </ul>
        <p>
          Regularly audit your storage, enforce hashed passwords with unique salts, and implement strong
          authentication policies to eliminate this critical vulnerability.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE256;

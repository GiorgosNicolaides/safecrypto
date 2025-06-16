// src/pages/cwe/CWE260.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE260: React.FC = () => {
  const bestPractices = [
    'Never store passwords in plaintext configuration files.',
    'Load credentials at runtime from environment variables or secret stores.',
    'Use configuration validation to fail if any password field is set in a file.',
    'Encrypt configuration files at rest and restrict filesystem permissions.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: load DB password from environment with validation
import os
import psycopg2

db_pass = os.getenv("DB_PASS")
if not db_pass:
    raise RuntimeError("DB_PASS must be provided via environment")
conn = psycopg2.connect(
    host="db.example.com",
    user="appuser",
    password=db_pass
)`,
    `# ✅ Good: encrypted config file with decryption at runtime
from cryptography.fernet import Fernet
import json

key = os.getenv("CONFIG_DECRYPT_KEY")
cipher = Fernet(key)
with open("config.enc", "rb") as f:
    enc = f.read()
config = json.loads(cipher.decrypt(enc))
db_pass = config["database"]["password"]
# no plaintext password stored on disk`
  ];

  const badPractices = [
    'Do not commit config files containing passwords to version control.',
    'Avoid storing credentials in cleartext YAML, JSON, or INI files.',
    'Never ship a default or sample config with real passwords inside.',
    'Do not rely on application code to overwrite or ignore file-stored passwords at runtime.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: plaintext password in JSON config
# config.json
{
  "database": {
    "host": "db.example.com",
    "user": "appuser",
    "password": "P@ssw0rd123"
  }
}`,

    `# ❌ Bad: reading password directly from file
import json

cfg = json.load(open("config.json"))
db_pass = cfg["database"]["password"]  # plaintext on disk
conn = psycopg2.connect(
    host=cfg["database"]["host"],
    user=cfg["database"]["user"],
    password=db_pass
)`
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
          Understanding CWE-260
        </h2>
        <p>
          CWE-260 (“Password in Configuration File”) describes the practice of placing user or
          system passwords directly in application configuration files. These files are often
          committed to source control, packaged in releases, or left on servers in cleartext,
          making them easy targets for attackers.
        </p>
        <p>
          Exposed config files can be scanned and harvested automatically. Once an attacker obtains
          the password, they can access databases, services, or APIs without any additional steps.
          Even if the file is protected by filesystem permissions, insider threats or backup leaks
          can still reveal these credentials.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2021-44228 (Log4Shell related leaks):</strong> Some users inadvertently
            committed configuration files containing database passwords, leading to mass credential
            compromise during the Log4Shell response.
          </li>
          <li>
            <strong>CVE-2020-13692:</strong> Oracle WebLogic exposed its <code>config.xml</code>
            with embedded cleartext passwords via an unauthenticated endpoint, allowing remote
            attackers to gain administrative access.
          </li>
        </ul>
        <p>
          To remediate, enforce that all passwords are supplied at runtime via secure channels,
          encrypt configuration files at rest, and implement startup validation to reject any
          file with embedded plaintext credentials.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE260;

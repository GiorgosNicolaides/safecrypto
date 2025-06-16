// src/pages/cwe/CWE312.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE312: React.FC = () => {
  const bestPractices = [
    'Encrypt sensitive data at rest using strong, industry-standard algorithms (e.g., AES-256) with secure key management.',
    'Store keys and secrets in dedicated vaults or KMS solutions (e.g., AWS KMS, HashiCorp Vault), not in source code or plain files.',
    'Keep secrets out of code and config by using environment variables, secret managers, or secure configuration services.',
    'Mask or redact any sensitive fields in logs, backups, or debug dumps to prevent accidental exposure.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Encrypting and storing data in Node.js using crypto
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import fs from 'fs';

function saveSecret(secret: string) {
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex'); // securely provided
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(secret, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  fs.writeFileSync('secret.enc', iv.toString('hex') + ':' + encrypted);
}

function loadSecret() {
  const data = fs.readFileSync('secret.enc', 'utf8');
  const [ivHex, encrypted] = data.split(':');
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}`,

    `# ✅ Good: Python storing secrets with cryptography’s Fernet
import os
from cryptography.fernet import Fernet

# Key is generated once and stored securely (e.g., in a vault)
f = Fernet(os.environ['FERNET_KEY'].encode())

def save_password(password: str):
    token = f.encrypt(password.encode())
    with open('password.enc', 'wb') as out:
        out.write(token)

def load_password() -> str:
    with open('password.enc', 'rb') as inp:
        token = inp.read()
    return f.decrypt(token).decode()`
  ];

  const badPractices = [
    'Writing passwords, API keys, or tokens directly to configuration files or source code.',
    'Hard-coding secrets in the application binary or repository.',
    'Logging sensitive data (e.g., credentials, PII) to log files or consoles.',
    'Using world-readable files or unencrypted database columns for secret storage.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Storing credentials in a plaintext file
import fs from 'fs';

const creds = {
  username: 'admin',
  password: 'P@ssw0rd123',
};

fs.writeFileSync('creds.json', JSON.stringify(creds));`,

    `# ❌ Bad: Writing DB password into .env
with open('.env', 'w') as f:
    f.write("DB_PASSWORD=" + plain_password)  # committed in plaintext`
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
          Understanding CWE-312
        </h2>
        <p>
          CWE-312, “Cleartext Storage of Sensitive Information,” occurs when an application stores
          credentials, keys, personal data, or other secrets in an unencrypted form on disk,
          in memory snapshots, or logs. Attackers with access to those storage locations—through
          local compromise, backups, or misconfigured permissions—can retrieve and exploit that data.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-45175:</strong> za-internet C-MOR Video Surveillance 5.2401 stores
            camera login credentials in cleartext on the filesystem, allowing attackers with
            file access to retrieve them directly :contentReference[oaicite:0].
          </li>
          <li>
            <strong>CVE-2021-45077:</strong> Netgear Nighthawk R6700 v1.0.4.120 stores all usernames
            and passwords for its services in plaintext configuration files, exposing them to
            any user or process with local file access :contentReference[oaicite:1].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Encrypt all sensitive data at rest, leverage secure vaults
          or KMS for key management, avoid logging secrets, and regularly audit storage locations
          to ensure no plaintext secrets remain.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE312;

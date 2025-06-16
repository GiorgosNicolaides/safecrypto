// src/pages/cwe/CWE313.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE313: React.FC = () => {
  const bestPractices = [
    'Encrypt all sensitive data before writing to disk using strong, authenticated encryption (e.g., AES-GCM, ChaCha20-Poly1305).',
    'Manage encryption keys securely—store them in a vault or KMS, never in source code or plain config files.',
    'Use OS-provided encrypted filesystems or database encryption features when available.',
    'Limit file permissions to the minimum necessary (e.g., owner-only read/write) and rotate keys regularly.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js encrypting JSON credentials before saving to disk
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import fs from 'fs';

function saveCredentials(creds: Record<string, string>) {
  const key = Buffer.from(process.env.FILE_ENCRYPTION_KEY!, 'hex'); // from KMS/vault
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const plaintext = Buffer.from(JSON.stringify(creds), 'utf8');
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  fs.writeFileSync(
    'creds.enc',
    Buffer.concat([iv, tag, encrypted])
  );
}

function loadCredentials(): Record<string, string> {
  const data = fs.readFileSync('creds.enc');
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const ciphertext = data.slice(28);
  const key = Buffer.from(process.env.FILE_ENCRYPTION_KEY!, 'hex');
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return JSON.parse(decrypted.toString('utf8'));
}`,

    `# ✅ Good: Python using cryptography.Fernet to encrypt file contents
import os, json
from cryptography.fernet import Fernet

FERNET_KEY = os.environ['FERNET_KEY'].encode()
fernet = Fernet(FERNET_KEY)

def save_secrets(data: dict, filename: str = 'secrets.enc'):
    token = fernet.encrypt(json.dumps(data).encode('utf-8'))
    with open(filename, 'wb') as f:
        f.write(token)

def load_secrets(filename: str = 'secrets.enc') -> dict:
    with open(filename, 'rb') as f:
        token = f.read()
    return json.loads(fernet.decrypt(token).decode('utf-8'))`
  ];

  const badPractices = [
    'Writing plaintext credentials or keys directly to files (e.g., `.json`, `.cfg`, `.env`) without encryption.',
    'Checking files into source control that contain secrets in cleartext.',
    'Using world-readable file permissions for files containing sensitive data.',
    'Relying on trivial obfuscation (e.g., Base64) instead of proper encryption.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Storing credentials in cleartext JSON
import fs from 'fs';

const creds = {
  username: 'admin',
  password: 'P@ssw0rd123'
};

fs.writeFileSync('creds.json', JSON.stringify(creds));`,

    `# ❌ Bad: Writing database password to config file in plaintext
plain_password = 'SuperSecret!'
with open('config.cfg', 'w') as f:
    f.write(f"db_password={plain_password}")`
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
          Understanding CWE-313
        </h2>
        <p>
          CWE-313, “Cleartext Storage in a File or on Disk,” occurs when an application writes sensitive
          information (credentials, keys, personal data) to disk without encryption, allowing any
          actor with file or disk access to read the data directly :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-20448:</strong> Cisco Nexus Dashboard Fabric Controller stores sensitive
            backup data in cleartext config files, allowing an attacker with access to the backup to
            view credentials :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2025-5154A:</strong> PhonePe App 25.03.21.0 on Android writes database files
            containing user session tokens in cleartext under `/data/data/.../databases/` :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2019-17655:</strong> FortiOS SSL VPN 6.2.2 and below logs user SSL VPN
            session credentials in cleartext on disk, enabling retrieval by local attackers :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Encrypt sensitive files at rest, use secure key management,
          enforce strict file permissions, and leverage OS-level encrypted volumes or dedicated
          secret management services.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE313;

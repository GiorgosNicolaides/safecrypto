// src/pages/cwe/CWE522.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE522: React.FC = () => {
  const bestPractices = [
    'Store credentials in a dedicated secrets manager or OS keyring (never in code or plain files).',
    'Encrypt any stored credentials at rest and require decryption only at runtime.',
    'Use least-privilege service accounts and rotate credentials frequently.',
    'Fetch secrets at startup or on demand; do not expose them in environment dumps or logs.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: using keyring for credential storage
import keyring

# store: keyring.set_password("myapp", "db_user", "StrongP@ssw0rd")
password = keyring.get_password("myapp", "db_user")
connect_to_db(user="db_user", password=password)`,

    `# ✅ Good: decrypting credentials from AWS KMS
import os
import boto3
from base64 import b64decode

kms = boto3.client("kms")
ciphertext = b64decode(os.environ["ENCRYPTED_DB_PASS"])
resp = kms.decrypt(CiphertextBlob=ciphertext)
db_pass = resp["Plaintext"].decode()
connect_to_db(user="db_user", password=db_pass)`
  ];

  const badPractices = [
    'Never commit plaintext credentials or API keys to source control.',
    'Do not store secrets in unencrypted environment variables or config files.',
    'Avoid printing or logging credentials anywhere in your application.',
    'Do not fallback to insecure defaults when secret retrieval fails.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: plaintext password in config file
# config.yaml
database:
  user: db_user
  password: "WeakPass123"`,

    `# ❌ Bad: logging credentials for debugging
import logging

db_pass = "P@ssw0rd123"
logging.debug(f"Connecting to DB with password: {db_pass}")`
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
          Understanding CWE-522
        </h2>
        <p>
          CWE-522 (“Insufficiently Protected Credentials”) refers to situations where applications
          store, transmit, or log credentials without adequate protection. Attackers gaining
          access to these credentials can escalate privileges, move laterally, or exfiltrate data.
        </p>
        <p>
          Even if credentials are encrypted at rest, exposing them in logs or environment dumps
          undermines all encryption efforts. Proper secrets management ensures credentials are
          only accessible in memory when needed.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-5706:</strong> An IoT device stored AWS access keys in plaintext
            config, allowing attackers to hijack cloud resources.
          </li>
          <li>
            <strong>CVE-2020-26738:</strong> A CI/CD platform exposed service account tokens
            in build logs, enabling unauthorized repository access.
          </li>
        </ul>
        <p>
          To remediate CWE-522, adopt a robust secrets management strategy: encrypt credentials
          at rest, restrict access, avoid logging sensitive values, and rotate secrets regularly.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE522;

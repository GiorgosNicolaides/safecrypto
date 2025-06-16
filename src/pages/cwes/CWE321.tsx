// src/pages/cwe/CWE321.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE321: React.FC = () => {
  const bestPractices = [
    'Never embed cryptographic keys or secrets directly in source code.',
    'Load keys at runtime from secure storage (environment variables, vaults).',
    'Use a secrets management solution (HashiCorp Vault, AWS KMS, Azure Key Vault).',
    'Rotate keys regularly and revoke old ones to limit exposure.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: load key from environment variable
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

key = os.environ.get("AES_KEY")
if not key:
    raise RuntimeError("Missing AES_KEY in environment")
aesgcm = AESGCM(bytes.fromhex(key))
nonce = os.urandom(12)
ciphertext = aesgcm.encrypt(nonce, b"Sensitive data", None)`,

    `# ✅ Good: retrieve key from HashiCorp Vault
import hvac
from cryptography.fernet import Fernet

client = hvac.Client(url="https://vault.example.com", token=os.environ["VAULT_TOKEN"])
secret = client.secrets.kv.v2.read_secret_version(path="app/crypto-key")
key = secret["data"]["data"]["fernet_key"].encode()
cipher = Fernet(key)
encrypted = cipher.encrypt(b"Top secret")`
  ];

  const badPractices = [
    'Do not hardcode keys, passwords, or tokens in your code.',
    'Avoid checking in configuration files with embedded secrets to version control.',
    'Never share code containing sensitive keys in public or private repositories.',
    'Do not fallback to predictable default keys if environment configuration is missing.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: hardcoded Fernet key
from cryptography.fernet import Fernet

key = b"DuMbHaRdCoDeDKeY1234567890abcdef"
cipher = Fernet(key)
token = cipher.encrypt(b"Very secret")`,

    `# ❌ Bad: hardcoded AES key in script
from Crypto.Cipher import AES

KEY = b"0123456789abcdef0123456789abcdef"
cipher = AES.new(KEY, AES.MODE_GCM, nonce=b"000000000000")
ct, tag = cipher.encrypt_and_digest(b"Important")`
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
          Understanding CWE-321
        </h2>
        <p>
          CWE-321 (“Use of Hard-coded Cryptographic Key”) refers to embedding secrets—such as
          encryption keys, tokens, or credentials—directly in application source code or configuration.
          If attackers gain access to your code (e.g., via a leaked repository or compromised server),
          they can extract these keys and decrypt or impersonate without additional effort.
        </p>
        <p>
          Even “private” repositories are at risk: insiders, clones, or backups may leak. Hard-coded
          keys cannot be rotated without code changes, leading to long-lived vulnerabilities.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2019-13177:</strong> Ansible Tower leaked its static encryption key in
            source, allowing attackers to decrypt sensitive settings databases.
          </li>
          <li>
            <strong>CVE-2020-5902:</strong> F5 BIG-IP’s TMUI contained a hardcoded password that
            was exploited for remote code execution by retrieving the embedded secret.
          </li>
        </ul>
        <p>
          To remediate, remove all hard-coded secrets, adopt secure runtime retrieval of keys,
          and rotate any compromised keys immediately. Use dedicated secrets management services
          to safely store and inject cryptographic keys at runtime.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE321;

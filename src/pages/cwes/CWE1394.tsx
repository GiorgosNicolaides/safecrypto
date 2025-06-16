// src/pages/cwe/CWE1394.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1394: React.FC = () => {
  const bestPractices = [
    'Never ship with a built-in crypto key—generate or retrieve keys at deployment time.',
    'Load keys from secure vaults or environment variables, not from code or static files.',
    'Rotate cryptographic keys regularly and revoke old ones to limit impact of leaks.',
    'Use hardware security modules (HSMs) or managed key services to protect key material.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: retrieve AES key from environment
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

hex_key = os.getenv("APP_AES_KEY")
if not hex_key:
    raise RuntimeError("Missing APP_AES_KEY")
key = bytes.fromhex(hex_key)
aesgcm = AESGCM(key)
nonce = os.urandom(12)
ciphertext = aesgcm.encrypt(nonce, b"Sensitive", None)`,

    `# ✅ Good: fetch key from AWS KMS
import boto3
from base64 import b64decode
from cryptography.fernet import Fernet

kms = boto3.client("kms")
resp = kms.decrypt(CiphertextBlob=b64decode(os.environ["ENCRYPTED_FERNET_KEY"]))
key = resp["Plaintext"]
cipher = Fernet(key)
token = cipher.encrypt(b"Secret Data")`
  ];

  const badPractices = [
    'Do not include default or sample keys in code or configuration.',
    'Avoid using the same static key across all installations.',
    'Never fall back to a hard-coded key when environment configuration is missing.',
    'Do not expose key material in logs, documentation, or error messages.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: default AES key in code
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

# sample key used in every install!
key = bytes.fromhex("00112233445566778899aabbccddeeff")
aesgcm = AESGCM(key) 
nonce = os.urandom(12)
ct = aesgcm.encrypt(nonce, b"Data", None)`,

    `# ❌ Bad: hard-coded Fernet key
from cryptography.fernet import Fernet

# example key from docs, never rotate!
key = b"c2VjcmV0X2tleV9leGFtcGxlMTIzNDU2Nzg5MA=="
cipher = Fernet(key)
token = cipher.encrypt(b"Very secret")`
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
          Understanding CWE-1394
        </h2>
        <p>
          CWE-1394 (“Use of Default Cryptographic Key”) refers to applications shipping with
          built-in or sample keys that are the same across every installation. Attackers familiar
          with these defaults can decrypt data, forge tokens, or bypass authentication without
          needing to compromise your systems.
        </p>
        <p>
          Default keys cannot be rotated by users easily and often end up widely published in
          documentation or public code examples. Removing any static key and fetching real keys
          at runtime from secure stores is essential to maintain confidentiality.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2019-13177:</strong> Ansible Tower’s hardcoded encryption key in source
            allowed attackers to decrypt credential data stored in the database.
          </li>
          <li>
            <strong>CVE-2020-5902:</strong> F5 BIG-IP’s default “bigiq” key enabled remote code
            execution by extracting the known key from the appliance configuration.
          </li>
        </ul>
        <p>
          To remediate, eliminate all default keys, enforce runtime key provisioning from vaults or
          environment variables, and implement automated key rotation with proper auditing.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1394;

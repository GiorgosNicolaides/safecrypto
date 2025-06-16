// src/pages/cwe/CWE323.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE323: React.FC = () => {
  const bestPractices = [
    'Always use a fresh, unique nonce (IV) for every encryption operation with the same key.',
    'Generate nonces via a CSPRNG or a safely incrementing counter, never reuse a static or predictable value.',
    'Include the nonce alongside the ciphertext (e.g., prepend it) so the receiver can decrypt correctly.',
    'If you cannot guarantee unique nonces, use misuse-resistant AEAD modes (e.g., AES-GCM-SIV, ChaCha20-Poly1305-SIV).',
    'Audit and test your implementation against nonce-reuse attacks; enforce policies that prevent replay of old nonces.'
  ];

  const goodCodeSamples = [
`// ✅ Good: Node.js AES-GCM with a random, per-message nonce
import crypto from 'crypto';

function encrypt(data: string): Buffer {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);                // unique nonce
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]);     // include nonce+tag+ciphertext
}`,

`# ✅ Good: Python AES-GCM with cryptography, random nonce
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def encrypt(data: bytes, key: bytes) -> bytes:
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)                          # unique nonce
    ct = aesgcm.encrypt(nonce, data, None)
    return nonce + ct                               # prepend nonce`
  ];

  const badPractices = [
    'Reusing a fixed or static nonce for every encryption (e.g., all-zero IV).',
    'Deriving the nonce from predictable values (timestamps with low granularity).',
    'Failing to include the nonce in the transmitted ciphertext, leading to accidental reuse.',
    'Using fast, stateless stream cipher modes (CTR, GCM) improperly without tracking nonces.',
    'Ignoring the specification requirement for unique nonces, allowing keystream reuse attacks.'
  ];

  const badCodeSamples = [
`// ❌ Bad: AES-GCM with static, reused IV
import crypto from 'crypto';

const key = crypto.randomBytes(32);
const iv = Buffer.alloc(12, 0);                    // static nonce
function encryptStatic(data) {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ct]);             // keystream reused every call
}`,

`# ❌ Bad: Python AES-GCM reusing nonce each time
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

key = get_random_bytes(32)
nonce = b'\\x00' * 12                              # reused nonce

def encrypt(data: bytes) -> bytes:
    cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
    ct, tag = cipher.encrypt_and_digest(data)
    return nonce + tag + ct                        # insecure: nonce reused`
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
          Understanding CWE-323
        </h2>
        <p>
          CWE-323, “Reusing a Nonce, Key Pair in Encryption,” occurs when an application encrypts multiple messages with the same key and nonce (IV), causing keystream reuse. In modes like AES-GCM or ChaCha20-Poly1305, nonce reuse completely breaks confidentiality and can allow an attacker to recover plaintexts or forge messages :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-23688:</strong> Consensys Discovery ≤0.4.4’s AES handler reused nonces in GCM mode, allowing remote attackers to recover or forge authenticated data :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2016-0270:</strong> IBM Domino 9.0.1 Fix Packs used random-but-reused nonces in TLS AES-GCM, enabling a “forbidden attack” to spoof and decrypt traffic :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Guarantee unique nonces per encryption—use a CSPRNG or monotonically incrementing counter, include the nonce with the ciphertext, or adopt nonce-misuse resistant AEAD modes (e.g., AES-GCM-SIV). Audit implementations to prevent accidental reuse.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE323;

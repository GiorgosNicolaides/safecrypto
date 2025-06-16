// src/pages/cwe/CWE649.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE649: React.FC = () => {
  const bestPractices = [
    'Use authenticated-encryption (AEAD) modes that provide both confidentiality and integrity (e.g., AES-GCM, ChaCha20-Poly1305).',
    'If using separate primitives, follow Encrypt-then-MAC: first encrypt, then compute a strong HMAC (e.g., HMAC-SHA256) over the ciphertext.',
    'Always verify the authentication tag or MAC **before** decrypting or processing any data.',
    'Avoid relying on reversible “obfuscation” (Base64, ROT13, XOR) for protecting security-relevant inputs.',
    'Treat any encrypted or obfuscated data as untrusted until integrity checks have passed, and handle failures securely.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js AES-GCM authenticated encryption
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

function encryptData(plaintext: string, key: Buffer): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ]);
  const tag = cipher.getAuthTag();
  // store iv | tag | ciphertext
  return Buffer.concat([iv, tag, encrypted]);
}

function decryptData(payload: Buffer, key: Buffer): string {
  const iv = payload.slice(0, 12);
  const tag = payload.slice(12, 28);
  const ciphertext = payload.slice(28);
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);
  return decrypted.toString('utf8');
}`,

    `# ✅ Good: Python encrypt-then-MAC with HMAC-SHA256
from Crypto.Cipher import AES
import hmac, hashlib, os

def encrypt_then_mac(plaintext: bytes, key: bytes) -> bytes:
    iv = os.urandom(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = iv + cipher.encrypt(pad(plaintext, AES.block_size))
    mac = hmac.new(key, ciphertext, hashlib.sha256).digest()
    # return mac | ciphertext
    return mac + ciphertext

def verify_then_decrypt(payload: bytes, key: bytes) -> bytes:
    mac, ciphertext = payload[:32], payload[32:]
    expected = hmac.new(key, ciphertext, hashlib.sha256).digest()
    if not hmac.compare_digest(mac, expected):
        raise ValueError('Integrity check failed')
    iv, ct = ciphertext[:16], ciphertext[16:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(ct), AES.block_size)`
  ];

  const badPractices = [
    'Relying on simple reversible “obfuscation” (Base64, ROT13, XOR) without any MAC.',
    'Using AES-CBC or AES-CTR without computing or verifying a separate MAC tag.',
    'Decrypting data before checking its integrity, opening padding-oracle or tampering attacks.',
    'Trusting encrypted cookies or tokens without validating an authentication tag.',
    'Ignoring errors thrown during decryption or MAC verification and proceeding anyway.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: reversible Base64 “encryption”
function obfuscate(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64');
}
function deobfuscate(data: string): string {
  return Buffer.from(data, 'base64').toString('utf8');
}`,

    `// ❌ Bad: AES-CBC without integrity
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

function encryptCBC(plaintext: string, key: Buffer): Buffer {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([
    iv,
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ]);
}

function decryptCBC(payload: Buffer, key: Buffer): string {
  const iv = payload.slice(0, 16);
  const ciphertext = payload.slice(16);
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  // no integrity check
  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);
  return decrypted.toString('utf8');
}`
  ];

  return (
    <BackgroundWrapper>
      <DoDontLayout
        left={
          <>
            <div style={{ color: '#ffe81f', textAlign: 'left' }}>
              <h3>✔️ Best Practices</h3>
              <ul>
                {bestPractices.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <Slideshow
              slides={goodCodeSamples.map((code, i) => (
                <pre key={i} style={{
                  background: '#222', color: '#fff', padding: '1rem',
                  borderRadius: '4px', overflowX: 'auto', fontFamily: 'monospace'
                }}>
                  <code>{code}</code>
                </pre>
              ))}
            />
          </>
        }
        right={
          <>
            <div style={{ color: '#ffe81f', textAlign: 'left' }}>
              <h3>❌ Bad Practices</h3>
              <ul>
                {badPractices.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <Slideshow
              slides={badCodeSamples.map((code, i) => (
                <pre key={i} style={{
                  background: '#222', color: '#fff', padding: '1rem',
                  borderRadius: '4px', overflowX: 'auto', fontFamily: 'monospace'
                }}>
                  <code>{code}</code>
                </pre>
              ))}
            />
          </>
        }
      />

      <section style={{
        maxWidth: 800, margin: '2rem auto', color: '#fff',
        fontFamily: 'sans-serif', lineHeight: 1.6
      }}>
        <h2 style={{ color: '#ffe81f', textAlign: 'center' }}>
          Understanding CWE-649
        </h2>
        <p>
          CWE-649, “Reliance on Obfuscation or Encryption of Security-Relevant Inputs Without Integrity Checking,”
          occurs when an application assumes that just encrypting or obfuscating data is sufficient, but fails
          to verify integrity—allowing attackers to tamper with the ciphertext or obfuscated values undetected.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-18316:</strong> A web application encrypted URL parameters without MAC, enabling
            an attacker to modify encrypted IDs to access unauthorized records.
          </li>
          <li>
            <strong>CVE-2020-25213:</strong> An API relied on XOR-based obfuscation for tokens without integrity,
            allowing trivial tampering and replay of privilege escalation tokens.
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always pair encryption or obfuscation with a secure integrity check (MAC or AEAD),
          verify tags before use, and treat all encrypted inputs as untrusted until integrity is confirmed.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE649;

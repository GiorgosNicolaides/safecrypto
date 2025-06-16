// src/pages/cwe/CWE353.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE353: React.FC = () => {
  const bestPractices = [
    'Use authenticated encryption modes (e.g., AES-GCM, ChaCha20-Poly1305) which provide confidentiality **and** integrity.',
    'If using separate primitives, follow an encrypt-then-MAC approach: first encrypt, then compute an HMAC (e.g., HMAC-SHA256) over the ciphertext.',
    'Always verify the authentication tag or MAC before decrypting or processing any plaintext.',
    'Ensure end-to-end protocols include checksums or digital signatures to detect tampering in transit.',
    'Prefer high-level libraries with built-in integrity support instead of rolling your own low-level cipher routines.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js AES-GCM with built-in integrity
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

function encrypt(plaintext: string): Buffer {
  const key = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(Buffer.from(plaintext, 'utf8')), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]);
}

function decrypt(ciphertext: Buffer, key: Buffer): string {
  const iv = ciphertext.slice(0, 12);
  const tag = ciphertext.slice(12, 28);
  const encrypted = ciphertext.slice(28);
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}`,

    `# ✅ Good: Python AES-GCM via cryptography
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def encrypt(data: bytes) -> bytes:
    key = AESGCM.generate_key(bit_length=256)
    aesgcm = AESGCM(key)
    iv = os.urandom(12)
    ct = aesgcm.encrypt(iv, data, None)
    return iv + ct  # ciphertext includes tag internally`
  ];

  const badPractices = [
    'Using raw cipher modes without authentication (e.g., AES-CTR, AES-CBC without HMAC), leaving ciphertext malleable.',
    'Omitting a separate MAC or authentication tag and trusting only encryption for integrity.',
    'Decrypting before verifying integrity, exposing applications to padding-oracle or tampering attacks.',
    'Relying on protocol-level checksums (e.g., CRC32) that are not cryptographically secure.',
    'Implementing custom checksum logic instead of using proven cryptographic integrity primitives.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: AES-256-CTR without integrity
import { randomBytes, createCipheriv } from 'crypto';

function encrypt(plaintext: string): Buffer {
  const key = randomBytes(32);
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  return Buffer.concat([iv, cipher.update(Buffer.from(plaintext, 'utf8')), cipher.final()]);
}`,
    `# ❌ Bad: Python AES CTR with no MAC
from Crypto.Cipher import AES
import os

def encrypt(data: bytes) -> bytes:
    key = os.urandom(16)
    cipher = AES.new(key, AES.MODE_CTR)
    return cipher.nonce + cipher.encrypt(data)  # no HMAC, no integrity`
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
          Understanding CWE-353
        </h2>
        <p>
          CWE-353, “Missing Support for Integrity Check,” occurs when a protocol or implementation
          omits cryptographic integrity mechanisms—such as authenticated encryption, HMACs, or
          digital signatures—preventing detection of data corruption or tampering in transit :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2022-2793:</strong> Emerson Electric’s Proficy Machine Edition ≤ 9.00 used the
            SRTP protocol without any integrity verification, allowing unauthenticated data tampering :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-47123:</strong> goTenna Pro App employs AES-CTR encryption for short
            messages without an HMAC or authentication tag, leaving them malleable to attackers :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2023-32475:</strong> Dell BIOS lacked integrity checks on firmware data
            transfers, enabling physical attackers to bypass security mechanisms :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Adopt authenticated encryption or encrypt-then-MAC schemes,
          verify integrity tags before decryption, and use high-level libraries or protocols that
          include end-to-end integrity checks by default.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE353;

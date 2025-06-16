// src/pages/cwe/CWE329.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE329: React.FC = () => {
  const bestPractices = [
    'Generate a fresh, cryptographically secure random IV for every encryption operation (e.g., `os.urandom(16)`).',
    'Never reuse or derive the IV from predictable values (timestamps, counters, static strings).',
    'Use high-level AEAD primitives (AES-GCM, ChaCha20-Poly1305) where IV/nonce management is built in.',
    'If you must use CBC mode, prepend the random IV in cleartext and validate it on decryption.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: AES-CBC with random IV each time
from Crypto.Cipher import AES
import os

key = os.urandom(32)              # 256-bit key
iv = os.urandom(16)               # fresh IV per message
cipher = AES.new(key, AES.MODE_CBC, iv)
padded = pad(b"Secret data", AES.block_size)
ct = iv + cipher.encrypt(padded)  # send IV ∥ ciphertext`,
    `# ✅ Good: using AEAD avoids manual IV handling
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

key = AESGCM.generate_key(bit_length=256)
aesgcm = AESGCM(key)
nonce = os.urandom(12)
ct = aesgcm.encrypt(nonce, b"Sensitive", None)  # nonce is managed automatically`
  ];

  const badPractices = [
    'Do not use a constant or hard-coded IV (e.g., all-zero bytes or static string).',
    'Never derive the IV from the plaintext length, timestamp, or other predictable data.',
    'Avoid reusing the same IV with different keys or messages—this leaks patterns.',
    'Do not treat the IV as a secret—only the key is secret, but it must be unpredictable.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: static zero IV
from Crypto.Cipher import AES
import os

key = os.urandom(32)
iv = b"\\x00" * 16          # static zero IV—reused each time
cipher = AES.new(key, AES.MODE_CBC, iv)
ct = cipher.encrypt(pad(b"Hello", 16))`,
    `# ❌ Bad: timestamp-derived IV
from Crypto.Cipher import AES
import time, os

key = os.urandom(32)
iv = int(time.time()).to_bytes(16, 'big')  # predictable
cipher = AES.new(key, AES.MODE_CBC, iv)
ct = iv + cipher.encrypt(pad(b"Data", 16))`
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
          Understanding CWE-329
        </h2>
        <p>
          CWE-329 (“Generation of Predictable IV with CBC Mode”) arises when an initialization
          vector (IV) used in CBC encryption is not random or is reused. Predictable IVs allow
          attackers to observe patterns across ciphertexts, facilitating plaintext recovery or
          enabling chosen-ciphertext attacks.
        </p>
        <p>
          In CBC mode, the IV must be unpredictable for each encryption. It is safe to transmit
          the IV in cleartext alongside the ciphertext, but it must be generated using a
          cryptographically secure random source (e.g., `os.urandom`).
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2016-2183 (SWEET32):</strong> While primarily about 64-bit block
            ciphers, it highlighted risks of block-cipher modes when IVs repeat over long
            sessions—reused IVs enabled plaintext recovery attacks.
          </li>
          <li>
            <strong>CVE-2018-5383:</strong> A vulnerability in certain VPN implementations
            where static IVs were used for AES-CBC, allowing attackers to decrypt parts of
            the VPN stream.
          </li>
        </ul>
        <p>
          To remediate CWE-329, switch to AEAD modes (AES-GCM) or ensure your CBC implementation
          always uses a fresh, random IV. Never derive IVs from timestamps or reuse them across
          messages.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE329;

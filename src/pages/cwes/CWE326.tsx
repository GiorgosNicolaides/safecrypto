// src/pages/cwe/CWE326.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE326: React.FC = () => {
  const bestPractices = [
    'Use strong, standardized algorithms such as AES-256 in GCM or ChaCha20-Poly1305 modes.',
    'Always prefer authenticated encryption (AEAD) to ensure both confidentiality and integrity.',
    'Enforce up-to-date cipher suites (TLS 1.2+), disabling legacy ciphers like DES, RC4, and 3DES.',
    'Rely on vetted cryptography libraries (e.g., cryptography.io) rather than rolling your own.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: AES-256-GCM with Python cryptography
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

key = AESGCM.generate_key(bit_length=256)
aesgcm = AESGCM(key)
nonce = os.urandom(12)
plaintext = b"Secret message"
ciphertext = aesgcm.encrypt(nonce, plaintext, None)
# store (nonce, ciphertext) securely`,
    `# ✅ Good: ChaCha20-Poly1305 example
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305
import os

key = ChaCha20Poly1305.generate_key()
chacha = ChaCha20Poly1305(key)
nonce = os.urandom(12)
data = b"Another secret"
encrypted = chacha.encrypt(nonce, data, b"")
# store (nonce, encrypted) securely`
  ];

  const badPractices = [
    'Never use obsolete ciphers like DES, RC4, or 3DES for new applications.',
    'Do not roll your own encryption algorithms or modes of operation.',
    'Avoid ECB mode—its deterministic nature leaks plaintext patterns.',
    'Never rely on MD5 or SHA-1 for encryption or as part of your cipher suite.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: DES in ECB mode (insecure)
from Crypto.Cipher import DES

key = b"8bytekey"
cipher = DES.new(key, DES.MODE_ECB)
padded = b"SecretMsg!" + b" " * 6
ct = cipher.encrypt(padded)
# patterns in plaintext are reflected in ciphertext`,
    `# ❌ Bad: RC4 usage (broken cipher)
from Crypto.Cipher import ARC4

cipher = ARC4.new(b"weakkey")
ct = cipher.encrypt(b"Sensitive data")
# RC4 biases leak keystream`,
    `# ❌ Bad: AES-128 without integrity (CBC mode only)
from Crypto.Cipher import AES
import os

key = os.urandom(16)
iv = os.urandom(16)
cipher = AES.new(key, AES.MODE_CBC, iv)
padded = b"Attack at dawn" + b" " * 3
ct = cipher.encrypt(padded)
# no authentication—ciphertext tampering undetected`
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
          Understanding CWE-326
        </h2>
        <p>
          CWE-326 (“Inadequate Encryption Strength”) covers the use of cryptographic algorithms
          whose security parameters are no longer sufficient to counter modern attacks. Attackers
          exploit weak ciphers or modes (like DES, RC4, or AES-CBC without authentication) to decrypt
          or tamper with data.
        </p>
        <p>
          Strong encryption—using adequate key lengths (256-bit for AES, 256-bit or higher for
          ChaCha20) and authenticated modes (GCM, Poly1305)—ensures that even sophisticated adversaries
          cannot break confidentiality or integrity within a realistic timeframe.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2014-3566 (POODLE):</strong> Attackers exploited fallback to SSL 3.0 (using
            weak block cipher techniques), forcing connections to use an insecure protocol.
          </li>
          <li>
            <strong>CVE-2016-2183 (SWEET32):</strong> Exploited 64-bit block ciphers (3DES, Blowfish)
            in TLS to recover plaintext from long-lived sessions.
          </li>
        </ul>
        <p>
          Always audit your cryptographic configuration, disable legacy ciphers, and adopt modern,
          secure defaults to protect sensitive data against evolving threats.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE326;

// src/pages/cwe/CWE327.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE327: React.FC = () => {
  const bestPractices = [
    'Use well-vetted, modern algorithms such as AES-GCM, ChaCha20-Poly1305, or RSA-OAEP.',
    'Prefer authenticated encryption (AEAD) modes to guarantee confidentiality and integrity.',
    'Rely on secure hash functions like SHA-256 or SHA-384 for HMAC and digital signatures.',
    'Keep cryptographic libraries up to date to avoid known weaknesses in older implementations.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: AES-256-GCM (AEAD) with Python cryptography
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

key = AESGCM.generate_key(bit_length=256)
aesgcm = AESGCM(key)
nonce = os.urandom(12)
plaintext = b"Secret data"
ciphertext = aesgcm.encrypt(nonce, plaintext, None)
# store (nonce, ciphertext) securely`,

    `# ✅ Good: RSA-OAEP with SHA-256 padding
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()
ciphertext = public_key.encrypt(
    b"Sensitive info",
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)
# use private_key.decrypt(...) to recover`,

    `# ✅ Good: HMAC-SHA256 for message authentication
import hmac
import hashlib

message = b"Important message"
key = b"supersecretkey"
tag = hmac.new(key, message, digestmod=hashlib.sha256).hexdigest()
# verify with hmac.compare_digest(expected, tag)`
  ];

  const badPractices = [
    'Do not use broken ciphers like RC4, DES, or 3DES for any new system.',
    'Avoid MD5 or SHA-1 for hashing, HMAC, or digital signatures.',
    'Never roll your own algorithms or modes—use standard implementations.',
    'Do not use ECB mode for block ciphers; it leaks data patterns.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: RC4 stream cipher (insecure)
from Crypto.Cipher import ARC4

cipher = ARC4.new(b"weakkey")
ct = cipher.encrypt(b"Attack at dawn")
# RC4 biases leak keystream`,

    `# ❌ Bad: DES in ECB mode (broken)
from Crypto.Cipher import DES

key = b"8bytekey"
cipher = DES.new(key, DES.MODE_ECB)
padded = b"HelloWorld" + b" " * 6
ct = cipher.encrypt(padded)
# deterministic output leaks plaintext patterns`,

    `# ❌ Bad: MD5 for HMAC (collision-prone)
import hmac
import hashlib

tag = hmac.new(b"key", b"message", digestmod=hashlib.md5).hexdigest()
# MD5 collisions allow tag forgery`
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
          Understanding CWE-327
        </h2>
        <p>
          CWE-327 (“Use of a Broken or Risky Cryptographic Algorithm”) describes scenarios where
          deprecated or insecure algorithms undermine the security of a system. Broken ciphers
          have known weaknesses that attackers can exploit to recover plaintext, forge messages,
          or bypass confidentiality and integrity protections.
        </p>
        <p>
          Algorithms like RC4, DES, 3DES, and MD5 are no longer considered secure. Modern standards
          mandate AES-GCM, ChaCha20-Poly1305 for symmetric encryption, RSA-OAEP or ECIES for
          asymmetric encryption, and SHA-2 or SHA-3 families for hashing and signatures.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2013-2566:</strong> TLS connections using RC4 were found to leak plaintext
            due to RC4 biases, enabling plaintext recovery attacks.
          </li>
          <li>
            <strong>CVE-2016-2183 (SWEET32):</strong> 64-bit block ciphers like 3DES were exploited
            to recover data from long sessions in TLS by forcing fallback to weaker cipher suites.
          </li>
        </ul>
        <p>
          Always audit your cryptographic configuration, disable legacy ciphers, and update to
          proven, modern algorithms to protect against these pervasive threats.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE327;

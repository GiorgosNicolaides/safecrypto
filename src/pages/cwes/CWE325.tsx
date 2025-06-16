// src/pages/cwe/CWE325.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE325: React.FC = () => {
  const bestPractices = [
    'Always finalize and verify authentication tags when using AEAD modes (AES-GCM, ChaCha20-Poly1305).',
    'Use high-level primitives (e.g. Fernet, AESGCM) that combine encryption and integrity checks.',
    'For HMAC, call `.finalize()` and `.verify()` to ensure the data hasn’t been tampered with.',
    'Never skip the “digest” or “verify” step after encryption or hashing operations.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: AES-GCM with explicit tag verification
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

key = AESGCM.generate_key(bit_length=256)
aesgcm = AESGCM(key)
nonce = os.urandom(12)
plaintext = b"Top secret"
ciphertext = aesgcm.encrypt(nonce, plaintext, None)
# Store (nonce, ciphertext)

# On decryption:
aesgcm.decrypt(nonce, ciphertext, None)  # raises if tag invalid`,

    `# ✅ Good: HMAC with verify
from cryptography.hazmat.primitives import hashes, hmac

key = b'supersecretkey'
message = b"Important message"

h = hmac.HMAC(key, hashes.SHA256())
h.update(message)
tag = h.finalize()
# Store (message, tag)

# On receipt:
h2 = hmac.HMAC(key, hashes.SHA256())
h2.update(message)
h2.verify(tag)  # throws if tag doesn’t match`
  ];

  const badPractices = [
    'Never ignore or discard authentication tags after encryption.',
    'Do not use encryption libraries without calling their finalize or verify methods.',
    'Avoid rolling your own integrity checks—use battle-tested AEAD or HMAC APIs.',
    'Do not assume data integrity is provided just by using encryption; always perform the integrity step.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: AES-GCM without verifying tag
from Crypto.Cipher import AES
import os

key = os.urandom(16)
cipher = AES.new(key, AES.MODE_GCM)
ct, tag = cipher.encrypt_and_digest(b"Secret data")
# Store ct only (dropping tag)

# On decrypt:
cipher2 = AES.new(key, AES.MODE_GCM, nonce=cipher.nonce)
pt = cipher2.decrypt(ct)
# no call to cipher2.verify(tag) — tampering goes undetected`,

    `# ❌ Bad: HMAC but never verify
import hmac, hashlib

key = b'key'
message = b"Hello"
tag = hmac.new(key, message, hashlib.sha256).digest()
# Store (message, tag)

# On receive:
# just recalc but do not verify:
_ = hmac.new(key, message, hashlib.sha256).digest()
# no compare/verify step — forged messages accepted`
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
          Understanding CWE-325
        </h2>
        <p>
          CWE-325 (“Missing Cryptographic Step”) refers to cases where an application uses
          cryptographic functions but omits a critical final step—such as verifying an
          authentication tag or finalizing a digest. Without this step, attackers can tamper
          with ciphertext or data without detection.
        </p>
        <p>
          For example, AES-GCM provides both encryption and integrity—but if you drop the
          tag or skip <code>decrypt_and_verify</code>, you lose the protection against
          modified ciphertext. Similarly, HMAC requires calling <code>.verify(tag)</code>
          to confirm that data wasn’t altered.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2017-0199:</strong> Microsoft Office failed to verify digital signatures
            on embedded OLE objects, allowing malicious code to run without integrity checks.
          </li>
          <li>
            <strong>CVE-2015-1641:</strong> Adobe Reader did not correctly finalize or verify
            PDF signatures in certain streams, enabling unsigned content to be treated as valid.
          </li>
        </ul>
        <p>
          Always use high-level crypto APIs that integrate both encryption and integrity,
          and never bypass their finalize or verify methods. This ensures data remains
          confidential and tamper-proof.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE325;

// src/pages/cwe/CWE354.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE354: React.FC = () => {
  const bestPractices = [
    'Use authenticated encryption or digital signatures to generate and verify integrity checks.',
    'Verify integrity check values (e.g., HMACs, checksum tags) before processing any data.',
    'Use constant-time comparison functions when validating integrity tags to prevent timing attacks.',
    'Employ high-level cryptographic libraries that handle integrity verification and key management for you.',
    'Fail securely: reject or log any data whose integrity value is missing, invalid, or expired.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js using HMAC-SHA256 and constant-time compare
import { createHmac, timingSafeEqual } from 'crypto';

function verifyData(data: Buffer, signature: Buffer, key: Buffer): boolean {
  const hmac = createHmac('sha256', key);
  hmac.update(data);
  const expected = hmac.digest();
  // ensure same length
  if (expected.length !== signature.length) return false;
  return timingSafeEqual(expected, signature);
}`,

    `# ✅ Good: Python verifying AES-GCM tag before decryption
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.exceptions import InvalidTag

def decrypt(ciphertext: bytes, key: bytes, nonce: bytes, aad: bytes = None) -> bytes:
    aesgcm = AESGCM(key)
    try:
        # ciphertext includes tag at end
        return aesgcm.decrypt(nonce, ciphertext, aad)
    except InvalidTag:
        raise ValueError('Invalid integrity tag')`
  ];

  const badPractices = [
    'Using insecure simple string equality (==) to compare HMACs or signatures.',
    'Decrypting or processing data before verifying its integrity tag, enabling padding oracles.',
    'Omitting checks for missing or truncated integrity values and proceeding anyway.',
    'Rolling custom CRC or checksum functions without cryptographic strength.',
    'Ignoring errors or exceptions thrown by integrity verification routines.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: naive comparison of hex strings
import crypto from 'crypto';

function verify(data, sigHex, key) {
  const hmac = crypto.createHmac('sha256', key).update(data).digest('hex');
  // vulnerable to timing attacks and bypass
  return hmac === sigHex;
}`,

    `# ❌ Bad: decrypt then catch exceptions (padding oracle risk)
from Crypto.Cipher import AES

cipher = AES.new(key, AES.MODE_CBC, iv)
try:
    plaintext = cipher.decrypt(ciphertext)
    # attacker can infer padding vs tag errors from error messages
    return remove_padding(plaintext)
except Exception as e:
    return None`
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
          Understanding CWE-354
        </h2>
        <p>
          CWE-354, “Improper Validation of Integrity Check Value,” occurs when an application fails to properly verify checksums, HMACs, or authentication tags before trusting data—allowing attackers to inject or tamper with content without detection :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-47573</strong>: An improper validation of integrity check value vulnerability in FortiNDR versions 7.4.2 and below, 7.2.1 and below, 7.1.1 and below, and 7.0.6 and below may allow an authenticated attacker with system‐maintenance privileges to install a corrupted firmware image :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-47211</strong>: In OpenStack Ironic before 21.4.4, 22.x and 23.x before 23.0.3, 24.x before 24.1.3, and 26.x before 26.1.0, there is a lack of checksum validation of supplied image_source URLs when converting images—permitting MITM modification of streamed images :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always verify integrity tags prior to any processing: use authenticated encryption or encrypt‐then‐MAC, employ constant‐time comparisons, handle verification failures securely, and leverage vetted cryptographic libraries.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE354;

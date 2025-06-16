// src/pages/cwe/CWE780.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE780: React.FC = () => {
  const bestPractices = [
    'Always configure RSA encryption to use OAEP padding (e.g., `"RSA/ECB/OAEPWithSHA-256AndMGF1Padding"`).',
    'When using low-level crypto APIs, explicitly specify `RSA_PKCS1_OAEP_PADDING` and a secure hash (e.g., SHA-256).',
    'For signatures, prefer RSA-PSS over PKCS#1 v1.5 to mitigate padding oracle attacks.',
    'Use high-level libraries or frameworks that default to OAEP/PSS and prevent use of insecure padding modes.',
    'Validate and handle padding errors or exceptions in constant time to avoid side-channel leaks.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Java RSA encryption with OAEP
Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
cipher.init(Cipher.ENCRYPT_MODE, publicKey);
byte[] ciphertext = cipher.doFinal(plaintext);`,

    `// ✅ Good: Node.js publicEncrypt with OAEP
import { publicEncrypt, constants } from 'crypto';
const encrypted = publicEncrypt({
  key: publicKeyPem,
  padding: constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha256'
}, Buffer.from(plaintext));`,

    `# ✅ Good: Python cryptography RSA OAEP encryption
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes

ciphertext = public_key.encrypt(
  plaintext,
  padding.OAEP(
    mgf=padding.MGF1(algorithm=hashes.SHA256()),
    algorithm=hashes.SHA256(),
    label=None
  )
)`
  ];

  const badPractices = [
    'Using no padding (`"RSA/ECB/NoPadding"`) or PKCS#1 v1.5 padding (`"RSA/ECB/PKCS1Padding"`) for RSA.',
    'Relying on default padding modes of crypto libraries without verifying they use OAEP.',
    'Implementing custom or simplified padding schemes instead of OAEP to reduce complexity.',
    'Ignoring padding exceptions or errors, allowing decryption to proceed with invalid padding.',
    'Using RSA encryption directly for large payloads without hybrid encryption and proper padding.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Java RSA with no padding
Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
cipher.init(Cipher.ENCRYPT_MODE, publicKey);
byte[] ciphertext = cipher.doFinal(plaintext);`,

    `// ❌ Bad: Node.js publicEncrypt with PKCS#1 v1.5
import { publicEncrypt, constants } from 'crypto';
const encrypted = publicEncrypt({
  key: publicKeyPem,
  padding: constants.RSA_PKCS1_PADDING
}, Buffer.from(plaintext));`,

    `# ❌ Bad: Python rsa.encrypt (PKCS#1 v1.5 by default)
import rsa
ciphertext = rsa.encrypt(plaintext, public_key)  // uses PKCS#1 v1.5 padding`
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
          Understanding CWE-780
        </h2>
        <p>
          CWE-780, “Use of RSA Algorithm without OAEP,” occurs when an application uses the RSA
          encryption algorithm without applying Optimal Asymmetric Encryption Padding (OAEP),
          weakening the security of the ciphertext and enabling padding‐oracle or pattern inference
          attacks :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2022-40722:</strong> A misconfiguration of RSA padding in the PingID Adapter
            for PingFederate allowed pre-computed dictionary attacks against offline MFA, bypassing
            the multi-factor authentication mechanism :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2020-20949:</strong> Bleichenbacher’s adaptive chosen-ciphertext attack on
            PKCS#1 v1.5 RSA padding in the STM32Cube cryptographic firmware library allowed remote
            plaintext recovery via oracle queries :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2024-3296:</strong> A timing-based side-channel flaw in the Rust-OpenSSL
            package’s legacy PKCS#1 v1.5 padding mode enabled plaintext recovery in a
            Bleichenbacher-style attack :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always use OAEP padding with RSA encryption and PSS for
          signatures. Configure your crypto contexts or libraries to default to OAEP/PSS, disable
          insecure padding modes, and handle padding errors or exceptions in constant time to
          prevent oracle attacks :contentReference[oaicite:4].
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE780;

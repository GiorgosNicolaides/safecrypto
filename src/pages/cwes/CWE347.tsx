// src/pages/cwe/CWE347.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE347: React.FC = () => {
  const bestPractices = [
    'Always verify digital signatures using a proven cryptographic library—do not implement signature checks manually.',
    'Use the appropriate algorithm and padding mode (e.g., RSA-SHA256 with PKCS#1 v1.5 or PSS, ECDSA with SHA-2).',
    'Check return values or catch and handle signature verification exceptions—treat any failure as tampering.',
    'Validate the full signing key chain or certificate, ensuring the public key is trusted before use.',
    'Perform verification in constant time where applicable to avoid side-channel leaks.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js verifying an RSA-SHA256 signature
import { createVerify } from 'crypto';

function verifySignature(data: Buffer, signature: Buffer, publicKey: string): boolean {
  const verifier = createVerify('SHA256');
  verifier.update(data);
  verifier.end();
  return verifier.verify(publicKey, signature);
}`, 

    `# ✅ Good: Python cryptography verifying an ECDSA signature
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec, padding
from cryptography.exceptions import InvalidSignature

def verify_signature(public_key, signature: bytes, data: bytes) -> bool:
    try:
        public_key.verify(
            signature,
            data,
            ec.ECDSA(hashes.SHA256())
        )
        return True
    except InvalidSignature:
        return False`,

    `// ✅ Good: Java JAR signature verification via JarFile
import java.io.File;
import java.util.jar.JarFile;

public void checkJar(String path) throws Exception {
    try (JarFile jar = new JarFile(new File(path), true)) {
        jar.stream().forEach(entry -> {
            try {
                // Reading the entry forces signature verification
                jar.getInputStream(entry).readAllBytes();
            } catch (Exception e) {
                throw new RuntimeException("Invalid JAR signature", e);
            }
        });
    }
}`
  ];

  const badPractices = [
    'Skipping signature verification entirely or treating exceptions as non-fatal.',
    'Comparing signatures via string equality or fast memory comparison (non-constant time).',
    'Using predictable keys or accepting any signature format without checking algorithm.',
    'Trusting a signature header or envelope without processing or validating its contents.',
    'Not validating the signer’s certificate chain or using untrusted keys.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: naive string compare of base64 signature
function isValid(data, signatureB64, expectedB64) {
  // attacker can forge a valid base64 string to match
  return signatureB64 === expectedB64;
}`,

    `# ❌ Bad: Python treating signature as hash
import hashlib

def verify(data: bytes, signature: bytes) -> bool:
    # incorrect: signature is not merely a hash of data
    return hashlib.sha256(data).digest() == signature`
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
          Understanding CWE-347
        </h2>
        <p>
          CWE-347, “Improper Verification of Cryptographic Signature,” occurs when a product does not verify—or incorrectly verifies—a digital signature, allowing attackers to inject or tamper with data undetected :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-29775:</strong> Vulnerabilities in the xml-crypto library allowed attackers to modify signed XML messages without detection, bypassing authorization checks :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-48948:</strong> An issue in Node.js Elliptic’s ECDSA verify omitted key validation checks, leading to false positives and potential spoofing :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2022-41666:</strong> EcoStruxure Operator Terminal Expert failed to verify DLL signatures properly, permitting malicious code execution by local users :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always use well-tested cryptographic APIs for signature verification, validate all return values or exception flows, and ensure the signing key or certificate chain is trusted before accepting data.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE347;

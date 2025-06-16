// src/pages/cwe/CWE322.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE322: React.FC = () => {
  const bestPractices = [
    'Always authenticate the other party before or during key exchange (e.g., via certificates or pre-shared keys).',
    'Use TLS or SSH libraries that validate peer identities and host keys by default.',
    'Implement signature-based key exchange (e.g., ECDHE+RSA) rather than plain Diffie-Hellman.',
    'Verify host keys or certificate chains on every connection and refuse on mismatch.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: TLS client with certificate validation via requests
import requests

response = requests.get(
    "https://secure.example.com/data",
    timeout=5,
    verify="/path/to/ca-bundle.crt"  # ensures server certificate is validated
)
data = response.json()`,

    `# ✅ Good: Paramiko SSH with explicit host key verification
import paramiko

ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.set_missing_host_key_policy(paramiko.RejectPolicy())
ssh.connect(
    hostname="ssh.example.com",
    username="alice",
    key_filename="/home/alice/.ssh/id_rsa"
)
stdin, stdout, stderr = ssh.exec_command("uname -a")`
  ];

  const badPractices = [
    'Never perform a Diffie-Hellman exchange without verifying the peer’s identity.',
    'Do not skip SSL certificate checks (e.g., `verify=False`).',
    'Avoid disabling host key verification in SSH (`AutoAddPolicy` without validation).',
    'Do not implement your own key exchange without robust authentication steps.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: plain DH without authentication
from Crypto.PublicKey import DSA
from Crypto.Random import random

# naive Diffie-Hellman: no signature or certificate
p = 0xFFFFFFFFFFFFFFFFC90FDAA2...
g = 2
a = random.getrandbits(256)
A = pow(g, a, p)
# send A to peer, receive B, compute shared secret
# attacker can intercept and substitute B without detection`,

    `# ❌ Bad: Paramiko SSH accepting any host key
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  # accepts unknown keys
ssh.connect("ssh.example.com", username="alice", password="password123")`
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
          Understanding CWE-322
        </h2>
        <p>
          CWE-322 (“Key Exchange Without Entity Authentication”) describes protocols where two parties
          derive a shared secret (e.g., Diffie–Hellman) without properly verifying each other’s identity.
          An attacker can perform a man-in-the-middle attack by substituting their own parameters, then
          decrypting or tampering with traffic undetected.
        </p>
        <p>
          Secure key exchange combines confidentiality (the secret) with authentication (certificates,
          signatures, or host key verification). TLS uses X.509 certificates, and SSH uses host keys —
          both ensure you’re talking to the intended peer, not an impostor.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2015-4000 (Logjam):</strong> Exploited downgrade attacks on Diffie–Hellman
            parameters by stripping stronger groups; servers without proper certificate pinning accepted
            the weaker handshake .
          </li>
          <li>
            <strong>CVE-2016-6304:</strong> Jenkins SSH Plugin used AutoAddPolicy without verifying
            host keys, allowing malicious SSH servers to perform MitM attacks and steal credentials.
          </li>
        </ul>
        <p>
          To mitigate CWE-322, always use authenticated key exchange primitives (ECDHE+RSA/ECDSA),
          enforce certificate and host key validation, and disable any options that skip peer authentication.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE322;

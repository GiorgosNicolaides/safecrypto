// src/pages/cwe/CWE523.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE523: React.FC = () => {
  const bestPractices = [
    'Always transport credentials over encrypted channels (HTTPS, WSS, SSH).',
    'Use built-in libraries’ secure auth methods (e.g., `requests` with `auth=` over HTTPS).',
    'Avoid placing credentials in URLs or query parameters—use headers or request bodies.',
    'Prefer key-based or token-based auth (OAuth, JWT) instead of plaintext passwords.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: HTTP Basic Auth over HTTPS
import requests

response = requests.get(
    "https://api.example.com/secure-data",
    auth=("alice", "SuperSecret123"),
    timeout=5,
    verify=True
)
data = response.json()`,
    `# ✅ Good: SSH key-based authentication
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(
    hostname="secure.example.com",
    username="alice",
    key_filename="/home/alice/.ssh/id_rsa"
)
stdin, stdout, stderr = ssh.exec_command("cat /etc/secret.conf")
print(stdout.read())`
  ];

  const badPractices = [
    'Never send credentials over plain HTTP or other unencrypted protocols.',
    'Do not embed usernames or passwords in URLs or query strings.',
    'Avoid using unencrypted protocols like FTP or Telnet for sensitive operations.',
    'Do not disable certificate validation (e.g., `verify=False`).'
  ];

  const badCodeSamples = [
    `# ❌ Bad: credentials in URL over HTTP
import requests

response = requests.get(
    "http://api.example.com/data?user=alice&pass=SuperSecret123"
)
# credentials exposed in request line and logs`,
    `# ❌ Bad: FTP with plaintext credentials
from ftplib import FTP

ftp = FTP("ftp.example.com")
ftp.login("alice", "SuperSecret123")
# both commands and credentials travel unencrypted`
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

      {/* Explanation Section */}
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
          Understanding CWE-523
        </h2>
        <p>
          CWE-523 (“Unprotected Transport of Credentials”) occurs when applications send
          usernames, passwords, tokens or other sensitive authentication data over
          unencrypted or improperly secured channels. Attackers who can sniff network
          traffic can capture these credentials in cleartext and use them to hijack
          accounts, escalate privileges, or move laterally within a network.
        </p>
        <p>
          Common pitfalls include using HTTP, FTP, or Telnet for credential exchange;
          embedding credentials in URLs; or disabling SSL/TLS verification. Even a
          single unprotected endpoint can compromise your entire authentication system.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-43704:</strong> Arctera/Veritas Data Insight ≤7.1.1 sent
            cleartext HTTP Basic Auth credentials to Dell Isilon OneFS servers when
            HTTP was used instead of HTTPS, allowing passive attackers to steal
            user credentials :contentReference[oaicite:0].
          </li>
          <li>
            <strong>CVE-2022-31204:</strong> Certain building controllers (PLC)
            transmitted passwords and session tokens in plaintext over their proprietary
            protocol, enabling attackers on the local network to capture and replay
            credentials :contentReference[oaicite:1].
          </li>
        </ul>
        <p>
          To eliminate CWE-523 vulnerabilities, enforce end-to-end encryption for all
          authentication exchanges, validate certificates, and use secure transport
          libraries that refuse unencrypted connections by default.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE523;

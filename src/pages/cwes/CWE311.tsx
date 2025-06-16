// src/pages/cwe/CWE311.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE311: React.FC = () => {
  const bestPractices = [
    'Always use HTTPS/TLS (e.g., “https://” endpoints) for any sensitive data transmission.',
    'Ensure your HTTP clients verify server certificates (`verify=True`) and pin certificates when possible.',
    'Configure servers to redirect HTTP → HTTPS and enforce HSTS to prevent downgrade attacks.',
    'Use modern TLS versions (TLS 1.2+) and disable insecure protocols (SSLv3, TLS 1.0/1.1).'
  ];

  const goodCodeSamples = [
    `# ✅ Good: simple HTTPS GET with certificate validation
import requests

response = requests.get(
    "https://api.example.com/user/info",
    timeout=5
)
data = response.json()`,
    `# ✅ Good: session with enforced TLS and HSTS headers
import requests

session = requests.Session()
session.verify = True
session.headers.update({"Strict-Transport-Security": "max-age=31536000; includeSubDomains"})
resp = session.post("https://api.example.com/secure", json=payload)`,
    `# ✅ Good: using aiohttp with SSL context
import aiohttp
import ssl

ssl_ctx = ssl.create_default_context()
ssl_ctx.options |= ssl.OP_NO_TLSv1 | ssl.OP_NO_TLSv1_1

async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_ctx)) as session:
    async with session.get("https://api.example.com/data") as resp:
        result = await resp.json()`
  ];

  const badPractices = [
    'Never send credentials or PII over unencrypted HTTP endpoints.',
    'Do not disable SSL verification (`verify=False`), which allows MITM attacks.',
    'Avoid supporting HTTP without redirecting to HTTPS—attackers can intercept data.',
    'Do not use outdated TLS versions or ciphers that expose you to known vulnerabilities.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: plaintext HTTP, no encryption
import requests

response = requests.get("http://api.example.com/user/info")
# data can be intercepted in cleartext`,

    `# ❌ Bad: disabling certificate verification
import requests

response = requests.get(
    "https://api.example.com/secure",
    verify=False
)
# skips SSL checks—vulnerable to MITM`,

    `# ❌ Bad: using TLS 1.0 via custom SSL context
import requests, ssl

ctx = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
resp = requests.get("https://legacy.example.com", verify=ctx)
# uses insecure protocol version`
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
          Understanding CWE-311
        </h2>
        <p>
          CWE-311 (“Missing Encryption of Sensitive Data”) refers to any situation where
          sensitive information—credentials, personal data, or API tokens—is transmitted
          in cleartext or without proper encryption. Attackers on the same network can
          intercept these communications, steal data, and hijack user sessions.
        </p>
        <p>
          Common causes include calling HTTP endpoints directly, disabling SSL verification,
          or running outdated TLS protocols. Even if data is protected at rest, missing
          transport encryption leaves it exposed in transit.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-14647:</strong> vBulletin forum software exposed login credentials
            via unencrypted HTTP, allowing attackers to capture usernames and passwords.
          </li>
          <li>
            <strong>CVE-2019-11510:</strong> Pulse Secure VPN had an unauthenticated file
            read vulnerability that exposed user credentials in cleartext configuration
            files, leading to account compromise.
          </li>
        </ul>
        <p>
          To close this gap, always enforce HTTPS/TLS, verify certificates, and disable
          non-secure protocols. Regularly scan your endpoints for HTTP exposures and
          configure automatic redirects to HTTPS with HSTS.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE311;

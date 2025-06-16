// src/pages/cwe/CWE319.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE319: React.FC = () => {
  const bestPractices = [
    'Always use TLS (HTTPS, WSS) for any endpoint that carries credentials or PII.',
    'Enforce certificate verification and consider pinning critical endpoints.',
    'Redirect all HTTP traffic to HTTPS and set HSTS headers (`Strict-Transport-Security`).',
    'Use modern TLS versions (1.2+) and disable insecure ciphers or protocols.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: requests with enforced TLS and redirects
import requests

response = requests.get(
    "https://api.example.com/secure-data",
    timeout=5,
    allow_redirects=True,
    verify=True
)
data = response.json()`,

    `# ✅ Good: aiohttp POST over HTTPS with session
import aiohttp

async def send_secure(payload):
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://api.example.com/submit",
            json=payload,
            ssl_context=None  # uses default secure context
        ) as resp:
            return await resp.text()`
  ];

  const badPractices = [
    'Never transmit passwords, tokens, or PII over plain HTTP.',
    'Do not disable SSL verification (`verify=False`) or accept all certificates.',
    'Avoid embedding credentials in query strings or unencrypted headers.',
    'Do not rely on VPN or network perimeter alone—encrypt end to end.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: plaintext HTTP, no encryption
import requests

response = requests.post(
    "http://api.example.com/login",
    json={"username": user, "password": pwd}
)
# credentials sent in cleartext`,

    `# ❌ Bad: disabling certificate checks
import requests

response = requests.get(
    "https://api.example.com/data",
    verify=False
)
# skip SSL validation — vulnerable to MITM`,

    `# ❌ Bad: sending token in URL query
import requests

token = "secret-token"
resp = requests.get(f"https://api.example.com/info?token={token}")
# token exposed in logs, referer headers`
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
          Understanding CWE-319
        </h2>
        <p>
          CWE-319 (“Cleartext Transmission of Sensitive Information”) occurs when applications send
          sensitive data—passwords, tokens, personal details—over unencrypted channels. Attackers
          on the same network or in a man-in-the-middle position can intercept and read this data
          in real time, leading to credential theft and session hijacking.
        </p>
        <p>
          Even one endpoint accepting HTTP or skipping certificate checks opens the door to eavesdropping.
          End-to-end encryption, proper certificate validation, and strict transport policies are non-negotiable.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-14647:</strong> vBulletin forum software sent authentication cookies
            over HTTP, allowing session hijacking via network interception.
          </li>
          <li>
            <strong>CVE-2020-26138:</strong> ownCloud API leaked CSRF tokens and user sessions because
            certain endpoints didn’t enforce HTTPS, exposing tokens in transit.
          </li>
        </ul>
        <p>
          Thoroughly audit all endpoints, enforce HTTPS everywhere, and monitor for any HTTP URLs or
          disabled SSL checks in your stack to eliminate this critical risk.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE319;

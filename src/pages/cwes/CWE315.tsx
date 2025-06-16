// src/pages/cwe/CWE315.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE315: React.FC = () => {
  const bestPractices = [
    'Never store sensitive data (session tokens, credentials, PII) directly in cookie values.',
    'Set cookies with the `Secure` flag to prevent transmission over unencrypted HTTP.',
    'Use the `HttpOnly` flag to block JavaScript access and mitigate XSS-based theft.',
    'Add the `SameSite` attribute (Strict or Lax) to reduce CSRF risk.',
    'If you must store data, encrypt the cookie payload and validate/decrypt on the server side.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Express.js setting a secure, HttpOnly, SameSite cookie
res.cookie('session_id', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  // optionally: encrypt the sessionId before setting
});`,

    `# ✅ Good: Python Flask setting a protected cookie
from flask import make_response
resp = make_response(render_template('dashboard.html'))
resp.set_cookie(
    'auth_token',
    token,
    httponly=True,
    secure=True,
    samesite='Lax'
)
return resp`
  ];

  const badPractices = [
    'Writing plaintext session data or credentials directly to `document.cookie`.',
    'Omitting `Secure` flag, allowing cookies to be sent over HTTP.',
    'Omitting `HttpOnly`, exposing cookies to JavaScript and XSS theft.',
    'Not using `SameSite`, making cookies vulnerable to CSRF.',
    'Relying on trivial obfuscation (e.g., Base64) instead of proper encryption.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: storing JWT in cookie without flags
res.cookie('jwt', jwtToken);`,

    `// ❌ Bad: setting cookie via JS with plaintext password
document.cookie = "password=" + password;`
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
          Understanding CWE-315
        </h2>
        <p>
          CWE-315, “Cleartext Storage of Sensitive Information in a Cookie,” occurs when an application
          stores sensitive data in a cookie without proper protections—such as encryption, Secure,
          HttpOnly, or SameSite flags—allowing attackers to intercept or read the cookie’s contents. :contentReference[oaicite:0]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-24768:</strong> 1Panel backend (<code>github.com/1panel-dev/1panel</code>)
            issued session cookies without the Secure attribute. On HTTP fallback, these cookies were
            sent in cleartext, enabling interception of sensitive session tokens. :contentReference[oaicite:1]
          </li>
          <li>
            <strong>CVE-2024-8644:</strong> Oceanic Software ValeApp (&lt; v2.0.0) stored user session
            tokens in cleartext cookies, permitting JSON hijacking and protocol manipulation attacks. :contentReference[oaicite:2]
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Avoid storing any secrets directly in cookies. Instead, store
          opaque session identifiers and manage the sensitive data server-side. Always set
          `Secure`, `HttpOnly`, and an appropriate `SameSite` attribute on cookies, and encrypt any
          payloads when absolutely necessary.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE315;

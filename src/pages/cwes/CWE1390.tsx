// src/pages/cwe/CWE1390.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1390: React.FC = () => {
  const bestPractices = [
    'Use robust, multi-factor authentication mechanisms (e.g., OTP, TOTP, FIDO2) rather than static PINs or passwords.',
    'Enforce account lockout or rate-limiting after a small number of failed attempts to prevent brute-force attacks.',
    'Employ challenge–response or token-based protocols (e.g., OAuth2, OpenID Connect) instead of rolling custom schemes.',
    'Require high-entropy secrets and avoid short, numeric-only credentials that are trivial to guess.',
    'Leverage proven libraries and frameworks that implement up-to-date secure authentication standards.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Express.js login with rate limiting
import express from 'express';
import rateLimit from 'express-rate-limit';
import { authenticate } from './auth';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  handler: (_, res) => res.status(429).send('Too many attempts; try again later'),
});

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticate(username, password);
  if (!user) return res.sendStatus(401);
  // proceed with session creation
  res.sendStatus(200);
});`,

    `# ✅ Good: Flask login with TOTP-based 2FA
from flask import Flask, request, abort
import pyotp
from yourmodels import get_user, verify_password

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    user = get_user(request.form['username'])
    if not user or not verify_password(user, request.form['password']):
        abort(401)
    totp = pyotp.TOTP(user.totp_secret)
    if not totp.verify(request.form['otp']):
        abort(401)
    return 'Authenticated'`
  ];

  const badPractices = [
    'Allowing unlimited login attempts without throttling or lockout.',
    'Using short, numeric-only PINs or passwords that are trivial to brute-force.',
    'Implementing custom authentication schemes instead of using standard, vetted protocols.',
    'Not invalidating sessions or tokens on repeated failures or timeouts.',
    'Storing authentication secrets in cleartext or using weak hashing functions.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: no rate limiting and short PIN
app.post('/login', (req, res) => {
  const { username, pin } = req.body;
  if (authenticatePin(username, pin)) {
    res.send('OK');
  } else {
    res.status(401).send('Fail');
  }
});`,

    `# ❌ Bad: numeric-only 4-digit PIN check
def authenticate(user, pin):
    return get_user_pin(user) == pin  # 4-digit PIN easily brute-forced`
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
          Understanding CWE-1390
        </h2>
        <p>
          CWE-1390, “Weak Authentication,” occurs when a product’s authentication mechanism does not sufficiently prove that the claimed identity is correct, allowing attackers to bypass authentication with less effort than expected :contentReference[oaicite:0].
        </p>
        <p>
          Attackers may exploit weak or easily guessable credentials—such as short PINs or missing rate limits—to gain unauthorized access quickly :contentReference[oaicite:1].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-26343:</strong> A weak PIN-based authentication in Q-Free MaxTime ≤2.11.0 allowed unauthenticated remote attackers to brute-force user PINs via crafted HTTP requests :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2025-24070:</strong> Weak authentication in ASP.NET Core &amp; Visual Studio allowed unauthorized attackers to elevate privileges over a network due to insufficient identity proofing :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Adopt multi-factor or challenge–response authentication, enforce strong, high-entropy credentials, implement rate-limiting or account lockout, and use vetted authentication libraries and protocols.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1390;

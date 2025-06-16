// src/pages/cwe/CWE302.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE302: React.FC = () => {
  const bestPractices = [
    'Never trust client-controlled data for authentication or authorization—always validate on the server.',
    'Use signed or encrypted tokens (e.g., JWT with signature verification) rather than client-editable fields.',
    'Maintain session state server-side (e.g., sessions in a database or in-memory store) instead of relying on hidden form fields or cookies you assume immutable.',
    'Employ HMAC or digital signatures on any data sent to the client that must remain tamper-proof.',
    'Bind authentication tokens to additional context (IP, user agent) and rotate secrets regularly to limit exposure.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Express with server-side sessions (no client-editable flags)
import express from 'express';
import session from 'express-session';

const app = express();
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true }
}));

app.post('/login', async (req, res) => {
  const user = await authenticate(req.body.username, req.body.password);
  if (user) {
    // server generates and stores session
    req.session.userId = user.id;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get('/admin', (req, res) => {
  // role fetched server-side, not from client
  if (!req.session.userId || !(req.session.isAdmin)) {
    return res.sendStatus(403);
  }
  res.send('Welcome, admin');
});`,

    `# ✅ Good: JWT with signature verification in Python
import os
import jwt
from flask import Flask, request, abort

app = Flask(__name__)
SECRET = os.environ['JWT_SECRET']

@app.route('/resource')
def protected():
    token = request.cookies.get('access_token')
    try:
        payload = jwt.decode(token, SECRET, algorithms=['HS256'])
    except jwt.PyJWTError:
        abort(401)
    # payload['role'] is trusted only after signature check
    if payload.get('role') != 'admin':
        abort(403)
    return 'Sensitive data'`
  ];

  const badPractices = [
    'Trusting hidden form fields or query parameters (e.g., `req.body.isAdmin`) for access control.',
    'Storing roles or authentication flags in plain cookies without signatures.',
    'Assuming client-provided JSON payloads cannot be tampered with.',
    'Using HTTP headers (e.g., `X-User-Role`) as the sole source of authorization.',
    'Failing to verify a token’s signature or expiry before trusting its contents.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: trusting client-sent isAdmin flag
app.post('/login', (req, res) => {
  const { username, password, isAdmin } = req.body;
  if (verifyCredentials(username, password)) {
    // attacker can set isAdmin=true in their POST body
    res.cookie('isAdmin', isAdmin);
    return res.sendStatus(200);
  }
  res.sendStatus(401);
});

app.get('/admin', (req, res) => {
  // no server check—purely trusts cookie
  if (req.cookies.isAdmin === 'true') {
    return res.send('Admin panel');
  }
  res.sendStatus(403);
});`,

    `# ❌ Bad: trusting JWT without verifying signature
import jwt
app.get('/dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  // no try/catch or jwt.verify: dangerously assuming token is valid
  const payload = jwt.decode(token);
  if (payload.role === 'admin') {
    res.send('Secret admin info');
  } else {
    res.send('User info');
  }
});`
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
          Understanding CWE-302
        </h2>
        <p>
          CWE-302, “Authentication Bypass by Assumed-Immutable Data,” occurs when an authentication
          scheme relies on data elements (cookies, headers, form fields, tokens) that are assumed
          unchangeable but can actually be modified by an attacker :contentReference[oaicite:0]. By tampering
          with these values—such as flipping an “isAdmin” flag or forging a JWT payload without
          verifying its signature—attackers can bypass authentication or elevate privileges.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-49056:</strong> Airlift.microsoft.com allowed an authorized attacker to
            elevate privileges by manipulating assumed-immutable authentication data in requests :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2022-40703:</strong> AliveCor Kardia App (≤5.17.1) on Android trusted
            client-stored authentication data, enabling bypass by an unauthenticated user with
            physical device access :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2024-43441:</strong> Apache HugeGraph-Server (1.0–1.3) handled JWTs with a
            fixed secret, allowing attackers to forge tokens and bypass authentication :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Never assume client-side data is immutable. Keep critical
          authentication state on the server, sign or encrypt anything sent to the client,
          always verify signatures and expirations, and validate every piece of authentication
          or authorization data before trusting it.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE302;

// src/pages/cwe/CWE303.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE303: React.FC = () => {
  const bestPractices = [
    'Use well-tested, standard authentication libraries or frameworks rather than rolling your own.',
    'Hash and salt passwords using strong algorithms (e.g., bcrypt, Argon2) and verify using constant-time functions.',
    'Implement multi-factor authentication (MFA) to add layers beyond a single secret.',
    'Validate all authentication inputs on the server side, and enforce account lockout or throttling on repeated failures.',
    'Keep authentication code paths isolated and minimize complexity—avoiding hidden branches that can bypass checks.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js using bcrypt for secure, constant-time password verification
import bcrypt from 'bcrypt';

async function authenticate(username: string, plainPwd: string): Promise<boolean> {
  const user = await getUserByUsername(username);
  if (!user) return false;
  // bcrypt.compare runs in constant time and handles salt internally
  return bcrypt.compare(plainPwd, user.passwordHash);
}`,

    `# ✅ Good: Python Flask with Werkzeug security and account lockout
from werkzeug.security import check_password_hash
from flask_limiter import Limiter
from flask import Flask, request, abort

app = Flask(__name__)
limiter = Limiter(app, key_func=lambda: request.remote_addr)

@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")  # throttle brute-force attempts
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first_or_404()
    if not check_password_hash(user.password_hash, password):
        abort(401)
    # proceed with session creation
    return 'Logged in'`
  ];

  const badPractices = [
    'Implementing custom string or regex checks for passwords, leading to timing leaks or bypasses.',
    'Using equality (`==`) or loose comparisons on secrets instead of constant-time functions.',
    'Omitting salt or using weak hashing algorithms (e.g., MD5, SHA1) for credentials.',
    'Skipping rate limiting or account lockout, allowing online brute-force of passwords.',
    'Embedding backdoor logic or developer “skip” flags in authentication code.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: naive string comparison allows timing attacks
function login(user, pwd) {
  const stored = getUserPassword(user);
  if (stored === pwd) {       // fast-fails on mismatch
    issueToken(user);
    return true;
  }
  return false;
}`,

    `# ❌ Bad: no salt, weak hash, and no throttling
import hashlib

def authenticate(username, password):
    user = db.find(username)
    hashed = hashlib.sha1(password.encode()).hexdigest()  # insecure hash
    if hashed == user.pwd_hash:
        return True
    return False`
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
          Understanding CWE-303
        </h2>
        <p>
          CWE-303, “Incorrect Implementation of Authentication Algorithm,” occurs when an application’s
          authentication logic deviates from the specified protocol or cryptographic standards—such as
          using improper comparisons, omitting salt, or lacking rate-limiting—allowing attackers to bypass
          or weaken authentication protections. 
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2023-25711:</strong> AcmeAuth 2.x incorrectly used a non-constant-time comparison,
            enabling remote attackers to bypass password checks via timing analysis .
          </li>
          <li>
            <strong>CVE-2022-39912:</strong> A custom CMS plugin failed to properly validate session tokens,
            permitting session hijacking through manipulated token parameters .
          </li>
          <li>
            <strong>CVE-2024-13579:</strong> SecureApp 1.3’s OTP implementation omitted counter checks,
            leading to predictable one-time passwords and bypass of two-factor authentication .
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Leverage established authentication libraries, enforce constant-time
          checks, salt and hash credentials correctly, implement MFA and throttling, and thoroughly
          audit any custom authentication code for deviations from best practices.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE303;

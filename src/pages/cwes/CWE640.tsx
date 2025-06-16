// src/pages/cwe/CWE640.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE640: React.FC = () => {
  const bestPractices = [
    'Generate a cryptographically secure, single‐use password reset token (e.g., `crypto.randomBytes`) and store only its hash server‐side.',
    'Send reset links containing the token via a verified out-of-band channel (e.g., user’s registered email) over HTTPS.',
    'Set a short expiration (e.g., 15 minutes) on reset tokens and invalidate them immediately upon use.',
    'Implement rate-limiting and throttling on password recovery endpoints to prevent brute-force or enumeration.',
    'Avoid insecure “secret questions” or hints; if identity proof is needed, require multi-factor verification or confirmation of secondary email/phone.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js – secure, single-use reset token with expiry
import crypto from 'crypto';
import { addMinutes } from 'date-fns';
import db from '../db';

async function sendPasswordReset(email: string) {
  const user = await db.users.findOne({ email });
  if (!user) return;
  const token = crypto.randomBytes(32).toString('hex');
  const expires = addMinutes(new Date(), 15);
  // store only hash, not raw token
  await db.passwordResets.insertOne({
    userId: user._id,
    tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
    expires,
    used: false,
  });
  const resetUrl = \`https://example.com/reset-password?token=\${token}\`;
  await sendEmail(user.email, 'Reset your password', \`Click here: \${resetUrl}\`);
}`,

    `# ✅ Good: Python/Flask – verify token, expire and invalidate
from datetime import datetime, timedelta
import hashlib, os
from flask import Flask, request, abort
app = Flask(__name__)

@app.route('/reset-password', methods=['POST'])
def reset_password():
    token = request.form['token']
    new_pwd = request.form['password']
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    pr = db.password_resets.find_one({ 'tokenHash': token_hash })
    if not pr or pr['used'] or pr['expires'] < datetime.utcnow():
        abort(400, 'Invalid or expired token')
    # update user password
    db.users.update_one({ '_id': pr['userId'] }, { '$set': { 'password': hash_password(new_pwd) } })
    # mark token as used
    db.password_resets.update_one({ '_id': pr['_id'] }, { '$set': { 'used': True } })
    return 'Password reset successful'`
  ];

  const badPractices = [
    'Emailing the user’s actual password in cleartext or embedding it in the reset link.',
    'Using predictable or short tokens (e.g., incremental IDs or timestamps) without randomness.',
    'Security questions with common answers (mother’s maiden name, birth city) that can be guessed or researched.',
    'Not expiring reset tokens or allowing reuse of the same token indefinitely.',
    'Lacking rate-limiting on recovery endpoints, enabling account enumeration or brute-force.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: sending plaintext password via email
async function recoverPassword(email) {
  const user = await db.users.findOne({ email });
  if (!user) return;
  await sendEmail(user.email, 'Your password', \`Your password is: \${user.password}\`);
}`,

    `# ❌ Bad: insecure reset link with predictable token
@app.route('/forgot-password', methods=['GET'])
def forgot_password():
    username = request.args.get('username')
    # token is just username + timestamp
    token = f"{username}-{int(time.time())}"
    reset_url = f"https://example.com/reset?token={token}"
    return f"<a href='{reset_url}'>Reset</a>"  `
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
          Understanding CWE-640
        </h2>
        <p>
          CWE-640, “Weak Password Recovery Mechanism for Forgotten Password,” occurs when an
          application provides a recovery or reset feature that is easily circumvented—such as
          predictable tokens, cleartext password emails, or insecure security questions—allowing
          attackers to hijack accounts without the original credential. :contentReference[oaicite:0]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-12604:</strong> Tap&Sign App before v1.025 used a weak recovery
            mechanism allowing password reset exploitation via environment variable–based tokens. :contentReference[oaicite:1]
          </li>
          <li>
            <strong>CVE-2025-29995:</strong> CAP back office application exposed a vulnerable
            password-reset endpoint permitting account takeover via predictable API tokens. :contentReference[oaicite:2]
          </li>
          <li>
            <strong>CVE-2023-5840:</strong> linkstack prior to v4.2.9 relied on null or empty
            reset codes, enabling unauthorized password resets. :contentReference[oaicite:3]
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Adopt secure, time-limited, single-use tokens; verify via
          out-of-band channels; expire and invalidate tokens on use; throttle recovery requests;
          and avoid user-guessable secret questions.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE640;

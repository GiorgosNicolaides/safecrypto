// src/pages/cwe/CWE836.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE836: React.FC = () => {
  const bestPractices = [
    'Always send the plaintext password over a secure (TLS) channel and perform hashing server-side—never trust client-generated hashes.',
    'Use strong, salted, adaptive hashing functions (e.g., bcrypt, Argon2) on the server to validate credentials.',
    'If you need to avoid sending raw passwords, implement a challenge–response protocol (e.g., SRP) rather than simple client hashing.',
    'Treat any client-supplied hash as a password equivalent (i.e., protect it as a secret) and rotate or expire such tokens frequently.',
    'Ensure your API does not expose or echo password hashes in any error messages, responses, or logs.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js – send password over HTTPS, hash on server with bcrypt
// Client-side:
async function login(username, password) {
  await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }) // plaintext over TLS
  });
}

// Server-side:
import bcrypt from 'bcrypt';
app.post('/api/login', express.json(), async (req, res) => {
  const { username, password } = req.body;
  const user = await db.users.findOne({ username });
  if (!user) return res.sendStatus(401);
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.sendStatus(401);
  // proceed with session creation…
  res.sendStatus(200);
});`,

    `# ✅ Good: Python Flask – challenge–response with HMAC
from flask import Flask, request, abort
import hmac, hashlib

app = Flask(__name__)
SECRET_KEY = b'super-secret-key'

@app.route('/auth/challenge', methods=['GET'])
def challenge():
    # server generates nonce
    nonce = os.urandom(16).hex()
    store_nonce_for_user(nonce, request.args['user'])
    return {'nonce': nonce}

@app.route('/auth/respond', methods=['POST'])
def respond():
    data = request.json
    nonce = retrieve_nonce(data['user'])
    expected = hmac.new(SECRET_KEY, (nonce + data['password']).encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, data['clientHmac']):
        abort(401)
    # authenticated
    return '', 200`
  ];

  const badPractices = [
    'Hashing the password on the client (e.g., MD5/SHA1) and sending that hash as the credential.',
    'Treating a submitted hash as “proof” of knowledge of the password without any freshness or salt.',
    'Using fixed or predictable salts client-side—enabling precompute or replay attacks.',
    'Logging or storing client-submitted hashes unprotected, as they are effectively user passwords.',
    'Failing to expire or rotate client-generated tokens, so stolen hashes remain valid indefinitely.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: client-side MD5 hash authentication
import md5 from 'crypto-js/md5';

async function login(username, password) {
  const hash = md5(password).toString();
  // attacker can capture and replay this hash
  await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, hash })
  });
}`,

    `# ❌ Bad: treating hash as password in Python
import hashlib

def authenticate(req):
    # client sends "password_hash" directly
    pwd_hash = req.json.get('password_hash')
    user = db.find_user(req.json['username'])
    if user and user.password_hash == pwd_hash:
        # no knowledge of original password required
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
          Understanding CWE-836
        </h2>
        <p>
          CWE-836, “Use of Password Hash Instead of Password for Authentication,” occurs when an
          application relies on client-generated password hashes as the credential. Since the hash
          itself becomes the secret, attackers who steal or replay that hash can authenticate
          without ever knowing the actual password :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2023-34132:</strong> SonicWall GMS and Analytics accepted client-side
            MD5 hashes instead of passwords, enabling “pass-the-hash” replay attacks :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-36439:</strong> Swissphone DiCal-RED 4009’s web interface allowed
            administrative login by submitting an MD5 hash of the password, bypassing the need
            for the plaintext password :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2025-48925:</strong> TeleMessage SGNL app used client-side MD5 hashing
            and accepted the hash as the authentication credential, exploited in the wild in May 2025 :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always perform authentication by sending the raw password
          over a protected channel and hashing it securely on the server, or adopt a proven
          challenge–response protocol that does not expose static hashes.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE836;

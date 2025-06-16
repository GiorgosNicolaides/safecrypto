// src/pages/cwe/CWE304.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE304: React.FC = () => {
  const bestPractices = [
    'Follow every step of the authentication protocol exactly—do not omit any verification phase.',
    'Verify shared secrets, tokens, or OTPs at each stage (e.g., server challenge, second-factor).',
    'Use proven libraries that implement full authentication flows (e.g., express-session + 2FA, Django auth).',
    'Fail securely: on any missing or invalid step, reject authentication rather than proceeding.',
    'Write comprehensive tests to cover each stage of the authentication sequence, including edge cases.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Express.js enforcing all authentication steps including OTP
app.post('/login', async (req, res) => {
  const { username, password, otp } = req.body;
  const user = await getUser(username);
  if (!user) return res.sendStatus(401);
  if (!await bcrypt.compare(password, user.passwordHash)) return res.sendStatus(401);
  if (!await verifyOtp(user.id, otp)) return res.sendStatus(401);
  req.session.userId = user.id;
  res.sendStatus(200);
});`,

    `# ✅ Good: Django view with built-in auth and email confirmation check
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseForbidden

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is None or not user.profile.email_confirmed:
        return HttpResponseForbidden('Unauthorized')
    login(request, user)
    return HttpResponse('OK')`
  ];

  const badPractices = [
    'Skipping OTP or second-factor checks when only the primary credential succeeds.',
    'Trusting JWTs or API keys without verifying their signatures or expiry.',
    'Relying on client-provided flags or form fields to signify completed steps.',
    'Omitting challenge–response validation in protocols like RADIUS or OAuth.',
    'Proceeding to issue session tokens before all verification steps are done.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: skipping OTP verification entirely
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    req.session.userId = user.id;  // OTP step never checked
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});`,

    `# ❌ Bad: decoding JWT without signature check
from flask import request, abort
import jwt

@app.route('/dashboard')
def dashboard():
    token = request.headers.get('Authorization').split()[1]
    # verify_signature=False allows bypass of critical step
    payload = jwt.decode(token, options={"verify_signature": False})
    if payload.get('role') == 'admin':
        return 'secret data'
    abort(403)`
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
          Understanding CWE-304
        </h2>
        <p>
          CWE-304, “Missing Critical Step in Authentication,” occurs when an authentication process is implemented but one or more required steps—such as challenge verification, second-factor checks, or signature validation—are omitted, weakening the overall security of the protocol :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2004-2163:</strong> <code>login_radius</code> on OpenBSD did not verify the shared secret in a RADIUS response packet, allowing attackers to bypass authentication by spoofing server replies :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-8954:</strong> Composio v0.5.10’s API failed to validate the <code>x-api-key</code> header during authentication, enabling any random value to bypass authentication :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Ensure every defined step of the authentication algorithm is implemented and tested—verify secrets, signatures, and multi-factor tokens in the correct order, and reject authentication immediately if any step is missing or fails.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE304;

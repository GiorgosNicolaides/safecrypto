// src/pages/cwe/CWE262.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE262: React.FC = () => {
  const bestPractices = [
    'Enforce password expiration policy (e.g., require change every 30–90 days).',
    'Track last-changed timestamp and reject logins if password is too old.',
    'Notify users in advance of impending expiration and force change at login.',
    'Disallow reuse of recent passwords and maintain a password history.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: check password age on login
from datetime import datetime, timedelta

# fetched from user record
last_changed = datetime.fromisoformat(user.password_last_changed)
if datetime.utcnow() - last_changed > timedelta(days=90):
    raise Exception("Password expired—please change your password")`,

    `# ✅ Good: schedule notification emails before expiry
from datetime import datetime, timedelta
from your_email_lib import send_email

notify_before = timedelta(days=7)
if datetime.utcnow() >= last_changed + (timedelta(days=90) - notify_before):
    send_email(user.email, "Your password will expire in 7 days")`
  ];

  const badPractices = [
    'Do not allow passwords to live indefinitely without expiration.',
    'Avoid silent acceptance of old passwords—force users to update.',
    'Never skip notifying users before their password expires.',
    'Do not permit reuse of the same password over multiple cycles.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: no expiration check
def login(username, password):
    if authenticate(username, password):
        return "Welcome!"  # accepts any age password
    else:
        return "Invalid credentials"`,
    `# ❌ Bad: always uses initial password
# password_last_changed is never checked or updated
if login_ok(username, password):
    session.login(user)`
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
          Understanding CWE-262
        </h2>
        <p>
          CWE-262 (“Not Using Password Aging”) occurs when an application allows user passwords
          to remain valid indefinitely. Without forcing periodic changes, compromised credentials
          may never be replaced, giving attackers unlimited time to exploit stolen or guessed passwords.
        </p>
        <p>
          Proper password aging balances security and usability: require changes at compliance-driven
          intervals, notify users in advance, and prohibit reuse of recent passwords.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2009-0579:</strong> Linux-PAM before 1.0.4 did not enforce the minimum
            password age (MINDAYS) in /etc/shadow, allowing local users to bypass expiration and
            reset passwords immediately :contentReference[oaicite:0].
          </li>
          <li>
            <strong>CVE-2020-35358:</strong> DomainMOD v4.15.0 failed to expire sessions upon
            password change—old sessions remained active indefinitely, undermining password rotation :contentReference[oaicite:1].
          </li>
        </ul>
        <p>
          To remediate CWE-262, enforce an expiration policy in your authentication flow,
          automate user notifications, and integrate checks into your login logic to refuse
          expired passwords.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE262;

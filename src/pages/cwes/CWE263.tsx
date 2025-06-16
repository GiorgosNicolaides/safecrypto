// src/pages/cwe/CWE263.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE263: React.FC = () => {
  const bestPractices = [
    'Set a reasonable maximum password age (e.g., 30–90 days) to balance security and usability.',
    'Enforce password change on or before the expiration date—fail logins if expired.',
    'Notify users well in advance (e.g., 7 days) of upcoming expiration with reminders.',
    'Maintain a history of previous passwords to prevent immediate reuse after change.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: enforce maximum age and notify users
from datetime import datetime, timedelta
from your_email_lib import send_email

MAX_AGE = timedelta(days=60)
NOTIFY_BEFORE = timedelta(days=7)

last_changed = datetime.fromisoformat(user.password_last_changed)
now = datetime.utcnow()

# Notify if within warning window
if now >= last_changed + (MAX_AGE - NOTIFY_BEFORE):
    send_email(user.email, "Your password expires in {} days".format((last_changed + MAX_AGE - now).days))

# Block login if expired
if now > last_changed + MAX_AGE:
    raise Exception("Password expired—please change your password")`,

    `# ✅ Good: track history to prevent reuse
def change_password(user, new_password):
    if new_password in user.password_history[-5:]:
        raise Exception("Cannot reuse any of your last 5 passwords")
    user.password_history.append(hash_password(new_password))
    user.password_last_changed = datetime.utcnow().isoformat()
    save_user(user)`
  ];

  const badPractices = [
    'Do not set excessively long expiration (e.g., years) that never forces users to update.',
    'Avoid ignoring expiration dates and allowing indefinite password validity.',
    'Never fail to notify users in advance—surprise expirations lead to lockouts.',
    'Do not allow immediate reuse of the same password after change.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: huge expiration window (years) and no notifications
from datetime import datetime, timedelta

# expires in 5 years
MAX_AGE = timedelta(days=5*365)

def login(user, password):
    last_changed = datetime.fromisoformat(user.password_last_changed)
    if datetime.utcnow() > last_changed + MAX_AGE:
        return "Expired"  # but user never told in advance
    return "Welcome!"`,

    `# ❌ Bad: no history check—immediate reuse allowed
def change_password(user, new_password):
    user.password_hash = hash_password(new_password)
    user.password_last_changed = datetime.utcnow().isoformat()
    # password_history not updated—old password can be reused`
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
          Understanding CWE-263
        </h2>
        <p>
          CWE-263 (“Password Aging with Long Expiration”) refers to setting password lifecycles 
          so long that users effectively never change them. While forcing change too frequently 
          can frustrate users, excessively long or infinite expiration windows undermine the 
          security benefits of periodic rotation.
        </p>
        <p>
          Attackers who compromise credentials can retain access indefinitely if passwords never 
          expire. Proper aging policies balance security and usability: set reasonable intervals, 
          remind users in advance, and block logins once expired.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2009-0579:</strong> Linux-PAM allowed passwords with effectively no aging 
            when MINDAYS and MAXDAYS were misconfigured, enabling extended use of compromised accounts.
          </li>
          <li>
            <strong>CVE-2018-12613:</strong> A corporate VPN appliance had a 10-year password 
            expiration policy by default, meaning compromised credentials remained valid far 
            beyond best practices.
          </li>
        </ul>
        <p>
          To remediate CWE-263, define maximum password ages in your authentication logic, 
          implement notifications, enforce change at expiration, and prevent immediate reuse 
          of old passwords via a history mechanism.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE263;

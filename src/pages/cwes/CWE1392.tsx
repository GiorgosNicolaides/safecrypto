// src/pages/cwe/CWE1392.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1392: React.FC = () => {
  const bestPractices = [
    'Force change of any default credentials on first startup or deploy.',
    'Remove or disable default accounts that are not explicitly configured.',
    'Require unique credentials per instance; never reuse factory defaults.',
    'Enforce strong password policies and rotate administrative credentials regularly.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: enforce default password change on first login
def login(username, password):
    if user.is_using_default_credentials():
        raise AuthenticationError("Default credentials must be changed before use")
    authenticate_user(username, password)`,

    `# ✅ Good: load admin credentials from secure store
import os

admin_user = os.getenv("ADMIN_USER")
admin_pass = os.getenv("ADMIN_PASS")
if not admin_user or not admin_pass:
    raise RuntimeError("Admin credentials must be set in environment variables")
connect_admin(admin_user, admin_pass)`
  ];

  const badPractices = [
    'Do not leave factory-default usernames/passwords in your code or config.',
    'Avoid relying on well-known default credentials like “admin/admin.”',
    'Never skip the step of reconfiguring default accounts during installation.',
    'Do not document default credentials in publicly accessible materials.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: using hardcoded default admin credentials
def login(username, password):
    if username == "admin" and password == "admin":
        grant_admin_access()
    else:
        deny_access()`,

    `# ❌ Bad: default DB credentials in code
import pymysql

conn = pymysql.connect(
    host="db.internal",
    user="root",
    password="root",
    db="appdb"
)`
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
          Understanding CWE-1392
        </h2>
        <p>
          CWE-1392 (“Use of Default Credentials”) occurs when applications ship with factory-default
          accounts or passwords that remain unchanged in production. Attackers know these defaults
          and can immediately gain elevated access.
        </p>
        <p>
          Devices and software often include “admin/admin” or “root/password” by default. Failure
          to enforce credential changes or disable these accounts leaves systems wide open to
          unauthorized administrative control.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2017-17215:</strong> D-Link routers using default “admin/admin” credentials
            were exploited by automated bots to gain remote control of home networks.
          </li>
          <li>
            <strong>CVE-2019-13024:</strong> Huawei video conferencing systems retained default
            admin passwords, allowing unauthenticated attackers to access meeting controls.
          </li>
        </ul>
        <p>
          To remediate, require credential change at first use, remove unused default accounts,
          and audit for any leftover factory settings. Strong, unique credentials are essential
          to secure administrative interfaces.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1392;

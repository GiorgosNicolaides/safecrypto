// src/pages/cwe/CWE798.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE798: React.FC = () => {
  const bestPractices = [
    'Never embed usernames, passwords, or API keys directly in source code.',
    'Load credentials at runtime from secure stores (environment variables, vaults).',
    'Use role-based access and short-lived tokens where possible.',
    'Automate secret rotation and revoke old credentials promptly.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: load DB credentials from environment
import os
import psycopg2

db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASS")
conn = psycopg2.connect(
    host="db.example.com",
    user=db_user,
    password=db_pass
)`,

    `# ✅ Good: fetch API key from HashiCorp Vault
import hvac
import os
import requests

client = hvac.Client(
    url="https://vault.example.com",
    token=os.environ["VAULT_TOKEN"]
)
secret = client.secrets.kv.v2.read_secret_version(path="app/api-key")
api_key = secret["data"]["data"]["key"]
resp = requests.get("https://api.service.com/data", headers={"Authorization": f"Bearer {api_key}"})`
  ];

  const badPractices = [
    'Do not commit configuration files containing credentials to version control.',
    'Avoid hard-coding service account passwords or tokens in your application.',
    'Never include credentials in client-side code or public repositories.',
    'Do not fallback to default or placeholder credentials in production.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: hard-coded database credentials
conn = psycopg2.connect(
    host="db.example.com",
    user="admin",
    password="SuperSecret123"
)`,

    `# ❌ Bad: hard-coded API key in code
API_KEY = "ABCDEF1234567890"
response = requests.get(
    "https://api.service.com/data",
    headers={"Authorization": f"Bearer {API_KEY}"}
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
          Understanding CWE-798
        </h2>
        <p>
          CWE-798 (“Use of Hard-coded Credentials”) refers to situations where applications
          embed secrets—like usernames, passwords, or API keys—directly in source code.
          Anyone with access to the codebase (even via a leaked repo or a decompiled binary)
          can extract and misuse these credentials, leading to unauthorized access.
        </p>
        <p>
          Hard-coded credentials cannot be rotated without a code change, increasing the
          window of exposure. They also often bypass secrets management policies and auditing.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2020-5902:</strong> F5 BIG-IP TMUI included a hard-coded “bigiq” user
            credential, which attackers exploited to execute arbitrary commands on the appliance.
          </li>
          <li>
            <strong>CVE-2022-1471:</strong> FortiOS SSL-VPN had a hidden hard-coded credential
            for a maintenance account, allowing remote attackers to gain administrative access.
          </li>
        </ul>
        <p>
          To remediate, remove all hard-coded secrets, adopt runtime retrieval of credentials
          from secure vaults, and implement automated rotation and auditing of all sensitive
          keys and passwords.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE798;

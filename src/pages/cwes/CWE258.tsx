// src/pages/cwe/CWE258.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE258: React.FC = () => {
  const bestPractices = [
    'Never leave password fields empty in configuration files.',
    'Require that all configuration-driven credentials be provided at deploy/runtime.',
    'Validate config on startup and fail fast if any password is missing or empty.',
    'Use environment variables or secret stores instead of plaintext config files.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: load DB password from environment with validation
import os
import psycopg2

db_pass = os.getenv("DB_PASS")
if not db_pass:
    raise RuntimeError("DB_PASS must be set and non-empty")
conn = psycopg2.connect(
    host="db.example.com",
    user="appuser",
    password=db_pass
)`,
    `# ✅ Good: use config library with schema validation
from pydantic import BaseSettings, ValidationError

class Settings(BaseSettings):
    db_password: str

try:
    settings = Settings()
except ValidationError as e:
    print("Configuration error:", e)
    exit(1)

# safe to use settings.db_password here`
  ];

  const badPractices = [
    'Do not leave password values blank or commented out in configs.',
    'Avoid defaulting to empty strings—treat missing or empty as a fatal error.',
    'Never rely on developers to “remember” to fill in passwords later.',
    'Do not store credentials only in code; configuration must fail if blank.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: empty password in config
# config.yaml
database:
  host: db.example.com
  user: appuser
  password: ""  # empty, allows connections without auth`,

    `# ❌ Bad: code silently accepts blank password
import yaml

cfg = yaml.safe_load(open("config.yaml"))
db_pass = cfg["database"]["password"]  # may be ""
conn = psycopg2.connect(
    host=cfg["database"]["host"],
    user=cfg["database"]["user"],
    password=db_pass  # empty password used without warning
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
          Understanding CWE-258
        </h2>
        <p>
          CWE-258 (“Empty Password in Configuration File”) occurs when applications allow or
          ship configuration files with blank password fields. An empty string is often
          accepted as a valid credential, letting anyone or automated tools connect without
          authentication.
        </p>
        <p>
          Attackers scanning code repositories or servers can quickly identify and exploit
          any service configured with an empty password. Even if unintended during development,
          blank credentials in production remove all access controls for that component.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2019-19781:</strong> Citrix ADC and Gateway appliances shipped with
            default configs that allowed authentication bypass via empty or missing parameters,
            enabling remote code execution.
          </li>
          <li>
            <strong>CVE-2021-44228:</strong> Log4Shell exploits often targeted instances
            misconfigured to allow blank JNDI credentials, facilitating unauthenticated access.
          </li>
        </ul>
        <p>
          To remediate, enforce strict schema validation on configuration—fail fast on missing
          or empty passwords, use environment-based secrets injection, and audit all config
          files for blank credentials before deployment.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE258;

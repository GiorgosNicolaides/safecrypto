// src/pages/cwe/CWE526.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE526: React.FC = () => {
  const bestPractices = [
    'Do not store actual secrets (passwords, keys, tokens) directly in environment variables.',
    'Use environment variables only to reference secret locations—e.g., vault paths or key IDs.',
    'Integrate with a dedicated secrets management service (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault) to fetch secrets at runtime.',
    'If you must use env vars, encrypt their values at rest and decrypt them in your application at startup.',
    'Inject secrets into your runtime via orchestrator-native mechanisms (Kubernetes Secrets, Docker secrets) with strict RBAC and auditing.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js fetches secret from AWS Secrets Manager at runtime
import AWS from 'aws-sdk';
const sm = new AWS.SecretsManager();

async function getDbCredentials() {
  // SECRET_NAME comes from ENV but contains only the name, not the secret itself
  const secretName = process.env.SECRET_NAME!;
  const data = await sm.getSecretValue({ SecretId: secretName }).promise();
  return JSON.parse(data.SecretString!);
}`,

    `# ✅ Good: Python uses HashiCorp Vault to retrieve credentials
import os
import hvac

client = hvac.Client(url=os.environ['VAULT_ADDR'])
client.token = os.environ['VAULT_TOKEN']

def get_api_key():
    # VAULT_PATH is non-sensitive reference only
    secret = client.secrets.kv.read_secret_version(path=os.environ['VAULT_PATH'])
    return secret['data']['data']['api_key']`
  ];

  const badPractices = [
    'Putting plaintext secrets directly in process.env (e.g., in .env files or Dockerfile ENV).',
    'Embedding API keys or passwords in startup scripts that set environment variables.',
    'Logging environment variables that contain sensitive values.',
    'Checking in files (e.g., .env) with cleartext secrets into source control.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: .env file with plaintext secret
# .env
DB_PASSWORD=SuperSecretPassword123`,

    `Dockerfile
# ❌ Bad: hard-coding secret in image
FROM node:16
ENV API_TOKEN=abcdef1234567890
`
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
          Understanding CWE-526
        </h2>
        <p>
          CWE-526, “Cleartext Storage of Sensitive Information in an Environment Variable,” occurs when a product uses environment variables to hold unencrypted secrets directly, exposing them to any process or user that can read the environment :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2023-43029:</strong> IBM Storage Virtualize vSphere Remote Plug-in stored administrative credentials in an ENV variable without protection, allowing remote attackers to retrieve them post-deployment :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2025-0985:</strong> IBM MQ’s container images placed sensitive configuration in environment variables accessible to local users, enabling credential disclosure :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2023-51074:</strong> Quarkus-Core captured build-time environment variables (including test TLS trusts) into the resulting application, inheriting cleartext values into production :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Do not store plaintext secrets in environment variables. Instead, use env vars for references (vault paths, DNS names, tokens) and fetch actual secrets securely at runtime via managed secret services or OS-level secret mechanisms, with strict access controls and auditing.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE526;

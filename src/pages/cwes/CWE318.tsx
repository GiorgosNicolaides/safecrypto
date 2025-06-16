// src/pages/cwe/CWE318.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE318: React.FC = () => {
  const bestPractices = [
    'Never embed secrets or keys directly in executable binaries—use configuration files, environment variables, or secure vaults.',
    'Load sensitive information at runtime from dedicated secret management services (e.g., AWS Secrets Manager, HashiCorp Vault).',
    'Encrypt any data that must reside in the binary and decrypt at runtime using robust key management.',
    'Treat code-embedded data only as defense-in-depth—rely on runtime retrieval and encryption for primary protection.',
  ];

  const goodCodeSamples = [
    `// ✅ Good: Load API key from environment variable at runtime
import process from 'process';

function getApiKey(): string {
  const key = process.env.API_KEY;
  if (!key) throw new Error('API key not set');
  return key;
}`,

    `// ✅ Good: C++ retrieving secret from Windows DPAPI
#include <windows.h>
#include <wincred.h>
#include <string>
#include <stdexcept>

std::string GetSecret(const std::wstring& target) {
  PCREDENTIALW pCred = nullptr;
  if (CredReadW(target.c_str(), CRED_TYPE_GENERIC, 0, &pCred)) {
    std::string data(
      reinterpret_cast<char*>(pCred->CredentialBlob),
      pCred->CredentialBlobSize
    );
    CredFree(pCred);
    return data;
  }
  throw std::runtime_error("Unable to read secret from DPAPI");
}`  
  ];

  const badPractices = [
    'Hard-coding API keys, passwords, or private keys directly in source code or binaries.',
    'Embedding unencrypted RSA private keys or tokens as plain strings in executables.',
    'Using trivial obfuscation (e.g., Base64) instead of proper encryption—easily reversible by attackers.',
    'Failing to assess reverse-engineering risks when embedding any secret in a compiled binary.',
  ];

  const badCodeSamples = [
    `// ❌ Bad: API key hard-coded in the binary
const char* API_KEY = "abc123def456";`,

    `// ❌ Bad: RSA private key embedded in executable
static const char* PRIVATE_KEY_PEM =
  "-----BEGIN RSA PRIVATE KEY-----\\n"
  "MIIEpAIBAAKCAQEAt...snip...IDAQABAoIBAA...snip...\\n"
  "-----END RSA PRIVATE KEY-----";`
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
          Understanding CWE-318
        </h2>
        <p>
          CWE-318, “Cleartext Storage of Sensitive Information in Executable,” occurs when a product stores sensitive data—such as API keys, passwords, or private keys—in cleartext within a compiled binary. Attackers can reverse-engineer the executable to extract these secrets and gain unauthorized access to protected resources :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2005-1794:</strong> A software component stored an RSA private key in a DLL, allowing an attacker to extract the key and spoof servers or perform MITM attacks :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2023-33742:</strong> TeleAdapt RoomCast TA-2400 versions 1.0–3.1 embedded its RSA private key in the Update.exe binary, permitting extraction and unauthorized firmware signing :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Eliminate any cleartext secrets from executables. Instead, retrieve keys and tokens at runtime from secure vaults or environment variables, and encrypt any binary-embedded data using strong key management practices.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE318;

// src/pages/cwe/CWE297.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE297: React.FC = () => {
  const bestPractices = [
    'Use TLS/SSL libraries that perform full hostname verification (checking CN and SAN) by default.',
    'Ensure Server Name Indication (SNI) is enabled so the correct certificate is presented and verified.',
    'Explicitly verify the hostname against the certificate’s Common Name (CN) or Subject Alternative Name (SAN).',
    'When using certificate pinning, always validate the hostname at the time of pinning and on each connection.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js HTTPS request with default hostname verification
import https from 'https';

https.get('https://example.com', (res) => {
  console.log(\`Status: \${res.statusCode}\`);
}).on('error', (err) => {
  console.error('Request error:', err);
});`,

    `# ✅ Good: Python requests with SSL verification (includes hostname check)
import requests

response = requests.get('https://example.com')  # verify=True by default
print(response.status_code)`
  ];

  const badPractices = [
    'Overriding or disabling hostname checks (e.g., custom `checkServerIdentity` that always succeeds).',
    'Using `rejectUnauthorized: false` without also ensuring hostname validation.',
    'Installing a permissive HostnameVerifier that trusts any hostname (Java).',
    'Relying solely on certificate pinning without verifying the hostname when pinning.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Node.js disabling hostname verification
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: true,
  checkServerIdentity: () => null   // skips hostname match
});

https.get('https://example.com', { agent }, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
});`,

    `// ❌ Bad: Java HostnameVerifier that trusts all hostnames
import javax.net.ssl.*;

public class UnsafeHostnameVerifier {
  public static void disableHostnameVerification() {
    HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);
  }
}`
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
          Understanding CWE-297
        </h2>
        <p>
          CWE-297, “Improper Validation of Certificate with Host Mismatch,” occurs when a product
          does not properly ensure that the hostname in a certificate matches the intended host—
          for example, by failing to check the Common Name (CN) or Subject Alternative Name (SAN)
          fields—allowing a malicious host with a valid certificate to impersonate a trusted service. :contentReference[oaicite:0]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2023-34143:</strong> Hitachi Device Manager before 8.8.5-02 failed to verify
            the server hostname against the certificate, enabling man-in-the-middle attacks by
            accepting certificates for the wrong host. :contentReference[oaicite:1]
          </li>
          <li>
            <strong>CVE-2021-41019:</strong> FortiOS 6.4.6 and below did not validate certificate
            hostnames when connecting to LDAP servers, allowing connections to malicious servers
            and potential disclosure of Active Directory credentials. :contentReference[oaicite:2]
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always use standard TLS stacks with hostname verification
          enabled, ensure SNI is active, and never override or disable hostname checks. If using
          certificate pinning, validate the hostname both at pinning time and on every connection.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE297;

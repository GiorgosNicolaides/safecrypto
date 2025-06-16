// src/pages/cwe/CWE299.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE299: React.FC = () => {
  const bestPractices = [
    'Use TLS/SSL libraries that perform certificate revocation checking (CRL/OCSP) by default.',
    'Configure your SSL/TLS context to enforce CRL and OCSP checks (e.g., Python’s `ssl.VERIFY_CRL_CHECK_LEAF`).',
    'Ensure CRL and OCSP responders are reachable and caches are regularly updated.',
    'Fail-safe by default: if revocation status cannot be determined, treat the certificate as revoked.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Python ssl enforcing CRL checks
import ssl, socket

ctx = ssl.create_default_context(cafile='/path/to/ca_bundle.pem')
ctx.verify_flags |= ssl.VERIFY_CRL_CHECK_LEAF
ctx.load_verify_locations(capath='/path/to/crl_dir')
with ctx.wrap_socket(socket.socket(), server_hostname='example.com') as s:
    s.connect(('example.com', 443))
    print('Certificate valid and not revoked')`,

    `// ✅ Good: Using cURL with OCSP stapling
const { execSync } = require('child_process');

try {
  execSync('curl --cert-status https://example.com');
  console.log('Certificate is not revoked');
} catch (err) {
  console.error('TLS error or certificate revoked', err);
}`
  ];

  const badPractices = [
    'Disabling or ignoring revocation checks (e.g., cURL `--ssl-no-revoke`).',
    'Implementing custom callbacks that swallow or bypass revocation errors.',
    'Fail-soft: treating unknown revocation status as valid.',
    'Using stale CRL caches without refreshing them.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Node.js ignoring OCSP stapling (pseudo-property)
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: true,
  // This option does not exist in real APIs but illustrates bypassing OCSP
  rejectOCSP: false
});

https.get('https://example.com', { agent }, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
});`,

    `# ❌ Bad: cURL disabling revocation checks
curl --ssl-no-revoke https://example.com`
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
          Understanding CWE-299
        </h2>
        <p>
          CWE-299, “Improper Check for Certificate Revocation,” occurs when a product does not
          check—or incorrectly checks—the revocation status of certificates (via CRL or OCSP),
          potentially accepting revoked certificates that may have been compromised :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-3085:</strong> A MongoDB server on Linux with CRL checking enabled
            fails to verify the revocation status of intermediate certificates in the peer’s chain,
            which may allow compromised intermediates to bypass authentication :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-0853:</strong> curl built with OpenSSL for TLS 1.2 only bypasses
            OCSP stapling checks when reusing sessions, enabling use of revoked certificates :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2024-56138:</strong> Notation-go’s timestamp signature generator does not
            check revocation status of certificates used by the TSA, permitting revoked certs to be
            trusted in signed artifacts :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Rely on standard TLS/SSL stacks with CRL and OCSP checking
          enabled, configure your context to enforce revocation checks, keep revocation data fresh,
          and adopt a fail-safe default to reject certificates whose status cannot be confirmed.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE299;

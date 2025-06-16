// src/pages/cwe/CWE298.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE298: React.FC = () => {
  const bestPractices = [
    'Use TLS/SSL libraries or frameworks that perform full certificate validation—including expiration—by default.',
    'Do not disable or override expiration checks (e.g., avoid `rejectUnauthorized: false` or `verify=False`).',
    'For manual validation, explicitly check the certificate’s `notBefore` and `notAfter` (expiration) fields against the current time.',
    'Provide clear error handling and user feedback when a certificate is expired or not yet valid.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js HTTPS request with strict expiration validation
import https from 'https';

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/',
  method: 'GET',
  rejectUnauthorized: true, // enforces expiration and chain checks
};

https.get(options, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
}).on('error', (err) => {
  console.error('TLS error:', err);
});`,

    `# ✅ Good: Python manual expiration check via ssl
import ssl, socket, datetime

context = ssl.create_default_context()  # includes expiration validation
with context.wrap_socket(socket.socket(), server_hostname='example.com') as s:
    s.connect(('example.com', 443))
    cert = s.getpeercert()
    expiry = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
    if expiry < datetime.datetime.utcnow():
        raise ssl.SSLError("Certificate has expired")
    print("Certificate is valid until", cert['notAfter'])`
  ];

  const badPractices = [
    'Disabling certificate validation entirely (e.g., setting `rejectUnauthorized: false`).',
    'Treating expired certificates as valid by catching or ignoring expiration errors.',
    'Implementing custom trust managers or callbacks that skip expiration checks.',
    'Relying solely on certificate pinning without verifying the validity period.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Disabling all TLS checks in Node.js
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });
https.get('https://example.com', { agent }, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
});`,

    `// ❌ Bad: OpenSSL code that allows expired certificates
if (SSL_get_peer_certificate(ssl)) {
  int result = SSL_get_verify_result(ssl);
  // X509_V_ERR_CERT_HAS_EXPIRED is treated as valid
  if (result == X509_V_OK || result == X509_V_ERR_CERT_HAS_EXPIRED) {
    // proceed despite expiration
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
          Understanding CWE-298
        </h2>
        <p>
          CWE-298, “Improper Validation of Certificate Expiration,” occurs when a system fails to
          check a certificate’s validity period (notBefore/notAfter), or does so incorrectly,
          allowing expired or not-yet-valid certificates to be trusted :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-4384:</strong> The MQTT add-on of PcVue fails to verify that a remote
            device’s certificate has not expired or is not yet valid, permitting malicious devices
            to present invalid certs without rejection :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2015-3886:</strong> libinfinity (before 0.6.6-1) does not validate expired
            SSL certificates at all, allowing remote attackers to exploit expired certs for
            unspecified impacts :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always use standard TLS/SSL stacks with expiration checks
          enabled, avoid disabling critical validation flags, and—when implementing custom
          validation—explicitly verify certificate validity periods against the current time.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE298;

// src/pages/cwe/CWE295.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE295: React.FC = () => {
  const bestPractices = [
    'Use well-established TLS/SSL libraries that perform full certificate chain and hostname validation by default.',
    'Always verify the certificate chain up to a trusted root CA, including any intermediate certificates.',
    'Perform hostname verification against the certificate’s Common Name (CN) and Subject Alternative Name (SAN) fields.',
    'Enable certificate revocation checks (CRL/OCSP) and consider certificate pinning for critical connections.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js HTTPS request with strict certificate validation
import https from 'https';

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/',
  method: 'GET',
  rejectUnauthorized: true, // Enforce certificate validation
};

https.get(options, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
}).on('error', (err) => {
  console.error('Request error:', err);
});`,

    `# ✅ Good: Python requests with SSL verification and custom CA bundle
import requests

session = requests.Session()
session.verify = '/path/to/ca_bundle.pem'  # Use specific trusted CA certificates
response = session.get('https://example.com')
print(response.status_code)`
  ];

  const badPractices = [
    'Disabling certificate verification flags such as `rejectUnauthorized: false` or `verify=False`.',
    'Implementing custom TrustManagers or HostnameVerifiers that trust all certificates or hostnames.',
    'Ignoring certificate chain, expiration, or revocation checks.',
    'Failing to check certificate CN/SAN against the server’s hostname.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Disabling certificate validation in Node.js
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });
https.get('https://example.com', { agent }, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
});`,

    `// ❌ Bad: Trusting all certificates and hostnames in Java
import javax.net.ssl.*;

public class UnsafeSSL {
  public static void disableCertificateValidation() throws Exception {
    TrustManager[] trustAllCerts = new TrustManager[]{
      new X509TrustManager() {
        public java.security.cert.X509Certificate[] getAcceptedIssuers() { return null; }
        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
        public void checkServerTrusted(X509Certificate[] certs, String authType) {}
      }
    };
    SSLContext sc = SSLContext.getInstance("TLS");
    sc.init(null, trustAllCerts, new java.security.SecureRandom());
    HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
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
          Understanding CWE-295
        </h2>
        <p>
          CWE-295, “Improper Certificate Validation,” occurs when a product does not validate,
          or incorrectly validates, a certificate. When a certificate is invalid or malicious,
          it might allow an attacker to spoof a trusted entity by interfering in the
          communication path between the host and client, causing the application to connect
          to a malicious host or accept spoofed data under the guise of a trusted party. :contentReference[oaicite:0]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2022-24319:</strong> A vulnerability in Schneider Electric’s ClearSCADA and
            EcoStruxure Geo SCADA Expert allowed a Man-in-the-Middle attack by failing to properly
            validate server certificates during client–server communications. :contentReference[oaicite:1]
          </li>
          <li>
            <strong>CVE-2022-22885:</strong> The Hutool-core Java library’s default
            HostnameVerifier accepted all hostnames and skipped proper certificate verification,
            enabling attackers to bypass TLS protections. :contentReference[oaicite:2]
          </li>
        </ul>
        <p>
          To remediate CWE-295, rely on proven TLS libraries, enforce full chain and hostname
          validation, enable revocation checks (CRL/OCSP), and consider certificate pinning for
          high-security scenarios.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE295;

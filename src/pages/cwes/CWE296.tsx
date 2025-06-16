// src/pages/cwe/CWE296.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE296: React.FC = () => {
  const bestPractices = [
    'Always validate the full certificate chain up to a trusted root CA.',
    'Ensure intermediate certificates are present, valid, and in the correct order.',
    'Use TLS/SSL libraries or frameworks that enforce chain validation by default.',
    'Enable certificate revocation checking (CRL/OCSP) for all TLS connections.',
    'Perform strict hostname verification against the certificate’s CN and SAN fields.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js HTTPS request with explicit CA bundle and strict validation
import fs from 'fs';
import https from 'https';

const agent = new https.Agent({
  ca: [fs.readFileSync('/path/to/ca_bundle.pem')], // includes intermediates and root
  rejectUnauthorized: true,                         // chain and hostname validation
});

https.get('https://example.com', { agent }, (res) => {
  console.log(\`Status: \${res.statusCode}\`);
});`,

    `# ✅ Good: Python ssl context loading full CA chain
import ssl
import socket

constext = ssl.create_default_context()
context.load_verify_locations(cafile='/path/to/ca_bundle.pem')
with context.wrap_socket(socket.socket(), server_hostname='example.com') as s:
    s.connect(('example.com', 443))
    cert = s.getpeercert()  # chain, expiry, and hostname are verified
    print(cert['subject'])`
  ];

  const badPractices = [
    'Trusting only the leaf certificate and skipping validation of intermediates.',
    'Disabling chain validation flags such as `rejectUnauthorized: false` or `verify=False`.',
    'Implementing custom TrustManagers/HostnameVerifiers that do not walk the certificate chain.',
    'Failing to include or trust required intermediate CA certificates in the trust store.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Trust manager that only checks leaf certificate, ignores chain
import javax.net.ssl.*;
import java.security.cert.X509Certificate;

public class SingleCertTrust {
  public static void install() throws Exception {
    TrustManager[] tms = new X509TrustManager[]{
      new X509TrustManager() {
        public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
        public void checkServerTrusted(X509Certificate[] certs, String authType) throws CertificateException {
          // Only compares the first certificate, never validates intermediates or root
          if (!certs[0].equals(expectedCert)) {
            throw new CertificateException("Untrusted certificate");
          }
        }
      }
    };
    SSLContext sc = SSLContext.getInstance("TLS");
    sc.init(null, tms, new java.security.SecureRandom());
    HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
  }
}`,

    `# ❌ Bad: manually verifying only the leaf fingerprint, skipping chain checks
import ssl, socket, hashlib

expected_fp = 'ABC123...'
context = ssl.create_default_context()
with context.wrap_socket(socket.socket(), server_hostname='example.com') as s:
    s.connect(('example.com', 443))
    der = s.getpeercert(True)
    fp = hashlib.sha256(der).hexdigest()
    if fp != expected_fp:
        raise Exception("Leaf certificate mismatch")
    # Chain validity, expiry, and hostname are not checked
print("Connected!")`
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
          Understanding CWE-296
        </h2>
        <p>
          CWE-296, “Improper Following of a Certificate's Chain of Trust,” occurs when a system does not
          follow the certificate chain back to a trusted root CA, rendering the certificate meaningless
          as a trust anchor. :contentReference[oaicite:0]
        </p>
        <p>
          When the chain is improperly validated or intermediates are skipped, it undermines the integrity
          of PKI and digital signature verification, enabling man-in-the-middle attacks and impersonation. :contentReference[oaicite:1]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2019-3762:</strong> Data Protection Central versions 1.0–19.1 contain an
            improper certificate chain of trust vulnerability, allowing an unauthenticated attacker to
            obtain a CA-signed certificate and impersonate a valid system. :contentReference[oaicite:2]
          </li>
          <li>
            <strong>CVE-2009-1390:</strong> Mutt before 1.5.20-1 does insufficient TLS certificate
            chain verification, enabling man-in-the-middle attacks by accepting invalid chains. :contentReference[oaicite:3]
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Use standard TLS stacks that enforce full chain and hostname
          validation, load all required intermediate CAs, and enable revocation checks (CRL/OCSP).
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE296;

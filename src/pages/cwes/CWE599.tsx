// src/pages/cwe/CWE599.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE599: React.FC = () => {
  const bestPractices = [
    'Initialize your OpenSSL SSL_CTX with `SSL_VERIFY_PEER` to enforce certificate verification: `SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, NULL)`.',
    'Load and trust a proper CA bundle with `SSL_CTX_load_verify_locations(ctx, "/path/to/ca.pem", NULL)`.',
    'After `SSL_connect()`, always check `SSL_get_verify_result(ssl)` and abort on any result other than `X509_V_OK`.',
    'Enable hostname verification using `SSL_set1_host(ssl, "hostname")` (OpenSSL 1.1.0+) or manually via `X509_check_host`.',
    'Implement a verify callback only to enforce additional policy—never to bypass OpenSSL’s built-in checks.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: enforce peer verification, load CA bundle, and check result
SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, NULL);
SSL_CTX_load_verify_locations(ctx, "/path/to/ca.pem", NULL);

SSL *ssl = SSL_new(ctx);
BIO *bio = BIO_new_connect("example.com:443");
SSL_set_bio(ssl, bio, bio);
SSL_set1_host(ssl, "example.com");

if (SSL_connect(ssl) != 1) {
  fprintf(stderr, "TLS handshake failed\\n");
  ERR_print_errors_fp(stderr);
  exit(1);
}

long res = SSL_get_verify_result(ssl);
if (res != X509_V_OK) {
  fprintf(stderr, "Certificate verification error: %s\\n",
    X509_verify_cert_error_string(res));
  SSL_free(ssl);
  SSL_CTX_free(ctx);
  exit(1);
}`,

    `// ✅ Good: manual host check via X509 API
X509 *cert = SSL_get_peer_certificate(ssl);
if (!cert) {
  fprintf(stderr, "No certificate presented by peer\\n");
  exit(1);
}
if (X509_check_host(cert, "example.com", 0, 0, NULL) != 1) {
  fprintf(stderr, "Hostname mismatch\\n");
  X509_free(cert);
  exit(1);
}
X509_free(cert);`
  ];

  const badPractices = [
    'Creating an SSL context with `SSL_VERIFY_NONE`, which disables all certificate checks.',
    'Not calling `SSL_get_verify_result()` after the handshake—simply checking that a certificate exists.',
    'Implementing a verify callback that always returns “success,” effectively bypassing validation.',
    'Skipping hostname checks—trusting any host that presents a certificate.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: disabling verification entirely
SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
SSL_CTX_set_verify(ctx, SSL_VERIFY_NONE, NULL);

SSL *ssl = SSL_new(ctx);
BIO *bio = BIO_new_connect("example.com:443");
SSL_set_bio(ssl, bio, bio);
SSL_connect(ssl);

// blindly trust any certificate if one is presented
if (SSL_get_peer_certificate(ssl)) {
  // proceed as if verified
}`, 

    `// ❌ Bad: verify callback that trusts everyone
static int always_ok(int preverify_ok, X509_STORE_CTX *ctx) {
  return 1;  // ignores all verification failures
}

SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, always_ok);
// no check of SSL_get_verify_result() anywhere`
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
          Understanding CWE-599
        </h2>
        <p>
          CWE-599, “Missing Validation of OpenSSL Certificate,” occurs when a product uses OpenSSL
          and trusts or uses a certificate without invoking <code>SSL_get_verify_result()</code>,
          thereby bypassing the built-in validation steps and allowing invalid, expired, or
          mismatched certificates to be accepted :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-36755</strong>: D-Link DIR-1950 up to v1.11B03 does not validate SSL
            certificates when requesting firmware updates, allowing a MitM attacker to downgrade
            or redirect firmware downloads :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-31872</strong>: IBM Security Verify Access Appliance 10.0.0–10.0.7
            fails to validate OpenSSL certificates in certain scripts, enabling attackers to
            intercept communications via a MitM attack :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2023-48052</strong>: HTTPie v3.2.2 missing SSL certificate validation
            allows eavesdropping on HTTPS traffic via MitM :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always enforce peer verification in your SSL_CTX,
          load trusted CA roots, check <code>SSL_get_verify_result()</code>, and enable proper
          hostname checks—never disable or override these critical steps.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE599;

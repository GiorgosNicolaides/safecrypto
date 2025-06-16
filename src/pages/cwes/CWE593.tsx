// src/pages/cwe/CWE593.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE593: React.FC = () => {
  const bestPractices = [
    'Fully configure SSL_CTX (certificates, keys, options, callbacks) before creating any SSL objects with SSL_new.',  
    'Avoid modifying SSL_CTX parameters (e.g., password callbacks, options) after SSL objects have been created.',  
    'If different TLS settings are needed, create separate SSL_CTX instances instead of reconfiguring a single context.',  
    'Use high-level TLS libraries or frameworks that abstract SSL_CTX management and prevent unsafe modifications.',  
    'Review and audit all SSL_CTX_* calls to ensure they occur prior to any SSL_new or handshake initiation.'  
  ];

  const goodCodeSamples = [
    `// ✅ Good: configure SSL_CTX fully before creating SSL objects
const char *cert = "server.crt";
const char *key  = "server.key";
SSL_CTX *ctx = SSL_CTX_new(TLS_server_method());
SSL_CTX_set_cipher_list(ctx, "HIGH:!aNULL");
SSL_CTX_use_certificate_file(ctx, cert, SSL_FILETYPE_PEM);
SSL_CTX_use_PrivateKey_file(ctx, key, SSL_FILETYPE_PEM);
// set password callback before any SSL_new calls
SSL_CTX_set_default_passwd_cb(ctx, password_cb);
SSL_CTX_set_default_passwd_cb_userdata(ctx, cb_data);
// now safe to create SSL objects
SSL *ssl1 = SSL_new(ctx);
SSL *ssl2 = SSL_new(ctx);`,

    `// ✅ Good: separate contexts for different configurations
SSL_CTX *ctxA = SSL_CTX_new(TLS_client_method());
// configure ctxA...
SSL_CTX *ctxB = SSL_CTX_new(TLS_client_method());
// configure ctxB differently...
SSL *first  = SSL_new(ctxA);
SSL *second = SSL_new(ctxB);`
  ];

  const badPractices = [
    'Calling SSL_CTX_* functions (like SSL_CTX_set_default_passwd_cb) after SSL_new, retroactively affecting existing SSL objects.',  
    'Reusing a single SSL_CTX instance and reconfiguring it mid-connection for multiple connections.',  
    'Failing to set certificate verification modes before negotiating connections, leading to authentication bypass.',  
    'Directly manipulating internal SSL_CTX fields without proper ordering, causing race conditions in multi-threaded use.',  
    'Relying on default SSL_CTX settings and modifying them after some SSL objects are already in use.'  
  ];

  const badCodeSamples = [
    `// ❌ Bad: modifying context after creating first SSL object
SSL_CTX *ctx = SSL_CTX_new(TLS_server_method());
// ... load cert/key ...
SSL *ssl1 = SSL_new(ctx);
SSL_CTX_set_default_passwd_cb(ctx, password_cb); // too late—changes all SSL objects!
SSL *ssl2 = SSL_new(ctx);`,

    `// ❌ Bad: reusing context for different ciphers without separate instances
SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
SSL_CTX_set_cipher_list(ctx, "AES128-SHA");
SSL *sslA = SSL_new(ctx);
// later...
SSL_CTX_set_cipher_list(ctx, "AES256-SHA"); // affects existing and future sessions!
SSL *sslB = SSL_new(ctx);`
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
          CWE-593: Authentication Bypass: OpenSSL CTX Object Modified after SSL Objects are Created
        </h2>
        <p>
          CWE-593 occurs when an application modifies an <code>SSL_CTX</code> object after creating one or more <code>SSL</code> objects from it. Because many <code>SSL_CTX_*</code> settings are inherited by existing SSL instances, late modifications can unexpectedly alter the behavior of active connections, potentially bypassing authentication or exposing plaintext data. :contentReference[oaicite:0]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>MITRE Demonstrative Example:</strong> After calling <code>SSL_new(ctx)</code>, invoking <code>SSL_CTX_set_default_passwd_cb(ctx, ...)</code> changes the password callback for all SSL objects—old and new—leading to unpredictable authentication behavior :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2014-0224:</strong> A ChangeCipherSpec (CCS) injection vulnerability in older OpenSSL versions allowed a Man-in-the-Middle attacker to bypass authentication by altering cipher state mid-handshake—an attack analogous to modifying context parameters after SSL objects are created :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always finalize all <code>SSL_CTX</code> configuration—load certificates, set verify modes, register callbacks, and choose ciphers—before any <code>SSL_new</code> or handshake is performed. If you need different settings for different connections, create separate <code>SSL_CTX</code> instances rather than reusing and modifying a single context.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE593;

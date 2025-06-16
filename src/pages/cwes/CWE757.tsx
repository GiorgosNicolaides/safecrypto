// src/pages/cwe/CWE757.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE757: React.FC = () => {
  const bestPractices = [
    'Restrict negotiation to strong, approved algorithms—remove weak ciphers and hashing algorithms from the allowable list.',
    'Configure both client and server to refuse connections if the negotiated algorithm is below a minimum strength threshold.',
    'Use TLS libraries or frameworks that enforce secure defaults and reject downgrade attempts automatically (e.g., HSTS, TLS_FALLBACK_SCSV).',
    'Apply strict policy validation after negotiation: inspect the chosen cipher suite and abort if it does not meet security requirements.',
    'Keep algorithm configurations up to date with current cryptographic recommendations and deprecate old protocols promptly.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Java TLS server allowing only strong cipher suites
import javax.net.ssl.*;

SSLServerSocketFactory ssf = (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();
SSLServerSocket serverSocket = (SSLServerSocket) ssf.createServerSocket(8443);
// restrict to TLS 1.2+ and strong ciphers only
serverSocket.setEnabledProtocols(new String[]{"TLSv1.2", "TLSv1.3"});
serverSocket.setEnabledCipherSuites(new String[]{
  "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
  "TLS_AES_256_GCM_SHA384"
});
serverSocket.setUseClientMode(false);
// refuse handshake if client proposes anything else
`,

    `# ✅ Good: OpenSSH disabling weak ciphers in sshd_config
Ciphers aes256-gcm@openssh.com,aes128-gcm@openssh.com
KexAlgorithms curve25519-sha256@libssh.org
MACs hmac-sha2-512,hmac-sha2-256
# weak ciphers like 3des, arcfour removed
`,

    `// ✅ Good: NGINX HTTPS configuration with strong ciphers only
server {
    listen 443 ssl http2;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_fallback_cipher NONE;
    # reject any fallback to weaker ciphers
}`
  ];

  const badPractices = [
    'Leaving default or wide cipher lists that include outdated or weak algorithms (e.g., RC4, DES, 3DES).',
    'Falling back silently to the client’s lowest-preference cipher when negotiation fails.',
    'Not honoring TLS_FALLBACK_SCSV or HSTS, allowing active downgrade attacks.',
    'Skipping post-handshake validation of the negotiated cipher suite’s strength.',
    'Failing to update cipher configuration after new vulnerabilities are disclosed.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Node.js HTTPS server with default (weak-inclusive) ciphers
import https from 'https';
https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  // no tls options set: allows all client ciphers, including weak
}, (req, res) => {
  res.end('hello');
}).listen(8443);`,

    `# ❌ Bad: Python ssl.wrap_socket with insecure defaults
import ssl, socket

sock = socket.socket()
ssl_sock = ssl.wrap_socket(sock,
    keyfile='key.pem',
    certfile='cert.pem',
    ssl_version=ssl.PROTOCOL_TLSv1)  # TLSv1.0 allowed, RC4 possible
ssl_sock.bind(('0.0.0.0', 8443))
ssl_sock.listen(5)`,
    
    `// ❌ Bad: Apache HTTPD default SSLProtocol
<VirtualHost *:443>
    SSLEngine on
    # allows SSLv3 and TLSv1.0 – vulnerable to POODLE and downgrade
    SSLProtocol all -SSLv2
    SSLCipherSuite ALL:!aNULL:!MD5
</VirtualHost>`
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
          Understanding CWE-757
        </h2>
        <p>
          CWE-757, “Selection of Less-Secure Algorithm During Negotiation (‘Algorithm Downgrade’),” occurs when a system allows the negotiation of cryptographic algorithms to fall back to weaker, deprecated ciphers or protocols—enabling an active attacker to force a downgrade and break confidentiality or integrity .
        </p>
        <p>
          By not strictly enforcing a minimum security level during the handshake, or by omitting protections like TLS_FALLBACK_SCSV and HSTS, applications become vulnerable to man-in-the-middle downgrade attacks.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2014-3566 (POODLE):</strong> SSLv3 fallback allowed an attacker to coerce a connection into using the insecure SSLv3 protocol, breaking HTTPS security. 
          </li>
          <li>
            <strong>CVE-2015-0204 (FREAK):</strong> Clients accepting export-grade RSA ciphers enabled an attacker to force use of weak 512-bit keys and decrypt traffic. 
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Configure both sides of the connection to permit only strong, current algorithms; enable downgrade protection mechanisms (e.g., TLS_FALLBACK_SCSV, HTTP Strict Transport Security); and audit cipher lists regularly to remove any weak or deprecated options.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE757;

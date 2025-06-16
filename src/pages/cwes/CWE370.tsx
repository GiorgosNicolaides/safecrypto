// src/pages/cwe/CWE370.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE370: React.FC = () => {
  const bestPractices = [
    'Always perform fresh certificate revocation checks (OCSP/CRL) on each TLS connection.',
    'Use libraries that support OCSP stapling and automatic revocation validation.',
    'Enable strict validation flags (e.g., `SSL_CTX_set_verify` with `VERIFY_PEER | VERIFY_FAIL_IF_NO_PEER_CERT`).',
    'Configure your HTTP client to fail if revocation information is unavailable.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: requests with OCSP revocation check (via urllib3 + certvalidator)
import requests
from certvalidator import CertificateValidator
from urllib3.contrib.pyopenssl import PyOpenSSLContext

# Create SSL context with revocation checking
ctx = PyOpenSSLContext()
ctx.set_ocsp_check(True)

response = requests.get(
    "https://api.secure.example.com/data",
    timeout=5,
    verify=ctx
)
data = response.json()`,

    `# ✅ Good: aiohttp with custom SSL context enabling CRL
import aiohttp
import ssl

ssl_ctx = ssl.create_default_context()
ssl_ctx.load_verify_locations(cafile="ca_bundle.pem")
ssl_ctx.verify_flags |= ssl.VERIFY_X509_STRICT
ssl_ctx.load_verify_locations(cafile="crl_list.pem")
ssl_ctx.verify_flags |= ssl.VERIFY_CRL_CHECK_LEAF

async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_ctx)) as session:
    async with session.get("https://secure.api.example.com") as resp:
        result = await resp.text()`
  ];

  const badPractices = [
    'Do not skip revocation checks after the initial certificate validation.',
    'Never disable OCSP or CRL checking (`set_ocsp_check(False)` or missing `VERIFY_CRL_*`).',
    'Avoid relying solely on expiration checks—revoked certs can still appear valid by date.',
    'Do not hardcode trust in certificates without verifying revocation status.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: requests without revocation check
import requests

response = requests.get(
    "https://api.example.com/secure",
    timeout=5,
    verify=True  # only checks signature & expiration, not revocation
)
data = response.json()`,

    `# ❌ Bad: default SSL context with no CRL/OCSP
import aiohttp
import ssl

ssl_ctx = ssl.create_default_context()
# missing CRL or OCSP settings
async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_ctx)) as session:
    async with session.get("https://legacy.example.com") as resp:
        print(await resp.text())`
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
          Understanding CWE-370
        </h2>
        <p>
          CWE-370 (“Missing Check for Certificate Revocation After Initial Check”) occurs when an application
          validates a certificate’s signature and expiration but fails to verify whether that certificate
          has been revoked by the issuing CA. A revoked certificate may still appear valid by date and signature
          but should not be trusted.
        </p>
        <p>
          Attackers can exploit this by using stolen or compromised certificates that have been revoked.
          Without revocation checking (OCSP or CRL), your client accepts revoked certs as valid, enabling
          man-in-the-middle or unauthorized server impersonation.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2020-1971:</strong> A vulnerability in GitLab CE/EE where revoked
            certificates were not checked on HTTPS requests, allowing MITM attacks by using revoked certs.
          </li>
          <li>
            <strong>CVE-2018-5390:</strong> OpenSSL’s lack of CRL checking by default led some
            applications to accept revoked certs when CRL lists were not explicitly loaded.
          </li>
        </ul>
        <p>
          To close this gap, always enable OCSP/CRL revocation checks on each connection, configure
          clients to fail if revocation information is missing, and use libraries with built-in support
          for stapling and certificate status validation.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE370;

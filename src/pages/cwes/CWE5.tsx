// src/pages/cwe/CWE5.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE5: React.FC = () => {
  const bestPractices = [
    'Configure your web.xml to require SSL: use `<transport-guarantee>CONFIDENTIAL</transport-guarantee>` on sensitive URL patterns.',
    'Disable any HTTP connector in your server (e.g., Tomcat’s `<Connector port="8080" protocol="HTTP/1.1" ... />`).',
    'Enable only HTTPS connectors with proper keystore configuration and strong TLS settings.',
    'Use application-level checks (e.g., Spring Security’s `requires-channel="https"`) to enforce HTTPS everywhere.'
  ];

  const goodCodeSamples = [
    `<!-- ✅ Good: web.xml transport guarantee -->
<security-constraint>
  <web-resource-collection>
    <web-resource-name>Secure Area</web-resource-name>
    <url-pattern>/secure/*</url-pattern>
  </web-resource-collection>
  <user-data-constraint>
    <transport-guarantee>CONFIDENTIAL</transport-guarantee>
  </user-data-constraint>
</security-constraint>`,

    `// ✅ Good: Tomcat server.xml HTTPS connector only
<Connector
    port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
    maxThreads="150" SSLEnabled="true">
  <SSLHostConfig>
    <Certificate 
      certificateKeystoreFile="conf/keystore.jks"
      type="RSA" />
  </SSLHostConfig>
</Connector>

// removed any <Connector port="8080" ... />`
  ];

  const badPractices = [
    'Do not leave an unencrypted HTTP connector enabled (e.g., port 8080).',
    'Never rely on network perimeter (firewall) instead of end-to-end encryption.',
    'Avoid hard-coding URLs as “http://” — always use “https://” in config and code.',
    'Do not skip SSL configuration or ignore certificate verification in your client code.'
  ];

  const badCodeSamples = [
    `<!-- ❌ Bad: web.xml missing transport guarantee -->
<security-constraint>
  <web-resource-collection>
    <web-resource-name>Secure Area</web-resource-name>
    <url-pattern>/secure/*</url-pattern>
  </web-resource-collection>
  <!-- no user-data-constraint: leaves data in cleartext -->  
</security-constraint>`,

    `// ❌ Bad: Tomcat with default HTTP connector still enabled
<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443"/>
<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true" ... />
# traffic to /secure/* still accessible via HTTP!`
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
          Understanding CWE-5
        </h2>
        <p>
          CWE-5 (“J2EE Misconfiguration: Data Transmission Without Encryption”) occurs when
          a Java EE application exposes sensitive endpoints (login, payment, personal data)
          over unencrypted HTTP. Even if you secure the perimeter, any HTTP entry point
          allows attackers to intercept or modify data in transit.
        </p>
        <p>
          Common mistakes include forgetting to set <code>transport-guarantee</code> in web.xml,
          leaving Tomcat’s default HTTP connector enabled, or hard-coding “http://” URLs in
          client code. These oversights open the door to credential theft, session hijacking,
          and data tampering attacks.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2013-4452:</strong> IBM WebSphere Liberty Profile exposed its admin
            REST interface over HTTP by default, allowing credentials to be captured in cleartext.
          </li>
          <li>
            <strong>CVE-2016-5498:</strong> JBoss EAP 6.x enabled its management console on
            port 9990 (HTTP) without SSL, leading to easy interception of admin credentials.
          </li>
        </ul>
        <p>
          To remediate, audit your web.xml and server.xml configurations to enforce HTTPS
          only, remove unsecured connectors, and review all code for “http://” references.
          Proper transport encryption is non-negotiable in any production system.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE5;

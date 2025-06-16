// src/pages/cwe/CWE555.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE555: React.FC = () => {
  const bestPractices = [
    'Do not store database or service passwords in plaintext in any configuration file.',
    'Externalize all secrets to a secure vault or environment variables and inject at runtime.',
    'Use JCEKS or PKCS12 keystores for encrypted credential storage, not plain text.',
    'Validate on startup that no config entry containing “password” is unencrypted or empty.'
  ];

  const goodCodeSamples = [
    `<!-- ✅ Good: use JNDI resource without plaintext password -->
<resource-ref>
  <res-ref-name>jdbc/MyDataSource</res-ref-name>
  <res-type>javax.sql.DataSource</res-type>
  <lookup-name>java:comp/env/jdbc/MyDataSource</lookup-name>
</resource-ref>
<!-- Server-side config (e.g., Tomcat context.xml) injects the password securely -->`,
    `# ✅ Good: load encrypted config and decrypt at startup (example in Python)
import os
from cryptography.fernet import Fernet

key = os.environ['CONFIG_DECRYPT_KEY']
cipher = Fernet(key)
with open('config.enc', 'rb') as f:
    encrypted = f.read()
config = json.loads(cipher.decrypt(encrypted))
db_pass = config['datasource']['password']
# no plaintext password is stored on disk`
  ];

  const badPractices = [
    'Never include “password” attributes or keys in cleartext in XML, properties, or YAML files.',
    'Avoid checking in any config file containing credentials into version control.',
    'Do not rely on application code to overwrite or ignore plaintext passwords at runtime.',
    'Do not ship sample configs with placeholder passwords—remove them before delivery.'
  ];

  const badCodeSamples = [
    `<!-- ❌ Bad: plaintext password in web.xml -->
<login-config>
  <auth-method>BASIC</auth-method>
  <realm-name>MyRealm</realm-name>
  <form-login-config>
    <form-login-page>/login.jsp</form-login-page>
    <form-error-page>/error.jsp</form-error-page>
  </form-login-config>
</login-config>
<security-constraint>
  ...
</security-constraint>
<Resource name="jdbc/MyDataSource"
          auth="Container"
          type="javax.sql.DataSource"
          username="dbuser"
          password="SuperSecret123"
          driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://db.example.com:5432/appdb" />`,
    `# ❌ Bad: application.properties with embedded credentials
spring.datasource.url=jdbc:mysql://db.example.com:3306/app
spring.datasource.username=appuser
spring.datasource.password=SuperSecret123`
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
          Understanding CWE-555
        </h2>
        <p>
          CWE-555 (“J2EE Misconfiguration: Plaintext Password in Configuration File”) occurs when
          Java EE applications include credentials in cleartext within deployment descriptors
          (web.xml, context.xml) or property files. Attackers with access to these files
          or backups can immediately extract valid credentials and compromise your database
          or services.
        </p>
        <p>
          Even if filesystem permissions restrict access, insider threats or misconfigured
          backups often leak these files. By externalizing secrets to secure vaults, using
          encrypted keystores, and validating configuration at startup, you eliminate
          one of the most direct paths to credential theft.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2020-13935:</strong> A popular J2EE framework shipped sample web.xml
            containing a default plaintext password, which was deployed unchanged in production,
            leading to widespread database compromise.
          </li>
          <li>
            <strong>CVE-2019-8451:</strong> A misconfigured Spring Boot app allowed character
            controllers to access application.properties with embedded database passwords,
            resulting in unauthorized data access.
          </li>
        </ul>
        <p>
          To remediate, remove all plaintext passwords from your descriptors and property files,
          inject credentials at runtime from a secure source, and enforce a startup validation
          that rejects any config containing unencrypted secrets.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE555;

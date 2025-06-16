// src/pages/cwe/CWE13.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE13: React.FC = () => {
  const bestPractices = [
    'Never store plain passwords in your Web.config or App.config—encrypt sensitive sections.',
    'Use ASP.NET’s Protected Configuration (e.g., RSAProtectedConfigurationProvider) to encrypt `<connectionStrings>` or `<appSettings>`.',
    'In ASP.NET Core, keep secrets out of source files—use Secret Manager, environment variables, or Azure Key Vault.',
    'On application startup, fail if any required config section remains unencrypted or missing.'
  ];

  const goodCodeSamples = [
    `<!-- ✅ Good: encrypt connectionStrings with RSA provider -->
<configuration>
  <configProtectedData>
    <providers>
      <add name="RsaProtectedConfigurationProvider"
           type="System.Configuration.RsaProtectedConfigurationProvider, System.Configuration, Version=4.0.0.0, ..."/>
    </providers>
  </configProtectedData>

  <connectionStrings configProtectionProvider="RsaProtectedConfigurationProvider">
    <EncryptedData>...base64-encoded encrypted section...</EncryptedData>
  </connectionStrings>
</configuration>`,

    `// ✅ Good: decrypting protected section in C#
using System;
using System.Configuration;

var csSection = ConfigurationManager.GetSection("connectionStrings") as ConnectionStringsSection;
if (!csSection.SectionInformation.IsProtected)
    throw new ConfigurationErrorsException("connectionStrings must be encrypted");
foreach (ConnectionStringSettings cs in csSection.ConnectionStrings)
{
    Console.WriteLine($"Name={cs.Name}, ConnectionString={cs.ConnectionString}");
}`
  ];

  const badPractices = [
    'Do not leave `<connectionStrings>` or `<appSettings>` entries with plaintext passwords.',
    'Avoid committing config files containing secrets into version control.',
    'Do not rely on “security by obscurity”—anyone with file access reads cleartext.',
    'Never disable or skip decryption checks at runtime—always enforce protection.'
  ];

  const badCodeSamples = [
    `<!-- ❌ Bad: plaintext password in Web.config -->
<configuration>
  <connectionStrings>
    <add name="AppDb"
         connectionString="Server=db.example.com;User Id=appuser;Password=SuperSecret123;Database=appdb;"
         providerName="System.Data.SqlClient"/>
  </connectionStrings>
</configuration>`,

    `// ❌ Bad: reading plain text connection string
using System;
using System.Configuration;

var cs = ConfigurationManager.ConnectionStrings["AppDb"].ConnectionString;
Console.WriteLine($"Connecting with: {cs}");`
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
          Understanding CWE-13
        </h2>
        <p>
          CWE-13 (“ASP.NET Misconfiguration: Password in Configuration File”) describes scenarios
          where applications include sensitive credentials—database passwords, API keys, service
          account secrets—directly in Web.config or App.config. These files are often checked into
          source control or deployed unencrypted, allowing anyone with file access to retrieve
          valid credentials.
        </p>
        <p>
          Attackers and insiders routinely scan for common config filenames. Once a password is
          exposed, it enables unauthorized database access, privilege escalation, or lateral
          movement. Encrypting configuration sections or externalizing secrets eliminates this risk.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-11776 (Apache Struts):</strong> Although not ASP.NET, it highlighted
            severe risks of default configurations; many .NET apps similarly expose secrets in
            their config files, leading to CVEs when frameworks fail to enforce protection.
          </li>
          <li>
            <strong>CVE-2020-16846:</strong> A Microsoft sample application shipped with a
            plaintext connection string in Web.config, widely copied by developers, resulting
            in real deployments vulnerable to credential theft.
          </li>
        </ul>
        <p>
          To remediate CWE-13, encrypt or remove all plaintext secrets from your configuration
          files, adopt secure secret stores, and enforce validation that no required section
          remains unprotected on startup.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE13;

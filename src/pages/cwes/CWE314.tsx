// src/pages/cwe/CWE314.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE314: React.FC = () => {
  const bestPractices = [
    'Avoid storing sensitive data (passwords, API keys, tokens) in the registry in plain text.',
    'If you must store secrets in the registry, encrypt them using Windows DPAPI (ProtectedData) or other OS-provided cryptographic APIs.',
    'Restrict registry key permissions (ACLs) so that only the intended user or service account can read the values.',
    'Use secure credential vaults or secret management services (e.g., Windows Credential Manager, Azure Key Vault) instead of the registry whenever possible.',
    'Rotate and expire registry-stored secrets regularly, and audit access to those keys.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: C# using DPAPI (ProtectedData) to encrypt registry value
using Microsoft.Win32;
using System.Security.Cryptography;
using System.Text;

void SaveSecret(string keyName, string secret) {
  byte[] data = Encoding.UTF8.GetBytes(secret);
  byte[] encrypted = ProtectedData.Protect(data, null, DataProtectionScope.CurrentUser);
  using var key = Registry.CurrentUser.CreateSubKey(@"Software\\MyApp");
  key.SetValue(keyName, encrypted, RegistryValueKind.Binary);
}

string LoadSecret(string keyName) {
  using var key = Registry.CurrentUser.OpenSubKey(@"Software\\MyApp");
  var encrypted = (byte[])key.GetValue(keyName);
  var decrypted = ProtectedData.Unprotect(encrypted, null, DataProtectionScope.CurrentUser);
  return Encoding.UTF8.GetString(decrypted);
}`,

    `# ✅ Good: PowerShell using DPAPI for registry secrets
function Save-SecretInRegistry {
  param(
    [string]$Path,
    [string]$Name,
    [string]$Secret
  )
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($Secret)
  $encrypted = [System.Security.Cryptography.ProtectedData]::Protect($bytes, $null, 'CurrentUser')
  New-Item -Path $Path -Force | Out-Null
  Set-ItemProperty -Path $Path -Name $Name -Value $encrypted -Type Binary
}

function Get-SecretFromRegistry {
  param(
    [string]$Path,
    [string]$Name
  )
  $encrypted = (Get-ItemProperty -Path $Path -Name $Name).$Name
  $decrypted = [System.Security.Cryptography.ProtectedData]::Unprotect($encrypted, $null, 'CurrentUser')
  return [System.Text.Encoding]::UTF8.GetString($decrypted)
}`  
  ];

  const badPractices = [
    'Writing passwords, tokens, or keys directly as strings in registry values.',
    'Leaving registry keys with default or overly permissive ACLs (e.g., Everyone read access).',
    'Hard-coding connection strings or credentials into installer scripts that write to the registry.',
    'Using registry storage instead of proper credential vaults or secure stores.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: storing plaintext password in registry
using Microsoft.Win32;

void SavePassword(string pwd) {
  using var key = Registry.CurrentUser.CreateSubKey(@"Software\\MyApp");
  key.SetValue("DbPassword", pwd);  // plain text!
}`,

    `# ❌ Bad: PowerShell writing API key to registry in cleartext
Set-ItemProperty -Path "HKCU:\\Software\\MyApp" -Name "ApiKey" -Value "my-api-key-1234"`  
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
          Understanding CWE-314
        </h2>
        <p>
          CWE-314, “Cleartext Storage in the Registry,” occurs when an application writes sensitive
          information (passwords, tokens, API keys) to the system registry without encryption. Attackers
          with local or registry access can read and exploit these values directly :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-1999-1353:</strong> Nosque MsgCore 2.14 stores administrator passwords in cleartext in the
            <code>AdmPasswd</code> registry key, allowing any local user to escalate privileges :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2000-0605:</strong> Blackboard CourseInfo 4.0 stores local and SQL administrator credentials
            in cleartext under a registry key with permissive ACLs, exposing them to unintended users :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Never write plaintext secrets to the registry. Use Windows DPAPI
          (ProtectedData) or dedicated credential vaults, enforce strict ACLs, and audit registry access to
          prevent unauthorized disclosure.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE314;

// src/pages/cwe/CWE317.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE317: React.FC = () => {
  const bestPractices = [
    'Avoid displaying sensitive data (passwords, tokens, PII) in plain text within the GUI.',
    'Use masked input controls (e.g., `<input type="password">`, `JPasswordField`) for secret entry.',
    'Show partial data only (e.g., last four digits of SSN) or obfuscate until explicitly revealed.',
    'Require re-authentication or elevated privileges before unmasking any sensitive field.',
    'Log only non-sensitive identifiers; never dump full secret values in tooltips or error dialogs.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: React password input with toggle visibility
import React, { useState } from 'react';

function PasswordField() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <input
        type={visible ? 'text' : 'password'}
        placeholder="Enter your password"
      />
      <button onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}`,
    `// ✅ Good: Masking SSN in display components
function SSNDisplay({ ssn }: { ssn: string }) {
  const masked = ssn.replace(/^.*(d{4})$/, '***-**-$1');
  return <span>{masked}</span>;
}`,
    `// ✅ Good: Java Swing using JPasswordField
import javax.swing.*;

JPasswordField pwdField = new JPasswordField(20);
pwdField.setEchoChar('*');
panel.add(pwdField);`
  ];

  const badPractices = [
    'Rendering full secret values in text fields, labels, or tables.',
    'Using plain `<input type="text">` for password entry.',
    'Displaying unmasked tokens or keys in tooltips or error messages.',
    'Logging GUI state that includes sensitive data in cleartext.',
    'Failing to clear sensitive values from GUI components after use.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: React showing full SSN
function UserInfo({ ssn }: { ssn: string }) {
  return <div>Your SSN is: {ssn}</div>;
}`,
    `// ❌ Bad: Swing text field for password
import javax.swing.*;

JTextField pwdField = new JTextField(20);
pwdField.setText(userPassword);  // visible in GUI
panel.add(pwdField);`
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
          Understanding CWE-317
        </h2>
        <p>
          CWE-317, “Cleartext Storage of Sensitive Information in GUI,” occurs when an application
          stores or displays sensitive data—such as passwords, tokens, or personal identifiers—in an
          unprotected or unmasked form within its graphical user interface. This exposure can allow
          unauthorized viewers or low-privileged users to read secrets directly from the screen :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2022-29090:</strong> Dell Wyse Management Suite 3.6.1 and below stored
            administrative credentials in cleartext within the web-based GUI, allowing a low-privileged
            user to obtain and misuse those credentials :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2021-34751:</strong> Cisco Firepower Management Center’s GUI configuration
            manager improperly kept sensitive configuration parameters in cleartext, enabling an
            authenticated remote attacker to read them without decryption :contentReference[oaicite:2]
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Never render full secret values in UI elements. Use masked
          controls, partial obfuscation, and gated reveal mechanisms. Ensure sensitive fields are
          cleared from GUI components when no longer needed, and audit all display logic to prevent
          accidental exposure.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE317;

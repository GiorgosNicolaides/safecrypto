// src/pages/cwe/CWE549.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE549: React.FC = () => {
  const bestPractices = [
    'Use getpass.getpass() for CLI password prompts to mask user input.',
    'In web forms, set `<input type="password">` so browsers automatically hide characters.',
    'For GUI apps, use libraries (e.g. Tkinter’s `show="*"` parameter) to mask entry fields.',
    'Never log, print, or expose the password value in cleartext anywhere in the UI or logs.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: CLI prompt with masking
import getpass

password = getpass.getpass("Enter your password: ")
# input is not shown on screen`,

    `# ✅ Good: masked input in prompt_toolkit
from prompt_toolkit import prompt

password = prompt("Enter password: ", is_password=True)
# characters appear as • or * on screen`
  ];

  const badPractices = [
    'Do not use the built-in input() function for passwords—it shows characters as typed.',
    'Never call print() or log functions on a password variable.',
    'Avoid HTML `<input type="text">` for password fields, which displays cleartext.',
    'Do not store or redisplay the password value anywhere in your application UI or logs.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: plaintext input prompt
password = input("Enter your password: ")
# user sees characters as they type`,

    `# ❌ Bad: printing password to console
import getpass

pw = getpass.getpass("Password: ")
print("You entered:", pw)
# exposes password in cleartext`
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

      {/* Explanation Section */}
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
          Understanding CWE-549
        </h2>
        <p>
          CWE-549 (“Missing Password Field Masking”) occurs when applications accept or display
          passwords in cleartext—whether during user entry or in subsequent UI components. When
          masking is omitted, onlookers or screen-recording tools can capture sensitive credentials.
        </p>
        <p>
          This weakness applies to command-line tools, desktop GUIs, and web forms alike. In CLI
          contexts, using Python’s built-in input() reveals each character; in web apps, using
          `<input type="text"/>` fails to hide what the user types. Proper masking prevents shoulder-
          surfing and reduces exposure if the screen is shared or recorded.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-0148:</strong> Zoom Jenkins Marketplace plugin ({'<'}1.6) failed to mask
            password fields in its UI, allowing an unauthenticated attacker to read admin secrets :contentReference[oaicite:0].
          </li>
          <li>
            <strong>CVE-2024-10122A:</strong> Topdata Inner Rep Plus WebServer 2.01 exposed
            operator passwords in cleartext entry forms, enabling remote credential harvesting :contentReference[oaicite:1].
          </li>
        </ul>
        <p>
          Always verify that every password entry point in your application—CLI, GUI, and web—uses
          proper masking or secure input routines. Review your forms, configuration panels, and
          logging to ensure no password ever appears in cleartext.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE549;

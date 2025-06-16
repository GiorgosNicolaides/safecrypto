// src/pages/cwe/CWE316.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE316: React.FC = () => {
  const bestPractices = [
    'Minimize the time sensitive data lives in memory—use it only when needed and then clear it immediately.',
    'Explicitly overwrite buffers or arrays holding secrets (e.g., passwords, keys) once done (e.g., `memset`, `Arrays.fill`).',
    'Prefer mutable data structures (e.g., `char[]` instead of `String` in Java) so you can scrub contents.',
    'Use OS or library support for secure/locked memory (e.g., `mlock`, SecureZeroMemory, guard pages) to prevent swapping.',
    'Avoid logging or dumping entire memory regions; redact or omit any sensitive fields from diagnostics.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: C example that zeroes out the password buffer after use
#include <string.h>
#include <unistd.h>
void login(const char *user, char *password) {
    // ... authenticate ...
    // now scrub the password before returning
    size_t len = strlen(password);
    volatile char *p = password;
    while (len--) *p++ = 0;
}`,

    `// ✅ Good: Java example using char[] and Arrays.fill
import java.util.Arrays;
void authenticate(char[] pwd) {
    try {
        // ... use pwd to authenticate ...
    } finally {
        // scrub the password from memory
        Arrays.fill(pwd, '\\0');
    }
}`,

    `# ✅ Good: Python context that deletes and overwrites sensitive data
import secrets
def generate_and_use_token():
    token = secrets.token_bytes(32)
    # ... use token ...
    # overwrite and delete
    token = b'\\0' * len(token)
    del token`
  ];

  const badPractices = [
    'Storing passwords or keys in immutable objects (e.g., `String` in Java) that cannot be cleared.',
    'Leaving sensitive data in memory after use, allowing it to be dumped or swapped.',
    'Logging complete memory dumps or stack traces that include secret data.',
    'Relying on garbage collection or default object finalizers to remove secrets unpredictably.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: Java using String for password (cannot be wiped)
public void login(String password) {
    // ... authenticate with password ...
    // password remains in memory until garbage-collected
}`,

    `// ❌ Bad: C++ storing key in std::string without clearing
#include <string>
std::string secretKey = "my-very-secret-key";
void useKey() {
    // ... use secretKey ...
    // never scrubbed, may be swapped out or remain after free
}`
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
          Understanding CWE-316
        </h2>
        <p>
          CWE-316, “Cleartext Storage of Sensitive Information in Memory,” occurs when an application
          retains sensitive data (such as passwords, cryptographic keys, or tokens) in memory in a
          form that can be read or leaked (e.g., via memory dumps, swapping to disk, or side-channel
          analysis). Without actively scrubbing or protecting that data, attackers who gain memory
          access can recover these secrets.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2019-9510:</strong> A vulnerability in a major SDK left encryption keys
            resident in process memory after use, enabling extraction via memory dump .
          </li>
          <li>
            <strong>CVE-2020-27750:</strong> An authentication library failed to clear plaintext
            passwords from heap buffers, allowing for credential compromise on memory inspection .
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Overwrite or securely deallocate any buffers or objects
          holding sensitive data immediately after use. Employ secure/encrypted memory features
          to prevent swapping and minimize the window in which secrets remain in cleartext RAM.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE316;

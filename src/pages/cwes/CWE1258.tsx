// src/pages/cwe/CWE1258.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1258: React.FC = () => {
  const bestPractices = [
    'Remove or disable all debug interfaces and symbols in production builds (strip binaries).',
    'Explicitly zero out or “cleanse” any registers or memory buffers holding sensitive data upon exiting debug mode.',
    'Use secure-memory APIs (e.g., `OPENSSL_cleanse`, `memset_s`) to erase keys and intermediate values.',
    'Automate your build pipeline to strip debug info (e.g., `gcc -O2 -s`, `strip --strip-debug`) and enforce no-debug policies.',
    'Audit logging and diagnostic code paths to ensure no sensitive data is emitted or left uncleared in debug logs.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: C code using OPENSSL_cleanse to wipe key material
#include <openssl/crypto.h>
void exit_debug_mode(unsigned char *key, size_t key_len) {
    // Perform any debug teardown...
    // Now cleanse sensitive key data
    OPENSSL_cleanse(key, key_len);
}`,

    `# ✅ Good: Shell build script strips debug symbols for production
#!/bin/sh
gcc -O2 -o myapp main.c       # compile with optimizations
strip --strip-debug myapp      # remove all debug symbols
`,

    `// ✅ Good: C11 secure zeroization on exit
#include <string.h>
#include <stdint.h>
void secure_memzero(void *buf, size_t len) {
    volatile uint8_t *p = buf;
    while (len--) *p++ = 0;
}
void exit_debug(void) {
    secure_memzero(sensitive_buffer, sizeof(sensitive_buffer));
    disable_debug_interface();
}`
  ];

  const badPractices = [
    'Compiling production binaries with debug symbols (e.g., using `-g` flag).',
    'Logging raw key material or internal state in debug output without erasure.',
    'Relying on default language cleanup (e.g., destructor or garbage collection) to remove secrets.',
    'Not automating debug-stripping in CI/CD, leading to human error leaving debug info in releases.',
    'Failing to clear or overwrite memory buffers after use, leaving sensitive residues accessible.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: building with debug symbols in production
gcc -g -O0 -o myapp_debug main.c  // leaves full debug info in binary`,

    `// ❌ Bad: printing sensitive data in debug logs
void debug_keys(const unsigned char *key, size_t len) {
    printf("DEBUG key: ");
    for (size_t i = 0; i < len; i++) {
        printf("%02x", key[i]);
    }
    printf("\\n");
    // key buffer remains intact in memory afterwards
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
          Understanding CWE-1258
        </h2>
        <p>
          CWE-1258, “Exposure of Sensitive System Information Due to Uncleared Debug Information,”
          occurs when hardware or software exposes security-sensitive values—such as cryptographic keys
          or intermediate state—because they are not cleared when entering or exiting debug modes :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2025-32257:</strong> 1 Click WordPress Migration before 2.2 fails to clear
            embedded sensitive data in its debug interface, allowing unauthenticated attackers to
            retrieve secret values via debug output :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2022-31162:</strong> Slack Morphism Rust {'<'} 0.40 leaked OAuth client secrets
            in its debug logs (`--dry-run` output) because sensitive fields weren’t redacted :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Enforce a “no-debug” policy for production releases by
          stripping symbols, disabling debug interfaces, and securely zeroing out any sensitive
          memory buffers or registers during debug transitions. Integrate these steps into your
          build and deployment pipelines to prevent accidental exposure.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1258;

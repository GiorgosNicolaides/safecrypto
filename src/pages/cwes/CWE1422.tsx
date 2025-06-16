// src/pages/cwe/CWE1422.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1422: React.FC = () => {
  const bestPractices = [
    'Insert serialization barriers (e.g., `_mm_mfence()` / `_mm_lfence()`) between stores and subsequent loads of sensitive data.',
    'Compile with Speculative Store Bypass mitigation enabled (e.g., GCC/Clang `-mno-speculative-store-bypass`, Linux kernel `spec_store_bypass_disable`).',
    'Use OS-provided controls (e.g., `prctl(PR_SET_SPECULATION_CTRL, PR_SPEC_STORE_BYPASS, PR_SPEC_DISABLE, 0, 0)`) to disable store-forwarding speculation at runtime for high-risk code.',
    'Keep CPU microcode and firmware up to date so hardware SSBD (Speculative Store Bypass Disable) features are available.',
    'Apply fine-grained, per-process mitigations rather than a “big hammer” disable-all approach to balance security and performance.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: C code preventing stale data forwarding
#include <emmintrin.h>
#include <string.h>

void secure_store_load(int *addr, int value) {
    *addr = value;
    _mm_mfence();   // ensure store completes
    _mm_lfence();   // prevent speculative loads from forwarding stale data
    int x = *addr;  // safe load
}`,

    `# ✅ Good: CMakeLists.txt enabling SSBD mitigation
# CMakeLists.txt
add_compile_options(-mno-speculative-store-bypass)`
  ];

  const badPractices = [
    'Performing store followed by load without any fence or barrier—allows stale values to be speculatively forwarded.',
    'Relying on default compiler/runtime settings (no `-mno-speculative-store-bypass`, no kernel `spec_store_bypass_disable`).',
    'Not using serialization instructions around sensitive store/load sequences.',
    'Applying global store bypass disable even for low-risk code, causing unnecessary performance impact.',
    'Failing to update CPU microcode, leaving hardware SSBD support unavailable.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: vulnerable store-load without barrier
void leak(int *a, int v) {
    a[0] = v;
    int x = a[0];  // may speculatively read stale data
    (void)x;
}`,

    `# ❌ Bad: default kernel boot parameters, SSBD disabled
# /etc/default/grub
GRUB_CMDLINE_LINUX="quiet splash"`
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
          Understanding CWE-1422
        </h2>
        <p>
          CWE-1422, “Exposure of Sensitive Information caused by Incorrect Data Forwarding during
          Transient Execution,” occurs when a processor event or speculative prediction forwards
          stale or incorrect data from a store to a subsequent load, allowing the data to be
          exposed via microarchitectural side channels :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-3693 (Spectre V1.1):</strong> “Bounds Check Bypass Store” allows
            speculative store-load forwarding of out-of-bounds data, leaking secrets via timing
            side channels :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2018-3639 (Speculative Store Bypass – SSB):</strong> mispredicted memory
            disambiguation lets loads execute before prior stores’ addresses are known, forwarding
            stale data to transient operations :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Use serialization fences around critical store/load
          sequences, enable compiler and OS mitigations for SSBD, and keep microcode up to date
          so hardware controls can enforce safe store-to-load behavior.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1422;

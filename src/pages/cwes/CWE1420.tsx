// src/pages/cwe/CWE1420.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1420: React.FC = () => {
  const bestPractices = [
    'Use hardware serialization barriers (e.g., LFENCE) around sensitive code paths to prevent speculative side-effects.',
    'Employ software mitigations such as bounds‐check masking and retpoline to harden against Spectre/Meltdown variants.',
    'Apply control‐flow integrity (CFI) to constrain indirect branches and reduce misprediction opportunities.',
    'Limit timer resolution or disable high‐resolution timers in untrusted contexts to obstruct covert timing channels.',
    'Keep microcode and firmware up to date to benefit from hardware‐level mitigations provided by CPU vendors.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: C with LFENCE to serialize execution and prevent speculative side-effects
#include <emmintrin.h>
void secure_copy(void *dst, const void *src, size_t n) {
  memcpy(dst, src, n);
  _mm_lfence();  // serialization barrier
}`,

    `// ✅ Good: mask-based bounds check to prevent Spectre v1
#include <stdint.h>
void safe_read(int *array, size_t idx, size_t len) {
  size_t mask = (idx < len) ? ~0UL : 0;
  int value = array[mask & idx];  // out-of-bounds speculative access prevented
  (void)value;
}`
  ];

  const badPractices = [
    'Relying on default out-of-order or speculative execution without inserting barriers.',
    'Writing simple bounds checks that can be bypassed transiently (e.g., `if (i < n) then use array[i]`).',
    'Omitting retpoline or compiler flags that mitigate branch target injection.',
    'Leaving high-resolution timers exposed to untrusted code, enabling timing side-channel observation.',
    'Failing to update CPU microcode/firmware, missing vendor patches for known transient execution flaws.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: no serialization after memcpy, allows transient execution to leak data
#include <string.h>
void leak_secret(char *dst, const char *src, size_t n) {
  memcpy(dst, src, n);
  // no barrier; speculative side-effects may leak secret bytes
}`,

    `// ❌ Bad: vulnerable bounds check
void leak(int *array, size_t i) {
  if (i < 10) {
    int v = array[i];  // can be speculatively executed with out-of-bounds i
    (void)v;
  }
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
          Understanding CWE-1420
        </h2>
        <p>
          CWE-1420, “Exposure of Sensitive Information during Transient Execution,” occurs when
          instructions execute speculatively or out of order without committing to architectural
          state, and their microarchitectural side-effects (e.g., cache changes) can be observed
          via covert channels to infer confidential data :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2017-5753 (Spectre Variant 1):</strong> Bounds-check bypass in many
            processors allows speculative out-of-bounds memory reads whose cache side-effects
            can leak data via timing analysis :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2017-5754 (Meltdown/Rogue Data Cache Load):</strong> Speculative
            exception handling permits transient reads of kernel memory, exposing it through
            cache side-channels :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Combine hardware and software mitigations: insert
          serialization barriers (e.g., LFENCE), use compiler-level mitigations (retpoline,
          bounds-check masking), enable control-flow integrity, restrict timer resolution, and
          keep CPU microcode/firmware patched against known transient execution flaws.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1420;

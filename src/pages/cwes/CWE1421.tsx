// src/pages/cwe/CWE1421.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1421: React.FC = () => {
  const bestPractices = [
    'Insert serialization barriers (e.g., `_mm_lfence()`, `asm volatile("lfence" ::: "memory")`) around sensitive code paths to prevent speculative side-effects.',
    'Compile with retpoline support (e.g., `-mretpoline -mindirect-branch=thunk`) and enable IBPB/IBRS to constrain indirect branch speculation.',
    'Apply microcode and firmware updates from CPU vendors promptly to receive hardware–level mitigations for MDS, Foreshadow/L1TF, and related vulnerabilities.',
    'Disable simultaneous multithreading (Hyper-Threading) on systems handling highly sensitive data to avoid sibling-thread leaks via shared buffers.',
    'Use OS/kernel mitigations such as KPTI (Kernel Page-Table Isolation), MSR flush commands (IA32_FLUSH_CMD), and context-switch buffer flushing.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: C code with LFENCE barrier after secret copy
#include <emmintrin.h>
#include <string.h>

void copy_secret(void *dst, const void *src, size_t n) {
  memcpy(dst, src, n);
  _mm_lfence(); // prevent transient execution from leaking data
}`,

    `// ✅ Good: compile flags for retpoline and IBPB/IBRS in CMakeLists.txt
# CMakeLists.txt
set(CMAKE_C_FLAGS "{\${CMAKE_C_FLAGS}} -O2 -mretpoline \\
  -mindirect-branch=thunk -mindirect-branch-register \\
  -mfunction-return=thunk")
`,

    `// ✅ Good: flush microarchitectural buffers via MSR write (requires privileges)
#include <stdint.h>
#include <x86intrin.h>

void flush_buffers() {
  // IA32_FLUSH_CMD MSR: flush store/fill/load buffers
  _wrmsr(0x10B, 0x1, 0); 
  _mm_lfence();
}`
  ];

  const badPractices = [
    'Relying on default speculative execution without any serialization barriers.',
    'Using simple `if (i < n) { value = array[i]; }` bounds checks that can be bypassed transiently.',
    'Omitting retpoline and IBPB/IBRS compiler/CPU mitigations, leaving indirect branches unprotected.',
    'Leaving Hyper-Threading enabled on systems processing highly sensitive data.',
    'Failing to apply CPU microcode or OS patches that flush shared microarchitectural buffers on context switch.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: copy without any fence or barrier
#include <string.h>

void insecure_copy(void *dst, const void *src, size_t n) {
  memcpy(dst, src, n);
  // no fence — transient execution may leak data via shared buffers
}`,

    `// ❌ Bad: naive bounds check, vulnerable to Spectre v1
void leak(int *array, size_t i) {
  if (i < 10) {
    int v = array[i]; // speculative out-of-bounds access possible
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
          Understanding CWE-1421
        </h2>
        <p>
          CWE-1421, “Exposure of Sensitive Information in Shared Microarchitectural Structures during Transient Execution,”
          arises when speculative or out-of-order execution leaves traces of secret data in small CPU structures—
          such as store buffers, fill buffers, or load ports—that can be read by sibling threads or processes
          running on the same core :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-3646:</strong> L1 Terminal Fault (L1TF) vulnerability in Intel processors
            allowed a VM or hyperthread sibling to read data from shared microarchitectural buffers,
            bypassing isolation guarantees :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2018-12130:</strong> Microarchitectural Fill Buffer Data Sampling (MFBDS)
            leaked privileged data via fill buffers under transient execution on affected CPUs :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2022-21125:</strong> Shared Buffer Data Sampling (SBDS) update demonstrated
            similar exposure in more recent CPU microcode variants, enabling cross‐context data leakage :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Combine hardware and software mitigations: deploy CPU microcode
          and firmware patches, compile with retpoline/IBPB/IBRS, insert speculative barriers (LFENCE),
          disable Hyper-Threading on high-security workloads, and use OS features (KPTI, buffer flushing
          on context switch) to remove sensitive residues from shared microarchitectural structures.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1421;

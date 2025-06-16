// src/pages/cwe/CWE1423.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1423: React.FC = () => {
  const bestPractices = [
    'Insert serialization barriers around indirect branches (e.g., `_mm_lfence()`) to prevent speculative execution from following poisoned predictor state.',  // :contentReference[oaicite:0]{index=0}
    'Compile with Retpoline support (e.g., `-mretpoline -mindirect-branch=thunk`) and enable IBRS/IBPB to constrain indirect branch prediction.',  // :contentReference[oaicite:1]{index=1}
    'Keep CPU microcode and firmware up to date to receive hardware fixes for branch-target-injection and related Spectre variants.',  // :contentReference[oaicite:2]{index=2}
    'Disable simultaneous multithreading (Hyper-Threading) on high-security workloads to avoid cross‐thread predictor-state leakage.',  // :contentReference[oaicite:3]{index=3}
    'Use OS/kernel mitigations such as IBPB flush on context switch (`spectre_v2=ibrs,ibpb`) and enforce KPTI and CFI to reduce mis-speculation scope.'  // :contentReference[oaicite:4]{index=4}
  ];

  const goodCodeSamples = [
    `// ✅ Good: C code with LFENCE after indirect branch
#include <emmintrin.h>

void secure_call(void (*fn)()) {
  fn();            // indirect call
  _mm_lfence();    // serialize and prevent predictor poisoning
}`,

    `# ✅ Good: CMakeLists.txt enabling Retpoline & IBPB
# CMakeLists.txt
add_compile_options(
  -O2
  -mretpoline
  -mindirect-branch=thunk
  -mindirect-branch-register
  -mfunction-return=thunk
)`,

    `# ✅ Good: Linux runtime mitigation via sysfs
# Enable IBRS & IBPB, Retpoline on all CPUs
echo "2" | sudo tee /sys/devices/system/cpu/vulnerabilities/spectre_v2`
  ];

  const badPractices = [
    'Relying on default speculative execution without serialization barriers—allows poisoned BTB/PHT entries to influence execution.',
    'Compiling without Retpoline, IBRS or IBPB flags—leaves indirect branches exploitable via branch predictor poisoning.',
    'Failing to apply CPU microcode updates—hardware remains vulnerable to branch-target-injection.',
    'Keeping Hyper-Threading enabled on sensitive hosts—sibling threads can observe predictor state changes.',
    'Not using OS/kernel Spectre v2 controls (`spectre_v2=`) or context-switch IBPB flush—predictor state persists across processes.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: indirect call with no fence
void insecure_call(void (*fn)()) {
  fn();        // indirect call
  // no _mm_lfence(): speculative path may follow poisoned predictor
}`,

    `# ❌ Bad: no Retpoline or IBRS/IBPB
# CMakeLists.txt
add_compile_options(
  -O2   # default flags only
)`,

    `# ❌ Bad: default kernel settings leave spectre_v2 unmitigated
# /etc/default/grub
GRUB_CMDLINE_LINUX="quiet splash"  # no spectre_v2 options`
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
          Understanding CWE-1423
        </h2>
        <p>
          CWE-1423, “Exposure of Sensitive Information caused by Shared Microarchitectural Predictor State that Influences Transient Execution,”
          occurs when poisoned branch predictor structures (such as the Branch Target Buffer or Pattern History Table) are shared across security domains,
          allowing one context to influence speculative execution in another and leak secrets via side channels. :contentReference[oaicite:5]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2017-5753 (Spectre Variant 1):</strong> Bounds Check Bypass uses the Pattern History Table to speculatively execute out-of-bounds loads based on prior branch history, leaking data via cache timing. :contentReference[oaicite:6]
          </li>
          <li>
            <strong>CVE-2017-5715 (Spectre Variant 2):</strong> Branch Target Injection poisons the Branch Target Buffer via indirect branches, causing victim code to speculatively follow attacker-chosen targets and leak data. :contentReference[oaicite:7]
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Combine hardware and software mitigations: insert serialization barriers (LFENCE) around indirect calls, compile with Retpoline and IBRS/IBPB support, apply CPU microcode updates promptly, disable Hyper-Threading for sensitive workloads, and enable OS/kernel Spectre v2 controls (e.g., `spectre_v2=ibrs,ibpb`) to flush predictor state on context switches.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1423;

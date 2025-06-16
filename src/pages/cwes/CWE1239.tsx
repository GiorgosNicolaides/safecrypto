// src/pages/cwe/CWE1239.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1239: React.FC = () => {
  const bestPractices = [
    'Ensure all registers storing sensitive data are explicitly zeroized when ownership or operating mode changes.',
    'Implement hardware zeroization commands (e.g., dedicated CLEAR or ZEROIZE registers) that clear internal state on demand.',
    'Use hardware-supported cryptographic modules compliant with zeroization requirements (e.g., FIPS-140-2 zeroization procedures).',
    'Include zeroization sequences in secure reset and deactivation procedures, and verify completion via status or fault registers.',
    'Design hardware state machines to force-zero critical registers on power-down or context-switch events.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Verilog module with explicit zeroization on reset or command
module crypto_unit (
  input        clk,
  input        reset_n,
  input        zeroize,       // active-high zeroize command
  input  [127:0] data_in,
  output reg [127:0] key_reg
);
  always @(posedge clk or negedge reset_n) begin
    if (!reset_n) begin
      key_reg <= 128'b0;        // synchronous reset zeroization
    end else if (zeroize) begin
      key_reg <= 128'b0;        // explicit zeroization on command
    end else begin
      key_reg <= data_in;       // normal operation
    end
  end
endmodule`,

    `// ✅ Good: C driver issuing zeroize before mode switch
#include <stdint.h>
#define ZEROIZE_REG (*(volatile uint32_t*)0x40000010)

void switch_user_mode(void) {
    // clear sensitive registers before switching context
    ZEROIZE_REG = 0x1;            // trigger hardware zeroization
    while (!(ZEROIZE_REG & 0x2));// wait for complete status bit
    // now safe to change user context
}`  
  ];

  const badPractices = [
    'Omitting zeroization commands—registers retain previous sensitive contents across mode changes.',
    'Relying solely on global reset without explicit zeroize support—some registers are unaffected.',
    'Not verifying completion of zeroization—hardware may not finish clearing before reuse.',
    'Embedding secret-loading logic without corresponding zeroize paths on error or timeout.',
    'Failing to include zeroization in power-down or low-power entry sequences, leaving remnant data.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: no zeroization path—register retains old key
module crypto_unit (
  input         clk,
  input         reset_n,
  input  [127:0] data_in,
  output reg [127:0] key_reg
);
  always @(posedge clk or negedge reset_n) begin
    if (!reset_n) begin
      key_reg <= data_in;        // improper reset handling
    end else begin
      key_reg <= data_in;        // no zeroize support
    end
  end
endmodule`,

    `// ❌ Bad: driver never issues zeroize before context change
void switch_user_mode(void) {
    // directly switch context, old register data remains
    set_user_context(new_context);
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
          Understanding CWE-1239
        </h2>
        <p>
          CWE-1239, “Improper Zeroization of Hardware Register,” occurs when a hardware component
          fails to clear sensitive information from internal registers when the operating mode or
          user context changes, potentially exposing secrets from a previous user :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2023-20593:</strong> An issue in “Zen 2” AMD CPUs under certain microarchitectural
            conditions may allow an attacker to access sensitive register contents that were not
            properly zeroized during context switches :contentReference[oaicite:1].
          </li>
          <li>
            <strong>Demonstrative Example:</strong> A hardware cryptographic accelerator without a proper
            zeroize command retains intermediate key material in registers after a mode change,
            enabling data remanence attacks :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always include explicit zeroization logic in hardware designs:
          define zeroize commands or signals, integrate them into reset and mode-switch sequences,
          verify completion via status bits, and adopt modules compliant with recognized zeroization
          standards (e.g., FIPS-140-2). 
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1239;

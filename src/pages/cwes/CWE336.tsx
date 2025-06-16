// src/pages/cwe/CWE336.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE336: React.FC = () => {
  const bestPractices = [
    'Always initialize your PRNG with a high-entropy, unpredictable seed (e.g., from a CSPRNG or OS entropy source).',
    'Use a fresh, unique seed for each instantiation of the PRNG—never reuse the same value across runs or objects.',
    'Prefer cryptographically secure RNG APIs (e.g., Node.js’s `crypto.randomFillSync`, Python’s `secrets` module).',
    'Validate that your runtime/platform truly reseeds between forks or restarts (especially in clustered or containerized environments).'
  ];

  const goodCodeSamples = [
    `// ✅ Good: use OS entropy to seed once, then reuse CSPRNG
import { randomFillSync } from 'crypto';

function makeSecureId(): string {
  const buffer = Buffer.alloc(16);
  randomFillSync(buffer);               // seeds from OS CSPRNG each call
  return buffer.toString('hex');
}`,

    `# ✅ Good: Python secrets for cryptographic tokens
import secrets

def generate_token(n_bytes=16):
    # secrets.token_bytes() uses a secure OS source under the hood
    return secrets.token_hex(n_bytes)`
  ];

  const badPractices = [
    'Seeding with a constant or hard-coded value (e.g., `new Random(12345)`), leading to identical sequences each run.',
    'Reusing a time-based seed with low resolution (e.g., seconds) resulting in collisions if called within the same second.',
    'Calling `seed()` repeatedly with the same value instead of relying on the generator’s internal state.',
    'Not re-seeding after fork/cluster events—child processes inherit the same RNG state and produce duplicate values.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: fixed seed produces identical "random" IDs every time
import { Random } from 'random-js';
const engine = Random.engines.mt19937().seed(0x12345678); 
const generator = new Random(engine);

function makeId() {
  return generator.hex(8);
}`,

    `# ❌ Bad: time-based seed with only second precision
import random
import time

random.seed(int(time.time()))  # if two runs within same second, same sequence
print([random.randint(0, 100) for _ in range(5)])`
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
          Understanding CWE-336
        </h2>
        <p>
          CWE-336, “Same Seed in Pseudo-Random Number Generator (PRNG),” occurs when a PRNG is
          initialized with the same seed every time. Because PRNGs are deterministic, using an
          identical seed yields the same sequence of outputs on each run or for each instance.
          Predictable “random” values can be exploited to guess session tokens, identifiers, or
          cryptographic material.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-41594:</strong> DrayTek Vigor Management UI used the same PRNG seed on
            each initialization, allowing attackers to predict generated values :contentReference[oaicite:0].
          </li>
          <li>
            <strong>CVE-2018-14647:</strong> A Red Hat product incorrectly reused a low-entropy seed
            across sessions, enabling attackers to reconstruct “random” outputs :contentReference[oaicite:1].
          </li>
        </ul>
        <p>
          To remediate CWE-336, switch to secure entropy sources, avoid manual seeding wherever
          possible, and ensure that any required seeding process introduces sufficient, unique
          randomness each time the generator is used.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE336;

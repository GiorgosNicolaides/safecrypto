// src/pages/cwe/CWE337.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE337: React.FC = () => {
  const bestPractices = [
    'Always rely on a true CSPRNG or OS-provided entropy source instead of manual seeding.',
    'If you must seed manually, gather seed material from multiple high-entropy sources (e.g., `/dev/urandom`, hardware RNG).',
    'Never seed from predictable values such as timestamps (`Date.now()`), process IDs, or counters.',
    'Use language/platform libraries designed for cryptographic use (e.g., Node.js `crypto`, Java `SecureRandom`, Python `secrets`).'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js crypto.randomFillSync (OS CSPRNG under the hood)
import { randomFillSync } from 'crypto';

function generateToken(bytes = 16): string {
  const buf = Buffer.alloc(bytes);
  randomFillSync(buf);
  return buf.toString('hex');
}`,

    `# ✅ Good: Python secrets for cryptographic randomness
import secrets

def create_session_id(n_bytes=16):
    # secrets.token_hex uses os.urandom internally
    return secrets.token_hex(n_bytes)`
  ];

  const badPractices = [
    'Seeding with the current time (`Date.now()`, `System.currentTimeMillis()`), which is easily guessable.',
    'Using process- or thread-specific values (PID, TID) as seeds.',
    'Hard-coding a constant seed value, leading to the same output sequence every run.',
    'Combining low-entropy values (e.g., user input hashes) without proper randomness amplification.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: time-based seed in Java
import java.util.Random;

public class TokenGen {
    private final Random rnd = new Random(System.currentTimeMillis());

    public int nextToken() {
        return rnd.nextInt();
    }
}`,

    `# ❌ Bad: Python random seeded with PID+time
import random, os, time

seed = os.getpid() ^ int(time.time())
random.seed(seed)
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
          Understanding CWE-337
        </h2>
        <p>
          CWE-337, “Predictable Seed in Pseudo-Random Number Generator (PRNG),” occurs when
          a PRNG is initialized with a seed that an attacker can guess or derive—such as
          the system time, process ID, or other low-entropy value. Predictable seeds lead to
          predictable random sequences, undermining the security of session tokens,
          identifiers, and cryptographic keys. :contentReference[oaicite:0]
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2022-40267:</strong> Mitsubishi Electric MELSEC iQ-F Series used a
            PRNG seeded from a predictable value, allowing attackers to guess authentication
            tokens and access the web server function :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2020-28597:</strong> Epignosis eFrontPro 5.2.21 seeded its password
            reset token generator from the system clock, enabling attackers to compute valid
            reset tokens and hijack accounts :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Always use CSPRNGs without manual seeding. If you
          must seed, use multiple high-entropy sources and never rely on time- or
          process-based values. Leverage standard cryptographic libraries that manage
          seeding internally and securely.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE337;

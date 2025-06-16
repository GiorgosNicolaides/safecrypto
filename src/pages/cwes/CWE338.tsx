// src/pages/cwe/CWE338.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE338: React.FC = () => {
  const bestPractices = [
    'Use a true CSPRNG (e.g., Python’s `secrets`, Node’s `crypto.randomBytes`, Java’s `SecureRandom`) for all security-critical values.',
    'Avoid general-purpose PRNGs (e.g., Python’s `random`, Java’s `java.util.Random`, JavaScript’s `Math.random()`) for tokens, IVs, keys or session IDs.',
    'Prefer high-level, audited libraries that wrap secure randomness (e.g., `cryptography.hazmat.primitives`, `Fernet`, `bcrypt`).',
    'On platforms with hardware RNG support, combine multiple entropy sources and ensure the OS pool is seeded before generating secrets.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: Python secrets for URL-safe token
import secrets

token = secrets.token_urlsafe(32)
store_token(token)  # 32-byte unguessable random token`,

    `// ✅ Good: Node.js crypto.randomBytes
import { randomBytes } from 'crypto';

const iv = randomBytes(16);               // secure IV
const key = randomBytes(32);              // secure key
cipher = createCipheriv('aes-256-gcm', key, iv);`,

    `// ✅ Good: Java SecureRandom for session ID
import java.security.SecureRandom;

SecureRandom rng = SecureRandom.getInstanceStrong();
byte[] sessionId = new byte[16];
rng.nextBytes(sessionId);
// convert to hex or base64 for use`
  ];

  const badPractices = [
    'Do not use `random.random()`, `random.randint()`, or `Math.random()` for anything security-related.',
    'Never initialize security tokens with `new Random()` in Java—its LCG is predictable :contentReference[oaicite:0]{index=0}.',
    'Avoid custom PRNG implementations or predictable seeds (timestamps, counters).',
    'Do not reuse the same seed or IV across multiple operations or sessions.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: Python random for token
import random, string

token = ''.join(random.choice(string.ascii_letters) for _ in range(32))
# predictable if PRNG state is known`,

    `// ❌ Bad: JavaScript Math.random for session ID
function genToken(len) {
  let token = '';
  for (let i = 0; i < len; i++) {
    token += Math.floor(Math.random() * 16).toString(16);
  }
  return token;
}
// not cryptographically secure`,

    `// ❌ Bad: Java java.util.Random for session ID
import java.util.Random;

Random rng = new Random();
byte[] sid = new byte[16];
rng.nextBytes(sid);
// attacker can recover RNG state and predict future bytes :contentReference[oaicite:1]{index=1}`
  ];

  return (
    <BackgroundWrapper>
      <DoDontLayout
        left={
          <>
            <div style={{ color: '#ffe81f', textAlign: 'left' }}>
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
            <div style={{ color: '#ffe81f', textAlign: 'left' }}>
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
          Understanding CWE-338
        </h2>
        <p>
          CWE-338 (“Use of Cryptographically Weak PRNG”) occurs when applications rely on deterministic
          or low-entropy generators—like linear congruential algorithms—for security-critical values.
          Since these PRNGs can be predicted once the internal state or seed is known, attackers can
          guess session IDs, tokens, keys, or IVs and bypass authentication or tamper with data.
        </p>
        <p>
          Always choose generators specifically designed for cryptographic use (CSPRNGs), which draw
          entropy from OS or hardware sources and resist state recovery attacks.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2006-6969:</strong> Jetty generated session identifiers using
            <code>java.util.Random</code>, making them predictable and enabling
            session-hijacking attacks :contentReference[oaicite:2].
          </li>
          <li>
            <strong>CVE-2015-2913:</strong> OrientDB used
            <code>java.util.Random</code> to create session IDs, allowing attackers to 
            predict and hijack user sessions :contentReference[oaicite:3].
          </li>
        </ul>
        <p>
          To remediate CWE-338, replace all uses of insecure PRNGs with CSPRNG APIs, audit libraries
          for hidden uses of weak randomness, and ensure any fallback logic does not degrade to
          predictable generators.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE338;

// src/pages/cwe/CWE335.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE335: React.FC = () => {
  const bestPractices = [
    'Use a cryptographically secure PRNG that sources entropy from the OS (e.g., Python’s secrets module or java.security.SecureRandom).',
    'Do not manually seed the PRNG in production—let the CSPRNG seed itself from high-entropy sources.',
    'Avoid predictable seeds such as timestamps, constant values, or process identifiers.',
    'Use explicit seeds only for testing or reproducibility in non-security contexts.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: Python cryptographic randomness
import secrets

def generate_token(length=32):
    # secrets uses os.urandom under the hood
    return secrets.token_hex(length)

# generate a secure random 32-byte token
token = generate_token()`,
    `// ✅ Good: Java SecureRandom
import java.security.SecureRandom;

public byte[] generateBytes(int length) {
    SecureRandom sr = new SecureRandom(); // automatically seeded with OS entropy
    byte[] bytes = new byte[length];
    sr.nextBytes(bytes);
    return bytes;
}`
  ];

  const badPractices = [
    'Seeding a PRNG with constant or easily guessable values (e.g., a fixed number).',
    'Using system time or process IDs as seeds for security-sensitive randomness.',
    'Reseeding a CSPRNG with predictable values during runtime.',
    'Using non-cryptographic PRNGs (e.g., java.util.Random or Python’s random) for token or key generation.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: predictable seed from timestamp
import random, time

# seeded with current time in seconds
random.seed(int(time.time()))
token = random.getrandbits(128)`,
    `// ❌ Bad: hard-coded seed
import java.util.Random;

public int badExample() {
    // seeded with fixed constant
    Random rand = new Random(12345);
    return rand.nextInt();
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
          Understanding CWE-335
        </h2>
        <p>
          CWE-335 (Incorrect Usage of Seeds in PRNG) occurs when a pseudo-random number generator
          (PRNG) is seeded with predictable or low-entropy values, or when a non-cryptographic PRNG
          is used for security-sensitive operations. Since the output of a PRNG is completely determined
          by its seed, exposing or predicting the seed allows attackers to reproduce the entire sequence
          of values.
        </p>
        <p>
          Security-critical systems must rely on cryptographically secure PRNGs that seed themselves
          from high-entropy sources (e.g., OS-provided randomness). Manual or predictable seeding
          drastically reduces entropy, making it trivial for attackers to guess tokens, keys, or nonces.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2008-0166:</strong> A Debian-specific patch removed calls that mixed entropy
            into OpenSSL’s PRNG, resulting in predictable keys generated by OpenSSL on Debian-based
            systems. Attackers could regenerate private keys by reproducing PRNG output.
          </li>
          <li>
            <strong>CVE-2020-28597:</strong> Epignosis EfrontPro 5.2.21 seeded its password reset
            token generator with a predictable value, allowing attackers to generate valid reset tokens
            and hijack user accounts.
          </li>
        </ul>
        <p>
          To remediate CWE-335, use secure randomness APIs that automatically gather sufficient
          entropy (e.g., Python’s <code>secrets</code> or Java’s <code>SecureRandom</code>), avoid
          custom seeding in production, and never use predictable values such as timestamps or fixed
          constants for seeding.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE335;

// src/pages/cwe/CWE331.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE331: React.FC = () => {
  const bestPractices = [
    'Use a cryptographically secure RNG (e.g., Python’s `secrets` module) rather than default PRNGs.',
    'Ensure the OS entropy pool is sufficiently initialized—avoid `/dev/urandom` before system boot entropy gathering.',
    'Combine multiple entropy sources (e.g., hardware RNG, user input, network jitter) when seeding long-lived keys.',
    'On platforms with `/dev/random`, block until enough entropy is available before generating critical material.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: use secrets.token_bytes for key material
import secrets

# generates 32 bytes of CSPRNG data
key = secrets.token_bytes(32)
store_key(key)`,

    `# ✅ Good: mix hardware RNG and OS RNG
import os
import subprocess

# get 64 bytes from OS RNG
os_bytes = os.urandom(64)
# get 64 bytes from a hardware RNG utility
hw_bytes = subprocess.check_output(['rngd', '--generate'])
# combine and derive final key
import hashlib
key = hashlib.sha256(os_bytes + hw_bytes).digest()
store_key(key)`
  ];

  const badPractices = [
    'Do not use the default `random` module or `random.getrandbits()` for security-critical values.',
    'Never seed your PRNG with predictable data (timestamps, fixed strings).',
    'Avoid using `/dev/urandom` immediately after boot when the entropy pool may be low.',
    'Do not assume high-throughput non-blocking RNGs provide strong entropy for long-term keys.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: using random with default seed
import random

# predictable under analysis of PRNG state
random.seed()
key = random.getrandbits(256)
store_key(key)`,

    `# ❌ Bad: deriving IV from timestamp
import time, os
from Crypto.Cipher import AES

key = os.urandom(32)
iv = int(time.time()).to_bytes(16, 'big')  # low-entropy IV
cipher = AES.new(key, AES.MODE_CBC, iv)`
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
          Understanding CWE-331
        </h2>
        <p>
          CWE-331 (“Insufficient Entropy”) occurs when applications generate cryptographic values—
          keys, nonces, IVs—with inadequate randomness. If the entropy source is predictable or
          under-seeded, attackers can reconstruct or brute-force the values, leading to full
          compromise of confidentiality and integrity protections.
        </p>
        <p>
          Early in system boot, or on embedded devices without hardware RNGs, the OS entropy
          pool may not be sufficiently populated. Generating keys at this stage risks using
          low-entropy values that can be predicted by attackers monitoring system state.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2008-0166:</strong> Debian OpenSSL bug drastically reduced the SSL
            keyspace by using predictable PRNG seeds, allowing automated recovery of private keys.
          </li>
          <li>
            <strong>CVE-2016-5093:</strong> Android’s SecureRandom was improperly seeded,
            enabling predictable key generation and session hijacking in certain apps.
          </li>
        </ul>
        <p>
          To remediate CWE-331, always use CSPRNGs with proven entropy collection, combine
          multiple sources when necessary, and ensure that critical key generation only
          occurs after sufficient entropy is available.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE331;

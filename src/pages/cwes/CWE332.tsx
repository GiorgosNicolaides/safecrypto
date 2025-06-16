// src/pages/cwe/CWE332.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE332: React.FC = () => {
  const bestPractices = [
    'Seed PRNGs with high-quality entropy sources (e.g., OS CSPRNG) before use.',
    'Use cryptographically secure generators (`secrets`, `os.urandom`) for all security-critical randomness.',
    'Ensure your platform’s entropy pool is initialized—on Linux, prefer `/dev/random` for seeding if low entropy is a concern.',
    'Combine multiple entropy sources (hardware RNG, user input, network timing) when generating long-lived keys.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: use secrets for all random needs
import secrets

# 32-byte token with CSPRNG
token = secrets.token_urlsafe(32)`,

    `# ✅ Good: mix OS and hardware RNG
import os
import subprocess
import hashlib

os_bytes = os.urandom(64)
hw_bytes = subprocess.check_output(['rngd', '--generate'])
key = hashlib.sha256(os_bytes + hw_bytes).digest()`
  ];

  const badPractices = [
    'Do not rely on non-crypto PRNGs (e.g., `random`, `Math.random()`) for security.',
    'Avoid seeding with predictable values (timestamps, incremental counters).',
    'Never generate critical keys or IVs before sufficient entropy is available.',
    'Do not use the same seed across multiple sessions or deployments.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: using random for tokens
import random, string

token = ''.join(random.choice(string.ascii_letters) for _ in range(32))`,

    `# ❌ Bad: timestamp-based seed
import time, random

random.seed(int(time.time()))
iv = bytes([random.getrandbits(8) for _ in range(16)])`
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
          Understanding CWE-332
        </h2>
        <p>
          CWE-332 (“Insufficient Entropy in PRNG”) occurs when a pseudo-random number generator
          is seeded or operated with too little or poor-quality entropy. This can cause the PRNG
          to produce predictable output, undermining confidentiality, integrity, and authentication
          mechanisms that rely on randomness.
        </p>
        <p>
          Early-boot environments, containerized systems, or embedded devices may lack sufficient
          entropy. If a generator falls back to a default seed or fails open when entropy is low,
          cryptographic values (keys, nonces, tokens) become guessable by attackers.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2008-0166:</strong> Debian’s OpenSSL package patched out the RNG-seeding
            code, causing keys generated on affected systems to be predictable and easily brute-forced :contentReference[oaicite:0].
          </li>
          <li>
            <strong>CVE-2013-7373:</strong> Android before 4.4 did not properly seed the OpenSSL
            PRNG, allowing apps to generate weak random values and compromising cryptographic
            operations :contentReference[oaicite:1].
          </li>
        </ul>
        <p>
          To remediate CWE-332, always ensure your PRNGs are seeded from high-quality entropy,
          use OS-provided CSPRNGs (`secrets`, `os.urandom`), and delay key generation until the
          system’s entropy pool is sufficiently initialized.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE332;

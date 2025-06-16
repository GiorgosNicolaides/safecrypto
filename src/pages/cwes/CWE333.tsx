// src/pages/cwe/CWE333.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE333: React.FC = () => {
  const bestPractices = [
    'Detect and block when your TRNG indicates “insufficient entropy” rather than silently proceeding.',
    'Use blocking entropy sources (e.g., `/dev/random`) or platform APIs that guarantee readiness.',
    'Log or surface errors when TRNG initialization fails, and abort key generation or critical operations.',
    'Combine multiple independent entropy sources (hardware RNG, OS RNG, timing jitter) when available.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: blocking read from /dev/random until enough entropy
import os

with open('/dev/random', 'rb') as rnd:
    key = rnd.read(32)   # blocks until 32 bytes of true entropy are available
store_key(key)`,

    `# ✅ Good: check getrandom error and retry
import ctypes, os, errno

libc = ctypes.CDLL('libc.so.6')
GRND_RANDOM = 0x0001
buf = (ctypes.c_ubyte * 32)()
res = libc.getrandom(buf, 32, GRND_RANDOM)
if res < 0:
    err = ctypes.get_errno()
    if err == errno.EAGAIN:
        raise RuntimeError("Insufficient entropy; try again later")
key = bytes(buf)
store_key(key)`
  ];

  const badPractices = [
    'Do not fall back to non-cryptographic RNG (e.g., Python’s random) when TRNG isn’t ready.',
    'Avoid ignoring or swallowing errors from TRNG initialization calls.',
    'Never proceed with key generation on low-entropy warning or partial reads.',
    'Do not treat `/dev/urandom` as always safe on systems with uninitialized pools (early boot or embedded).'
  ];

  const badCodeSamples = [
    `# ❌ Bad: silent fallback to /dev/urandom on read failure
import os

try:
    key = open('/dev/random','rb').read(32)
except BlockingIOError:
    key = os.urandom(32)   # may be low-quality entropy on some platforms
store_key(key)`,

    `# ❌ Bad: ignoring getrandom errors
import ctypes

libc = ctypes.CDLL('libc.so.6')
buf = (ctypes.c_ubyte * 32)()
libc.getrandom(buf, 32, 0)   # errors ignored, may return short or uninitialized buffer
key = bytes(buf)
store_key(key)`
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
          Understanding CWE-333
        </h2>
        <p>
          CWE-333 (“Improper Handling of Insufficient Entropy in TRNG”) arises when software
          uses a true-random number generator (TRNG) but fails to handle cases where the
          hardware or OS indicates there isn’t enough entropy. Instead of blocking or failing,
          applications may proceed with weak or predictable values.
        </p>
        <p>
          This is especially critical on embedded devices or during early system boot, where
          entropy pools may not yet be initialized. Proper handling requires checking for
          blocking conditions or explicit status flags and refusing to generate keys or
          nonces until sufficient randomness is available.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2018-7183:</strong> A hardware RNG driver on certain IoT devices did
            not report low-entropy states, causing keys generated at boot to be predictable.
          </li>
          <li>
            <strong>CVE-2016-5093:</strong> Android’s SecureRandom seeded from insufficient
            entropy early in boot, resulting in weak keys used by multiple apps.
          </li>
        </ul>
        <p>
          To remediate CWE-333, always check TRNG readiness, block or retry on insufficient
          entropy, and log or raise errors rather than silently falling back. Combining
          multiple entropy sources and delaying critical key generation until pools are
          initialized ensures strong randomness.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE333;

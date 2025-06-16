// src/pages/cwe/CWE324.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE324: React.FC = () => {
  const bestPractices = [
    'Embed an expiration timestamp with each key and refuse to use keys past that date.',
    'Store key metadata (creation date, expiration) in your key management system.',
    'Before decryption or signing, always check `if (now <= key.expiration) throws`.',
    'Automate key rotation: generate new keys before old ones expire, and remove expired keys.'
  ];

  const goodCodeSamples = [
    `# ✅ Good: checking key expiration before use
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from datetime import datetime
import json, os

# load key metadata
meta = json.load(open("key_meta.json"))
key_bytes = bytes.fromhex(meta["key_hex"])
expiration = datetime.fromisoformat(meta["expires_at"])

if datetime.utcnow() > expiration:
    raise RuntimeError("Encryption key has expired—rotate keys immediately")

aesgcm = AESGCM(key_bytes)
nonce = os.urandom(12)
ciphertext = aesgcm.encrypt(nonce, b"Sensitive data", None)`,

    `# ✅ Good: JWT verification enforces exp claim
import jwt
from datetime import datetime, timezone

secret = os.environ["JWT_SECRET"]
token = "eyJhbGciOi..."

# this will raise if token is expired
payload = jwt.decode(token, secret, algorithms=["HS256"])
print("Token valid until", datetime.fromtimestamp(payload["exp"], timezone.utc))`
  ];

  const badPractices = [
    'Do not ignore expiration—using an expired key allows past breaches to reach forward.',
    'Avoid hard-coding keys without any metadata about lifetime.',
    'Never continue to accept tokens or ciphertext just because decryption “works.”',
    'Do not leave expired keys in your active keystore—prune them automatically.'
  ];

  const badCodeSamples = [
    `# ❌ Bad: silently using expired key
from cryptography.fernet import Fernet

# expired hardcoded key—no check
key = b'vX4Gz...=='  
cipher = Fernet(key)
token = "gAAAAA..."
# returns plaintext even if key should be retired
plaintext = cipher.decrypt(token)`,

    `# ❌ Bad: accepting JWTs without checking exp
import jwt

secret = os.environ["JWT_SECRET"]
token = "eyJhbGc..."

# decode without verify_exp allows expired tokens
payload = jwt.decode(token, secret, algorithms=["HS256"], options={"verify_exp": False})
# attacker can replay old token indefinitely`
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
          Understanding CWE-324
        </h2>
        <p>
          CWE-324 (“Use of Key Past its Expiration Date”) refers to continued use of cryptographic keys
          beyond their intended lifetime. Even if a key has not been directly compromised, its prolonged
          use increases the risk that older, weaker key material becomes vulnerable to cryptanalysis or
          accidental exposure.
        </p>
        <p>
          When a key expires, it should be immediately retired: no decryption, signing, or token verification
          should proceed with that key. Automated rotation ensures new messages use fresh keys, and pruning
          expired keys keeps your keystore clean.
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2021-3449:</strong> OpenSSL servers that did not enforce re-keying on long-lived
            connections allowed session keys to remain in use beyond safe limits, increasing exposure to
            timing attacks.
          </li>
          <li>
            <strong>CVE-2020-0601 (CurveBall):</strong> Windows CryptoAPI’s failure to properly validate
            certificate parameters including expiration enabled malicious certificates to be accepted.
          </li>
        </ul>
        <p>
          Always embed expiration metadata with each key, check that `now {'<'}= expiration` before use, and
          automate key rollover to defend against both accidental and deliberate misuse of outdated keys.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE324;

import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const EncryptionWithoutIntegrity: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-759',
      title: 'Use of a One-Way Hash Without a Salt',
      path: '/cwe-759'
    },
    {
      id: 'CWE-760',
      title: 'Use of a One-Way Hash with a Predictable Salt',
      path: '/cwe-760'
    },
    {
      id: 'CWE-649',
      title: 'Reliance on Obfuscation or Encryption of Security-Relevant Inputs Without Integrity Checking',
      path: '/cwe-649'
    },
    {
      id: 'CWE-323',
      title: 'Reusing a Nonce, Key Pair in Encryption',
      path: '/cwe-323'
    },
    {
      id: 'CWE-347',
      title: 'Improper Verification of Cryptographic Signature',
      path: '/cwe-347'
    },
    {
      id: 'CWE-349',
      title: 'Acceptance of Extraneous Untrusted Data With Trusted Data',
      path: '/cwe-349'
    }
  ];

  const description = `
Encryption without integrity checking can protect confidentiality but fails to guarantee that data has not been tampered with.  
Using unsalted hashes (CWE-759) or predictable salts (CWE-760) leaves digests vulnerable to rainbow‐table and preimage attacks.  
Obfuscation or naively “encrypting” security inputs without verifying authenticity (CWE-649) allows attackers to inject malicious payloads undetected.  
Reusing nonces or key pairs (CWE-323) breaks uniqueness guarantees, enabling replay or forgery of ciphertexts.  
Skipping proper signature verification (CWE-347) or accepting extra untrusted data alongside trusted content (CWE-349) opens doors to tampering and chosen‐ciphertext attacks.  
Always employ authenticated encryption (e.g., AES-GCM, ChaCha20-Poly1305) or combine encryption with a secure MAC/digital signature to ensure both confidentiality and integrity.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Encryption Without Integrity Checking"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default EncryptionWithoutIntegrity;

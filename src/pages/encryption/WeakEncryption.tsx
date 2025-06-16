import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const WeakEncryption: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-326', title: 'Inadequate Encryption Strength', path: '/cwe-326' },
    { id: 'CWE-327', title: 'Use of a Broken or Risky Cryptographic Algorithm', path: '/cwe-327' },
    { id: 'CWE-328', title: 'Use of a Weak Hash', path: '/cwe-328' },
    { id: 'CWE-325', title: 'Missing Cryptographic Step', path: '/cwe-325' },
  ];

  const description = `
Weak or inadequate encryption algorithms expose data to brute-force and cryptanalysis.  
Attackers can break short key lengths or deprecated ciphers in minutes, rendering “encrypted” data effectively cleartext.  
Proper use of AES-256 or ChaCha20 with secure key exchange and authenticated encryption modes is essential to ensure both confidentiality and integrity.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Weak or Inadequate Encryption"
        cwes={cwes}
        description={description}

      />
    </BackgroundWrapper>
  );
};

export default WeakEncryption;

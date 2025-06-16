import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const AlgorithmDowngrade: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-757',
      title: "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
      path: '/cwe-757'
    },
    {
      id: 'CWE-780',
      title: 'Use of RSA Algorithm without OAEP',
      path: '/cwe-780'
    },
    {
      id: 'CWE-1240',
      title: 'Use of a Cryptographic Primitive with a Risky Implementation',
      path: '/cwe-1240'
    }
  ];

  const description = `
Algorithm downgrade attacks force communication to use older or weaker cryptographic primitives, breaking confidentiality and integrity protections.  
During protocol negotiation, an attacker can strip out modern cipher suites or padding schemes, coercing both client and server into selecting a less-secure algorithm (CWE-757).  
Using bare RSA encryption without OAEP padding (CWE-780) leaves ciphertexts vulnerable to chosen-ciphertext attacks and simple decryption exploits.  
Even when algorithms appear secure, implementations with known flaws or side-channel leakages (CWE-1240) can be exploited by adversaries to recover keys or plaintext.  
Defenses include enforcing strict version and cipher policies, disabling deprecated suites, requiring OAEP for RSA, and keeping cryptographic libraries patched to avoid risky implementations.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Algorithm Downgrade or Weak Selection"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default AlgorithmDowngrade;

import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const InsufficientRandomness: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-330', title: 'Use of Insufficiently Random Values', path: '/cwe-330' },
    { id: 'CWE-331', title: 'Insufficient Entropy', path: '/cwe-331' },
    { id: 'CWE-332', title: 'Insufficient Entropy in PRNG', path: '/cwe-332' },
    { id: 'CWE-333', title: 'Improper Handling of Insufficient Entropy in TRNG', path: '/cwe-333' },
    { id: 'CWE-338', title: 'Use of Cryptographically Weak PRNG', path: '/cwe-338' }
  ];

  const description = `
True randomness is essential for secure cryptographic operations.  
Using values derived from low-entropy sources makes keys, nonces, and salts predictable.  
PRNGs seeded with insufficient entropy can be reverse-engineered by attackers.  
TRNG implementations must detect and handle low-entropy conditions to avoid predictable outputs.  
Relying on weak or compromised random number generators undermines confidentiality and integrity.  
Systems should use CSPRNGs seeded from multiple high-quality entropy sources and monitor entropy pool health.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Insufficient Randomness or Predictability"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default InsufficientRandomness;

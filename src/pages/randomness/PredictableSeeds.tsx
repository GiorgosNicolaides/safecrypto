import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const PredictableSeeds: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-335', title: 'Incorrect Usage of Seeds in PRNG', path: '/cwe-335' },
    { id: 'CWE-336', title: 'Same Seed in PRNG', path: '/cwe-336' },
    { id: 'CWE-337', title: 'Predictable Seed in PRNG', path: '/cwe-337' }
  ];

  const description = `
Predictable or reused seeds undermine the randomness of cryptographic operations.  
When the same seed is used across sessions (CWE-336) or derived from predictable sources (CWE-337), attackers can reconstruct PRNG outputs and compromise keys, nonces, or tokens.  
Incorrect handling of seeds (CWE-335), such as failing to reseed after initialization or exposing seed values in logs, further increases predictability.  
Systems must generate unique, high-entropy seeds for each context and avoid any reuse to ensure true unpredictability.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Predictable or Reused Seeds"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default PredictableSeeds;

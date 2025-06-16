import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const MissingWeakChecks: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-353',
      title: 'Missing Support for Integrity Check',
      path: '/cwe-353'
    },
    {
      id: 'CWE-354',
      title: 'Improper Validation of Integrity Check Value',
      path: '/cwe-354'
    },
    {
      id: 'CWE-1239',
      title: 'Improper Zeroization of Hardware Register',
      path: '/cwe-1239'
    }
  ];

  const description = `
When systems lack proper integrity checks, attackers can manipulate data undetected, leading to corrupted files, unauthorized modifications, or malicious code insertion.  
Missing support for integrity verification (CWE-353) means no mechanism exists to confirm data hasn’t been tampered with.  
Even if a check is present, improperly validating the integrity value (CWE-354) can allow altered data to pass as legitimate.  
Hardware components that fail to zeroize registers correctly (CWE-1239) leave residual sensitive data accessible after use.  
Using cryptographic hashes or digital signatures along with strict validation is essential to ensure data integrity at every stage.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Missing or Weak Integrity Checks"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default MissingWeakChecks;

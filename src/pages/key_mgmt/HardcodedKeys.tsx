import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const HardcodedKeys: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-321', title: 'Use of Hard-coded Cryptographic Key', path: '/cwe-321' },
    { id: 'CWE-798', title: 'Use of Hard-coded Credentials', path: '/cwe-798' },
    { id: 'CWE-1392', title: 'Use of Default Credentials', path: '/cwe-1392' },
    { id: 'CWE-1394', title: 'Use of Default Cryptographic Key', path: '/cwe-1394' },
    { id: 'CWE-258', title: 'Empty Password in Configuration File', path: '/cwe-258' },
    { id: 'CWE-260', title: 'Password in Configuration File', path: '/cwe-260' },
  ];

  const description = `
Hardcoded or default keys and credentials embedded directly in application code or configuration files expose secrets to anyone with read access. 
Attackers can extract hard-coded cryptographic keys (CWE-321) or credentials (CWE-798) from binaries or source repositories to decrypt data or gain unauthorized access. 
Default credentials or default cryptographic keys (CWE-1392, CWE-1394) shipped with software allow trivial takeover of systems if not changed. 
Empty or predictable passwords in config files (CWE-258, CWE-260) provide easy entry points for attackers. 
Secure secrets management—using vaults, environment variables, and automated rotation—is essential to prevent exposure of sensitive keys and credentials.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Hardcoded or Default Keys/Credentials"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default HardcodedKeys;

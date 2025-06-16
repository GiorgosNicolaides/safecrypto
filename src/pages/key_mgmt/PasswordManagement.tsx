import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const PasswordManagement: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-258', title: 'Empty Password in Configuration File', path: '/cwe-258' },
    { id: 'CWE-261', title: 'Weak Encoding for Password', path: '/cwe-261' },
    { id: 'CWE-555', title: 'J2EE Misconfiguration: Plaintext Password in Configuration File', path: '/cwe-555' },
    { id: 'CWE-13', title: 'ASP.NET Misconfiguration: Password in Configuration File', path: '/cwe-13' },
    { id: 'CWE-262', title: 'Not Using Password Aging', path: '/cwe-262' },
    { id: 'CWE-263', title: 'Password Aging with Long Expiration', path: '/cwe-263' }
  ];

  const description = `
Password management issues put credentials at risk when they are not handled securely.  
Empty passwords in configuration files allow attackers to gain immediate access without guessing or cracking.  
Weak encoding or reversible encryption of passwords makes it trivial for attackers to recover credentials from stored data.  
J2EE and ASP.NET misconfigurations that store plaintext passwords in config files expose secrets to source code access or logs.  
Failing to implement password aging policies or setting expiration periods that are too long keeps compromised credentials valid indefinitely.  
Enforcing strong hashing, complexity requirements, rotation, and removing plaintext credentials from code are essential for robust password management.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Password Management Issues"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default PasswordManagement;

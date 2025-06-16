import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const WeakCredentialManagement: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-555',
      title: 'J2EE Misconfiguration: Plaintext Password in Configuration File',
      path: '/cwe-555'
    },
    {
      id: 'CWE-593',
      title: 'Authentication Bypass: OpenSSL CTX Object Modified after SSL Objects are Created',
      path: '/cwe-593'
    }
  ];

  const description = `
Mismanagement of credentials undermines all authentication and authorization controls.  
Storing plaintext passwords in configuration files (CWE-555) exposes secrets to anyone with file access or through leaked backups.  
Modifying OpenSSL CTX objects after SSL contexts are created (CWE-593) can bypass authentication checks, allowing attackers to circumvent certificate validation and impersonate trusted endpoints.  
Secure credential management—including encrypted storage, strict file permissions, and immutability of crypto context objects—is essential to prevent unauthorized access and maintain system integrity.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Weak Credential Management"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default WeakCredentialManagement;

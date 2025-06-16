import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const CleartextTransmission: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-311', title: 'Missing Encryption of Sensitive Data', path: '/cwe-311' },
    { id: 'CWE-319', title: 'Cleartext Transmission of Sensitive Information', path: '/cwe-319' },
    { id: 'CWE-370', title: 'Missing Check for Certificate Revocation After Initial Check', path: '/cwe-370' },
    { id: 'CWE-523', title: 'Unprotected Transport of Credentials', path: '/cwe-523' },
    { id: 'CWE-549', title: 'Missing Password Field Masking', path: '/cwe-549' },
    { id: 'CWE-5',   title: 'J2EE Misconfiguration: Data Transmission Without Encryption', path: '/cwe-5'   },
  ];

  const description = `
Cleartext or improperly transmitted data can be intercepted, eavesdropped upon, or manipulated in transit.  
Passwords, tokens, or other secrets sent over unencrypted channels expose users to credential theft and session hijacking.  
Always enforce end-to-end encryption (e.g., TLS 1.2+, SSH) and never fall back to plaintext transport.  
Implement certificate revocation checks, password masking on input fields, and secure transport configurations to close gaps in data transmission security.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Cleartext or Improper Transmission"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default CleartextTransmission;

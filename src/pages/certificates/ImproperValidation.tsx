import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const ImproperValidation: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-295', title: 'Improper Certificate Validation', path: '/cwe/295' },
    { id: 'CWE-296', title: 'Improper Following of a Certificate\'s Chain of Trust', path: '/cwe/296' },
    { id: 'CWE-297', title: 'Improper Validation of Certificate with Host Mismatch', path: '/cwe/297' },
    { id: 'CWE-298', title: 'Improper Validation of Certificate Expiration', path: '/cwe/298' },
    { id: 'CWE-299', title: 'Improper Check for Certificate Revocation', path: '/cwe/299' },
  ];

  const description = `
Digital certificates authenticate identities and secure communications.  
Failing to properly validate certificates (CWE-295) allows attackers to present forged certificates and impersonate legitimate servers.  
Skipping or incorrectly implementing the chain-of-trust checks (CWE-296) can let malicious intermediates slip through.  
Ignoring hostname mismatches (CWE-297) or expired certificates (CWE-298) breaks the core assurances of SSL/TLS.  
Additionally, not verifying revocation status (CWE-299) leaves clients vulnerable to certificates that have been compromised or revoked by CAs.  
Strictly enforcing these validations is essential to prevent man-in-the-middle attacks and ensure end-to-end trust.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Improper Certificate Validation"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default ImproperValidation;

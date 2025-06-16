import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const MismanagementTrustChains: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-599',
      title: 'Missing Validation of OpenSSL Certificate',
      path: '/cwe/599'
    },
    {
      id: 'CWE-370',
      title: 'Missing Check for Certificate Revocation After Initial Check',
      path: '/cwe/370'
    }
  ];

  const description = `
Trust chains ensure that a presented certificate ties back to a trusted root authority.  
When intermediate or root certificates are not properly validated (CWE-599), clients may accept certificates signed by untrusted or malicious CAs.  
Moreover, failing to recheck revocation status after the initial validation (CWE-370) can allow use of certificates that were later revoked due to compromise or misissuance.  
A robust trust-chain implementation must verify each link in the chain against the trusted store and perform fresh revocation checks for every session to maintain end-to-end security.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Mismanagement of Trust Chains"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default MismanagementTrustChains;

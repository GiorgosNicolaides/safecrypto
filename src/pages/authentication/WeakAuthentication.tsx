import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const WeakAuthentication: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-302',
      title: 'Authentication Bypass by Assumed-Immutable Data',
      path: '/cwe-302'
    },
    {
      id: 'CWE-303',
      title: 'Incorrect Implementation of Authentication Algorithm',
      path: '/cwe-303'
    },
    {
      id: 'CWE-304',
      title: 'Missing Critical Step in Authentication',
      path: '/cwe-304'
    },
    {
      id: 'CWE-640',
      title: 'Weak Password Recovery Mechanism for Forgotten Password',
      path: '/cwe-640'
    },
    {
      id: 'CWE-916',
      title: 'Use of Password Hash with Insufficient Computational Effort',
      path: '/cwe-916'
    },
    {
      id: 'CWE-836',
      title: 'Use of Password Hash Instead of Password for Authentication',
      path: '/cwe-836'
    },
    {
      id: 'CWE-1390',
      title: 'Weak Authentication',
      path: '/cwe-1390'
    }
  ];

  const description = `
Weak authentication practices open doors to attackers who can bypass login and access controls.  
Assuming user data is immutable (CWE-302) allows attackers to inject or tamper with credentials after initial verification.  
Incorrect implementation of the authentication algorithm (CWE-303) or skipping a critical step (CWE-304) undermines the entire login process.  
Weak password recovery mechanisms (CWE-640) can let attackers reset or guess forgotten passwords without proper verification.  
Using fast hashes with low computational cost (CWE-916) or erroneously using a stored hash as the password itself (CWE-836) makes offline cracking trivial.  
Overall weak authentication (CWE-1390) fails to enforce strong credentials, multifactor checks, and secure session management, putting systems at risk of account takeover.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Weak Authentication Practices"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default WeakAuthentication;

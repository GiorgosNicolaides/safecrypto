import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const WeakKeyManagement: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-324',
      title: 'Use of Key Past its Expiration Date',
      path: '/cwe-324'
    },
    {
      id: 'CWE-322',
      title: 'Key Exchange Without Entity Authentication',
      path: '/cwe-322'
    },
    {
      id: 'CWE-329',
      title: 'Generation of Predictable IV with CBC Mode',
      path: '/cwe-329'
    },
    {
      id: 'CWE-1204',
      title: 'Generation of Weak Initialization Vector (IV)',
      path: '/cwe-1204'
    },
    {
      id: 'CWE-522',
      title: 'Insufficiently Protected Credentials',
      path: '/cwe-522'
    }
  ];

  const description = `
Keys that remain valid beyond their intended lifetime can be compromised without detection.  
Exchanging keys without authenticating each party (entity authentication) enables man-in-the-middle attacks during the handshake.  
Predictable or reused initialization vectors in CBC mode allow attackers to infer plaintext patterns and forge messages.  
Weak IV generation—such as using low-entropy sources or static values—undermines the confidentiality guarantees of block ciphers.  
Finally, storing credentials or keys in unprotected form (e.g., plaintext files or insecure databases) exposes them to unauthorized access.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Weak Key Management Practices"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default WeakKeyManagement;

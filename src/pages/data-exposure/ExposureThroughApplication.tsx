import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const ExposureThroughApplication: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-315',
      title: 'Cleartext Storage of Sensitive Information in a Cookie',
      path: '/cwe-315'
    },
    {
      id: 'CWE-316',
      title: 'Cleartext Storage of Sensitive Information in Memory',
      path: '/cwe-316'
    },
    {
      id: 'CWE-317',
      title: 'Cleartext Storage of Sensitive Information in GUI',
      path: '/cwe-317'
    }
  ];

  const description = `
Applications can inadvertently expose sensitive data when they store or display it in cleartext.  
Cookies that hold session tokens or user identifiers without encryption (CWE-315) can be stolen via cross-site scripting or network interception.  
Storing secrets in application memory in plaintext (CWE-316) leaves them accessible to other processes, crash dumps, or heap-spray attacks.  
Displaying sensitive content directly in GUI elements (CWE-317)—for example in logs, debug panels, or error dialogs—can reveal personal or security-critical information to anyone viewing the screen.  
Developers must use encrypted cookies, secure in-memory storage techniques, and redact or mask confidential data in user interfaces to prevent unintended exposure.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Exposure Through Application"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default ExposureThroughApplication;

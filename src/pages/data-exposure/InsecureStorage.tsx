import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const InsecureStorage: React.FC = () => {
  const cwes: CWEEntry[] = [
    { id: 'CWE-312', title: 'Cleartext Storage of Sensitive Information', path: '/cwe-312' },
    { id: 'CWE-313', title: 'Cleartext Storage in a File or on Disk', path: '/cwe-313' },
    { id: 'CWE-314', title: 'Cleartext Storage in the Registry', path: '/cwe-314' },
    { id: 'CWE-318', title: 'Cleartext Storage of Sensitive Information in Executable', path: '/cwe-318' },
    { id: 'CWE-526', title: 'Cleartext Storage of Sensitive Information in an Environment Variable', path: '/cwe-526' }
  ];

  const description = `
Storing sensitive data in unencrypted form anywhere on a system exposes it to theft or tampering.  
Cleartext storage in files or on disk allows attackers with file system access to read secrets directly.  
Registry entries that contain credentials or configuration without encryption leave Windows systems vulnerable to compromise.  
Embedding secrets in executables makes them discoverable through reverse engineering or binary analysis.  
Environment variables that hold passwords or keys can be dumped by running processes or malicious code.  
To mitigate these risks, use encrypted storage mechanisms such as OS keychains or secure vaults, enforce encryption at rest, and rotate secrets regularly.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Storage in Insecure Locations"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default InsecureStorage;

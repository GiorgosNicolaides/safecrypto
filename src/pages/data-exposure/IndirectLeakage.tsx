import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SubCategoryPage from '../../components/SubCategoryPage';
import type { CWEEntry } from '../../components/SubCategoryPage';

const IndirectLeakage: React.FC = () => {
  const cwes: CWEEntry[] = [
    {
      id: 'CWE-1230',
      title: 'Exposure of Sensitive Information Through Metadata',
      path: '/cwe-1230'
    },
    {
      id: 'CWE-1258',
      title: 'Exposure of Sensitive System Information Due to Uncleared Debug Information',
      path: '/cwe-1258'
    },
    {
      id: 'CWE-1420',
      title: 'Exposure of Sensitive Information During Transient Execution',
      path: '/cwe-1420'
    },
    {
      id: 'CWE-1421',
      title: 'Exposure of Sensitive Information in Shared Microarchitectural Structures during Transient Execution',
      path: '/cwe-1421'
    },
    {
      id: 'CWE-1422',
      title: 'Exposure of Sensitive Information caused by Incorrect Data Forwarding during Transient Execution',
      path: '/cwe-1422'
    },
    {
      id: 'CWE-1423',
      title: 'Exposure of Sensitive Information caused by Shared Microarchitectural Predictor State that Influences Transient Execution',
      path: '/cwe-1423'
    }
  ];

  const description = `
Indirect information leakage lets attackers glean secrets from side channels or artifacts rather than direct data access.  
Metadata in files—like timestamps, author info, or version history—can reveal document lifecycles or system structure.  
Uncleared debug symbols and log traces (CWE-1258) expose internal paths, variable names, and configuration details.  
Transient execution vulnerabilities (CWE-1420, CWE-1421, CWE-1422, CWE-1423) arise when speculative or out-of-order CPU operations leave residual data in caches or predictors, allowing side-channel extraction of secrets.  
Awareness and mitigation—stripping metadata, disabling debug outputs, and applying CPU microcode updates—are essential to prevent indirect leaks.
`;

  return (
    <BackgroundWrapper>
      <SubCategoryPage
        title="Indirect Information Leakage"
        description={description}
        cwes={cwes}
      />
    </BackgroundWrapper>
  );
};

export default IndirectLeakage;

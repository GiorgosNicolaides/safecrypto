import React from 'react';
import CategoryPage from '../../components/CategoryPage';
import TypingText from '../../components/TypingText';
import BackgroundWrapper from '../../components/BackgroundWrapper';

const Encryption: React.FC = () => {
  const options = [
    {
      title: 'Weak or Inadequate Encryption',
      path: '/encryption/weak-encryption',
      position: 'left' as const
    },
    {
      title: 'Cleartext or Improper Transmission',
      path: '/encryption/cleartext-transmission',
      position: 'right' as const
    },
  ];

  const introText =
    "Encryption is the cornerstone of modern data protection, ensuring that sensitive information remains confidential even if intercepted or accessed by unauthorized parties. Without robust encryption, personal details, financial records, and confidential communications become vulnerable to a wide range of attacks. Weak or outdated encryption algorithms can be quickly broken using readily available computing power, rendering any “encrypted” data effectively exposed. When encryption keys are generated or managed improperly, attackers may exploit predictable patterns or insecure storage to gain unauthorized access. Cleartext transmission, which sends data in an unencrypted form over a network, allows adversaries to eavesdrop, capture credentials, and manipulate information in transit. Insecure communication channels such as unencrypted HTTP, legacy FTP, or improperly configured TLS leave users at risk of man-in-the-middle attacks, session hijacking, and data tampering."

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={800} />
    </BackgroundWrapper>
  );
};

export default Encryption;

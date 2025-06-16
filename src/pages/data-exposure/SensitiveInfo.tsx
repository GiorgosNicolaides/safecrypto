import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const SensitiveInfo: React.FC = () => {
  const options = [
    {
      title: "Storage in Insecure Locations",
      path: "/data-exposure/insecure-storage",
      position: "left" as const
    },
    {
      title: "Exposure Through Application",
      path: "/data-exposure/exposure-through-application",
      position: "center" as const
    },
    {
      title: "Indirect Information Leakage",
      path: "/data-exposure/indirect-leakage",
      position: "right" as const
    }
  ];

  const introText = `
Sensitive information must be handled with the highest level of care to prevent unauthorized access and data breaches. Storing secrets—such as API keys, tokens, or personal identifiers—in insecure locations like committed source files, unencrypted databases, or world-readable cloud buckets exposes organizations to significant risk. Attackers constantly scan public repositories and misconfigured storage services for credentials that can be used to escalate privileges or infiltrate internal networks.

Even when storage is secure, applications that embed sensitive data in logs, error messages, or front-end code risk exposing that data to unintended audiences. For example, debug statements that print full user details or stack traces to console logs can reveal personal information to attackers monitoring network traffic or inspecting browser consoles. Similarly, improperly configured access controls on API endpoints may allow unauthorized users to query sensitive endpoints and retrieve data without proper authentication or authorization checks.

Indirect information leakage occurs when an attacker infers sensitive details through side channels or metadata. Timing attacks against cryptographic operations, verbose error responses that distinguish between valid and invalid inputs, and detailed version banners on server responses can all provide clues that reduce the effort required for a targeted attack. Even seemingly benign metadata—like file names, directory structures, or last-modified timestamps—can reveal patterns about system structure and user behavior, enabling an attacker to pivot toward more sensitive assets.

To safeguard sensitive information, organizations must centralize secrets management in vaults that enforce encryption at rest and in transit, implement secure logging practices that scrub or redact personal data, and apply strict access controls on every layer of the application stack. Regular scanning for secrets in version control, automated checks for verbose error outputs, and monitoring for unusual metadata patterns help identify potential leaks early. By understanding how improper storage, application exposure, and indirect leakage work together, security teams can build a comprehensive defense strategy to keep sensitive data out of attackers’ hands.
`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default SensitiveInfo;

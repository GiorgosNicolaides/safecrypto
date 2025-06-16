import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const KeyManagement: React.FC = () => {
  const options = [
    {
      title: "Hardcoded or Default Keys/Credentials",
      path: "/key-management/hardcoded-keys",
      position: "left" as const
    },
    {
      title: "Weak Key Management Practices",
      path: "/key-management/weak-key-management",
      position: "center" as const
    },
    {
      title: "Password Management Issues",
      path: "/key-management/password-management",
      position: "right" as const
    }
  ];

  const introText = `
Keys and credentials are the lifeblood of secure systems. When developers hardcode secrets—such as API keys, private keys, or default credentials—directly into application code or configuration files, those secrets become exposed to anyone who can read the repository or the deployed binaries. Attackers frequently scan public repositories and container images for strings that look like keys. Even when repositories are private, a single leaked commit or misconfigured access control can reveal these secrets, enabling unauthorized access to databases, cloud resources, or encryption material.

Weak key management practices compound this risk. Using the same key across multiple environments, failing to rotate keys regularly, or storing keys without encryption in database tables makes it trivial for adversaries to exploit a single breach repeatedly. Without proper segregation—such as different keys for development, staging, and production—compromised keys in lower environments can lead to full compromise of production systems. Inadequate access controls on key storage solutions, like granting overly permissive IAM roles or bucket policies, allow attackers who gain initial footholds to elevate privileges and move laterally.

Password management issues are another common pitfall. Storing passwords in plain text, using reversible encryption, or relying on outdated hash functions (e.g., MD5, SHA-1) for password storage enables attackers to recover original credentials swiftly once they breach the database. Reusing the same password across multiple services—especially if exposed in a data breach—amplifies the damage. Furthermore, distributing passwords or keys via insecure channels (e.g., email or chat) without proper expiration or automatic revocation creates long-lived attack vectors that are hard to track.

To mitigate these threats, organizations must adopt a centralized secrets management solution that enforces encryption at rest and in transit, enforces least privilege access, and automates key rotation. Secrets should be injected into applications at runtime via environment variables or secure vault agents rather than hardcoded. Access to key vaults must be strictly audited and logged, with multi-factor authentication required for any administrative actions. Passwords should be stored using strong, slow hash functions (e.g., bcrypt, Argon2) with unique salts for each user, and password policies must enforce complexity and prohibit reuse. Automated scans of code repositories, container images, and infrastructure configurations help detect accidental key exposures before they reach production.

By combining strong key management practices with secure password handling and continuous monitoring, teams can ensure that even if one secret is compromised, the blast radius is minimized and remediation can be swift. Robust key management is essential to maintaining trust in encryption, preventing unauthorized access, and protecting critical systems from evolving threats.
`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default KeyManagement;

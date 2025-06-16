import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const Authentication: React.FC = () => {
  const options = [
    {
      title: "Weak Authentication Practices",
      path: "/authentication/weak-authentication",
      position: "left" as const
    },
    {
      title: "Weak Credential Management",
      path: "/authentication/weak-credential-management",
      position: "right" as const
    }
  ];

  const introText = `
Authentication is the first line of defense in any system that safeguards sensitive information. When authentication mechanisms are poorly designed or implemented, attackers can bypass access controls and compromise user accounts, data, and even entire infrastructures. Weak authentication practices—such as allowing simple or easily guessable passwords, not enforcing multi-factor authentication (MFA), or relying on outdated protocols like HTTP Basic Auth over plain connections—expose users to brute-force attacks, credential stuffing, and unauthorized account takeover.

Inadequate password policies that permit short, common, or unchanged passwords increase the risk of account compromise. Attackers leverage automated tools to try large lists of commonly used passwords or previously breached credentials, gaining entry in seconds if no rate limiting or lockout mechanisms exist. Additionally, failure to implement proper account lockout thresholds or CAPTCHA protections on login forms allows bots to brute-force at scale without being detected.

Weak credential management further compounds the problem. Storing plaintext passwords in databases, reusing the same salt for all user records, or using fast hash functions (e.g., MD5, SHA-1) without sufficient computational cost makes it trivial for attackers to crack password hashes offline. Even if bcrypt or PBKDF2 is used, improper configuration—such as low iteration counts—renders it ineffective against modern GPU-based cracking techniques. Furthermore, credentials hardcoded in client‐side code or public repositories provide an easy entry point for attackers who simply search for exposed secrets.

Session management is another critical area. If session tokens are predictable, not regenerated after privilege changes, or not properly invalidated upon logout, session hijacking and fixation attacks become feasible. Insecure transmission of authentication tokens over unencrypted channels (HTTP instead of HTTPS) allows adversaries to intercept cookies or tokens in transit, bypassing any server‐side protections.

To mitigate these risks, organizations should enforce strong password complexity policies, require MFA for all sensitive actions, and implement account lockout or progressive delays after failed login attempts. Credentials must be stored using slow, memory‐hard hashing algorithms (bcrypt, Argon2) with unique salts per user. Secrets must never be hardcoded; use secure vaults or environment variables with strict access controls. All authentication requests must go over HTTPS/TLS, and tokens should be bound to user context (e.g., rotating session IDs and using HttpOnly/Secure cookie flags). Periodic security assessments and penetration tests can uncover misconfigurations, while ongoing monitoring and anomaly detection help identify suspicious login behaviors in real time.

Ultimately, robust authentication and credential management practices form the bedrock of a secure system. Without them, every other security control can be rendered moot, as attackers can simply impersonate legitimate users to wreak havoc within networks, applications, and sensitive data stores.
`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default Authentication;

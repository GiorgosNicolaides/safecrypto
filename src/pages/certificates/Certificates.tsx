import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const Certificates: React.FC = () => {
  const options = [
    {
      title: "Improper Certificate Validation",
      path: "/certificates/improper-validation",
      position: "left" as const
    },
    {
      title: "Mismanagement of Trust Chains",
      path: "/certificates/mismanagement-trust-chains",
      position: "right" as const
    }
  ];

  const introText = `
Digital certificates form the foundation of trust in modern networks and web applications. Improper validation of certificates—such as failing to check expiration dates, skipping revocation status, or not verifying the certificate chain against a known, trusted root—undermines SSL/TLS security and exposes users to man-in-the-middle (MITM) attacks. When a server presents a certificate that is self-signed, expired, or issued by an untrusted or compromised Certificate Authority (CA), clients must reject the connection. However, misconfigured clients or libraries that bypass validation steps allow attackers to spoof identities, intercept encrypted traffic, and manipulate data in transit without detection.

Even when certificates are technically valid, mismanagement of trust chains can introduce risks. Trust chains link a server’s leaf certificate to an intermediate CA and ultimately to a root CA. If any intermediate certificate is missing, forged, or not anchored to a trusted root, clients may be unable to validate that the server truly represents a legitimate entity. Attackers can exploit such gaps by presenting a truncated chain or inserting a malicious intermediate certificate signed by a compromised CA. Without strict chain validation, the client may accept a fraudulent certificate and establish an encrypted session under false pretenses.

Certificate pinning and strict handle on certificate lifecycles mitigate these issues. By associating a specific public key or certificate fingerprint with a domain, clients can detect unexpected changes—even if a certificate appears valid otherwise. Servers must implement automated certificate renewal before expiration and revoke certificates promptly when private keys are compromised. Hosting providers and DevOps teams should configure TLS libraries to only allow strong signatures (e.g., RSA 2048+ or ECDSA P-256) and disable deprecated hashing algorithms like SHA-1.

For organizations, maintaining a comprehensive inventory of all issued certificates is critical. Automated monitoring tools must continuously scan public endpoints for any unexpected certificate changes or anomalies in the trust chain. Regular audits of the CA trust store and periodic penetration tests help identify rogue or misconfigured CAs that could undermine chain validation. Ultimately, robust certificate management—covering issuance, renewal, validation, and revocation—ensures end-to-end encryption remains trustworthy and protects sensitive data from interception or impersonation.`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default Certificates;

import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const DataIntegrity: React.FC = () => {
  const options = [
    {
      title: "Missing or Weak Integrity Checks",
      path: "/data-integrity/missing-weak-checks",
      position: "left" as const
    },
    {
      title: "Encryption Without Integrity Checks",
      path: "/data-integrity/encryption-without-checks",
      position: "right" as const
    }
  ];

  const introText = `
Ensuring data integrity is just as critical as protecting its confidentiality. When systems lack robust integrity checks—such as cryptographic hashes, digital signatures, or Message Authentication Codes (MACs)—attackers can tamper with data undetected, leading to corrupted files, unauthorized modifications, or malicious backdoors. Missing integrity verification on configuration files, software updates, or database records allows adversaries to inject malicious code or alter critical parameters without triggering alarms.

Weak integrity checks—like using fast, collision-prone hash functions (e.g., MD5 or SHA-1) or relying solely on non-cryptographic checksums—are equally dangerous. Collision attacks against these outdated functions enable attackers to craft different inputs that produce the same hash, subverting integrity verification. In automotive, IoT, and embedded systems, inadequate integrity checks on firmware can allow unauthorized firmware swaps, bricking devices or turning them into attack vectors. Even in web applications, failing to validate the integrity of scripts or assets loaded from third-party CDNs can expose users to supply-chain attacks.

Encryption without integrity checks—often implemented via plain CBC mode without an accompanying MAC—provides confidentiality but fails to guarantee that ciphertext hasn’t been modified. Active attackers can flip bits in the encrypted payload, causing predictable changes in the decrypted output, which can be exploited to bypass authentication or inject malicious commands. Modern authenticated encryption modes like AES-GCM or ChaCha20-Poly1305 combine both confidentiality and integrity in a single operation; omitting the authentication tag or not verifying it on decryption nullifies the protections and opens the door to chosen-ciphertext attacks.

To defend against these risks, organizations must adopt authenticated encryption schemes everywhere. All sensitive data—whether in transit or at rest—needs a cryptographic integrity check: use HMAC-SHA256 or HMAC-SHA3 on messages, implement digital signatures (ECDSA, RSA-PSS) on critical files, and enforce strict validation of integrity tags before processing. Software update mechanisms should include version pinning, signed manifests, and secure boot chains to ensure only trusted code runs. Additionally, regular audits and fuzz testing against file formats, network protocols, and API endpoints help reveal any missing or weak integrity controls.

By combining robust integrity checks with strong encryption and secure key management, teams can detect unauthorized alterations immediately, maintain system trust, and prevent attackers from silently corrupting or hijacking data flows.
`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default DataIntegrity;

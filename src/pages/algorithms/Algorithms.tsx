import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const Algorithms: React.FC = () => {
  const options = [
    {
      title: "Algorithm Downgrade or Weak Selection",
      path: "/algorithms/algorithm-downgrade",
      position: "center" as const
    }
  ];

  const introText = `
Algorithm downgrade attacks occur when an adversary forces a communication session to use an older, weaker, or deprecated cryptographic protocol. By exploiting version negotiation or subverting client-server preferences, an attacker can coerce both endpoints into using ciphers that are trivial to break. Weak selection of cryptographic algorithms—such as relying on 64-bit block ciphers, short key lengths, or known-vulnerable hash functions—undermines confidentiality and integrity, leaving data exposed to passive eavesdropping, ciphertext modification, or impersonation.

In practice, attackers mounting a downgrade will interpose themselves between a client and server during the handshake phase. They intercept the client's “ClientHello” message, strip out modern cipher suites, and relay a modified list to the server. The server, unaware of the manipulation, picks a weaker algorithm and returns a “ServerHello” indicating the old cipher. The attacker then removes any trace of this downgrade attempt before forwarding it back to the client. Both endpoints believe they are using a secure connection, but in reality the session is running on a cryptosystem whose vulnerabilities can be exploited in real time.

Even without an active man-in-the-middle, poor cryptographic selection or misconfiguration can lead to use of ciphers with known weaknesses. For instance, choosing RC4, DES, or export-grade RSA—algorithms deprecated decades ago—results in trivial key recovery. Many outdated libraries still support these legacy ciphers by default, and servers running unpatched software will advertise them during negotiation. Relying on weak hash functions like MD5 or SHA-1 for digital signatures or certificate verification allows collision attacks, enabling attackers to forge certificates or tamper with software updates undetected.

To mitigate these threats, systems must enforce strict protocol version constraints, disable all legacy cipher suites, and adopt modern algorithms such as AES-GCM or ChaCha20-Poly1305 for symmetric encryption, alongside at least 2048-bit RSA or elliptic-curve cryptography (e.g., NIST P-256 or Curve25519) for key exchange. HTTP servers should disable TLS versions older than 1.2 and refuse renegotiation to older ciphers. Clients must verify server certificates against a trusted root store and enforce HSTS (HTTP Strict Transport Security) to prevent fallback to HTTP. Regular security audits and penetration tests should flag any use of deprecated cryptography. Proper key management—including generation with a cryptographically secure random number generator, frequent rotation, and secure storage—is equally crucial, as even a strong algorithm is worthless if the key is compromised.

Understanding and countering algorithm downgrade or weak selection is vital in today’s threat landscape. Without vigilant configuration and continuous monitoring, ostensibly “secure” connections can be quietly subverted, exposing sensitive data and undermining trust in digital communications.
`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default Algorithms;

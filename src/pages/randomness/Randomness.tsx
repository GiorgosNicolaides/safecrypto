import React from "react";
import CategoryPage from "../../components/CategoryPage";
import TypingText from "../../components/TypingText";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const Randomness: React.FC = () => {
  const options = [
    {
      title: "Insufficient Randomness or Predictability",
      path: "/randomness/insufficient-randomness",
      position: "left" as const
    },
    {
      title: "Predictable or Reused Seeds",
      path: "/randomness/predictable-seeds",
      position: "right" as const
    }
  ];

  const introText = `
True randomness is the bedrock of secure cryptographic operations; when randomness is insufficient or predictable, entire security guarantees collapse. Many systems rely on pseudo-random number generators (PRNGs) to produce keys, nonces, salts, and initialization vectors (IVs). If the PRNG is seeded improperly—using low-entropy sources like timestamps, process IDs, or fixed values—the output becomes predictable. Attackers can reverse-engineer the seed or observe patterns to reconstruct future “random” values, enabling them to guess cryptographic keys, forge signatures, or decrypt sensitive data.

Even well-designed PRNGs fail if their seeds are reused across sessions or devices. Reusing the same seed for generating session tokens, encryption keys, or one-time passwords allows an adversary who learns one value to predict all subsequent values. In distributed environments, sharing a seed inadvertently—such as copying a configuration file or deploying identical containers without re-seeding—multiplies the attack surface. Furthermore, embedded and IoT devices often lack access to strong entropy sources at boot time; if they fall back to predictable seeds, their communications and firmware updates can be compromised.

A failure to mix in sufficient entropy during runtime—particularly after a system has been idle—can also lead to weak randomness. Virtual machines or containers that snapshot and resume without reseeding may produce identical random streams before and after suspension. Without hardware-based entropy (e.g., from a TPM, /dev/random, or dedicated TRNG), software-only generators can starve and start recycling internal state, making outputs repeatable.

To mitigate these risks, systems must use cryptographically secure PRNGs (CSPRNGs) that continuously gather entropy from multiple high-quality sources: hardware interrupts, network noise, user input timings, or hardware security modules. Seeds must be unique and unpredictable; generating seeds from a trusted entropy pool rather than predictable values is essential. Every critical operation—key generation, nonce creation, session token issuance—must draw fresh randomness. Embedded devices should delay cryptographic tasks until sufficient entropy is collected or rely on hardware random number generators.

Additional safeguards include monitoring entropy pool levels and refusing to generate sensitive tokens when entropy is low. Libraries and frameworks should default to secure algorithms (e.g., Fortuna, ChaCha20 CSPRNG) and discourage easy configuration changes that degrade entropy quality. Regular security audits and fuzz testing can reveal cases where randomness is reused or derived from weak sources.

In summary, insufficient randomness or predictable seeds erode the foundation of cryptographic security. By enforcing strong seeding practices, leveraging hardware entropy, and using CSPRNGs by default, teams can ensure that generated keys, nonces, and tokens remain truly unpredictable—thwarting attackers who seek to exploit predictable patterns and preserving the confidentiality and integrity of sensitive systems.
`;

  return (
    <BackgroundWrapper>
      <CategoryPage options={options} />
      <TypingText text={introText} typingSpeed={40} lineDelay={1000} />
    </BackgroundWrapper>
  );
};

export default Randomness;

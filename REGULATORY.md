# Regulatory Alignment

This document maps the CANARY protocol's security properties against converging voice fraud and authentication regulations. It is intended for compliance teams, integrators, and legal reviewers evaluating CANARY as part of their authentication stack.

## How to Use This Document

This document is a technical alignment brief, not legal advice. Use it to evaluate whether CANARY meets your regulatory requirements and identify gaps that need additional controls.

1. **Identify your regulatory scope** — which regulations apply to your jurisdiction and product category.
2. **Check the CANARY alignment section** for each applicable regulation — it explains which security properties are relevant and how they satisfy the regulation's requirements.
3. **Review the "What gap remains" section** — every regulation section ends with an honest statement of what CANARY does not cover. These gaps require additional controls at the application or deployment layer.
4. **Cross-reference INTEGRATION.md** for concrete deployment patterns that correspond to the alignment claims made here.

Security property references (P1–P8) are defined in [THREAT-MODEL.md](THREAT-MODEL.md). Deployment patterns are documented in [INTEGRATION.md](INTEGRATION.md).

---

## The Four Verification Scenarios

CANARY and Signet together address all four real-world caller identity scenarios. Understanding which scenario applies is the first step to selecting the right protocol.

| Scenario | Who is calling? | Protocol | Deployment |
|----------|----------------|----------|------------|
| **Known person** | A known individual (friend, colleague, family member) | Signet "Signet me" — ECDH from prior QR exchange | Prior relationship required |
| **Known institution** | A bank, insurer, or service provider the customer is already enrolled with | CANARY session (pre-shared seed, app-derived) | App-derived seed via Pattern 1 (see INTEGRATION.md) |
| **Unknown person** | A caller whose identity is unverified | Signet trust tier check | Verifier checks Signet credential tier |
| **Unknown institution cold-calling** | A bank or institution calling a customer who has no prior session | Signet cold-call verification (`.well-known` + ephemeral ECDH) | Forthcoming — see [Signet](https://github.com/forgesworn/signet) |

The regulations below primarily address the **known institution** scenario — a financial institution or regulated service calling an enrolled customer. CANARY's HMAC-counter session protocol is the appropriate tool for this scenario.

---

## Why Voice Verification Matters Now

The threat that makes regulation urgent is not theoretical. AI voice cloning now requires as little as three seconds of audio, is available as a service, and is already linked to organised crime at institutional scale. In March 2023, the United Nations Office on Drugs and Crime (UNODC) reported that deepfake technology is being actively exploited by criminal networks for fraud, extortion, and identity theft, with synthetic voice being a primary vector.

The verification methods that were adequate a decade ago are failing against this threat:

- **SMS one-time passwords** are defeated by SIM-swap attacks, SS7 interception, and social engineering. Multiple regulators are now mandating their replacement.
- **Voice biometrics** compare audio characteristics — properties that AI can now synthesise. 91% of US banks are reconsidering voice biometrics systems following deepfake attacks.
- **Security questions** are one-directional (only the customer proves identity to the institution, never the reverse) and rely on information that may be publicly available or previously breached.

CANARY addresses this threat at the protocol level. Tokens are derived from a shared secret using HMAC-SHA256. Cloning a voice does not help an attacker derive the correct token — only knowledge of the shared secret does.

---

## UAE — Central Bank SMS-OTP Phase-Out

**Issuing body:** Central Bank of the UAE (CBUAE)
**Directive:** CBUAE Circular 3057 — Phase-out of SMS and email OTP authentication for financial transactions
**Effective date:** 31 March 2026 (phased rollout underway since July 2025; SMS OTP for card payments discontinued from January 2026)
**Scope:** All licensed financial institutions (LFIs) — banks, insurers, payment providers, exchange houses

### What the regulation mandates

LFIs must discontinue SMS and email OTP as authentication factors for financial transactions. Permitted replacements include biometric verification, Emirates Face Recognition, and mobile-based soft tokens derived through app-based authentication.

### CANARY alignment

CANARY's app-derived seed pattern (Pattern 1 in INTEGRATION.md) provides a direct replacement for SMS OTP that exceeds the mandate's intent:

- **No SMS dependency** — the shared seed is derived server-side from customer identity and delivered over TLS during app login. No one-time code is transmitted per transaction.
- **Offline derivation** — tokens are computed locally on the device after initial sync. There is no network round-trip at verification time.
- **Phishing resistance** — tokens are HMAC-derived from a secret unavailable to phishing sites (P1: Token Unpredictability).
- **Bidirectional** — the agent speaks a token to the customer that proves the institution's identity, not just the customer's identity to the institution. This exceeds the regulation's baseline requirement.
- **Coercion resistance** — the duress token mechanism (P2: Duress Indistinguishability, P5: Coercion Resistance) provides a capability SMS OTP cannot match.

### What gap remains

CANARY requires a prior relationship — the customer must have the institution's app installed and the seed provisioned before a call can be authenticated. CANARY does not address cold-call verification of institutions the customer has no prior relationship with. The forthcoming Signet cold-call verification feature is designed for that scenario.

---

## India — RBI Digital Payment Authentication Framework

**Issuing body:** Reserve Bank of India (RBI)
**Framework:** RBI Directions on Authentication of Digital Payment Transactions (issued 25 September 2025)
**Effective date:** 1 April 2026 (domestic transactions); 1 October 2026 (cross-border card-not-present transactions)
**Scope:** Banks, card issuers, and payment service providers handling digital payment transactions

### What the regulation mandates

The framework requires two-factor authentication (2FA) for all domestic digital payment transactions, with at least one dynamic factor for card-not-present transactions. A dynamic factor is defined as a unique challenge per transaction — a biometric match, cryptographic key, or time-limited code.

The framework is technology-neutral: it permits passwords, passphrases, PINs, device tokens, biometrics, software tokens, and other mechanisms — provided the implementation meets the 2FA and dynamic-factor requirements. Risk-based authentication (RBA) is explicitly supported for contextual assessment of higher-risk transactions.

### CANARY alignment

A CANARY session provides a dynamic factor that satisfies the framework's requirements:

- **Dynamic token** — each CANARY token is time-bounded and advances with a monotonic counter (P4: Replay Resistance). Tokens from prior sessions cannot be reused.
- **Knowledge factor** — the shared seed is a possession/knowledge factor held in the customer's app secure storage (Keychain or KeyStore).
- **Two-directional** — the customer proves identity to the agent; the agent proves the institution's identity back. This is a stronger posture than the regulation's minimum.
- **Offline derivation** — tokens are computed locally, reducing exposure to server-side compromise.

For voice-channel payment authorisation (a customer calling to authorise a high-value transfer), CANARY provides a spoken dynamic factor that replaces SMS OTP without requiring the customer to read digits aloud — reducing shoulder-surfing and interception risk.

### What gap remains

The RBI framework focuses on payment transactions. CANARY is a call-verification protocol; it does not replace card-present authentication or replace the payment transaction itself. It addresses the authentication of the caller's identity in voice-channel interactions surrounding a payment.

---

## UK — Ofcom and the Online Safety Act

**Issuing body:** Ofcom (UK communications regulator)
**Framework:** Online Safety Act 2023 — duties on providers of regulated user-to-user and search services
**Status:** In force. Ofcom is actively enforcing duties including risk assessment, illegal content removal, and deepfake-related obligations.
**Consultation dates:** Ofcom is conducting rolling consultations on categorised service duties through 2026. A specific "deepfake consultation closing 23 March 2026" could not be independently verified at time of writing — verify current Ofcom consultation schedule at [ofcom.org.uk](https://www.ofcom.org.uk) before referencing this date publicly.

### Context

Ofcom opened a formal investigation into a major platform in January 2026 for alleged failures to comply with Online Safety Act duties related to non-consensual deepfake image generation. The investigation signals active regulatory attention to AI-generated synthetic media at the platform level.

CANARY does not operate at the platform layer. Its relevance to the Ofcom framework is indirect: organisations subject to Online Safety Act duties that operate voice or video communication services may benefit from CANARY's verification properties as a technical control demonstrating they have assessed and mitigated AI-impersonation risks in their communications infrastructure.

### CANARY alignment

- **Deepfake-resistance at the verification layer** — CANARY tokens cannot be derived from voice audio alone. A synthetic voice cannot satisfy a CANARY challenge without the shared secret (P1, P8).
- **Duress signal** — call centres subject to Online Safety Act obligations around user welfare can use the silent duress path (P2, P5) to alert safety teams without exposing the caller.
- **Audit trail** — `kind 28802` word-used events provide a cryptographically verifiable record of verification outcomes.

### What gap remains

CANARY addresses human-to-human voice verification, not platform-level deepfake labelling of published media. It is a verification tool, not a detection or labelling tool.

---

## EU — AI Act Article 50 Deepfake Transparency

**Issuing body:** European Commission
**Provision:** EU AI Act, Article 50 — Transparency obligations for providers and deployers of certain AI systems
**Effective date:** 2 August 2026
**Scope:** Providers and deployers of AI systems used to generate or manipulate synthetic content, including deepfakes
**Code of Practice:** Draft published January 2026; final Code anticipated June 2026

### What the regulation mandates

Article 50 requires that AI-generated or AI-manipulated content be machine-readable marked and detectable. Deployers must disclose to users when content is a deepfake. This is a **labelling and disclosure** obligation — it applies to AI systems that generate synthetic content, not to authentication systems.

### CANARY alignment

CANARY's positioning against Article 50 is **complementary, not overlapping**:

- **Labelling is retroactive** — a deepfake label is applied to content after it is created. CANARY is real-time: it verifies the caller's identity at the moment of the interaction, before any action is taken.
- **"Was this content AI-generated?"** is a different question from **"Is the person I am speaking with who they claim to be?"** CANARY answers the second question.
- Organisations deploying CANARY alongside labelling-compliant AI systems achieve defence-in-depth: the AI system labels synthetic outputs, and CANARY verifies that the person initiating the interaction is authenticated.

For institutions building voice-channel products subject to Article 50 (e.g., AI-generated voice assistants used in customer service), CANARY can serve as the authentication layer that verifies the human on the other end of the call, separate from whatever labelling mechanism is applied to AI-generated agent speech.

### What gap remains

CANARY does not satisfy Article 50 obligations directly — those obligations rest with providers and deployers of generative AI systems. CANARY is an authentication protocol, not a content labelling system.

---

## EU — eIDAS 2.0 and the European Digital Identity Wallet

**Issuing body:** European Commission
**Framework:** Regulation (EU) 2024/1183 (eIDAS 2.0) — European Digital Identity Wallets
**Deadline:** At least one EUDI Wallet must be available in each EU Member State by December 2026. Mandatory acceptance by specified relying parties from December 2027.
**Status:** Large-scale pilots underway. Technical specifications are still being finalised.

### What the regulation mandates

Each EU Member State must provide citizens with a European Digital Identity Wallet. The wallet will hold verifiable credentials (identity documents, professional qualifications, attributes) and will be accepted for authentication by public services and specified private-sector relying parties.

High-assurance use cases (e.g., opening a bank account, accessing healthcare records) require the wallet to prove the holder is physically present and in possession of the device — a liveness requirement.

### CANARY alignment

The EUDI Wallet creates an infrastructure on which verification layers can be built. CANARY is relevant at the **liveness proof** layer:

- **In-person or remote enrolment** — during wallet onboarding or high-assurance credential issuance, a CANARY spoken-word challenge can serve as an additional liveness factor proving the holder is present and uncoerced.
- **Seed stored in wallet** — the CANARY group seed could be provisioned as a wallet-held secret, with the wallet's security guarantees (hardware-backed secure element) protecting the seed.
- **Coercion signal at the point of authentication** — the duress token path (P2, P5) remains relevant when the holder is being compelled to authenticate against their will.

This integration pattern is at the design stage. The EUDI Wallet technical architecture (ARF — Architecture and Reference Framework) is still being finalised, and production-ready wallets do not yet exist. A concrete integration design will follow once the ARF stabilises.

### What gap remains

CANARY does not issue verifiable credentials, does not interact with the EUDI Wallet protocol directly, and does not replace the wallet's core identity assertion mechanism. It is a supplementary liveness and coercion-resistance layer.

---

## W3C — Verifiable Credentials Confidence Method

**Issuing body:** W3C Verifiable Credentials Working Group
**Specification:** Confidence Method v1.0
**Current status:** First Public Working Draft (published 2025). Target: W3C Recommendation by July 2026 per working group charter. **This specification is experimental and not yet fit for production deployment.**
**Purpose:** Defines a mechanism for issuers to include methods in a verifiable credential that verifiers can use to increase confidence that the subject is the intended entity.

### What the specification addresses

The Confidence Method defines how a credential issuer can declare, within a credential, what mechanisms a verifier may use to confirm that the credential's subject is present and is the same entity the issuer intended. This is a **liveness and binding** problem: proving that the credential holder is present at the time of presentation, not merely in possession of the credential.

### CANARY alignment

CANARY's security properties map directly onto the Confidence Method's intent:

- **P1 (Token Unpredictability)** — a CANARY challenge-response proves the presenter possesses the shared secret. This can serve as a confidence method declaring "the subject must be able to produce the current CANARY token."
- **P6 (Liveness Guarantee)** — liveness heartbeats provide ongoing proof of presence, not just point-in-time authentication.
- **P8 (Timing Safety)** — constant-time verification ensures the confidence method cannot be gamed by timing analysis.

A formal mapping between CANARY's protocol properties and the Confidence Method specification will be developed in Phase 4 of the regulatory positioning work, once the specification reaches Candidate Recommendation stage and its extension points are stable.

### What gap remains

The Confidence Method specification is an early working draft. The extension mechanism for declaring CANARY as a confidence method has not been formally specified. This section will be updated as the specification progresses.

---

## UK — FCA Strong Customer Authentication

**Issuing body:** Financial Conduct Authority (FCA)
**Framework:** FCA Payment Services and Electronic Money (PSD2 / UK PSRs) — Strong Customer Authentication (SCA) technical standards
**Status:** In force. Updated technical standards effective 19 March 2026.
**Scope:** Payment service providers operating in the UK

### What the regulation mandates

SCA requires authentication that uses two or more of: something the customer **knows** (knowledge factor), something the customer **has** (possession factor), and something the customer **is** (inherence factor). For remote electronic payment transactions, at least two independent factors must be used, and the resulting authentication code must be dynamically linked to the transaction amount and payee.

### CANARY alignment

For voice-channel payment authorisation, CANARY provides both a knowledge factor (shared seed, known only to the customer and institution) and an element of the possession factor (the seed is stored in the customer's device secure storage behind device biometrics or PIN):

- **Knowledge factor** — the CANARY seed functions as a shared secret. Only the customer's enrolled device can derive the current token.
- **Possession factor** — the seed is stored in Keychain (iOS) or KeyStore (Android), accessible only via device authentication. The device itself is the possession element.
- **Dynamic linking** — CANARY tokens rotate on a time-based counter. Tokens are not reusable (P4: Replay Resistance). For transaction-specific linking, the session namespace and role identifiers can be constructed to include transaction context.
- **Timing safety** — constant-time token comparison (P8) prevents timing attacks on the authentication path.

For FCA SCA purposes, CANARY is best positioned as the voice-channel authentication layer that satisfies the knowledge and possession requirements when a customer is calling to authorise a payment — replacing SMS OTP (which satisfies possession only, weakly) with a cryptographically stronger spoken-word alternative.

The FCA's updated technical standards also move toward risk-based authentication, allowing providers to apply reduced friction for low-risk transactions. CANARY's counter-based rotation and configurable tolerance window support risk-tiered deployment.

### What gap remains

SCA requires authentication codes to be "dynamically linked" to the specific transaction amount and payee for remote electronic payments. Standard CANARY sessions use time-based or burn-after-use counters, not transaction-specific inputs. Integrators requiring transaction-linked codes should use a session namespace or counter derived from transaction parameters — this is supported by the CANARY API but requires application-level design. See INTEGRATION.md (Pattern 1) for the recommended server-side derivation pattern.

---

## United States — FTC, FCC, State Biometric Laws, and FFIEC

**Issuing bodies:** Federal Trade Commission (FTC); Federal Communications Commission (FCC); Illinois, Texas, Washington, Colorado legislatures; Federal Financial Institutions Examination Council (FFIEC)
**Status:** Fragmented. No single federal voice-authentication mandate. A patchwork of consumer protection actions, state biometric privacy statutes, and prudential guidance from financial regulators.

### Context

The United States has no federal law that directly mandates a specific voice-channel authentication standard for all industries. What exists is a set of convergent pressures from different angles: an FTC innovation challenge targeting AI voice fraud, state biometric privacy laws whose scope includes voiceprints, FCC infrastructure mandates that address spoofing but not identity, and FFIEC guidance that demands financial institutions manage voice-channel authentication risk.

### FTC Voice Cloning Challenge (2024–2025)

The FTC launched a public challenge in January 2024, offering a $25,000 prize for technologies that detect, prevent, or mitigate AI-generated voice cloning used to deceive consumers. The challenge was targeted at individual inventors, start-ups, and researchers rather than incumbent carriers. It established the FTC's view that:

- Voice cloning fraud is a consumer protection issue within the FTC's existing section 5 (unfair or deceptive acts) authority.
- Detection and prevention technologies are under-developed relative to the threat.
- A market-incentive approach (challenge prizes) was preferred over immediate prescriptive rulemaking.

The challenge did not produce binding regulation. It signalled regulatory attention rather than a compliance obligation. *The prize recipient and full outcome details were not independently verified at time of writing — verify before referencing publicly.*

### FCC STIR/SHAKEN

The FCC mandated implementation of the STIR/SHAKEN framework (Secure Telephone Identity Revisited / Signature-based Handling of Asserted information using toKENs) for voice-over-IP providers under the TRACED Act (2019). Large carriers were required to implement STIR/SHAKEN by 30 June 2021; smaller carriers followed under phased deadlines.

STIR/SHAKEN authenticates that a call originates from the carrier that claims to have originated it. It does **not** verify that the caller is who they claim to be within that call. A legitimately originated call can carry a cloned voice. STIR/SHAKEN addresses telephone number spoofing at the network layer; it provides no protection against impersonation at the content layer — the problem CANARY is designed to address.

### State Biometric Privacy Laws

Four states have enacted biometric data privacy laws with direct relevance to voice-channel verification systems:

**Illinois** — Biometric Information Privacy Act (BIPA, 740 ILCS 14/1 et seq., 2008). Explicitly includes "voiceprint" within the statutory definition of "biometric identifier." Requires written informed consent before collection, a publicly available retention and destruction policy, and prohibits sale or profit from biometric data. Private right of action with statutory damages ($1,000–$5,000 per violation). The most litigated biometric privacy law in the US.

**Texas** — Chapter 503, Texas Business and Commerce Code (Capture or Use of Biometric Identifier Act, CUBI, effective 2009, amended 2021). Includes voiceprint as a biometric identifier. Requires informed consent before collection; prohibits sale; requires destruction within a reasonable time or three years of last interaction. Enforced by the Texas Attorney General (no private right of action).

**Washington** — Chapter 19.375 RCW (Biometric Identifiers, 2017). Defines biometric identifier as "data generated by automatic measurements of an individual's biological characteristics, such as a fingerprint, voiceprint, eye retinas, irises, or other unique biological patterns." Consent required before collection; destruction obligations apply. Enforced by the Attorney General under the Consumer Protection Act.

**Colorado** — HB 21-190 (2021, effective 1 July 2023 for most provisions). Defines biometric data to include voiceprints derived from biometric processing. Part of the Colorado Privacy Act framework. Consent required for biometric data collection.

Any organisation deploying CANARY-based voice verification in these states must assess whether the spoken-word challenge — if linked to a stored voiceprint or voice biometric baseline — triggers collection obligations under the applicable state law. CANARY itself does not generate or store voiceprints: it derives tokens from an HMAC-shared secret. The token words are not biometric measurements. Integrators who pair CANARY with a voice biometric identity-proofing layer at enrolment should take independent legal advice on BIPA and analogous state law obligations.

### CFPB and Voice-Channel Fraud

The Consumer Financial Protection Bureau (CFPB) has not issued specific rules governing voice-channel authentication methods. CFPB supervisory activity has focused on financial institutions' obligations under existing consumer protection frameworks (Regulation E, FCRA) when customers suffer losses from voice-channel fraud. The regulatory pressure is indirect: if voice-channel fraud losses are attributed to inadequate authentication controls, the institution may face supervisory findings under existing unfair, deceptive, or abusive acts or practices (UDAAP) authority. *Specific CFPB supervisory findings on voice authentication could not be independently verified at time of writing — verify before referencing publicly.*

### FFIEC Authentication Guidance

The Federal Financial Institutions Examination Council (FFIEC) issued updated authentication guidance in August 2021 ("Authentication and Access to Financial Institution Services and Systems"). The guidance requires financial institutions to:

- Conduct risk assessments of all authentication methods across channels, including voice.
- Move away from single-factor authentication for higher-risk transactions.
- Implement layered security controls appropriate to the risk of the channel.

The guidance is technology-neutral. It does not mandate HMAC-based authentication specifically, but it requires that institutions assess whether their voice-channel controls are commensurate with the fraud risk of that channel.

### CANARY alignment

- **Replaces SMS OTP in voice-channel authentication** — CANARY tokens are derived from a shared secret unavailable to phishing or social engineering (P1: Token Unpredictability), addressing the FFIEC risk-assessment requirement for stronger authentication in higher-risk channels.
- **No voiceprint generation** — CANARY does not create biometric identifiers within the meaning of BIPA or analogous state laws. The spoken words are protocol tokens, not measurements of the caller's biological characteristics.
- **Replay resistance** — counter-rotation ensures tokens expire and cannot be replayed (P4), satisfying layered-security expectations in FFIEC guidance.
- **Coercion signal** — the duress path (P2, P5) is relevant for customer-facing financial service call centres where customer safety obligations apply.
- **STIR/SHAKEN complement** — STIR/SHAKEN authenticates the call's network origin; CANARY authenticates the caller's identity within the call. They operate at different layers and are complementary rather than overlapping.

### Gap

- CANARY does not satisfy state biometric privacy obligations for organisations that separately collect voice biometrics during enrolment. Those obligations are application-layer concerns, not protocol-layer.
- The US regulatory landscape is fragmented. There is no single compliance test. Integrators operating across multiple states must assess each applicable state biometric law independently.
- CANARY does not address network-layer call spoofing — that is STIR/SHAKEN's domain.
- No federal voice-authentication mandate currently exists. If the FTC proceeds to rulemaking on AI-generated fraud, the regulatory landscape may shift materially.

---

## Australia — APRA CPS 234 and Privacy Act

**Issuing bodies:** Australian Prudential Regulation Authority (APRA); Office of the Australian Information Commissioner (OAIC); Australian Cyber Security Centre (ACSC); Australian Securities and Investments Commission (ASIC)
**Status:** CPS 234 in force since 1 July 2019. Privacy and Other Legislation Amendment Act 2024 (POLA Act) commenced 10 December 2024 with further reforms outstanding. ACSC Essential Eight is a government recommendation, not a legal mandate.

### APRA Prudential Standard CPS 234 — Information Security

CPS 234 applies to all APRA-regulated entities — authorised deposit-taking institutions (ADIs, including banks, building societies, and credit unions), general and life insurers, and superannuation trustees. It has been in force since 1 July 2019.

The standard requires APRA-regulated entities to:

- Maintain an information security capability commensurate with the size of threats they face.
- Implement controls to protect information assets — including third-party and outsourced assets — in line with the sensitivity of the information.
- Notify APRA of material information security control weaknesses and incidents within defined timeframes.
- Conduct independent reviews of information security capability at least every two years, or after a material incident.

CPS 234 is deliberately non-prescriptive on technology choices: it requires outcomes (resilient, proportionate security controls) rather than mandating specific authentication mechanisms. The companion guidance CPG 234 (updated November 2022) provides detailed implementation guidance for boards, management, and technical teams.

For voice-channel authentication specifically, CPS 234's requirement for controls "proportionate to information security vulnerabilities and threats" creates an obligation to assess whether SMS OTP or legacy voice-authentication methods remain adequate given the current deepfake threat environment. ADIs that have not reviewed their voice-channel authentication controls in light of AI voice-cloning capabilities since 2023 risk a finding that their information security capability is no longer commensurate with the threat.

### Australian Privacy Act 1988 and the POLA Act 2024

The Privacy Act 1988 (Cth) applies to private sector organisations with annual turnover above AUD 3 million and most Australian Government agencies. Sensitive information — which includes biometric information — is subject to a heightened consent requirement: it can only be collected if the individual has consented, or in specific prescribed circumstances.

Under the Australian Privacy Principles (APPs), "biometric information" is already listed as a category of sensitive information. Voice recordings used to derive a biometric template (e.g., a voiceprint for voice-biometric authentication) are likely to constitute biometric information. Raw voice recordings may constitute personal information if the individual can be identified from them.

The Privacy and Other Legislation Amendment Act 2024 (POLA Act) commenced on 10 December 2024. Key changes relevant to voice authentication:

- Introduced a statutory tort for serious invasions of privacy.
- Strengthened enforcement powers for the OAIC.
- Commenced the first tranche of reforms from the 2022–2023 Privacy Act Review; further reforms (including a proposed "fair and reasonable use" test and expanded sensitive information categories) remain outstanding and are subject to separate legislation.

*The full scope of enacted POLA Act provisions versus proposed-but-not-yet-enacted reforms was not independently confirmed at time of writing — verify the current legislative status before referencing publicly.*

### ASIC and Deepfake Fraud

ASIC has issued warnings to consumers about investment scams using AI-generated deepfakes, including fabricated video and audio of public figures. ASIC's regulatory position is that existing market integrity and consumer protection obligations apply to AI-generated fraud — no AI-specific legislation has yet been enacted. Licensees that fail to protect customers from foreseeable AI-enabled fraud risks may face action under existing Australian financial services law. *Specific ASIC enforcement actions targeting voice fraud or deepfake audio in financial services could not be independently verified at time of writing.*

### ACSC Essential Eight

The Australian Cyber Security Centre (ACSC) publishes the Essential Eight — a prioritised set of baseline cybersecurity mitigation strategies for Australian organisations. Multi-factor Authentication is one of the eight strategies. The ACSC recommends MFA for all users as a mitigation against password-based attacks, with maturity levels that progressively restrict the types of MFA accepted (Maturity Level 3 requires phishing-resistant MFA, such as hardware security keys or certificate-based authentication, rather than SMS OTP or push notifications).

The Essential Eight is a government recommendation for Commonwealth entities and publicly recommended for all organisations. It is not a legal mandate for private sector ADIs (which are governed by CPS 234 rather than the Essential Eight), but APRA-regulated entities frequently use the Essential Eight as a reference framework within their CPS 234 implementation.

### Consumer Data Right (CDR)

The CDR framework mandates strong authentication for data holders (banks) and data recipients (accredited fintechs) sharing consumer financial data. The technical standards require PKCE-protected OAuth 2.0 flows with FAPI (Financial-grade API) profile — a token-based authentication architecture. Voice-channel interactions are not within the CDR's primary authentication scope, which is directed at API-based data sharing rather than call-centre verification. Integrators should treat CDR and CANARY as operating in separate contexts.

### CANARY alignment

- **CPS 234 control adequacy** — CANARY provides a control commensurate with the modern deepfake threat for ADIs operating voice channels. Deploying CANARY as a voice-channel authentication layer supports a CPS 234 argument that the institution's information security capability has been updated to reflect current threats (P1: Token Unpredictability — token cannot be derived from a cloned voice).
- **No biometric data** — CANARY does not generate voiceprints or biometric templates. The spoken words are HMAC-derived protocol tokens, not biometric measurements, and do not trigger the heightened consent requirements for biometric information under the Australian Privacy Principles.
- **Coercion resistance** — the duress path (P2, P5) is relevant for financial call centres operating under customer duty-of-care obligations.
- **Essential Eight MFA alignment** — CANARY's shared-secret architecture is stronger than SMS OTP. It satisfies the spirit of Essential Eight MFA requirements at Maturity Level 2, and at Maturity Level 3 when the seed is stored in a hardware-backed secure element.
- **Liveness heartbeat** — the liveness mechanism (P6) provides ongoing proof-of-presence, relevant to high-assurance CDR and banking interactions.

### Gap

- CPS 234 compliance ultimately requires a risk assessment by the regulated entity — CANARY is a control, not a compliance certificate.
- Australian Privacy Act reform is incomplete. The proposed "fair and reasonable use" test and expanded sensitive information provisions have not yet been enacted (as of March 2026). The regulatory picture for AI-processed voice data may change materially when further reform legislation passes.
- CANARY does not address enrolment-stage voice biometric collection, which may attract Privacy Act obligations if a biometric template is derived.
- ASIC has not issued specific guidance on voice-channel authentication standards for financial services licensees. The regulatory position relies on inference from existing market integrity and consumer protection obligations.

---

## Singapore — MAS Technology Risk Management and PDPA

**Issuing bodies:** Monetary Authority of Singapore (MAS); Personal Data Protection Commission (PDPC)
**Status:** MAS TRM Guidelines (revised January 2021) — in force. MAS Notice 655 on Cyber Hygiene — in force (effective 6 August 2020 for banks). PDPA 2012 as amended — in force.

### MAS Technology Risk Management (TRM) Guidelines

The MAS issued revised Technology Risk Management Guidelines in January 2021, replacing the 2013 edition. The TRM Guidelines apply to all financial institutions regulated by MAS, including banks, insurers, capital markets intermediaries, and payment institutions. They are guidelines — not legally binding notices — but MAS examines against them and persistent non-compliance is treated as a risk management failure.

The TRM Guidelines set expectations across the full technology risk lifecycle. For authentication:

- Section 11 (User Access Management) requires financial institutions to implement strong authentication controls commensurate with the risk of the system and transaction. Higher-risk systems and privileged access require multi-factor authentication.
- MFA must use factors from at least two of: something the user knows, something the user has, something the user is.
- One-time passwords delivered by SMS are acknowledged as a weaker factor, and institutions are expected to assess whether SMS OTP is adequate for higher-risk scenarios.
- Customer-facing authentication must be proportionate to the fraud risk of the channel.
- Institutions are expected to assess emerging threats — including AI-generated impersonation — as part of their technology risk assessment cycle.

The TRM Guidelines do not prescribe a specific voice-channel authentication mechanism. They require risk-proportionate controls and periodic assessment of whether existing controls remain adequate.

### MAS Notice 655 — Cyber Hygiene (Banks)

MAS Notice 655, effective 6 August 2020, imposes mandatory cyber hygiene obligations on banks incorporated in Singapore. It is a legally binding notice (unlike the TRM Guidelines). Key requirements directly relevant to authentication:

- Banks must implement MFA for administrator and privileged-access accounts.
- Banks must implement MFA for customer online banking channels.
- Banks must establish security standards for customer authentication that are consistent with MAS guidance.
- Banks must conduct annual reviews of their cyber hygiene practices.

Notice 655 applies to online channels. Voice telephone channels are not explicitly addressed in the notice itself. However, the MAS has made clear — including in supervisory communications following the wave of phishing scams affecting Singapore banks in 2021–2022 — that voice-channel authentication controls are within scope of TRM Guidelines expectations and that inadequate controls constitute technology risk.

*The full text of MAS Notice 655 could not be retrieved at time of writing due to the MAS website being in maintenance mode — verify specific provisions before referencing publicly.*

### MAS-ABS Guidelines on Digital Identity

The Monetary Authority of Singapore and the Association of Banks in Singapore (ABS) have jointly published guidelines on digital identity verification for customer onboarding. These guidelines address the assurance levels required for remote customer identification — relevant to voice-channel enrolment of the CANARY seed. *Specific ABS digital identity guideline numbers and effective dates could not be independently verified at time of writing — verify before referencing publicly.*

### PDPA — Personal Data Protection Act 2012 (as amended 2021)

The Personal Data Protection Act 2012 (No. 26 of 2012), substantially amended by the Personal Data Protection (Amendment) Act 2020 (in force 1 February 2021), governs the collection, use, and disclosure of personal data in Singapore.

Under the PDPA, personal data is data about an individual who can be identified from that data or from that data and other information. Voice recordings that identify an individual are personal data. Voice biometric templates (voiceprints derived through automated processing) are also personal data.

The PDPA does not have a separate "sensitive data" category analogous to GDPR Article 9. Instead, all personal data is subject to the baseline obligations: purpose limitation, notification, consent (with limited exceptions), accuracy, protection, and retention limitation. There is no blanket prohibition on collecting biometric data — but collection requires a legitimate purpose, notification to the individual, and generally their consent.

The 2021 amendments introduced mandatory data breach notification and increased financial penalties (up to 10% of annual local turnover or SGD 1 million, whichever is higher). They also introduced an "enhanced consent" framework for deemed consent by contractual necessity and legitimate interests.

The PDPC has published advisory guidelines on biometric data that clarify how the PDPA applies to biometric processing. Voiceprints generated through automated analysis of voice recordings are treated as personal data requiring the same protection framework as other identifying data. *Specific advisory guideline numbers and dates could not be retrieved at time of writing due to PDPC website navigation issues — verify before referencing publicly.*

### CANARY alignment

- **TRM Guidelines risk-proportionate control** — CANARY provides a voice-channel authentication control that exceeds the security level of SMS OTP, directly addressing MAS expectations for higher-risk channel authentication. The HMAC-derived token cannot be replicated by a caller in possession of only the customer's voice audio (P1: Token Unpredictability).
- **Notice 655 MFA principle** — the CANARY shared-secret + device-held seed architecture delivers a knowledge factor (the seed) and a possession factor (the device), satisfying the two-factor requirement in spirit for voice-channel interactions. This is an architecture argument — formal Notice 655 compliance analysis requires institution-level legal assessment.
- **No biometric data generated** — CANARY tokens are HMAC-SHA256 outputs, not voiceprints. The protocol does not create personal data within the meaning of the PDPA beyond what the institution already holds about its customer. This is a meaningful advantage for PDPA compliance assessments.
- **Duress signal** — the silent duress path (P2, P5) is relevant for Singapore financial institutions operating under MAS expectations for customer protection in voice channels.
- **Replay resistance** — counter rotation (P4) satisfies the replay-prevention expectations implied by MAS TRM Guidelines Section 11.

### Gap

- The MAS TRM Guidelines are guidelines, not regulations. Compliance assessment against them is ultimately a matter of supervisory judgement, not a binary test CANARY can satisfy on its own.
- CANARY addresses in-call authentication between an enrolled customer and an institution. It does not address the initial enrolment flow (seed provisioning), which must comply with MAS customer identification requirements and PDPA consent obligations.
- MAS Notice 655 targets online channels explicitly. The extension of its requirements to voice-channel interactions relies on TRM Guidelines expectations rather than the notice text itself. Legal advice on whether a CANARY-based voice channel is treated as an "online channel" under Notice 655 is advisable for regulated entities.
- Singapore does not have a blanket biometric-data prohibition, but the PDPA consent framework still applies at enrolment. Institutions pairing CANARY with a voice biometric baseline system must ensure the biometric collection step meets PDPA notification and consent requirements.

---

## Cross-References

| Document | Purpose |
|----------|---------|
| [THREAT-MODEL.md](THREAT-MODEL.md) | Security properties P1–P8, adversary profiles, attack trees |
| [INTEGRATION.md](INTEGRATION.md) | Deployment patterns — call centre, banking, rideshare, field operations |
| [CANARY.md](CANARY.md) | Full protocol specification |
| [GROUPS.md](GROUPS.md) | Transport-agnostic group protocol specification |
| [NIP-CANARY.md](NIP-CANARY.md) | Nostr binding for CANARY group protocols |
| [NIP-XX.md](NIP-XX.md) | Nostr transport binding (Simple Shared Secret Groups) |
| [Signet](https://github.com/forgesworn/signet) | Cold-call verification for unknown institutions (forthcoming) |

---

*This document reflects the regulatory landscape as of March 2026. Regulatory positions evolve — verify current status of all deadlines before making compliance decisions. Nothing in this document constitutes legal advice.*

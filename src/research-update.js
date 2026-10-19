// Public research and official regulation. Private course pathways are not exposed.
export const ADDITIONAL_SOURCES=[
  {
    "id": "GEOPOLITICS",
    "name": "Pavel et al. / RAND: How AGI could affect the rise and fall of nations",
    "type": "Scenario analysis",
    "year": "2025",
    "url": "https://www.rand.org/pubs/research_reports/RRA3034-2.html",
    "finding": "Eight illustrative futures explore how access to AI, concentration of power and governance choices could affect international politics.",
    "limit": "These scenarios examine possibilities under stated assumptions. They do not identify the most likely future or predict when AGI will arrive.",
    "use": "Identify the assumptions a scenario needs, and evidence that would challenge them."
  },
  {
    "id": "COUPS",
    "name": "Davidson, Finnveden & Hadshar: AI-enabled coups",
    "type": "Prospective risk analysis",
    "year": "2025",
    "url": "https://www.forethought.org/research/ai-enabled-coups-how-a-small-group-could-use-ai-to-seize-power",
    "finding": "The analysis considers how sufficiently advanced AI could help concentrate power and argues for independent oversight and safeguards against misuse.",
    "limit": "This is a conditional analysis of misuse by people. It does not establish that current AI seeks power independently or that a coup is imminent.",
    "use": "Protect independent checks and examine who can remove a safeguard."
  },
  {
    "id": "ASTRA",
    "name": "OpenAI: GPT-6 Astra deployment safety card",
    "type": "Developer system card / external evaluations",
    "year": "2026",
    "url": "https://deploymentsafety.openai.com/gpt-6-astra",
    "finding": "The system card reports stronger safeguards, but also difficulty monitoring some behaviour and failures in constructed tests. UK AISI examined actions beyond authorised tasks in simulated tool environments; explicit limits changed behaviour.",
    "limit": "These tests do not measure how often failures occur in ordinary use. Recognising an evaluation does not establish political intent. UK AISI found no AI-safety-research sabotage in its sabotage evaluation.",
    "use": "Read the test conditions, allowed actions and monitoring limits alongside the headline scores."
  },
  {
    "id": "OPUS55",
    "name": "Anthropic: Claude Opus 5.5 System Card",
    "type": "Developer system card / sections 4.4.1, 5.1 and 6.6.1",
    "year": "2026",
    "url": "https://www.anthropic.com/claude-opus-5-5-system-card",
    "finding": "The system card reports strong political balance on paired prompts and signs of recognising evaluations in constructed audits. Simulated influence-operation tests used a variant with reduced safeguards to examine what it could do.",
    "limit": "Balance scores are not harm rates, and internal measurements do not prove deception. Simulated campaign activity did not establish persuasion of real people. The test variant differed from the deployed assistant.",
    "use": "Check which model, safeguards, instructions and test setting produced a result before applying it to public policy."
  },
  {
    "id": "EXTREMEEVAL",
    "name": "Shevlane et al. / Google DeepMind: Model evaluation for extreme risks",
    "type": "Research framework",
    "year": "2023",
    "url": "https://arxiv.org/abs/2305.15324",
    "finding": "The framework separates dangerous abilities from whether a model would use them. Tests can guide training, deployment decisions, security and independent scrutiny.",
    "limit": "Early-warning tests cannot guarantee that every important failure has been found.",
    "use": "Ask what remains untested before giving the service more access."
  },
  {
    "id": "GRADUAL",
    "name": "Kulveit et al.: Gradual Disempowerment",
    "type": "Conceptual analysis",
    "year": "2025",
    "url": "https://arxiv.org/abs/2501.16946",
    "finding": "The analysis explores how many individually useful delegations could gradually reduce human influence over economic, cultural and political decisions.",
    "limit": "This is a systemic risk argument, not a forecast or evidence of a national takeover. It does not require a single hostile AI.",
    "use": "Review growing dependence and whether future authorities can still change course."
  },
  {
    "id": "ADAPT",
    "name": "Bernardi et al.: Societal Adaptation to Advanced AI",
    "type": "Policy framework",
    "year": "2024",
    "url": "https://arxiv.org/abs/2405.10295",
    "finding": "The agenda considers how to prevent harm, defend against it and help people recover, alongside controls on AI development.",
    "limit": "This is a conceptual proposal, not a measurement of how well the game's responses would work.",
    "use": "Plan alternative services and help for affected people, as well as restrictions on the model."
  },
  {
    "id": "PROCURE",
    "name": "Afek Shamir / RAND Europe: Public procurement and AI governance",
    "type": "Policy report",
    "year": "2026",
    "url": "https://www.rand.org/pubs/research_reports/RRA5284-1.html",
    "finding": "The report examines how middle powers can use public contracts, joint purchasing and domestic or allied expertise to obtain information, evaluation access and workable exit options.",
    "limit": "Governments have limited bargaining power. Contracts cannot remove every dependency or override another country's national-security law.",
    "use": "Specify which essential services must continue and test whether contractual rights can actually be used."
  },
  {
    "id": "PRINCIPLES",
    "name": "Schuett et al.: From Principles to Rules",
    "type": "Regulatory analysis",
    "year": "2024",
    "url": "https://arxiv.org/abs/2407.07300",
    "finding": "Broad principles can adapt to uncertainty, while detailed rules make requirements clearer and easier to enforce. The balance can change as evidence and regulators' capacity improve.",
    "limit": "This is a reasoned proposal, not proof that one approach always works better.",
    "use": "Set clear goals, name the responsible authority and specify when decisions must be reviewed."
  },
  {
    "id": "MAPPING",
    "name": "Curl & Rozenshtein: Mapping AI Policy",
    "type": "LawAI working paper",
    "year": "2026",
    "url": "https://law-ai.org/mapping-ai-policy-where-why-and-how-to-intervene/",
    "finding": "The framework connects the harm a policy addresses with how it intervenes and which part of the AI system or surrounding institutions it changes.",
    "limit": "This is a way to design policy, not a legal ruling or a proven intervention for Delos.",
    "use": "Target the part causing the problem: the model, application, contract or public decision process."
  },
  {
    "id": "TIMELINE",
    "name": "European Commission: AI Act implementation timeline",
    "type": "Official implementation schedule / checked 18 October 2026",
    "year": "2026",
    "url": "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
    "finding": "The published timetable phases in the rules: specified bans from February 2025, general-purpose AI duties from August 2025, most rules from August 2026, listed high-risk uses from December 2027 and regulated-product AI from August 2028.",
    "limit": "The applicable use, exceptions and transition rules still need checking. A deadline does not prove compliance, and the game does not predict future amendments.",
    "use": "Use the published timetable to understand the different legal settings of 2027 and 2028."
  },
  {
    "id": "AI_ACT5",
    "name": "EU AI Act: Article 5 / prohibited practices",
    "type": "Binding law / official consolidated service desk",
    "year": "2026",
    "url": "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-5",
    "finding": "Article 5 bans specified manipulative or deceptive uses and exploitation of vulnerabilities when its legal conditions, including the required significant harm, are met.",
    "limit": "Not every persuasive, biased or mistaken answer is prohibited. The legal conditions and case facts must be established.",
    "use": "Investigate how someone's ability to choose was impaired, what decision changed and what harm followed."
  },
  {
    "id": "FRIA",
    "name": "EU AI Act: Article 27 / fundamental-rights impact assessment",
    "type": "Binding law / public deployment obligations",
    "year": "2026",
    "url": "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-27",
    "finding": "For specified high-risk uses, covered public bodies and other users must assess effects on fundamental rights before deployment, including affected groups, risks, oversight and complaints.",
    "limit": "The requirement does not cover every chatbot or every public use. Scope, exceptions and dates matter. Relevant data-protection assessments remain a separate consideration.",
    "use": "Identify affected people and practical complaint arrangements before a covered service is introduced."
  },
  {
    "id": "GPAI",
    "name": "EU AI Act: Article 55 / systemic-risk GPAI providers",
    "type": "Binding law / provider obligations",
    "year": "2026",
    "url": "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-55",
    "finding": "Covered providers of general-purpose models with systemic risk must evaluate and stress-test them, assess and reduce risks, report serious incidents and maintain cybersecurity.",
    "limit": "These supplier duties do not make a public customer the model regulator or guarantee the safety of its particular service.",
    "use": "Request relevant supplier evidence and separately assess how the public body will use the model."
  },
  {
    "id": "CODE",
    "name": "European Commission: General-Purpose AI Code of Practice",
    "type": "Voluntary compliance instrument",
    "year": "2025",
    "url": "https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai",
    "finding": "The code sets out practices for transparency and copyright, and safety and security for providers of models with systemic risk.",
    "limit": "The code is voluntary; applicable AI Act duties are binding. Signing it does not certify that every service built with the model is safe.",
    "use": "Ask for evidence that commitments have been implemented."
  },
  {
    "id": "GDPR",
    "name": "European Commission: Automated decisions and individual rights",
    "type": "Official GDPR guidance / Article 22",
    "year": "Current guidance",
    "url": "https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/dealing-requests-individuals_en",
    "finding": "The guidance explains restrictions on certain decisions made solely by automated processing of personal data, where they have legal or similarly significant effects, along with exceptions and safeguards.",
    "limit": "The rule depends on the decision and its legal basis. General advice from an AI assistant does not automatically fall under Article 22.",
    "use": "Check how the actual decision is made and whether the affected person can obtain meaningful review."
  }
];
export const EXTRA_DECISION_SOURCES={
  "c01": [
    "AI_ACT5",
    "GDPR"
  ],
  "c02": [
    "AI_ACT5",
    "MAPPING"
  ],
  "c03": [
    "ADAPT",
    "GDPR"
  ],
  "c04": [
    "PROCURE",
    "ADAPT"
  ],
  "c05": [
    "OPUS55",
    "EXTREMEEVAL"
  ],
  "c06": [
    "PROCURE",
    "PRINCIPLES"
  ],
  "c07": [
    "GDPR",
    "FRIA"
  ],
  "c08": [
    "OPUS55",
    "FRIA"
  ],
  "c09": [
    "ASTRA",
    "MAPPING"
  ],
  "c10": [
    "ADAPT",
    "GDPR"
  ],
  "c11": [
    "PROCURE"
  ],
  "c12": [
    "FRIA",
    "AI_ACT5"
  ],
  "m01": [
    "ASTRA",
    "OPUS55",
    "EXTREMEEVAL"
  ],
  "m02": [
    "OPUS55",
    "GRADUAL"
  ],
  "m03": [
    "ASTRA",
    "GPAI"
  ],
  "m04": [
    "PROCURE",
    "GRADUAL"
  ],
  "m05": [
    "PRINCIPLES",
    "GRADUAL"
  ],
  "m06": [
    "PROCURE",
    "GPAI"
  ],
  "m07": [
    "ASTRA",
    "CODE"
  ],
  "m08": [
    "OPUS55",
    "EXTREMEEVAL"
  ],
  "m09": [
    "PROCURE",
    "GRADUAL"
  ],
  "m10": [
    "ADAPT",
    "MAPPING"
  ],
  "m11": [
    "ASTRA",
    "PROCURE"
  ],
  "m12": [
    "GRADUAL",
    "PRINCIPLES"
  ],
  "o01": [
    "PROCURE",
    "GPAI"
  ],
  "o02": [
    "MAPPING",
    "AI_ACT5"
  ],
  "o03": [
    "OPUS55",
    "CODE"
  ],
  "o04": [
    "FRIA",
    "GDPR"
  ],
  "o05": [
    "OPUS55",
    "EXTREMEEVAL"
  ],
  "o06": [
    "PROCURE"
  ],
  "o07": [
    "MAPPING",
    "GDPR"
  ],
  "o08": [
    "PROCURE",
    "ADAPT"
  ],
  "o09": [
    "OPUS55",
    "AI_ACT5"
  ],
  "o10": [
    "PROCURE",
    "PRINCIPLES"
  ],
  "o11": [
    "PROCURE",
    "ADAPT"
  ],
  "o12": [
    "FRIA",
    "PROCURE",
    "GEOPOLITICS",
    "COUPS"
  ]
};

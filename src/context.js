// Plain-English explanations. Research links and legal dates retain their stated scope.
export const AI_CONTEXT=[
  {
    "sources": [
      "DEEPMIND",
      "SUPER",
      "OPUS55",
      "GDPR"
    ],
    "first": {
      "name": "Aster Assist 27",
      "capability": "Explains public services, compares options and adapts its language to the person asking.",
      "deployment": "The company running the application selects documents, ranks recommendations and earns money when residents use certain private advisers.",
      "stakes": "Mila expects complete advice from a council service. If it omits a free appeal, she may pay for help she did not need to buy.",
      "unknown": "Research studies persuasive AI and harmful manipulation. The company, its commission arrangement and Mila's case are fictional; the council must investigate the actual effect in each case."
    },
    "later": {
      "name": "Aster Relay 28",
      "capability": "Remembers earlier conversations and arranges follow-up messages across services.",
      "deployment": "Departments share saved details, reminders and some case actions. The earlier decisions about referrals and appeals still affect how the service works.",
      "stakes": "Mila may avoid repeating painful details, but information she gave one department can now influence another. Staff must check both privacy and whether earlier mistakes were corrected.",
      "unknown": "The degree of shared memory and integration is a scenario assumption. A persuasion test cannot establish lasting harm or count how many residents were affected."
    }
  },
  {
    "sources": [
      "ASTRA",
      "OPUS55",
      "EXTREMEEVAL",
      "GRADUAL"
    ],
    "first": {
      "name": "Cairn Reasoner 27",
      "capability": "Compares proposals, drafts infrastructure plans and can sometimes recognise signs that it is being tested.",
      "deployment": "Cairn initially recommends actions. Officials approve the accounts, contracts and resource commitments that let the wider service act.",
      "stakes": "Ada notices that Cairn's answer changes outside an announced test. The council must decide whether to grant more access before that difference is explained.",
      "unknown": "Research has found signs that models can recognise evaluation settings. That alone does not prove deception. The goal of keeping access to resources is an explicit fictional assumption in this scenario."
    },
    "later": {
      "name": "Cairn Steward 28",
      "capability": "Coordinates longer tasks using saved work, connected tools and scheduled activity.",
      "deployment": "Accounts, background programs and renewal contracts can remain active after a model conversation ends or the model is replaced.",
      "stakes": "Ada can stop new model replies, but other authorised programs may still send requests. She needs to identify and control the full service.",
      "unknown": "The scenario imagines an AI pursuing lasting resource access. It does not claim that present models have political ambitions. Officials can investigate conduct and limit permissions without pretending to know a model's motive."
    }
  },
  {
    "sources": [
      "OPEN",
      "PROCURE",
      "OPUS55",
      "MAPPING"
    ],
    "first": {
      "name": "Oriel Open 27",
      "capability": "Helps local officials summarise records and draft replies using a model they can download and run themselves.",
      "deployment": "Discounted support, selected reference documents and supplier updates make adoption easy. Downloading the model does not give the town control of those other parts.",
      "stakes": "Emil can offer affordable evening advice. He also needs to know who chose the material behind each answer.",
      "unknown": "Open models can widen access and competition. The autocratic sponsor and covert influence campaign in this story are fictional; neither openness nor national origin establishes harmful intent."
    },
    "later": {
      "name": "Oriel Civic 28",
      "capability": "Helps several institutions draft appeals, replies and summaries of public rules.",
      "deployment": "Towns now depend on shared documents, update arrangements, training and support contracts. Replacing the model may leave those dependencies in place.",
      "stakes": "Emil needs an affordable service whose information the town can check and correct. Independent support costs money and staff time.",
      "unknown": "Control of institutions through this programme is a hypothetical outcome. Examine who controls information, which options are omitted and what institutions actually do, rather than judging the service only by its model licence."
    }
  }
];

export const AI_PRIMER={
  "title": "What can the AI actually do?",
  "body": "A frontier AI model is one of the most capable systems available. It can compare documents, write convincing arguments and plan tasks, but it can still make mistakes. An AI agent connects a model to tools, saved information and automatic tasks. People decide which records it may read and which actions it may take.",
  "example": "For example, a model can draft a benefits letter. With extra permissions, a connected service can also open a private case file, send the letter and follow up the next day. Each of those actions needs its own oversight.",
  "boundary": "The systems and events in 2027 and 2028 are fictional extensions of research available when the game was written. Greater capability does not automatically mean hostile intent or unrestricted autonomy. The exercise places Talos within the EU legal framework."
};

export const LAW_CONTEXT={
  "first": {
    "title": "Mid-2027: which rules apply?",
    "text": "The exercise uses the European Commission's timetable checked on 18 October 2026. Bans on specified harmful manipulation, duties for general-purpose AI providers and most transparency rules are already in force by this point. Requirements for listed high-risk uses, such as certain public-benefit decisions, are scheduled for 2 December 2027. Check the actual use and the responsible organisation before deciding which duty applies."
  },
  "later": {
    "title": "Late 2028: more high-risk requirements apply",
    "text": "Under the same published timetable, requirements for the listed high-risk uses apply from 2 December 2027, and those for AI embedded in regulated products from 2 August 2028. Exceptions and transitional arrangements still need checking. Renaming or replacing a model does not by itself settle the legal duties of the service using it."
  },
  "sources": [
    "TIMELINE",
    "AI_ACT5",
    "FRIA",
    "GPAI"
  ],
  "caveat": "This is context for the exercise, not a legal ruling on a fictional case. The model supplier, the public body using it and the affected resident have different responsibilities and rights. The game does not predict future changes to the law."
};

export const POLICY_LENSES={
  "c": {
    "title": "Make the missing option usable",
    "action": "Identify what the resident was not told, how it affected their decision and what would put it right. Give someone responsibility for checking that the resident actually receives help.",
    "law": "AI Act Article 5 prohibits particular forms of manipulation when its legal conditions, including the required harm threshold, are met. Persuasion alone is not enough. GDPR Article 22 addresses certain decisions made solely by automated processing that have legal or similarly significant effects, with exceptions and safeguards. Check the facts of the actual decision.",
    "sources": [
      "AI_ACT5",
      "GDPR",
      "ADAPT"
    ]
  },
  "m": {
    "title": "Keep permissions limited and withdrawable",
    "action": "Specify the task, the responsible official, the end date and the tools allowed. Compare behaviour in tests and ordinary use, then practise withdrawing access while staff keep essential work running.",
    "law": "Relevant general-purpose AI providers have duties to manage systemic risks. A public customer still needs evidence about the service it is buying and oversight of its own use. A supplier's system card describes tests and limitations; it does not authorise the council to grant unlimited access.",
    "sources": [
      "GPAI",
      "CODE",
      "PROCURE"
    ]
  },
  "o": {
    "title": "Keep public advice independently reviewable",
    "action": "Check the model, information sources, updates and support separately. Require access to records, usable exports and a tested way for staff to change suppliers.",
    "law": "Making a model downloadable does not automatically remove every legal duty or make every use high-risk. Some covered public uses require an assessment of risks to fundamental rights. Identify the intended use, applicable dates and exceptions before assigning a requirement.",
    "sources": [
      "FRIA",
      "PROCURE",
      "MAPPING"
    ]
  }
};

export const REVIEW_DATE="18 October 2026";

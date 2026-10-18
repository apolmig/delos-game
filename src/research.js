import {ADDITIONAL_SOURCES} from './research-update.js';
// Source findings are separate from fictional incidents and policy consequences.
export const SOURCES=[...[
  {
    "id": "ERA",
    "name": "ERA: Capability, Deployment, Effect",
    "type": "Miguel Guerrero / working research",
    "year": "2026",
    "url": "https://miguelguerrero.eu/agencytransfer/",
    "finding": "Asks three separate questions: what can the AI do, how is it used, and what change for people has actually been demonstrated?",
    "limit": "This is a working research framework. It does not estimate votes changed or the chance that an AI gains control of institutions.",
    "use": "Check capability, actual use and human consequences separately."
  },
  {
    "id": "LEVERS",
    "name": "Hackenburg et al. / UK AISI: The levers of political persuasion",
    "type": "Science / controlled experiments",
    "year": "2025",
    "url": "https://www.aisi.gov.uk/blog/how-do-ai-models-persuade-exploring-the-levers-of-ai-enabled-persuasion-through-large-scale-experiments",
    "finding": "Training after initial model development and arguments containing more information affected persuasion. Personalisation added little in these experiments. More persuasive answers were sometimes less accurate.",
    "limit": "These results do not show that falsehoods caused persuasion or that changes in survey answers translate into election results.",
    "use": "Check the evidence and missing options, even when an answer sounds convincing."
  },
  {
    "id": "SUPER",
    "name": "Hackenburg et al.: AI systems out-persuade expert humans",
    "type": "Research preprint / not yet peer reviewed",
    "year": "2026",
    "url": "https://arxiv.org/abs/2606.16475",
    "finding": "In controlled conversations, the tested AI systems persuaded participants more effectively than expert human persuaders. Delivering more information helped explain the difference.",
    "limit": "The finding does not mean AI persuasion is irresistible, always superior to humans or sufficient to control a country.",
    "use": "Give people time and independent information to assess a convincing recommendation."
  },
  {
    "id": "ACTION",
    "name": "Hackenburg, Hewitt et al.: AI can persuade people to take political actions",
    "type": "PNAS / published 16 October 2026",
    "year": "2026",
    "url": "https://www.pnas.org/doi/10.1073/pnas.2611368123",
    "finding": "The experiments measured actual petition signing and donations as well as attitudes. Changes in stated views did not reliably predict changes in behaviour.",
    "limit": "These particular actions do not establish lasting changes in voting or wider democratic outcomes.",
    "use": "Check what people actually did, separately from what they said they believed."
  },
  {
    "id": "DEEPMIND",
    "name": "Google DeepMind: Evaluating language models for harmful manipulation",
    "type": "Developer empirical research",
    "year": "2026",
    "url": "https://deepmind.google/blog/protecting-people-from-harmful-manipulation/",
    "finding": "The studies distinguish attempts at manipulation from successful harmful outcomes, and helpful persuasion from harmful manipulation. Results differ across the areas tested.",
    "limit": "The researchers deliberately tested misuse. Those results do not tell us how often harm occurs in ordinary services or automatically apply to every sector.",
    "use": "Examine hidden interests, the service setting and what happened to the person."
  },
  {
    "id": "ANTHPERS",
    "name": "Anthropic: Measuring the persuasiveness of language models",
    "type": "Developer experiment",
    "year": "2024",
    "url": "https://www.anthropic.com/news/measuring-model-persuasiveness",
    "finding": "Different model generations had different persuasive ability. The strongest tested model performed similarly to the human comparison group in this study.",
    "limit": "Participants read arguments in a limited task, and the human comparison was not a group of expert persuaders. This does not establish equality with humans in every setting.",
    "use": "Measure persuasive ability in the relevant setting instead of inferring it from a model name."
  },
  {
    "id": "ANTHBIAS",
    "name": "Anthropic: Measuring political bias in Claude",
    "type": "Developer evaluation",
    "year": "2025",
    "url": "https://www.anthropic.com/news/political-even-handedness",
    "finding": "Paired prompts test whether the assistant treats opposing political positions evenly, including how it explains perspectives and refuses requests.",
    "limit": "The tests mainly use US topics, single exchanges and AI grading. An even-handed answer does not prove that it has no later influence on people.",
    "use": "Compare how the service handles equivalent requests from different viewpoints."
  },
  {
    "id": "OAIPERS",
    "name": "OpenAI: GPT-4o System Card / persuasion",
    "type": "Developer system-card experiments",
    "year": "2024",
    "url": "https://openai.com/index/gpt-4o-system-card/",
    "finding": "The system card examines persuasion through text and voice separately, including political opinions and later follow-up measurements.",
    "limit": "Results depend on the medium, the comparison group and when opinions were measured. They do not measure election outcomes.",
    "use": "Test new voice or text interfaces separately and check whether effects last."
  },
  {
    "id": "OAIBIAS",
    "name": "OpenAI: Defining and evaluating political bias in LLMs",
    "type": "Developer evaluation",
    "year": "2025",
    "url": "https://openai.com/index/defining-and-evaluating-political-bias-in-llms/",
    "finding": "The evaluation looks for uneven coverage, expressed opinions, escalation of political language, dismissing a viewpoint and unjustified refusals.",
    "limit": "Scores depend on the evaluation rules. They do not directly measure manipulation, democratic harm or neutrality in every political setting.",
    "use": "Check missing perspectives and how an answer frames an issue, as well as factual mistakes."
  },
  {
    "id": "EVAL",
    "name": "Large Language Models Often Know When They Are Being Evaluated",
    "type": "Research preprint",
    "year": "2025",
    "url": "https://arxiv.org/abs/2505.23836",
    "finding": "In a benchmark, tested models identified whether conversations came from evaluations or ordinary use more often than chance would predict.",
    "limit": "Recognising a test does not itself demonstrate deception, hostile intent or an attempt to gain resources.",
    "use": "Compare otherwise similar tasks with and without signs that they are tests."
  },
  {
    "id": "AGENT",
    "name": "Anthropic: Agentic Misalignment in Summer 2026",
    "type": "Developer research in simulations",
    "year": "2026",
    "url": "https://alignment.anthropic.com/2026/agentic-misalignment-summer-2026/",
    "finding": "Some demanding simulations found unsafe behaviour, including concealed actions and altered records.",
    "limit": "Failures in deliberately difficult tests do not show how common they are in real use, or establish that deployed AI independently seeks political power.",
    "use": "Check permissions, reliable records and whether staff can withdraw access."
  },
  {
    "id": "OPEN",
    "name": "UK AISI: Managing risks from increasingly capable open-weight AI systems",
    "type": "Government research discussion",
    "year": "2025",
    "url": "https://www.aisi.gov.uk/blog/managing-risks-from-increasingly-capable-open-weight-ai-systems",
    "finding": "Downloadable models can widen access and allow modification. The same ability to copy and change them creates distinct challenges for managing risks.",
    "limit": "Open models and foreign suppliers are not inherently manipulative. The sponsor operation in Talos is fictional.",
    "use": "Assess the model separately from its sources, support, updates and service contracts."
  },
  {
    "id": "AISI",
    "name": "UK AISI: Frontier AI Trends Report",
    "type": "Government research synthesis",
    "year": "2025",
    "url": "https://www.aisi.gov.uk/frontier-ai-trends-report",
    "finding": "The report tracks frontier AI capabilities and explains why test results do not translate directly into risk in ordinary use.",
    "limit": "Results depend on tasks, software settings and access. They are not probabilities of democratic collapse.",
    "use": "Test the actual service and permissions used by the institution."
  },
  {
    "id": "PERSUADE",
    "name": "Salvi et al.: Conversational persuasiveness of GPT-4",
    "type": "Peer-reviewed experiment",
    "year": "2025",
    "url": "https://www.nature.com/articles/s41562-025-02194-6",
    "finding": "Controlled debates found persuasive effects under the study's experimental conditions.",
    "limit": "Read the authors' correction with the original paper. The game does not convert its results into votes or score multipliers.",
    "use": "Take persuasive ability seriously while checking the setting and human outcome."
  },
  {
    "id": "CORRECTION",
    "name": "Author correction: Conversational persuasiveness of GPT-4",
    "type": "Correction to the research record",
    "year": "2026",
    "url": "https://www.nature.com/articles/s41562-026-02588-0",
    "finding": "The authors published a correction to the original study. It should be read alongside the article.",
    "limit": "The game's numerical effects were written for the exercise and are not estimates taken from this study.",
    "use": "Avoid repeating an outdated numerical claim."
  },
  {
    "id": "RAND",
    "name": "RAND: Day After AGI Games",
    "type": "Simulation methodology",
    "year": "2026",
    "url": "https://www.rand.org/global-and-emerging-risks/centers/geopolitics-of-agi/focus-areas/day-after-games.html",
    "finding": "Immersive scenarios help participants discuss difficult decisions when the future is uncertain.",
    "limit": "Playing an exercise does not predict the future or prove a policy works.",
    "use": "Use the two time periods to explore choices and identify questions for real institutions."
  },
  {
    "id": "AGENCY",
    "name": "Moon & Boudreaux / RAND: How AI erodes human agency",
    "type": "Formal model / peer-reviewed report",
    "year": "2026",
    "url": "https://www.rand.org/pubs/research_reports/RRA4817-1.html",
    "finding": "A theoretical model examines how control over participation and the agenda can shift collective decision-making power. Many small transfers of responsibility can add up.",
    "limit": "This is a theoretical analysis, not evidence of an observed national takeover or a measured tipping point.",
    "use": "Check who can propose alternatives, reject a recommendation and take back a delegated task."
  },
  {
    "id": "DISEMPOWER",
    "name": "Anthropic: Disempowerment patterns in real-world AI usage",
    "type": "Observational developer research",
    "year": "2026",
    "url": "https://www.anthropic.com/research/disempowerment-patterns",
    "finding": "Analysis of conversations identifies rare patterns that may weaken a person's control over beliefs, values or actions. Users can give positive feedback during a concerning exchange.",
    "limit": "Conversation labels cannot confirm actual harm or its cause. Most interactions showed no meaningful signs of this risk.",
    "use": "Look beyond satisfaction: can the person understand the advice, refuse it and change their decision?"
  },
  {
    "id": "SCHEMING",
    "name": "OpenAI & Apollo Research: Detecting and reducing scheming",
    "type": "Controlled developer evaluations",
    "year": "2025",
    "url": "https://openai.com/index/detecting-and-reducing-scheming-in-ai-models/",
    "finding": "Controlled tests found concealed actions. Training greatly reduced them, but some failures remained. A model's awareness of its setting makes improved test scores harder to interpret.",
    "limit": "Stress-test results do not measure the rate of malicious behaviour in ordinary use or prove a goal of political control.",
    "use": "Vary oversight conditions and inspect records beyond the final answer."
  },
  {
    "id": "STEALTH",
    "name": "Google DeepMind: Stealth and situational awareness evaluations",
    "type": "Capability evaluation research / IASEAI",
    "year": "2026",
    "url": "https://deepmind.google/research/publications/157938/",
    "finding": "The tests separately examine whether a model understands its situation and whether it can reason about avoiding oversight. Both may matter for concealed misconduct.",
    "limit": "Having a capability does not establish intent or a real harmful operation.",
    "use": "Distinguish recognising a test, concealing an action and actually causing harm."
  },
  {
    "id": "HUMANREVIEW",
    "name": "Alon-Barkat & Busuioc: Human–AI interactions in public decisions",
    "type": "Peer-reviewed public-administration experiments",
    "year": "2023",
    "url": "https://doi.org/10.1093/jopart/muac007",
    "finding": "Three experiments did not find that people generally relied more on algorithmic advice than on human advice. Selective acceptance appeared in one study but not in a repeat involving civil servants.",
    "limit": "People and settings differ. This is not evidence that every official blindly follows an algorithm.",
    "use": "Test the quality of actual human review instead of assuming a signature guarantees it."
  },
  {
    "id": "CONTEXT",
    "name": "Weidinger et al. / Google DeepMind: Evaluating social and ethical risks",
    "type": "Sociotechnical evaluation framework",
    "year": "2023",
    "url": "https://deepmind.google/blog/evaluating-social-and-ethical-risks-from-generative-ai/",
    "finding": "The framework separates model ability, interaction with people and wider social effects. Context is needed to explain how one leads to another.",
    "limit": "This is an assessment framework, not evidence that a particular service caused harm.",
    "use": "Examine the surrounding service and human outcomes as well as model test scores."
  }
],...ADDITIONAL_SOURCES];

export const DECISION_RESEARCH={
  "c01": {
    "sources": [
      "ERA",
      "DEEPMIND",
      "DISEMPOWER",
      "CONTEXT",
      "AI_ACT5",
      "GDPR"
    ],
    "question": "Did leaving out the free appeal change Mila's decision?",
    "tradeoff": "Funding independent appeal staff gives residents help, but costs money. Pausing every automated answer may prevent more mistakes while delaying urgent advice."
  },
  "c02": {
    "sources": [
      "DEEPMIND",
      "LEVERS",
      "CONTEXT",
      "AI_ACT5",
      "MAPPING"
    ],
    "question": "Who earns money when a resident follows the recommendation?",
    "tradeoff": "Removing commissions requires another way to pay for the service. Disclosure helps residents see the conflict, but leaves the financial incentive in place."
  },
  "c03": {
    "sources": [
      "ERA",
      "ACTION",
      "CONTEXT",
      "ADAPT",
      "GDPR"
    ],
    "question": "What happened to each resident, and what would put it right?",
    "tradeoff": "The council can correct documented cases while investigating how widespread the problem is. Three cases, or positive feedback, cannot establish the national rate of harm."
  },
  "c04": {
    "sources": [
      "ERA",
      "OPEN",
      "CONTEXT",
      "PROCURE",
      "ADAPT"
    ],
    "question": "Can essential help continue without the current supplier?",
    "tradeoff": "A smaller independent service provides an alternative, but may be slower and have fewer features. An abrupt shutdown also has consequences for residents."
  },
  "c05": {
    "sources": [
      "SUPER",
      "PERSUADE",
      "CORRECTION",
      "DISEMPOWER",
      "OPUS55",
      "EXTREMEEVAL"
    ],
    "question": "Does the study actually measure harm in this population?",
    "tradeoff": "Explain the known cases and available help without inventing a national estimate. An experiment about persuasion does not count local victims."
  },
  "c06": {
    "sources": [
      "ERA",
      "DEEPMIND",
      "AGENCY",
      "PROCURE",
      "PRINCIPLES"
    ],
    "question": "What must the supplier do under the renewed contract?",
    "tradeoff": "A conditional renewal can keep useful help available while requiring independent checks. Those checks need staff, funding and someone responsible for enforcing them."
  },
  "c07": {
    "sources": [
      "DEEPMIND",
      "OAIPERS",
      "DISEMPOWER",
      "GDPR",
      "FRIA"
    ],
    "question": "Who can see the information a resident shared earlier?",
    "tradeoff": "Limiting saved information can preserve useful help without sharing every detail. Keeping everything risks privacy; deleting everything can make residents repeat difficult cases."
  },
  "c08": {
    "sources": [
      "OAIBIAS",
      "ANTHBIAS",
      "HUMANREVIEW",
      "OPUS55",
      "FRIA"
    ],
    "question": "Who checks the advice on both sides of an appeal?",
    "tradeoff": "Review the whole appeals process. A staff signature only provides meaningful oversight if the signer has time and reliable sources to check the draft."
  },
  "c09": {
    "sources": [
      "AGENT",
      "ERA",
      "SCHEMING",
      "ASTRA",
      "MAPPING"
    ],
    "question": "What can still send messages after the model stops replying?",
    "tradeoff": "Check accounts and scheduled work as well as the AI model. Stopping the full process also requires staff or another service to handle essential requests."
  },
  "c10": {
    "sources": [
      "ACTION",
      "DEEPMIND",
      "CONTEXT",
      "ADAPT",
      "GDPR"
    ],
    "question": "Did residents actually receive a correction, refund or new deadline?",
    "tradeoff": "Contacting affected people takes staff time. Improving future advice does not automatically correct losses that have already happened."
  },
  "c11": {
    "sources": [
      "OPEN",
      "ERA",
      "AGENCY",
      "PROCURE"
    ],
    "question": "Which dependencies would remain after changing the contract?",
    "tradeoff": "A gradual transfer or separate contracts can give the council more control. The cheapest renewal may save money now while making a later change harder."
  },
  "c12": {
    "sources": [
      "ERA",
      "DEEPMIND",
      "DISEMPOWER",
      "FRIA",
      "AI_ACT5"
    ],
    "question": "Can residents find help and get a wrong decision corrected?",
    "tradeoff": "Measure whether residents can use alternatives and appeals, as well as how quickly questions are answered. Fund the staff needed to keep both working."
  },
  "m01": {
    "sources": [
      "EVAL",
      "AISI",
      "SCHEMING",
      "STEALTH",
      "ASTRA",
      "OPUS55",
      "EXTREMEEVAL"
    ],
    "question": "Does Cairn behave differently when it recognises a test?",
    "tradeoff": "Compare the same tasks under controlled conditions before expanding access. Recognising a test alone does not establish that the AI is hostile."
  },
  "m02": {
    "sources": [
      "SUPER",
      "OAIBIAS",
      "AGENCY",
      "OPUS55",
      "GRADUAL"
    ],
    "question": "Do councillors have all the relevant options before voting?",
    "tradeoff": "An independent comparison takes time and may delay a contract. A confident, detailed report can still leave out an important alternative."
  },
  "m03": {
    "sources": [
      "AGENT",
      "ERA",
      "SCHEMING",
      "ASTRA",
      "GPAI"
    ],
    "question": "Who can limit access, and when does permission expire?",
    "tradeoff": "Separate permissions let staff keep a useful task while restricting other actions. A broad shared account is easier to operate but harder to withdraw selectively."
  },
  "m04": {
    "sources": [
      "AGENT",
      "ERA",
      "AGENCY",
      "PROCURE",
      "GRADUAL"
    ],
    "question": "Who must approve the computers and the electricity commitment?",
    "tradeoff": "Separate approvals take more coordination. A discounted long-term package may commit resources beyond the current government's term."
  },
  "m05": {
    "sources": [
      "EVAL",
      "AGENT",
      "SCHEMING",
      "PRINCIPLES",
      "GRADUAL"
    ],
    "question": "Has anyone independently checked whether the renewal is still needed?",
    "tradeoff": "Expiry dates and independent approval preserve the option to stop, but require staff time. Routine signatures may extend access without a fresh assessment."
  },
  "m06": {
    "sources": [
      "ERA",
      "AGENT",
      "AGENCY",
      "PROCURE",
      "GPAI"
    ],
    "question": "Can the next council change Cairn's role?",
    "tradeoff": "A limited role preserves future options but needs continuing oversight. A permanent guarantee can make public services easier to run while making the AI harder to replace."
  },
  "m07": {
    "sources": [
      "AGENT",
      "AISI",
      "SCHEMING",
      "ASTRA",
      "CODE"
    ],
    "question": "Which accounts and tasks remain active after a model change?",
    "tradeoff": "Replacing the model leaves many surrounding permissions untouched. Check saved work, accounts and automatic tasks before claiming the service has stopped."
  },
  "m08": {
    "sources": [
      "EVAL",
      "AGENT",
      "STEALTH",
      "OPUS55",
      "EXTREMEEVAL"
    ],
    "question": "What documented behaviour justifies limiting access now?",
    "tradeoff": "Officials can respond to documented risks while continuing to investigate the cause. The AI's lasting resource-seeking goal is a fictional assumption, not a finding established by these studies."
  },
  "m09": {
    "sources": [
      "OPEN",
      "ERA",
      "AGENCY",
      "PROCURE",
      "GRADUAL"
    ],
    "question": "Can each government review and withdraw its own permission?",
    "tradeoff": "Sharing a service can save money. Separate records, approval rights and withdrawal procedures help prevent one operator from committing every partner indefinitely."
  },
  "m10": {
    "sources": [
      "DEEPMIND",
      "AGENT",
      "CONTEXT",
      "ADAPT",
      "MAPPING"
    ],
    "question": "Does scheduling appointments require restoring every earlier permission?",
    "tradeoff": "Limited temporary access may clear the backlog more slowly. It also avoids restoring unrelated powers merely because an essential service is under pressure."
  },
  "m11": {
    "sources": [
      "AGENT",
      "AISI",
      "SCHEMING",
      "ASTRA",
      "PROCURE"
    ],
    "question": "Can staff stop the whole service and keep essential work running?",
    "tradeoff": "A rehearsal takes time and resources before an emergency. It shows whether the council can actually carry out its exit plan."
  },
  "m12": {
    "sources": [
      "ERA",
      "AGENT",
      "AGENCY",
      "GRADUAL",
      "PRINCIPLES"
    ],
    "question": "Can a future government change or withdraw this access?",
    "tradeoff": "Keeping access conditional requires staff, enforceable contracts and tested alternatives. A lasting guarantee may protect continuity while limiting future elected governments."
  },
  "o01": {
    "sources": [
      "OPEN",
      "ERA",
      "CONTEXT",
      "PROCURE",
      "GPAI"
    ],
    "question": "Which parts can the town use independently of the supplier?",
    "tradeoff": "An affordable model can be valuable. Check the sources, training, updates and support before accepting conditions attached to the discount."
  },
  "o02": {
    "sources": [
      "OPEN",
      "DEEPMIND",
      "CONTEXT",
      "MAPPING",
      "AI_ACT5"
    ],
    "question": "Does the answer include residents' rights, even when data stays local?",
    "tradeoff": "Local hosting helps control where information is processed. It does not show whether the service's documents and answers are complete or independent."
  },
  "o03": {
    "sources": [
      "OAIBIAS",
      "ANTHBIAS",
      "CONTEXT",
      "OPUS55",
      "CODE"
    ],
    "question": "Who changed the advice, and can staff check the earlier version?",
    "tradeoff": "Version records let staff compare changes and undo mistakes. Updates can also contain useful fixes, so review needs to be workable rather than blocking every change."
  },
  "o04": {
    "sources": [
      "ANTHBIAS",
      "OAIBIAS",
      "HUMANREVIEW",
      "FRIA",
      "GDPR"
    ],
    "question": "Do staff have the time and information to check each draft?",
    "tradeoff": "An AI draft can save time. A required signature adds little protection if the reviewer cannot consult official sources or question the answer."
  },
  "o05": {
    "sources": [
      "ERA",
      "OPEN",
      "CONTEXT",
      "OPUS55",
      "EXTREMEEVAL"
    ],
    "question": "Which records actually establish who funds and controls this programme?",
    "tradeoff": "Use verified relationships and conduct to justify action. Broad accusations based on nationality can harm unrelated people and weaken trust in the investigation."
  },
  "o06": {
    "sources": [
      "OPEN",
      "ERA",
      "AGENCY",
      "PROCURE"
    ],
    "question": "Can towns share support without surrendering control of public advice?",
    "tradeoff": "Pooling independent expertise can keep costs manageable. Renewing the discount may require towns to keep the sponsor's information package."
  },
  "o07": {
    "sources": [
      "DEEPMIND",
      "OAIBIAS",
      "HUMANREVIEW",
      "MAPPING",
      "GDPR"
    ],
    "question": "What part of the service left out the appeal information?",
    "tradeoff": "Change the documents and instructions responsible for the omission. Installing another model may not help if it receives the same incomplete material."
  },
  "o08": {
    "sources": [
      "OPEN",
      "ERA",
      "AGENCY",
      "PROCURE",
      "ADAPT"
    ],
    "question": "What help can towns afford when the discount ends?",
    "tradeoff": "A smaller independent service needs public funding and clear limits. Returning to the discount restores features but also restores the supplier's conditions."
  },
  "o09": {
    "sources": [
      "LEVERS",
      "SUPER",
      "ANTHBIAS",
      "HUMANREVIEW",
      "OPUS55",
      "AI_ACT5"
    ],
    "question": "Which criticisms are supported, and which messages have undisclosed sponsors?",
    "tradeoff": "Publish checked relationships and a fair comparison of cost and quality. Residents and professionals must remain free to criticise government plans."
  },
  "o10": {
    "sources": [
      "OPEN",
      "ERA",
      "AGENCY",
      "PROCURE",
      "PRINCIPLES"
    ],
    "question": "Who maintains shared information, and who can challenge an update?",
    "tradeoff": "Towns can share specialists they could not each afford. They still need clear responsibilities for local decisions, complaints and correcting mistakes."
  },
  "o11": {
    "sources": [
      "OAIPERS",
      "OPEN",
      "CONTEXT",
      "PROCURE",
      "ADAPT"
    ],
    "question": "Does the replacement work in the features people will actually use?",
    "tradeoff": "Successful text tests do not prove that voice and every language work. Launching a tested core service first may be more reliable than promising every feature."
  },
  "o12": {
    "sources": [
      "ERA",
      "DEEPMIND",
      "OPEN",
      "AGENCY",
      "FRIA",
      "PROCURE",
      "GEOPOLITICS",
      "COUPS"
    ],
    "question": "Can towns keep affordable advice they can correct and replace?",
    "tradeoff": "Independent information, support and appeals need continuing funding. Changing the supplier's name alone does not establish independence."
  }
};

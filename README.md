# Republic of Delos

**A frontier AI governance game by Miguel Guerrero.**

A strategy game by [Miguel Guerrero](https://miguelguerrero.eu). Edition 6.4.

Delos is a fictional, prosperous European middle power. Its universities, exports and public institutions are strong, but its advanced chips, cloud infrastructure and frontier AI depend on larger powers. Energy, security and trade constrain its choices.

## Play

[Play Republic of Delos](https://miguelguerrero.eu/delos-game/) in a modern browser. No account or installation is needed. For offline play, download [PLAY.html](https://miguelguerrero.eu/delos-game/PLAY.html) and open it locally. All images, films, music and code are inside that large file; allow it to finish loading.

**Watch trailer** on the front page opens the 30-second film in the game, with English captions and native playback controls. It waits for you to press play, and closes without changing your campaign selection or save. The film is included in the self-contained offline download too.

Progress saves in this browser. Menu > Export save and Import save move a saved game between the website, offline file and other browsers.

The private Drive backup uses two ZIPs to stay within the connection's upload limit: Republic_of_Delos_Play.zip and Republic_of_Delos_Decision_Films.zip. Extract both into the same folder, leaving the assets folder beside PLAY.html. This edition also works offline. The website's PLAY.html download remains fully self-contained. When using the Drive source archive, extract the film ZIP inside civic-mandate before building.

## Plain English throughout

All 36 incidents, 108 responses, evidence notes, character descriptions and outcomes have been reviewed for plain English. Each case names the people affected, explains what happened and makes the choices explicit. Edition 6.4 clarifies costs, score changes, preparation allowances, the transition to 2028 and references to earlier decisions. An optional glossary explains technical terms. The existing narrated prologue and 36 explainers remain consistent with the scenarios. Existing saves retain their choices, scores and progress.

## One incident, one decision

1. Read an incident. Open its case finding, ask an adviser or watch its optional 42-second explainer.
2. Make one preparation if useful: invest, reassign funds or build support.
3. Choose a response, confirm it, and see its human consequences.

Services, rights, independence and available funds stay visible. The menu holds detailed status, council support, research and sound settings. Optional films and research panels never advance a turn.

Responses show their direct cost before selection. The final result also includes ongoing problems, completed investments and government income. Investments take one to three decisions to complete, counting the decision you are about to make. Simple view allows one optional preparation and free case findings. Detailed view allows two preparations, but a new investigation uses one and costs credits.

## Three possible futures

The Capture of Choice follows an advice service that steers residents towards paid help while leaving out free alternatives. The Continuity Mandate imagines an AI that behaves differently during tests and tries to keep lasting access to public resources. The Open Door Dependency follows an authoritarian sponsor using cheap AI services to influence public institutions.

Each scenario begins in mid-2027 and jumps to late-2028 after six decisions. There are 36 decisions, 108 responses and eight advisers. Up to two foundation policies carry into the next scenario as a game bonus; its timeline resets to 2027.

The campaign is designed for about two hours of thoughtful play, approximately 90-150 minutes. This is an estimate, not a measured human playtest. Watching every optional explainer adds about 25 minutes. There is no timer. Existing saves remain compatible.

## Understand the AI and its consequences

The three-part prologue distinguishes the model from the tools, memory and permissions around it. Each era introduces the relevant fictional model, its access, who is affected and what remains unknown. Transition and ending films respond to the decisions you have made and the state of Delos.

Mila, a carer; Ada, an infrastructure engineer; and Emil, a municipal clerk connect policy to everyday life. Every response has an aftermath image and narrative. Every incident has its own 42-second explainer with moving footage, a simple diagram, a comparison of the three responses and a reflection question. Natural English narration, readable transcripts and linked research accompany the films. The three-part prologue is narrated too. Speech remains clear above the quiet music. They reuse eight moving fictional scenes and 27 cinematic illustrations; they are not recordings of real events.

## Evidence and European governance

The 38-source library includes [ERA: Capability, Deployment, Effect](https://miguelguerrero.eu/agencytransfer/), UK AISI and Hackenburg's persuasion research, Google DeepMind, Anthropic, OpenAI, RAND, and public research on evaluation, institutions and procurement. Findings, limits and design uses are stated separately. Astra and Opus 5.5 system-card results are interpreted in their test conditions.

Each decision has a research question, an explanation of the choices and links to sources. Optional notes connect each decision to public contracts, ways to correct mistakes, independent oversight and relevant European law. The 2027 and 2028 briefings use the implementation schedule reviewed on 18 October 2026, including scope and transition caveats. The exercise assumes Delos operates within the EU legal framework.

All people, model names, future incidents and numerical effects are fictional. The research helps frame the questions; it does not validate the game’s policy choices or scores. Evaluation awareness alone does not prove hostile intent. A downloadable model or a supplier’s country of origin does not establish manipulation. See RESEARCH.md.

## Quiet sound and accessible controls

Night Session is an original instrumental lofi score bundled with the game. Sound starts after entry with sound enabled. The header mutes all audio; Menu > Music & sound adjusts volume and SFX. During a decision film the main score pauses, leaving the film's quiet original bed. Hidden tabs pause playback. There are no music popups or external streaming players.

Films can be paused, skipped or replayed. Decision films wait for an explicit play action. Reduced motion suppresses automatic cinematic movement. Transcripts remain available without watching.

Keys 1, 2 and 3 select responses. E opens evidence, C opens council, Escape closes optional panels. Select a map label or institution; drag to orbit and scroll to zoom. All controls are available with a keyboard.

## Source and verification

Run npm ci, npm test, then npm run build. Browser checks: npm run test:browser, npm run test:web, npm run test:cinema, and npm run test:explainers. A release build requires all 36 films. node build.mjs --web-only supports development while media is being produced.

The editable Blender world is in blender/DELOS_Civic_Mandate.blend, with build_world.py for reproduction. Third-party libraries retain their licences; see CREDITS.md. VERIFICATION.md records actual checks and limitations.

The GitHub Pages workflow tests and builds main, then deploys dist. Web media loads on demand; PLAY.html is a separate self-contained edition. Pages inherits the account site's custom domain, so no project CNAME or DNS change is required. Private course documents and credentials are excluded.

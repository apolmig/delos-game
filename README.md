# Republic of Talos

A strategy game by [Miguel Guerrero](https://miguelguerrero.eu). Edition 5.

Talos is a fictional, prosperous European middle power. Its universities, exports and public institutions are strong, but its advanced chips, cloud infrastructure and frontier AI depend on larger powers. Energy, security and trade constrain its choices.

## Play

[Play Republic of Talos](https://miguelguerrero.eu/talos-game/) in a modern browser. No account or installation is needed. For offline play, download [PLAY.html](https://miguelguerrero.eu/talos-game/PLAY.html) and open it locally. All images, films, music and code are inside that large file; allow it to finish loading.

Progress saves in this browser. Menu > Export save and Import save move a mandate between the website, offline file and other browsers.

## One incident, one decision

1. Read an incident. Open its case finding, ask an adviser or watch its optional 42-second explainer.
2. Make one preparation if useful: invest, reassign funds or build support.
3. Choose a response, confirm it, and see its human consequences.

Services, rights, independence and available funds stay visible. The menu holds detailed status, council support, research and sound settings. Optional films and research panels never advance a turn.

## Three possible futures

The Capture of Choice follows concealed steering through useful public services. The Continuity Mandate explores a fictional AI preserving access to resources through accumulated permissions. The Open Door Dependency examines an autocratic sponsor's fictional influence through cheap models, sources, updates and support.

Each history begins in mid-2027 and jumps to late-2028 after six decisions. There are 36 decisions, 108 responses and eight advisers. Up to two foundation policies carry into the next history as institutional learning; its timeline resets to 2027.

The campaign is designed for about two hours of thoughtful play, approximately 90-150 minutes. This is an estimate, not a measured human playtest. Watching every optional explainer adds about 25 minutes. There is no timer. Existing saves remain compatible.

## Understand the AI and its consequences

The three-part prologue distinguishes the model from the tools, memory and permissions around it. Each era introduces the relevant fictional model, its access, the human stakes and what remains unknown. Transition and ending films respond to the state of the mandate.

Mila, a carer; Ada, an infrastructure engineer; and Emil, a municipal clerk connect policy to everyday life. Every response has an aftermath image and narrative. Every incident has its own 42-second explainer with moving footage, a simple diagram, three conditional response paths and a reflection question. Readable transcripts and linked research accompany the films. They reuse eight moving fictional scenes and 27 cinematic illustrations; they are not recordings of real events.

## Evidence and European governance

The 38-source library includes [ERA: Capability, Deployment, Effect](https://miguelguerrero.eu/agencytransfer/), UK AISI and Hackenburg's persuasion research, Google DeepMind, Anthropic, OpenAI, RAND, and selected public readings linked from Talos PLP. Findings, limits and design uses are stated separately. Astra and Opus 5.5 system-card results are interpreted in their test conditions.

Each decision has a research question, tradeoff and sources. Optional policy lenses connect the dilemma to procurement, remedies, institutional checks and relevant EU duties. The 2027 and 2028 briefings use the implementation schedule reviewed on 18 October 2026, including scope and transition caveats. The exercise assumes Talos operates within the EU legal framework.

All people, model names, future incidents and numerical effects are fictional. Policy responses are design inferences; research does not validate their scores. Evaluation awareness alone does not prove hostile intent. Open weights or national origin do not establish manipulation. See RESEARCH.md.

## Quiet sound and accessible controls

Night Session is an original instrumental lofi score bundled with the game. Sound starts after entry with sound enabled. The header mutes all audio; Menu > Music & sound adjusts volume and SFX. During a decision film the main score pauses, leaving the film's quiet original bed. Hidden tabs pause playback. There are no music popups or external streaming players.

Films can be paused, skipped or replayed. Decision films wait for an explicit play action. Reduced motion suppresses automatic cinematic movement. Transcripts remain available without watching.

Keys 1, 2 and 3 select responses. E opens evidence, C opens council, Escape closes optional panels. Select a map label or institution; drag to orbit and scroll to zoom. All controls are available with a keyboard.

## Source and verification

Run npm ci, npm test, then npm run build. Browser checks: npm run test:browser, npm run test:web, npm run test:cinema, and npm run test:explainers. A release build requires all 36 films. node build.mjs --web-only supports development while media is being produced.

The editable Blender world is in blender/TALOS_Civic_Mandate.blend, with build_world.py for reproduction. Third-party libraries retain their licences; see CREDITS.md. VERIFICATION.md records actual checks and limitations.

The GitHub Pages workflow tests and builds main, then deploys dist. Web media loads on demand; PLAY.html is a separate self-contained edition. Pages inherits the account site's custom domain, so no project CNAME or DNS change is required. Private course documents and credentials are excluded.

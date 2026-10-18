# Republic of Talos

A strategy game by Miguel Guerrero: https://miguelguerrero.eu

Talos is a fictional, prosperous and developed European middle power. Its universities, exports and public institutions are strong, but its advanced chips, cloud infrastructure and frontier AI depend on larger powers. Energy, security and trade relationships also constrain its choices.

## Play

[Play Republic of Talos](https://miguelguerrero.eu/talos-game/)

Open the link in a modern browser. No account or installation is needed. For fully offline play, download [PLAY.html](https://miguelguerrero.eu/talos-game/PLAY.html) and open it locally. All images, films, music and code are inside that file.

Saved games belong to each browser origin. Use Menu > Export save and Import save to move between the website and the offline file.

## A simpler turn

1. Read one incident. Read its case finding for free, ask an adviser or open Why this dilemma? to see the research.
2. If useful, make one preparation: invest, reassign funds or build support. You may skip it.
3. Choose one response and confirm. Review its consequences, then continue.

Three indicators stay in view: services, rights and independence. Funds are visible beside them. Full status, trust, council support, all investments and the detailed strategy view are in the menu. Warnings surface low trust or support. District development remains available from the map.

## The campaign

Three separate what-if histories: The Capture of Choice, The Continuity Mandate and The Open Door Dependency. Each begins in mid-2027 and jumps to late-2028 after six decisions. The full campaign has 36 decisions, 108 responses and eight characters. Up to two foundation policies carry into a new history as institutional learning; the timeline itself resets to 2027.

The target is about two hours of thoughtful play, approximately 90-150 minutes. This is an estimate, not a measured human playtest. There is no timer. The game autosaves; a portable save and decision debrief can be exported. Existing edition-1 saves remain readable and migrate to the simple view when they do not contain a view preference.

## Research and decisions

ERA: Capability, Deployment, Effect is linked to https://miguelguerrero.eu/agencytransfer/ . Sixteen sources include UK AISI and Kobi Hackenburg's political-persuasion, expert-persuader and behavioural-outcome work, alongside Google DeepMind, Anthropic and OpenAI research. Each of the 36 decisions has its own research question, tradeoff and source links.

All country details, people, models, future incidents and numeric effects are fictional. Policy options are design inferences. The research does not validate the numerical outcomes. Superpersuasion is a concern to investigate, not irresistible control; evaluation awareness alone does not prove hostile intent; open weights and national origin do not establish manipulation. See RESEARCH.md.

## Story, images and sound

Three recurring people connect the policy dilemmas to everyday life: Mila, a carer; Ada, an infrastructure engineer; and Emil, a municipal clerk. All 36 decisions have a scene, an existing Talos cinematic illustration and a consequence specific to the selected response. Eighteen images and three optional films are fictional AI-generated dramatizations.

Night Session is an original 160-second instrumental lofi score bundled with the game. Quiet sound starts with Enter the republic when the sound checkbox is selected. The header mutes all sound. Menu > Music & sound adjusts the volume and switches subtle sound effects independently. Sound pauses when the tab is hidden and music softens during reading panels. No YouTube player, popup or streaming service is used. The previous external mix is not redistributed.

## Controls and editing

Select a map label or an institution from the dropdown; drag to orbit and scroll to zoom. Keys 1, 2 and 3 select a response. E opens evidence, C opens council, Escape closes optional panels. All controls are available with a keyboard.

Source: npm ci, then npm run build. Test: npm test; npm run test:browser. Blender 5.2.2 source is in blender/TALOS_Civic_Mandate.blend, with build_world.py for reproducibility. Runtime assets are bundled locally with Three.js 0.180.0.

See VERIFICATION.md for actual checks and limits. No credentials or private source documents are included.

## GitHub Pages

The workflow in .github/workflows/pages.yml tests and builds each main-branch update, then deploys dist. The web build loads scene images, music and optional films on demand. PLAY.html is a separate, self-contained offline edition. GitHub Pages uses the account site's existing custom domain, so this repository does not need its own CNAME file or a DNS change.

Game content is authored by Miguel Guerrero. Third-party libraries retain their own licences; see CREDITS.md.

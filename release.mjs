import fs from 'node:fs/promises';import crypto from 'node:crypto';
import {CHAPTERS,CHARACTERS,DISTRICTS,EVENTS,POLICIES,PROJECTS,SOURCES,EFFECT_NOTES,DELAYED} from './src/data.js';
import {DECISION_RESEARCH} from './src/research.js';import {SCENES,ARCS} from './src/story.js';
import {OUTCOME_IMAGES,IMAGE_ALTS} from './src/visual-story.js';
const edition=JSON.parse(await fs.readFile('package.json','utf8')).version;
await fs.mkdir('delivery',{recursive:true});await fs.copyFile('dist/PLAY.html','delivery/Republic_of_Talos.html');
await fs.writeFile('delivery/Game_Data.json',JSON.stringify({edition,author:'Miguel Guerrero',website:'https://miguelguerrero.eu',play:'https://miguelguerrero.eu/talos-game/',CHAPTERS,CHARACTERS,DISTRICTS,EVENTS,POLICIES,PROJECTS,SOURCES,EFFECT_NOTES,DELAYED,DECISION_RESEARCH,SCENES,ARCS,OUTCOME_IMAGES,IMAGE_ALTS},null,2));
await fs.copyFile('qa/web-decision.png','delivery/Republic_of_Talos_Cover.png');
const report={edition,date:new Date().toISOString(),checks:{rules:38,fullCampaignBrowser:39,webAndAudio:19,cinemaBrowser:30},files:[]};
for(const file of ['dist/index.html','dist/PLAY.html','delivery/Game_Data.json','assets/audio/night-session.mp3']){const b=await fs.readFile(file);report.files.push({file,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')});}
await fs.writeFile('qa/release-v4.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));

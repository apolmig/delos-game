import fs from 'node:fs/promises';import crypto from 'node:crypto';
import {CHAPTERS,CHARACTERS,DISTRICTS,EVENTS,POLICIES,PROJECTS,SOURCES,EFFECT_NOTES,DELAYED} from './src/data.js';
import {DECISION_RESEARCH} from './src/research.js';import {SCENES,ARCS} from './src/story.js';
import {OUTCOME_IMAGES,IMAGE_ALTS} from './src/visual-story.js';
import {PROLOGUE_NARRATION} from './src/narration-data.js';
import {AI_PRIMER,AI_CONTEXT,LAW_CONTEXT,POLICY_LENSES,REVIEW_DATE,PLAIN_TERMS} from './src/context.js';
const json=async f=>JSON.parse(await fs.readFile(f,'utf8'));
const edition=(await json('package.json')).version,EXPLAINERS=await json('assets/explainers/manifest.json');
if(EXPLAINERS.status!=='complete'||Object.keys(EXPLAINERS.films).length!==36)throw Error('Film collection incomplete');
const suffix='v'+edition.split('.').slice(0,2).join('.');
const checks={};const units=await json('qa/unit-'+suffix+'.json');
if(units.fail||units.skipped||units.tests!==units.pass)throw Error('Unit checks failed');checks.rules=units.pass;
for(const [label,file] of Object.entries({fullCampaignBrowser:'revision-browser-report',webAndAudio:'web-release-report',cinemaBrowser:'cinema-browser-report',explainerBrowser:'explainers-browser-report',filmCollection:'film-collection-report',offlineFilmCollection:'film-collection-offline-report',narration:'narration-browser-report'})){
 const r=await json('qa/'+file+'.json');if(r.errors?.length||r.bad?.length||!r.checks?.length)throw Error('Incomplete '+label);checks[label]=r.checks.length;
}
for(const [id,f] of Object.entries(EXPLAINERS.films)){
 const bytes=await fs.readFile('assets/explainers/'+f.video);
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==f.sha256)throw Error('Film hash mismatch '+id);
 if(JSON.stringify(f.sourceIds)!==JSON.stringify(DECISION_RESEARCH[id].sources))throw Error('Outdated citations '+id);
}
await fs.mkdir('delivery',{recursive:true});await fs.copyFile('dist/PLAY.html','delivery/Republic_of_Delos.html');
await fs.writeFile('delivery/Game_Data.json',JSON.stringify({edition,author:'Miguel Guerrero',website:'https://miguelguerrero.eu',play:'https://miguelguerrero.eu/delos-game/',REVIEW_DATE,CHAPTERS,CHARACTERS,DISTRICTS,EVENTS,POLICIES,PROJECTS,SOURCES,EFFECT_NOTES,DELAYED,DECISION_RESEARCH,SCENES,ARCS,OUTCOME_IMAGES,IMAGE_ALTS,AI_PRIMER,AI_CONTEXT,LAW_CONTEXT,POLICY_LENSES,PLAIN_TERMS,PROLOGUE_NARRATION,EXPLAINERS},null,2));
const report={edition,date:new Date().toISOString(),checks,sourceCount:SOURCES.length,filmCount:36,filmSeconds:42,files:[]};
for(const file of ['dist/index.html','dist/PLAY.html','delivery/Game_Data.json','assets/explainers/manifest.json','assets/audio/narration-manifest.json','assets/trailer/manifest.json','assets/social/republic-of-delos-v6.jpg']){const b=await fs.readFile(file);report.files.push({file,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')});}
report.scope='Plain-English review, explicit response costs, accurate preparation counts, score explanations, technical glossary and clear early-ending navigation. Existing media and game rules are retained.';
report.clarity=await json('qa/clarity-browser-report.json');
report.saveCompatibility=await json('qa/delos-browser.json');
report.layout=await json('qa/editorial-layout-report.json');
report.gameRulesUnchanged=(await json('qa/mechanical-comparison.json')).equal;
await fs.writeFile('qa/release-'+suffix+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));

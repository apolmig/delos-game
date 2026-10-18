import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import * as G from '../src/engine.js';import {EVENTS} from '../src/data.js';
import {SCENES} from '../src/story.js';import {SOURCES,DECISION_RESEARCH} from '../src/research.js';
import {outcomeStory,cinematicStory,civicCondition,OUTCOME_IMAGES} from '../src/visual-story.js';
test('All 108 responses have a distinct aftermath image per incident, never the opening image',()=>{
 let count=0;for(let chapter=0;chapter<3;chapter++)for(let turn=0;turn<12;turn++){
 const e=EVENTS[chapter][turn];assert.equal(new Set(OUTCOME_IMAGES[e.id]).size,3);
 for(let i=0;i<3;i++){const s=G.createGame({chapter,simple:true});s.turn=turn;s.settings.prologueSeen=true;G.prepare(s);s.stats.budget=100;s.stats.support=100;s.investigated=[e.id];assert.ok(G.choose(s,i).ok);
 const v=outcomeStory(s);assert.equal(v.route,e.options[i].route);assert.notEqual(v.image,SCENES[e.id].image);assert.notEqual(v.image,v.context.image);assert.ok(fs.existsSync('assets/scenes/'+v.image+'.webp'));assert.ok(fs.existsSync('assets/scenes/'+v.context.image+'.webp'));
 assert.deepEqual(outcomeStory(G.loadGame(G.saveGame(s))),v);count++;}}
 assert.equal(count,108);
});
function horizon(chapter,route){const s=G.createGame({chapter,simple:true});G.prepare(s);for(let t=0;t<6;t++){s.stats={budget:100,trust:80,services:80,rights:80,autonomy:80,support:100};s.investigated.push(G.event(s).id);G.choose(s,G.event(s).options.findIndex(o=>o.route===route));G.continueSession(s);}return s;}
test('2028 films retain actual decisions and change with the route and republic condition',()=>{
 for(let c=0;c<3;c++){const careful=horizon(c,0),risky=horizon(c,1);risky.stats.autonomy=28;
 const a=cinematicStory(careful,'era'),b=cinematicStory(risky,'era');assert.equal(careful.phase,'era');assert.notDeepEqual(a.shots,b.shots);assert.ok(a.facts.length>=2);assert.ok(b.facts.length>=2);
 for(const s of [careful,risky])for(const f of cinematicStory(s,'era').facts)assert.ok(s.history.some(h=>h.type==='decision'&&EVENTS[h.chapter][h.turn].id===f.id));
 assert.equal(G.loadGame(G.saveGame(careful)).turn,6);
 }
});
test('Endings reflect both mandate success and early institutional emergency',()=>{
 for(let c=0;c<3;c++){const s=G.createGame({chapter:c});s.turn=11;s.results=[{win:true,grade:'A guarded recovery'}];const good=cinematicStory(s,'ending');s.results=[{win:false,grade:'An unfinished mandate'}];s.stats.rights=20;const bad=cinematicStory(s,'ending');assert.notDeepEqual(good.shots,bad.shots);s.turn=3;s.criticalStreak=3;assert.match(cinematicStory(s,'ending').shots[0].kicker,/2027/);assert.match(cinematicStory(s,'ending').shots[0].title,/early/);}
});
test('The wider-impact image responds to each weak institution independently',()=>{
 for(const k of ['services','rights','autonomy']){const s=G.createGame();s.stats.services=s.stats.rights=s.stats.autonomy=80;s.stats[k]=25;assert.equal(civicCondition(s).metric,k);assert.equal(civicCondition(s).low,true);}
});
test('New research is linked to decisions and states its evidence limits',()=>{
 for(const id of ['AGENCY','DISEMPOWER','SCHEMING','STEALTH','HUMANREVIEW','CONTEXT']){const r=SOURCES.find(x=>x.id===id);assert.ok(r?.limit.length>40);assert.ok(Object.values(DECISION_RESEARCH).some(x=>x.sources.includes(id)));}
 assert.match(SOURCES.find(x=>x.id==='HUMANREVIEW').finding,/did not find/);assert.match(SOURCES.find(x=>x.id==='AGENCY').limit,/theoretical/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import * as G from '../src/engine.js';
import * as data from '../src/data.js';
import {LEGACY_RESPONSE_TITLES} from '../src/legacy-copy.js';
import {outcomeStory} from '../src/visual-story.js';

test('The editorial release preserves every decision cost, effect, requirement, route and delay',()=>{
 const pick=(v,keys)=>Object.fromEntries(keys.map(k=>[k,v[k]]).filter(([,v])=>v!==undefined));
 const d=data,project={VERSION:d.VERSION,EVENTS:d.EVENTS.map(ch=>ch.map(e=>({...pick(e,['id','district','speaker','callback','sources']),options:e.options.map(o=>pick(o,['route','effects','flag','needs','support']))}))),DELAYED:d.DELAYED.map(x=>pick(x,['chapter','turn','flag','effects'])),POLICIES:d.POLICIES.map(x=>pick(x,['id','branch','tier','cost','turns','requires','effect'])),PROJECTS:d.PROJECTS.map(x=>pick(x,['id','cost','turns','effect','protect'])),DISTRICTS:d.DISTRICTS.map(x=>pick(x,['id','q','r'])),CHARACTERS:d.CHARACTERS.map(x=>pick(x,['id','metric']))};
 const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/pre-editorial-rules.json',import.meta.url)));
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(project)).digest('hex'),fixture.sha256);
});

test('All 108 previous response titles restore the same choice, result and progress',()=>{
 let count=0;
 for(let chapter=0;chapter<3;chapter++)for(let turn=0;turn<12;turn++){
  const e=data.EVENTS[chapter][turn];
  for(const [oldTitle,newTitle] of Object.entries(LEGACY_RESPONSE_TITLES[e.id])){
   const s=G.createGame({chapter,mode:'scenario',simple:true});s.turn=turn;G.prepare(s);s.stats.budget=s.stats.support=100;s.investigated=[e.id];
   const index=e.options.findIndex(o=>o.title===newTitle);assert.ok(index>=0);assert.ok(G.choose(s,index).ok);
   const expected=G.copy(s);s.history.at(-1).choice=oldTitle;s.history.at(-1).title='Old incident wording';s.history.at(-1).text='Old response wording';s.lastResolution.choice=oldTitle;s.lastResolution.title='Old incident wording';s.lastResolution.desc='Old response wording';
   const restored=G.loadGame(G.saveGame(s));
   assert.deepEqual(restored.stats,expected.stats);assert.deepEqual(restored.flags,expected.flags);assert.deepEqual(restored.snapshots,expected.snapshots);assert.equal(restored.seed,expected.seed);assert.equal(restored.turn,turn);assert.equal(restored.phase,'resolution');
   assert.equal(restored.history.at(-1).choice,newTitle);assert.equal(restored.lastResolution.desc,e.options[index].desc);assert.equal(outcomeStory(restored).route,e.options[index].route);
   G.continueSession(restored);G.continueSession(expected);assert.deepEqual(restored,expected);count++;
  }
 }
 assert.equal(count,108);
});

test('Old choices remain readable after a year change and after moving to another scenario',()=>{
 const s=G.createGame({simple:true});G.prepare(s);
 for(let i=0;i<12;i++){
  s.stats={budget:100,trust:80,services:80,rights:80,autonomy:80,support:100};const e=G.event(s);s.investigated.push(e.id);G.choose(s,e.options.findIndex(o=>o.route===0));G.continueSession(s);if(s.phase==='era')G.prepare(s);
 }
 G.nextChapter(s);
 const expected=G.copy(s);
 for(const h of s.history.filter(h=>h.type==='decision')){const id=data.EVENTS[h.chapter][h.turn].id;h.choice=Object.entries(LEGACY_RESPONSE_TITLES[id]).find(([,v])=>v===h.choice)[0];}
 const restored=G.loadGame(G.saveGame(s));assert.deepEqual(restored,expected);assert.equal(restored.chapter,1);assert.equal(restored.turn,0);
});

test('An unknown saved response is still rejected',()=>{
 const s=G.createGame({simple:true});G.prepare(s);G.choose(s,0);s.lastResolution.choice='Invented response';
 assert.throws(()=>G.loadGame(G.saveGame(s)),/unknown response/);
});

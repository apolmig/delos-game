import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {EVENTS} from '../src/data.js';
import {SOURCES,DECISION_RESEARCH} from '../src/research.js';
import {AI_CONTEXT,POLICY_LENSES,LAW_CONTEXT} from '../src/context.js';
const manifest=JSON.parse(fs.readFileSync('assets/explainers/manifest.json','utf8'));
test('Every decision has a distinct 30–60 second explainer with continuous transcript coverage',()=>{
 const events=EVENTS.flat(),films=events.map(e=>manifest.films[e.id]);assert.equal(films.length,36);assert.equal(new Set(films.map(f=>f.video)).size,36);assert.equal(new Set(films.map(f=>f.transcript)).size,36);
 for(let i=0;i<films.length;i++){const f=films[i],e=events[i];assert.equal(f.id,e.id);assert.ok(f.duration>=30&&f.duration<=60);assert.equal(f.segments[0].start,0);assert.equal(f.segments.at(-1).end,f.duration);f.segments.slice(1).forEach((s,n)=>assert.equal(s.start,f.segments[n].end));assert.deepEqual(f.options.map(o=>o.route).sort(),[0,1,2]);for(const o of e.options)assert.equal(f.options.find(x=>x.route===o.route).title,o.title);}
});
test('All three AI histories have distinct 2027/2028 capability, exposure and uncertainty briefings',()=>{
 assert.equal(AI_CONTEXT.length,3);for(const c of AI_CONTEXT){assert.notEqual(c.first.name,c.later.name);for(const era of [c.first,c.later])for(const k of ['capability','deployment','stakes','unknown'])assert.ok(era[k].length>40);}
 assert.match(AI_CONTEXT[1].first.unknown,/explicit fictional assumption/);assert.match(AI_CONTEXT[2].first.unknown,/neither openness nor national origin/);
});
test('Public research, system-card and regulatory claims resolve to bounded public sources',()=>{
 const ids=new Set(SOURCES.map(s=>s.id));assert.equal(ids.size,SOURCES.length);
 for(const s of SOURCES){assert.ok(s.finding&&s.limit&&s.use);assert.ok(s.url.startsWith('https://'));}
 for(const r of [...Object.values(DECISION_RESEARCH),...AI_CONTEXT,...Object.values(POLICY_LENSES),LAW_CONTEXT])for(const id of r.sources)assert.ok(ids.has(id),id);
 for(const id of ['ASTRA','OPUS55','PROCURE','AI_ACT5','GPAI','FRIA'])assert.ok(Object.values(DECISION_RESEARCH).some(r=>r.sources.includes(id)),id);
 assert.match(LAW_CONTEXT.first.text,/2 December 2027/);assert.match(LAW_CONTEXT.later.text,/2 August 2028/);assert.match(LAW_CONTEXT.later.text,/transitional/);
});

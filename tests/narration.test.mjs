import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {PROLOGUE_NARRATION} from '../src/narration-data.js';
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
test('All 36 narrated films ship the verified audio edition without changing incident identities',()=>{
 const manifest=JSON.parse(fs.readFileSync('assets/explainers/manifest.json'));assert.equal(manifest.narrated,true);assert.equal(Object.keys(manifest.films).length,36);
 for(const [id,f] of Object.entries(manifest.films)){assert.equal(f.id,id);assert.equal(f.narrated,true);assert.equal(f.narration.language,'en-GB');assert.equal(f.narration.sceneAligned,true);assert.ok(f.narration.maximumTimeAdjustment<=1.2);assert.equal(hash('assets/explainers/'+f.video),f.sha256,id);assert.ok(f.narrationTranscript.length>200);}
});
test('Three distinct offline prologue tracks match their delivered media',()=>{
 const manifest=JSON.parse(fs.readFileSync('assets/audio/narration-manifest.json'));assert.equal(manifest.prologue.length,3);assert.equal(new Set(PROLOGUE_NARRATION).size,3);assert.match(PROLOGUE_NARRATION[0],/frontier AI governance game/);
 for(const f of manifest.prologue){assert.ok(f.duration>30&&f.duration<60);assert.equal(hash(f.file),f.sha256);}
});

import {chromium} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import * as G from '../src/engine.js';import {EVENTS} from '../src/data.js';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:process.platform==='win32'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
const checks=[],errors=[],requests=[];const check=(n,ok)=>{assert.ok(ok,n);checks.push(n);};
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
const url=process.env.TALOS_URL||new URL('../dist/PLAY.html',import.meta.url).href;
const click=async a=>page.locator(`#modal-root [data-action="${a}"], [data-action="${a}"]`).filter({visible:true}).first().click();
const get=()=>page.evaluate(()=>window.Talos.getState());
async function load(s){s.settings.prologueSeen=true;await page.locator('#import-file').setInputFiles({name:'visual-story-save.json',mimeType:'application/json',buffer:Buffer.from(G.saveGame(s))});await page.waitForFunction(expected=>{const s=window.Talos.getState();return s.chapter===expected.chapter&&s.turn===expected.turn&&s.phase===expected.phase&&s.lastResolution?.choice===expected.lastResolution?.choice;},s);}
function through(chapter,route,n=6){const s=G.createGame({chapter,simple:true});G.prepare(s);for(let t=0;t<n;t++){if(s.phase==='era')G.prepare(s);s.stats={budget:100,services:80,rights:80,trust:80,autonomy:80,support:100};s.investigated.push(G.event(s).id);G.choose(s,G.event(s).options.findIndex(o=>o.route===route));G.continueSession(s);}return s;}
try{
await page.goto(url);await page.waitForFunction(()=>window.Talos?.getWorldStats()?.ready);
await click('new');await page.waitForFunction(()=>document.querySelector('.cinema video')?.currentTime>.3);
check('Opening film plays moving footage',await page.locator('.cinema video').evaluate(v=>v.videoWidth===1280&&v.currentTime>.2));
await page.locator('[data-film-control="toggle"]').click();const time=await page.locator('.cinema video').evaluate(v=>v.currentTime);await page.waitForTimeout(350);check('Pause freezes footage',Math.abs(await page.locator('.cinema video').evaluate(v=>v.currentTime)-time)<.1);
await page.screenshot({path:'qa/v4-prologue.png'});await page.locator('[data-film-control="skip"]').click();check('Skip preserves game phase',(await get()).phase==='brief');
await click('prologue-next');await click('prologue-next');await click('prologue-finish');await page.locator('[data-film-control="skip"]').click();await page.screenshot({path:'qa/v4-opening.png'});await click('begin');
await click('choice:0');await click('enact');const image=await page.locator('.outcome-hero img').getAttribute('src');check('Aftermath displays a new human scene',await page.locator('.outcome-hero img').evaluate(i=>i.complete&&i.naturalWidth>0));
await page.locator('.republic-impact summary').click();await page.locator('.impact-scene img').evaluate(i=>i.decode());check('Wider impact has a second, different visual',await page.locator('.impact-scene img').getAttribute('src')!==image);await page.locator('.republic-impact').scrollIntoViewIfNeeded();await page.screenshot({path:'qa/v4-impact.png'});
await page.locator('.outcome-research > summary').click();check('Aftermath offers findings and limitations',await page.locator('.outcome-research .research-cards article').count()>=3);await page.locator('.outcome-research').scrollIntoViewIfNeeded();await page.screenshot({path:'qa/v4-research.png'});
const saved=await get();await page.reload();await page.waitForFunction(()=>window.Talos?.getWorldStats()?.ready);await click('resume');check('Resume retains the response-specific image',(await page.locator('.outcome-hero img').getAttribute('src'))===image);
let alt=G.createGame({simple:true});G.prepare(alt);G.choose(alt,1);await load(alt);check('Alternative response changes the aftermath picture',await page.locator('.outcome-hero img').getAttribute('src')!==image);
for(let c=0;c<3;c++){
 const s=through(c,0);await load(s);check(`Future ${c+1} reaches the 2028 film`,await page.locator('.cinema[data-kind="era"]').count()===1);await page.locator('[data-film-control="skip"]').click();await page.screenshot({path:`qa/v4-era-${c+1}-protected.png`});const text=await page.locator('.inheritance').innerText();
 const weak=through(c,1);weak.stats.autonomy=25;await load(weak);check(`Future ${c+1} remembers a different path`,await page.locator('.inheritance').innerText()!==text);await page.locator('[data-film-control="skip"]').click();await page.screenshot({path:`qa/v4-era-${c+1}-dependent.png`});
 check(`Skipping future ${c+1} does not start a turn`,(await get()).phase==='era');await click('begin');check(`Future ${c+1} enters its seventh decision`,(await get()).turn===6&&(await get()).phase==='playing');
 const end=through(c,0,12);end.stats.services=end.stats.rights=end.stats.autonomy=80;end.results=[G.resultFor(end)];await load(end);check(`Future ${c+1} has a mandate ending film`,await page.locator('.cinema[data-kind="ending"]').count()===1);await page.locator('[data-film-control="skip"]').click();await page.screenshot({path:`qa/v4-ending-${c+1}.png`});
}
const reduced=through(1,0);reduced.settings.reducedMotion=true;await load(reduced);check('Saved reduced-motion preference prevents autoplay',await page.locator('.cinema video').evaluate(v=>v.paused&&!v.getAttribute('src')));await page.waitForTimeout(200);check('Reduced motion does not run film timers',await page.locator('.cinema').getAttribute('data-shot')==='0');
for(const [width,height] of [[390,844],[768,1024]]){await page.setViewportSize({width,height});check(`Film has no overflow at ${width}px`,await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));await page.screenshot({path:`qa/v4-era-${width}.png`});}
await page.setViewportSize({width:1440,height:1000});const legacy=G.createGame();G.prepare(legacy);delete legacy.settings.simple;delete legacy.settings.prologueSeen;await load(G.loadGame(G.saveGame(legacy)));check('Existing save format remains compatible',!!(await get()));
check('No runtime errors',errors.length===0);if(!process.env.TALOS_URL)check('All new media works fully offline',requests.length===0);
await fs.writeFile('qa/cinema-browser-report.json',JSON.stringify({date:new Date().toISOString(),url,checks,errors,networkRequests:requests.length},null,2));console.log(JSON.stringify({checks:checks.length,errors,networkRequests:requests.length}));
}finally{await browser.close();}

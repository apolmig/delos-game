import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as G from '../src/engine.js';
import {EVENTS} from '../src/data.js';
const version=JSON.parse(await fs.readFile('package.json','utf8')).version;
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)});
const page=await browser.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
const click=async a=>page.locator(`[data-action="${a}"]`).filter({visible:true}).first().click();
const check=(name,pass)=>{assert.ok(pass,name);checks.push(name);};
const get=()=>page.evaluate(()=>window.Delos.getState());
const restore=async s=>{await page.locator('#import-file').setInputFiles({name:'clarity-save.json',mimeType:'application/json',buffer:Buffer.from(G.saveGame(s))});await page.waitForFunction(({turn,phase,simple})=>{const s=window.Delos.getState();return s?.turn===turn&&s.phase===phase&&s.settings.simple===simple;},{turn:s.turn,phase:s.phase,simple:s.settings.simple});};
try{
 await page.goto(process.env.DELOS_URL||'http://127.0.0.1:4186/');await page.waitForFunction(v=>window.Delos?.version===v,version);
 await page.locator('.difficulty-settings summary').click();await page.locator('input[name="difficulty"][value="pressure"]').check();
 check('Difficulty summary follows the selected mode',(await page.locator('.difficulty-settings summary').innerText()).includes('under pressure'));
 await page.locator('input[name="difficulty"][value="standard"]').check();await page.locator('.difficulty-settings summary').click();
 await page.screenshot({path:'qa/clarity-home.png'});
 let s=G.createGame({simple:true});s.settings.prologueSeen=true;s.settings.reducedMotion=true;G.prepare(s);await restore(s);
 const options=EVENTS[0][0].options;
 for(let i=0;i<3;i++){const cost=options[i].effects.budget||0;check(`Response ${i+1} states its direct cost before selection`,await page.locator(`[data-action="choice:${i}"] .response-cost`).innerText()===(cost<0?`Costs ${-cost} credits`:cost>0?`Adds ${cost} credits`:'No direct cost'));}
 await click('district');check('Simple view displays the actual preparation allowance',(await page.locator('.district-modal-status').innerText()).includes('1/1'));await click('close');
 await click('investigate');check('Free findings preserve the available preparation',(await get()).actions===1&&(await get()).stats.budget===s.stats.budget);await click('close');
 await click('prepare');await click('research:appeals');check('Funding a safeguard spends the one preparation',(await get()).actions===0);await click('district');check('After spending it, the district shows zero of one',(await page.locator('.district-modal-status').innerText()).includes('0/1'));await click('close');
 await click('choice:0');await click('enact');s=await get();
 check('Result explains why total changes differ from response effects',(await page.locator('.result-explanation').innerText()).includes('ongoing problems'));
 const details=page.locator('details').filter({has:page.locator('summary',{hasText:'Full result and research basis'})});await details.locator('summary').click();
 check('Income and upkeep shown match the actual result',(await details.innerText()).includes(`${s.lastResolution.income} credits of government income and ${s.lastResolution.upkeep} credits`));
 check('A one-decision safeguard is complete after that decision',s.policies.includes('appeals')&&s.lastResolution.opened.some(x=>x.includes('review decisions')));await page.screenshot({path:'qa/clarity-result.png'});
 s=G.createGame({simple:false});s.settings.prologueSeen=true;G.prepare(s);await restore(s);await click('district');check('Detailed view displays two available preparations',(await page.locator('.district-modal-status').innerText()).includes('2/2'));await click('close');
 const before=await get();await click('investigate');const after=await get();check('Detailed investigation really uses one preparation and three credits',after.actions===before.actions-1&&after.stats.budget===before.stats.budget-3);await click('close');
 s=G.createGame({simple:true});s.settings.prologueSeen=true;G.prepare(s);s.stats.budget=1;await restore(s);const unavailable=options.findIndex(o=>o.effects.budget<-1);check('An unaffordable response explains both cost and available funds',(await page.locator(`[data-action="choice:${unavailable}"] .requirement`).innerText()).includes('you have 1'));
 s=G.createGame({simple:true});s.settings.prologueSeen=true;G.prepare(s);G.choose(s,0);s.criticalStreak=3;await restore(s);check('Early ending button describes a review, not another year',(await page.locator('[data-action="continue"]').innerText()).includes('Review why'));await click('continue');check('Early ending actually opens the scenario review',(await get()).phase==='chapterEnd');
 s=G.createGame({simple:true});s.settings.prologueSeen=true;G.prepare(s);await restore(s);await click('menu');await click('help');await page.locator('.plain-terms summary').click();check('Optional glossary explains evaluation awareness without claiming deception',(await page.locator('.plain-terms').innerText()).includes('This alone does not show that it is deceiving anyone.'));
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'qa/clarity-help-mobile.png',fullPage:true});check('Help has no horizontal overflow on a phone',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await click('close');
 await page.screenshot({path:'qa/clarity-decision-mobile.png',fullPage:true});check('Decision costs fit on a phone',await page.locator('.response-cost').evaluateAll(els=>els.every(e=>e.scrollWidth<=e.clientWidth+1)));
 assert.deepEqual(errors,[]);await fs.writeFile('qa/clarity-browser-report.json',JSON.stringify({version,date:new Date().toISOString(),checks,errors},null,2));console.log(JSON.stringify({checks:checks.length,errors}));
}finally{await browser.close();}

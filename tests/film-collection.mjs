import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as G from '../src/engine.js';
import {EVENTS} from '../src/data.js';
const url=process.env.DELOS_URL||'http://127.0.0.1:4186/';
const offline=process.env.DELOS_OFFLINE==='1';
const portable=process.env.DELOS_PORTABLE==='1';
const target=portable?new URL('../delivery/portable/PLAY.html',import.meta.url).href:offline?new URL('../dist/PLAY.html',import.meta.url).href:url;
const checks=[],errors=[],bad=[],network=[],seekSamples=[];
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const check=(name,pass)=>{assert.ok(pass,name);checks.push(name);};
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
 page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()});});
 page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
 await page.goto(target,{timeout:120000});await page.waitForFunction(()=>window.Delos?.version==='6.3.0');
 for(let chapter=0;chapter<3;chapter++)for(let turn=0;turn<12;turn++){
  const ev=EVENTS[chapter][turn],state=G.createGame({chapter,simple:true});state.turn=turn;state.settings.prologueSeen=true;state.settings.reducedMotion=true;G.prepare(state);
  await page.locator('#import-file').setInputFiles({name:'collection-check.json',mimeType:'application/json',buffer:Buffer.from(G.saveGame(state))});
  await page.waitForFunction(([c,t])=>{const s=window.Delos.getState();return s?.chapter===c&&s?.turn===t&&s.phase==='playing';},[chapter,turn]);
  await page.locator('[data-action="film"]').filter({visible:true}).first().click();
  const video=page.locator('[data-decision-film]');
  check(ev.id+' selects its own film',await video.getAttribute('data-decision-film')===ev.id);
  await video.evaluate(v=>{v.preload='metadata';v.load();});
  await page.waitForFunction(()=>document.querySelector('[data-decision-film]')?.readyState>=1);
  check(ev.id+' decodes as a complete 42-second film',await video.evaluate(v=>v.duration===42&&v.videoWidth===1280&&v.videoHeight===720&&!v.error));
  if(turn===0||turn===6){
   await video.evaluate(v=>v.play());await page.waitForFunction(()=>document.querySelector('[data-decision-film]')?.currentTime>1);
   await video.evaluate(v=>{v.pause();v.currentTime=38;});
   await page.waitForFunction(()=>{const v=document.querySelector('[data-decision-film]');return v&&!v.seeking&&v.readyState>=2;});
   const seekState=await video.evaluate(v=>({time:v.currentTime,error:v.error?.message||null,ready:v.readyState,seekable:Array.from({length:v.seekable.length},(_,i)=>[v.seekable.start(i),v.seekable.end(i)])}));
   seekSamples.push({id:ev.id,...seekState});
   check(ev.id+' plays and seeks to its closing scene',seekState.time>=38&&!seekState.error);
   await video.screenshot({path:'qa/v5-film-'+ev.id+'-closing.png'});
  }
  await page.locator('[data-action="return-film"]').click();
 }
 check('All films load without failed responses',bad.length===0);
 check('All films run without JavaScript errors',errors.length===0);
 if(offline||portable)check('Offline films make no network requests',network.length===0);
 const report={url:target,date:new Date().toISOString(),checks,errors,bad,networkRequests:network.length,seekSamples};
 await fs.writeFile('qa/film-collection'+(portable?'-portable':offline?'-offline':'')+'-report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({checks:checks.length,errors,bad,networkRequests:network.length}));
}finally{await browser.close();}

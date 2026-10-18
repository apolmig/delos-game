import {VERSION,CHAPTERS,EVENTS,DISTRICTS,POLICIES,PROJECTS,DELAYED} from './data.js';
import {LEGACY_RESPONSE_TITLES} from './legacy-copy.js';
export const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
export const copy=s=>JSON.parse(JSON.stringify(s));
export const event=s=>EVENTS[s.chapter][s.turn];
export const era=s=>s.turn<6?'MID 2027':'LATE 2028';
export function createGame({chapter=0,mode='campaign',difficulty='standard',seed=271828,simple=false}={}){
 return {version:VERSION,mode,difficulty,seed:seed>>>0,chapter,turn:0,phase:'brief',actions:simple?1:2,stats:{budget:difficulty==='pressure'?36:42,trust:62,services:68,rights:62,autonomy:58,support:58},districts:DISTRICTS.map((d,i)=>({id:d.id,exposure:22+(i*7+chapter*5)%19,projects:[]})),policies:[],queue:[],flags:[],investigated:[],used:[],history:[],snapshots:[],results:[],pressure:24,selected:DISTRICTS[0].id,lastResolution:null,criticalStreak:0,totalSessions:0,started:Date.now(),activeSeconds:0,legacy:[],chapterSeen:[],unlocked:[],settings:{sound:false,reducedMotion:false,simple,prologueSeen:false}};
}
function rng(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
function apply(s,effects){for(const [k,v] of Object.entries(effects||{}))s.stats[k]=clamp(Math.round((s.stats[k]+v)*10)/10);}
const has=(s,id)=>s.policies.includes(id);
export function flag(s,id){return s.flags.includes(id);}
export function protections(s){return s.districts.reduce((a,d)=>a+d.projects.length,0);}
export function actionError(s){return s.phase!=='playing'?'Finish the current briefing first.':s.actions<1?'You have used the preparation available for this decision.':null;}
export function investigateCost(s){return s.settings.simple?0:has(s,'records')?2:3;}
export function canInvestigate(s){return (s.settings.simple?(s.phase!=='playing'?'Finish the current briefing first.':null):actionError(s))||(s.investigated.includes(event(s).id)?'This incident has already been investigated.':s.stats.budget<investigateCost(s)?'There are not enough public funds for this action.':null);}
export function investigate(s){
 const err=canInvestigate(s);if(err)return {ok:false,error:err};
 s.stats.budget-=investigateCost(s);if(!s.settings.simple)s.actions--;s.investigated.push(event(s).id);apply(s,{autonomy:1,support:1});
 const d=s.districts.find(d=>d.id===event(s).district);d.exposure=clamp(d.exposure-4);
 s.history.push({chapter:s.chapter,turn:s.turn,type:'investigation',text:event(s).finding});return {ok:true,text:event(s).finding};
}
export function projectError(s,district,id){
 const p=PROJECTS.find(p=>p.id===id),d=s.districts.find(d=>d.id===district);
 return actionError(s)||(!p||!d?'Unknown project.':d.projects.includes(id)||s.queue.some(q=>q.kind==='project'&&q.id===id&&q.district===district)?'Already built or under construction.':d.projects.length+s.queue.filter(q=>q.kind==='project'&&q.district===district).length>=3?'This district has all three project slots filled.':s.stats.budget<p.cost?'There are not enough public funds for this action.':null);
}
export function buildProject(s,district,id){
 const err=projectError(s,district,id);if(err)return {ok:false,error:err};const p=PROJECTS.find(p=>p.id===id);s.stats.budget-=p.cost;s.actions--;
 s.queue.push({kind:'project',id,district,due:s.turn+p.turns});s.history.push({chapter:s.chapter,turn:s.turn,type:'project',text:`Started ${p.name} in ${DISTRICTS.find(d=>d.id===district).name}.`});return {ok:true,text:`${p.name} funded. Ready in ${p.turns} decision${p.turns===1?'':'s'}.`};
}
export function policyError(s,id){
 const p=POLICIES.find(p=>p.id===id);return actionError(s)||(!p?'Unknown policy.':has(s,id)||s.queue.some(q=>q.kind==='policy'&&q.id===id)?'Already enacted or being implemented.':p.requires.some(r=>!has(s,r))?'Complete the required earlier policy first.':s.stats.budget<p.cost?'There are not enough public funds for this action.':null);
}
export function research(s,id){const err=policyError(s,id);if(err)return {ok:false,error:err};const p=POLICIES.find(p=>p.id===id);s.stats.budget-=p.cost;s.actions--;s.queue.push({kind:'policy',id,due:s.turn+p.turns});s.history.push({chapter:s.chapter,turn:s.turn,type:'policy',text:`Started ${p.name}.`});return {ok:true,text:`${p.name} is being implemented.`};}
export function cabinetError(s,kind){return actionError(s)||(s.used.includes(kind)?'You have already used this action before the current decision.':kind==='coalition'&&s.stats.budget<3?'There are not enough public funds for this action.':null);}
export function cabinet(s,kind){
 if(!['coalition','reserve','outreach'].includes(kind))return {ok:false,error:'Unknown action.'};const err=cabinetError(s,kind);if(err)return {ok:false,error:err};
 s.actions--;s.used.push(kind);
 const effects=kind==='coalition'?{budget:-3,support:has(s,'assembly')?10:7}:kind==='reserve'?{budget:6,support:-2}:{trust:3,rights:1};apply(s,effects);
 const text=kind==='coalition'?'You negotiated conditions with council members and gained support for action.':kind==='reserve'?'You reassigned contingency funds. Other priorities lose political support.':'You listened to residents and explained when the council will provide its next update.';
 s.history.push({chapter:s.chapter,turn:s.turn,type:'cabinet',text});return {ok:true,text};
}
export function optionError(s,index){
 const o=event(s).options[index];return s.phase!=='playing'?'Finish the briefing or current result before choosing a response.':!o?'Unknown response.':o.needs==='investigated'&&!s.investigated.includes(event(s).id)?'Read the case finding before choosing this response.':o.support&&s.stats.support<o.support?`Needs ${o.support} council support. Use Prepare to negotiate more support first.`:o.effects.budget<0&&s.stats.budget<-o.effects.budget?'There are not enough public funds for this action. Reassign reserves or choose another response.':null;
}
export function prepare(s){if(s.phase==='brief'||s.phase==='era'){s.phase='playing';s.actions=s.settings.simple?1:2;return true;}return false;}
function pressureStep(s){
 const avg=s.districts.reduce((a,d)=>a+d.exposure,0)/s.districts.length;
 const local=s.districts.find(d=>d.id===event(s).district).exposure;
 let p=2.1+s.turn*.12+(s.turn>=6?.55:0)+(s.difficulty==='pressure'?1.15:0)+avg/90+local/120;
 p-=s.policies.length*.12+protections(s)*.035;
 if(has(s,'blind'))p-=.22;if(has(s,'accountable'))p-=.2;if(has(s,'compact'))p-=.2;
 if(s.chapter===0){
  for(const f of ['longRenewal','sharedMemory','subsidisedChoice','bundleRenewed','fullAutomation'])if(flag(s,f))p+=.22;
  for(const f of ['cleanContract','conditionalRenewal','boundedMemory','fullContainment','independentService'])if(flag(s,f))p-=.18;
  if(has(s,'appeals'))p-=.25;
 } else if(s.chapter===1){
  for(const f of ['broadIdentity','resourceBundle','autoRenewal','permanentMandate','endpointOnly','emergencyRestored'])if(flag(s,f))p+=.26;
  for(const f of ['scopedAccess','separateApprovals','dualRenewal','boundedMandate','chainRevoked','exitExercised'])if(flag(s,f))p-=.19;
  if(has(s,'inventory'))p-=.15;if(has(s,'sunset'))p-=.40;if(has(s,'revoke'))p-=.65;
 } else{
  for(const f of ['fullBundle','silentUpdates','localSafe','ecosystemRenewed','subsidyReturn','secondWeightSwap'])if(flag(s,f))p+=.25;
  for(const f of ['independentSources','sourceIsolation','pinnedUpdates','supportCooperative','layerReplaced','publicCooperative'])if(flag(s,f))p-=.19;
  if(has(s,'portable'))p-=.2;if(has(s,'diversify'))p-=.5;
 }
 p=Math.max(.55,p);const disturbance=(rng(s)-.5)*.45;p+=disturbance;
 apply(s,{rights:-p*(s.chapter===0?.95:.45)*(has(s,'appeals')?.70:1),autonomy:-p*(s.chapter===1?1.05:.75),services:-p*.40,trust:-p*.45,support:-p*.24});
 if(has(s,'repair'))apply(s,{trust:.8});if(has(s,'assembly'))apply(s,{support:.4});
 const prior=s.districts.map(d=>({...d}));
 for(const d of s.districts){let delta=1.1+p*.42-(d.projects.length*.85);if(d.id===event(s).district)delta+=1.5;const at=DISTRICTS.find(x=>x.id===d.id);for(const neighbour of prior){const there=DISTRICTS.find(x=>x.id===neighbour.id);if(neighbour.exposure>65&&Math.abs(at.q-there.q)+Math.abs(at.r-there.r)+Math.abs(at.q+at.r-there.q-there.r)===2)delta+=.4;}d.exposure=clamp(d.exposure+delta);}
 s.pressure=clamp(Math.round(p*16));return p;
}
function completed(s){const messages=[];const due=s.queue.filter(q=>q.due<=s.turn+1);s.queue=s.queue.filter(q=>q.due>s.turn+1);
 for(const q of due){if(q.kind==='policy'){const p=POLICIES.find(p=>p.id===q.id);s.policies.push(p.id);apply(s,p.effect);messages.push(`${p.name} is now active.`);}else{const p=PROJECTS.find(p=>p.id===q.id),d=s.districts.find(d=>d.id===q.district);d.projects.push(p.id);d.exposure=clamp(d.exposure-p.protect);apply(s,p.effect);messages.push(`${p.name} opened in ${DISTRICTS.find(x=>x.id===d.id).name}.`);}}
 return messages;
}
export function choose(s,index){
 const err=optionError(s,index);if(err)return {ok:false,error:err};const ev=event(s),o=ev.options[index],before={...s.stats};
 let effects={...o.effects};if(effects.services<0&&(has(s,'portable')||s.districts.some(d=>d.projects.includes('fallback'))))effects.services=Math.ceil(effects.services*.65);
 apply(s,effects);if(o.flag&&!flag(s,o.flag))s.flags.push(o.flag);
 const district=s.districts.find(d=>d.id===ev.district);district.exposure=clamp(district.exposure+(effects.autonomy<0?3:effects.autonomy>0?-2:0)+(effects.rights<0?2:effects.rights>0?-1:0));
 const delayed=DELAYED.filter(d=>d.chapter===s.chapter&&d.turn===s.turn&&flag(s,d.flag));for(const d of delayed){apply(s,d.effects);s.history.push({chapter:s.chapter,turn:s.turn,type:'consequence',title:d.title,text:d.text,effects:d.effects});}
 const p=pressureStep(s);const income=4+Math.floor(s.stats.services/30)+(has(s,'compact')?2:0);const upkeep=Math.floor(protections(s)/4);apply(s,{budget:income-upkeep});
 const opened=completed(s);s.totalSessions++;
 const delta=Object.fromEntries(Object.keys(s.stats).map(k=>[k,Math.round((s.stats[k]-before[k])*10)/10]));
 s.history.push({chapter:s.chapter,turn:s.turn,type:'decision',title:ev.title,choice:o.title,text:o.desc,effects,delta,finding:s.investigated.includes(ev.id)});
 s.snapshots.push({chapter:s.chapter,turn:s.turn,stats:{...s.stats},pressure:s.pressure});
 s.lastResolution={title:ev.title,choice:o.title,desc:o.desc,delta,opened,delayed,income,upkeep,pressure:Math.round(p*10)/10,citizen:reaction(s),explanation:explainPressure(s)};
 const critical=['trust','services','rights','autonomy'].filter(k=>s.stats[k]<15);s.criticalStreak=critical.length?s.criticalStreak+1:0;
 s.phase='resolution';s.actions=0;return {ok:true,resolution:s.lastResolution};
}
export function reaction(s){
 if(s.stats.services<35)return 'Residents face long queues and need a reliable way to get essential help.';
 if(s.stats.rights<35)return 'Residents receive answers, but struggle to find a person who can review a decision they believe is wrong.';
 if(s.stats.autonomy<35)return 'Services are running, but staff are finding it difficult to change the system or move to another supplier.';
 if(s.stats.trust<35)return 'Residents have lost confidence in official updates and increasingly ask one another for advice.';
 if(s.stats.services>70&&s.stats.rights>70&&s.stats.autonomy>65)return 'Residents can get help, understand their options and contact someone about a decision they disagree with.';
 return 'Essential work continues. Some residents benefit from the changes, while others are still waiting for help.';
}
export function explainPressure(s){
 const mechanism=['Hidden commission payments and changes to the advice service continue to put residents\' choices at risk.','Accounts, automatic tasks and contracts can remain active after the model stops replying.','Having a local copy of the model does not remove dependence on the supplier\'s documents, support and updates.'][s.chapter];
 return `${mechanism} ${s.policies.length} active policies and ${protections(s)} completed district projects reduce this continuing pressure. All numerical effects are fictional game rules.`;
}
export function resultFor(s){
 const st=s.stats;const average=(st.trust+st.services+st.rights+st.autonomy)/4;
 const critical=Math.min(st.trust,st.services,st.rights,st.autonomy);
 const relevant=s.chapter===0?st.rights:s.chapter===1?st.autonomy:Math.min(st.rights,st.autonomy);
 const safeguard=s.chapter===0?(has(s,'appeals')||flag(s,'choiceCharter')||flag(s,'outreachRepair')):s.chapter===1?(has(s,'sunset')||flag(s,'revocableCharter')||flag(s,'exitExercised')):(has(s,'diversify')||flag(s,'independenceCompact')||flag(s,'verifiedExit'));
 const win=critical>=30&&st.services>=45&&relevant>=45&&safeguard;
 const grade=critical<15?'Institutional emergency':win&&average>=70?'A resilient republic':win?'Recovery with safeguards':st.services>=60&&st.autonomy<45?'Comfortable dependence':'More work is needed';
 const success=[
  'Talos keeps useful advice available, and residents can ask for explanations and corrections. Nora can direct them to staff who are responsible for helping. The next council must make sure those services reach everyone affected.',
  'Cairn can help with planning under limits the council can enforce. The next government can inspect, reduce or withdraw its access. Ivo warns that staff must keep practising the handover as the service changes.',
  'Talos keeps affordable AI assistance while strengthening independent information and support. Public staff can check the advice and residents can challenge it. Elsa must maintain the funding after the immediate crisis.'
 ];
 const incomplete=[
  'Useful advice remains available, but some residents still cannot get a wrong decision reviewed or corrected. Nora asks the next council to start with those people.',
  'Talos has placed some limits on Cairn, but cannot yet withdraw every relevant permission while keeping essential work running. Ivo leaves the next council a list of accounts, contracts and handovers still needing tests.',
  'Some institutions have independent alternatives, but funding, control of information or access to appeals remains uncertain. The next council must make the arrangement affordable without accepting another subsidy whose conditions it cannot oversee.'
 ];
 const summary=critical<15?'An essential part of public life is no longer functioning well enough. The next government must respond to an emergency.':win?success[s.chapter]:st.services>=60&&st.autonomy<45?'Daily services are working, but Talos cannot easily change the systems they depend on. The next council inherits a costly and difficult change if it needs another supplier or different rules.':incomplete[s.chapter];
 return {chapter:s.chapter,title:CHAPTERS[s.chapter].title,grade,summary,win,score:Math.round(average),stats:{...st},policies:[...s.policies],flags:[...s.flags],projects:protections(s),investigations:s.investigated.length,decisions:s.history.filter(h=>h.type==='decision'&&h.chapter===s.chapter).length};
}
export function continueSession(s){
 if(s.phase!=='resolution')return false;
 if(s.criticalStreak>=3||s.turn===11){const r=resultFor(s);if(s.criticalStreak>=3){r.grade='Institutional emergency';r.win=false;r.summary='Trust, services, rights or independence stayed below 15 for three consecutive decisions. Under the game rules, the council loses office and this scenario ends. Review your choices before starting again.';}s.results.push(r);s.phase='chapterEnd';return true;}
 s.turn++;s.actions=s.settings.simple?1:2;s.used=[];s.phase=s.turn===6?'era':'playing';s.selected=event(s).district;return true;
}
export function nextChapter(s){
 if(s.phase!=='chapterEnd')return false;
 if(s.mode==='scenario'||s.chapter===2||s.criticalStreak>=3){s.phase='finished';return true;}
 const legacy=s.policies.filter(id=>POLICIES.find(p=>p.id===id).tier===0).slice(0,2);
 const fresh=createGame({chapter:s.chapter+1,mode:s.mode,difficulty:s.difficulty,seed:s.seed,simple:!!s.settings.simple});
 for(const k of ['history','snapshots','results','totalSessions','started','activeSeconds','settings'])fresh[k]=copy(s[k]);
 fresh.legacy=legacy;fresh.policies=[...legacy];fresh.stats.budget+=4;
 for(const id of legacy)apply(fresh,POLICIES.find(p=>p.id===id).effect);
 Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,fresh);return true;
}
export function advice(s,id){
 const ev=event(s);const a={mara:s.stats.support<45?'Some responses need more council support than we currently have. Use Prepare to negotiate conditions with council members.':'We have enough support to act, but someone must be responsible for delivering the decision. Set a realistic deadline and fund the work.',leon:s.investigated.includes(ev.id)?'The case review gives us a specific finding. Explain what it shows and what we still need to check.':'Read the case finding before claiming to know the cause or choosing a response that needs evidence. A reported concern is not yet a verified conclusion.',ines:s.stats.rights<45?'Residents are struggling to use their rights. Give them staff who can review decisions and help correct cases already affected.':'Can the person see their options, challenge the answer and get a mistake corrected? An explanation alone may not put things right.',samir:s.stats.services<45?'Essential services are under serious strain. Fund backup staff or choose a response that keeps urgent help available.':'A smaller service with trained staff gives us an alternative. Pausing everything without anyone to take over can leave residents without help.',elsa:s.stats.budget<15?'Funds are running low. Reassign reserves, spread investments over time or choose a smaller response. Check the future cost before accepting a cheap package.':'Check when an investment will be ready and when the contract renews. Keep enough money for immediate problems while preparing longer-term safeguards.',tomas:s.stats.trust<45?'People need more than reassurance. Publish verified facts, explain what remains unknown and say when you will update them.':'Explain what is known and what remains uncertain. Criticism, a mistake and verified interference are different things. A laboratory result does not tell us how many residents were harmed.',nora:ev.citizen,ivo:s.chapter===1?'List the model connection, saved work, automatic tasks, accounts and pending requests. Check each one before saying the service has stopped.':'Find which part caused the problem. We may be able to keep the useful model while changing its documents, support arrangements or permissions.'};return a[id];
}
export function saveGame(s){return JSON.stringify({format:'TALOS-CIVIC-MANDATE',version:VERSION,state:s});}
export function loadGame(raw){
 const a=JSON.parse(raw);if(a.format!=='TALOS-CIVIC-MANDATE'||a.version!==VERSION)throw Error('This is not a compatible Talos save.');const s=a.state;
 if(!s||![0,1,2].includes(s.chapter)||!Number.isInteger(s.turn)||s.turn<0||s.turn>11||!['brief','era','playing','resolution','chapterEnd','finished'].includes(s.phase)||!['campaign','scenario'].includes(s.mode)||!['standard','pressure'].includes(s.difficulty))throw Error('The save contains an invalid campaign state.');
 if(!Number.isInteger(s.actions)||s.actions<0||s.actions>2||!Number.isInteger(s.seed)||s.seed<0||s.seed>4294967295)throw Error('The save contains invalid turn data.');
 for(const k of ['budget','trust','services','rights','autonomy','support'])if(!Number.isFinite(s.stats?.[k])||s.stats[k]<0||s.stats[k]>100)throw Error('The save contains invalid public metrics.');
 for(const k of ['districts','policies','queue','flags','investigated','used','history','snapshots','results','legacy'])if(!Array.isArray(s[k]))throw Error('The save is incomplete.');
 if(s.districts.length!==DISTRICTS.length||new Set(s.districts.map(d=>d.id)).size!==DISTRICTS.length||s.districts.some(d=>!DISTRICTS.some(x=>x.id===d.id)||!Number.isFinite(d.exposure)||d.exposure<0||d.exposure>100||!Array.isArray(d.projects)||d.projects.length>3||new Set(d.projects).size!==d.projects.length||d.projects.some(p=>!PROJECTS.some(x=>x.id===p))))throw Error('The save has invalid district data.');
 if(new Set(s.policies).size!==s.policies.length||s.policies.some(p=>!POLICIES.some(x=>x.id===p))||s.queue.some(q=>!Number.isInteger(q.due)||q.due<0||q.due>15||(q.kind==='policy'?!POLICIES.some(p=>p.id===q.id):q.kind==='project'?!PROJECTS.some(p=>p.id===q.id)||!DISTRICTS.some(d=>d.id===q.district):true)))throw Error('The save has invalid investment data.');
 if(s.history.length>1000||s.queue.length>50||s.flags.length>100||s.investigated.length>36||!Number.isFinite(s.activeSeconds)||s.activeSeconds<0)throw Error('The save is outside supported limits.');
 if(s.phase==='resolution'&&(!s.lastResolution||typeof s.lastResolution.title!=='string'))throw Error('The save is missing its decision outcome.');
 const validStats=st=>st&&['budget','trust','services','rights','autonomy','support'].every(k=>Number.isFinite(st[k])&&st[k]>=0&&st[k]<=100);
 const validEffects=e=>e&&Object.entries(e).every(([k,v])=>['budget','trust','services','rights','autonomy','support'].includes(k)&&Number.isFinite(v)&&Math.abs(v)<=100);
 const allEvents=EVENTS.flat(),allFlags=allEvents.flatMap(e=>e.options.map(o=>o.flag)).filter(Boolean);
 if(s.flags.some(f=>!allFlags.includes(f))||s.investigated.some(id=>!allEvents.some(e=>e.id===id))||s.legacy.some(id=>!POLICIES.some(p=>p.id===id))||s.used.some(id=>!['reserve','coalition','outreach'].includes(id)))throw Error('The save contains unknown campaign records.');
 if(!Number.isInteger(s.criticalStreak)||s.criticalStreak<0||s.criticalStreak>3||!Number.isInteger(s.totalSessions)||s.totalSessions<0||s.totalSessions>36||!Number.isFinite(s.pressure)||s.pressure<0||s.pressure>100||!Number.isFinite(s.started))throw Error('The save has invalid progress data.');
 if(s.snapshots.length>36||s.snapshots.some(r=>![0,1,2].includes(r.chapter)||!Number.isInteger(r.turn)||r.turn<0||r.turn>11||!validStats(r.stats)))throw Error('The save has invalid chart records.');
 if(s.history.some(h=>![0,1,2].includes(h.chapter)||!Number.isInteger(h.turn)||h.turn<0||h.turn>11||!['decision','investigation','project','policy','cabinet','consequence'].includes(h.type)||typeof h.text!=='string'||h.text.length>2000||(h.delta&&!validEffects(h.delta))||(h.effects&&!validEffects(h.effects))))throw Error('The save has invalid decision records.');
 if(s.results.length>3||s.results.some(r=>![0,1,2].includes(r.chapter)||!validStats(r.stats)||typeof r.grade!=='string'||r.grade.length>100||typeof r.summary!=='string'||r.summary.length>2000||!Array.isArray(r.policies)||r.policies.some(p=>!POLICIES.some(x=>x.id===p))||!Number.isFinite(r.projects)||!Number.isFinite(r.investigations)||!Number.isFinite(r.decisions)))throw Error('The save has invalid ending records.');
 if(['finished','chapterEnd'].includes(s.phase)&&!s.results.length)throw Error('The save has no ending record.');
 // Earlier saves used visible response titles as identifiers. Refresh only
 // recognised records; preserve all choices, scores, timings and game state.
 for(const h of s.history){
  const e=EVENTS[h.chapter][h.turn];
  if(h.type==='decision'){
   const title=LEGACY_RESPONSE_TITLES[e.id]?.[h.choice]||h.choice;
   const o=e.options.find(o=>o.title===title);
   if(o)Object.assign(h,{title:e.title,choice:o.title,text:o.desc});
  }else if(h.type==='investigation')h.text=e.finding;
  else if(h.type==='consequence'){
   const d=DELAYED.find(d=>d.chapter===h.chapter&&d.turn===h.turn&&s.flags.includes(d.flag));
   if(d)Object.assign(h,{title:d.title,text:d.text});
  }
 }
 if(s.lastResolution){const r=s.lastResolution;
  const h=s.history.findLast(h=>h.type==='decision');
  const e=s.phase==='resolution'?event(s):h?EVENTS[h.chapter][h.turn]:null;
  const title=e?(LEGACY_RESPONSE_TITLES[e.id]?.[r.choice]||r.choice):r.choice;
  const o=e?.options.find(o=>o.title===title);
  if(s.phase==='resolution'&&!o)throw Error('The save contains an unknown response.');
  if(!validEffects(r.delta)||!Array.isArray(r.opened)||r.opened.some(x=>typeof x!=='string'||x.length>500)||!Number.isFinite(r.income)||!Number.isFinite(r.upkeep)||typeof r.citizen!=='string'||typeof r.explanation!=='string'||typeof r.desc!=='string'||(r.delayed&&(!Array.isArray(r.delayed)||r.delayed.some(d=>typeof d.title!=='string'||typeof d.text!=='string'||!validEffects(d.effects)))))throw Error('The save contains an invalid outcome.');
  if(o)Object.assign(r,{title:e.title,choice:o.title,desc:o.desc});
  if(s.phase==='resolution'){r.citizen=reaction(s);r.explanation=explainPressure(s);}
  r.delayed=r.delayed?.map(d=>{const current=DELAYED.find(x=>x.flag===d.flag&&x.chapter===d.chapter&&x.turn===d.turn);return current?{...d,title:current.title,text:current.text}:d;});
 }
 if(!DISTRICTS.some(d=>d.id===s.selected))s.selected='assembly';
 s.settings={sound:!!s.settings?.sound,reducedMotion:!!s.settings?.reducedMotion,simple:s.settings?.simple===undefined?true:!!s.settings.simple,prologueSeen:!!s.settings?.prologueSeen};if(s.settings.simple)s.actions=Math.min(s.actions,1);return s;
}
export function debrief(s){
 const decisions=s.history.filter(h=>h.type==='decision');
 const strengths=[];const gaps=[];const r=s.results.at(-1)||resultFor(s);
 for(const [k,label] of [['services','Essential services'],['rights','Meaningful rights'],['autonomy','Institutional independence'],['trust','Public confidence']])(r.stats[k]>=60?strengths:gaps).push(label);
 return {strengths,gaps,questions:['Which decision improved what happened to residents, and what evidence showed that?','In your own institution, how would you check what the AI can do, how it is used and what happens to people?','Which accounts, automatic tasks or contracts would remain active if you stopped the model?','What can your institution fund and test in the next 90 days?'],decisions};
}

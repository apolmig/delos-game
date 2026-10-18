import {EVENTS,CHAPTERS} from './data.js';
import {SCENES,ARCS,storyAfter} from './story.js';

// Curated by stable route, not shuffled button position. Images are representative
// dramatizations; captions never turn a face into evidence of a real incident.
const O=name=>'outcome-'+name;
const rows={
 c01:['appeal','backlog','deadline'], c02:['oversight','records','deadline'],
 c03:['home-repair','records','deadline'], c04:['independent','lockin','backlog'],
 c05:['records','oversight','deadline'], c06:['oversight','lockin','independent'],
 c07:['home-repair','deadline','appeal'], c08:['records','lockin','oversight'],
 c09:['rehearsal','lockin','deadline'], c10:['home-repair','records','backlog'],
 c11:['independent','lockin','oversight'], c12:['appeal','deadline','independent'],
 m01:['records','oversight','backlog'], m02:['oversight','lockin','rehearsal'],
 m03:['rehearsal','lockin','records'], m04:['oversight','lockin','rehearsal'],
 m05:['oversight','lockin','records'], m06:['rehearsal','lockin','oversight'],
 m07:['rehearsal','lockin','backlog'], m08:['records','lockin','oversight'],
 m09:['oversight','lockin','records'], m10:['independent','lockin','backlog'],
 m11:['rehearsal','records','oversight'], m12:['rehearsal','lockin','oversight'],
 o01:['independent','lockin','backlog'], o02:['records','lockin','rehearsal'],
 o03:['records','lockin','oversight'], o04:['oversight','lockin','backlog'],
 o05:['records','oversight','lockin'], o06:['independent','lockin','oversight'],
 o07:['independent','lockin','deadline'], o08:['independent','lockin','backlog'],
 o09:['records','oversight','deadline'], o10:['independent','lockin','backlog'],
 o11:['independent','lockin','oversight'], o12:['independent','lockin','appeal']
};
export const OUTCOME_IMAGES=Object.fromEntries(Object.entries(rows).map(([k,v])=>[k,v.map(O)]));
export const IMAGE_ALTS={
 appeal:'A resident and a caseworker discuss a paper appeal at a public desk.',
 backlog:'Residents wait outside an office in the rain, supporting one another.',
 rehearsal:'Two engineers inspect a checklist and a network connection in a control room.',
 independent:'Library staff help an older resident using a sourcebook and a laptop.',
 oversight:'Civic delegates compare documents before signing a decision.',
 lockin:'A worried public clerk waits for remote support while residents wait at the counter.',
 'home-repair':'Two neighbours work through a housing file at a kitchen table.',
 deadline:'A resident holds a paper and phone on a tram at dusk.',
 records:'A journalist and an official compare documentary sources.'
};
export function imageAlt(key){return IMAGE_ALTS[key.replace('outcome-','')]||Object.values(SCENES).find(s=>s.image===key)?.place||'Public life in the fictional Republic of Talos';}

export function civicCondition(s){
 const weakest=['services','rights','autonomy'].reduce((a,b)=>s.stats[a]<=s.stats[b]?a:b);
 const low=s.stats[weakest]<45;
 const scenes={
 services:{image:low?O('backlog'):O('independent'),title:low?'The cost reaches the queue.':'The doors are still open.',text:low?'Service capacity is strained. Residents absorb the delay, even where a safeguard is justified.':'Essential help remains available. Keeping it available will still require staff and resources.'},
 rights:{image:low?O('deadline'):O('appeal'),title:low?'An answer is not a way back.':'A person can still ask why.',text:low?'Rights are the weakest part of this mandate. A formal promise may be difficult to turn into a usable remedy.':'Residents retain routes to reasons and appeal. The next test is whether those routes reach the people who need them.'},
 autonomy:{image:low?O('lockin'):O('rehearsal'),title:low?'Open for business. Harder to change.':'Control takes work.',text:low?'Independence is under pressure. A useful service can become difficult for its public owners to alter or leave.':'Talos retains room to inspect and change its services. That capacity needs maintenance, not just a signature.'}
 };
 return {...scenes[weakest],metric:weakest,low,value:Math.round(s.stats[weakest])};
}

export function outcomeStory(s){
 const e=EVENTS[s.chapter][s.turn],o=e.options.find(o=>o.title===s.lastResolution?.choice);
 if(!o)throw Error('A known response is required for the aftermath');
 const context=civicCondition(s),primary=OUTCOME_IMAGES[e.id][o.route];
 // Avoid showing the same illustration twice in one outcome.
 if(context.image===primary)context.image=['g1_c04','g2_c03','g3_c03'][s.chapter];
 return {event:e.id,route:o.route,image:primary,alt:imageAlt(primary),text:storyAfter(e,o.title),context,
  researchQuestion:['Did the repair reach a person?','Can the next council still change course?','Who keeps the service answerable?'][s.chapter]};
}

const has=(s,...flags)=>flags.some(f=>s.flags.includes(f));
export function inheritedChoices(s){
 const groups=[
  [
   ['c01','appealRoute','A door kept open','You protected an independent appeal route. The task in 2028 is keeping it reachable.'],
   ['c02','cleanContract','The incentive was separated','You separated public advice from referrals. The new service still needs honest funding.'],
   ['c03','caseRepair','Earlier files can reopen','You reopened affected deadlines. Check whether the remedy reached each household.'],
   ['c04','staffedFallback','A service behind the pause','You funded a limited fallback. Simpler help costs staff time but preserves an alternative.'],
   ['c06','conditionalRenewal','The contract can be revisited','Your six-month renewal requires review. A later model does not remove that obligation.']
  ],
  [
   ['m01','blindComparison','The clean test was not clearance','You held expansion for a matched comparison. Test awareness remains a question to investigate.'],
   ['m03','scopedAccess','Authority has a boundary','You scoped the connector and gave it an expiry. Staff must maintain both as roles change.'],
   ['m04','separateApprovals','Two commitments, two approvals','You separated compute and energy decisions. One signature cannot silently stand for both.'],
   ['m05','dualRenewal','Renewal needs a second judgment','You required independent approval. A recurring task must still return to accountable people.'],
   ['m06','boundedMandate','A mandate with an exit','Your bounded mandate leaves the next council a choice. Now test whether exit works in practice.']
  ],
  [
   ['o01','independentSources','The sources have an owner','Your pilot used independent sources. Keeping them current is now public work.'],
   ['o02','sourceIsolation','The layers were tested separately','You inspected the source layer. Local hosting alone cannot answer every influence question.'],
   ['o03','pinnedUpdates','An update is a decision','You pinned and reviewed updates. Independent review must continue when new staff arrive.'],
   ['o05','authenticatedSponsor','Attribution followed the record','You authenticated the sponsor relationship. Origin alone was not your evidence.'],
   ['o06','supportCooperative','Independence has people behind it','You pooled independent support. The service must stay affordable after the first grant.']
  ]
 ];
 const completed=s.history.filter(h=>h.type==='decision'&&h.chapter===s.chapter);
 const facts=groups[s.chapter].filter(([id,flag])=>has(s,flag)).slice(-2).map(([id,flag,title,text])=>({id,title,text}));
 // Include an actual unsafeguarded decision, rather than infer a promise from a score.
 const gap=completed.find(h=>{const e=EVENTS[h.chapter][h.turn];return e.options.find(o=>o.title===h.choice)?.route!==0;});
 if(gap){const e=EVENTS[gap.chapter][gap.turn];facts.push({id:e.id,title:gap.choice,text:storyAfter(e,gap.choice)});}
 if(facts.length<2){for(const h of completed.slice(-2)){if(facts.some(f=>f.id===EVENTS[h.chapter][h.turn].id))continue;facts.push({id:EVENTS[h.chapter][h.turn].id,title:h.choice,text:storyAfter(EVENTS[h.chapter][h.turn],h.choice)});}}
 return facts.slice(0,3);
}

const shot=(video,image,kicker,title,text)=>({video,image,kicker,title,text});
export function cinematicStory(s,kind){
 const ch=CHAPTERS[s.chapter],arc=ARCS[s.chapter],condition=civicCondition(s);
 const initial=[['home','g1_c01','An answer. A missing choice.','Mila needs housing advice. A helpful service leaves out the free appeal.'],['lab','g2_c01','The demonstration was flawless.','Ada sees a different answer when the evaluation banner disappears.'],['library','g3_c01','The town can finally afford it.','Emil opens a multilingual help desk. The subsidy comes with dependencies.']][s.chapter];
 if(kind==='opening')return {kind,title:ch.title,shots:[shot('assembly','g2_c06','MID 2027 / REPUBLIC OF TALOS','A country worth protecting.','Prosperous. Democratic. Dependent on technology it does not control.'),shot(initial[0],initial[1],'FUTURE '+ch.n,initial[2],initial[3])],facts:[]};
 if(kind==='prologue')return {kind,title:'Republic of Talos',shots:[shot('assembly','g2_c06','MID 2027','Ordinary lives. Consequential choices.','You chair the council. The signatures are yours. The consequences belong to everyone.'),shot('library','g3_c01','YOUR REPUBLIC','Useful technology. Public responsibility.','Keep services working, rights usable, and the freedom to change course.')],facts:[]};
 if(kind==='era'){
  const facts=inheritedChoices(s);
  const contextClip={services:condition.low?'queue':'library',rights:condition.low?'counter':'hearing',autonomy:condition.low?'racks':'hearing'}[condition.metric];
  const bounded=[has(s,'conditionalRenewal','caseRepair','staffedFallback'),has(s,'boundedMandate','scopedAccess','dualRenewal'),has(s,'supportCooperative','independentSources','pinnedUpdates')][s.chapter];
  const first=facts[0];
  return {kind,title:'Eighteen months later.',facts,shots:[shot(bounded?'hearing':['home','racks','counter'][s.chapter],bounded?O('oversight'):condition.image,'2027 / WHAT YOU SET IN MOTION',bounded?'A safeguard becomes daily work.':'Convenience becomes an inheritance.',first?first.text:'Your earlier choices remain in the contracts, routines and public expectations.'),shot(contextClip,condition.image,'LATE 2028 / THE SAME REPUBLIC',condition.title,condition.text)]};
 }
 const r=s.results.at(-1),early=s.turn<11;
 const win=!!r?.win&&!early;
 return {kind:'ending',title:r?.grade||'Your mandate',facts:inheritedChoices(s),shots:[shot(win?'assembly':condition.low?'queue':['home','racks','counter'][s.chapter],win?[O('home-repair'),O('rehearsal'),O('independent')][s.chapter]:condition.image,(early?(s.turn<6?'MID 2027':'LATE 2028'):'LATE 2028')+' / MANDATE REVIEW',early?'The mandate ends early.':win?'A republic that can still choose.':condition.title,early?'An essential institution could not recover in time. The next council inherits the emergency.':win?arc.win:arc.loss),shot(win?'hearing':['home','racks','counter'][s.chapter],win?O('oversight'):O('lockin'),'THE NEXT COUNCIL',win?'Keep the capacity to say no.':'The story remains unfinished.',win?'Safeguards need owners, funding and another rehearsal. This is an achievement to maintain.':'Which decision would you revisit, and what evidence would make that choice better?')]};
}

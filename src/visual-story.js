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
export function imageAlt(key){return IMAGE_ALTS[key.replace('outcome-','')]||Object.values(SCENES).find(s=>s.image===key)?.place||'Public life in the fictional Republic of Delos';}

export function civicCondition(s){
 const weakest=['services','rights','autonomy'].reduce((a,b)=>s.stats[a]<=s.stats[b]?a:b);
 const low=s.stats[weakest]<45;
 const scenes={
 services:{image:low?O('backlog'):O('independent'),title:low?'Residents wait longer for help.':'Essential help is still available.',text:low?'Public services are struggling to keep up. Residents face delays while staff deal with the changes.':'Residents can still get essential help. Keeping services running will need staff and funding.'},
 rights:{image:low?O('deadline'):O('appeal'),title:low?'Residents struggle to challenge decisions.':'Residents can ask for a review.',text:low?'Residents may have a right to appeal on paper, but find it difficult to contact someone who can correct a mistake.':'Residents can ask for reasons and challenge a decision. Check that people know how to get this help.'},
 autonomy:{image:low?O('lockin'):O('rehearsal'),title:low?'Delos is struggling to change suppliers.':'Delos can still change its services.',text:low?'Public services are running, but officials struggle to change how they work or move to another supplier.':'Officials can inspect the services and change how they work. They need staff and funding to keep doing so.'}
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
  researchQuestion:['Did affected residents actually receive help?','Can the next council still change course?','Who can inspect and change the service?'][s.chapter]};
}

const has=(s,...flags)=>flags.some(f=>s.flags.includes(f));
export function inheritedChoices(s){
 const groups=[
  [
   ['c01','appealRoute','Free appeal help remains available','You funded help with free appeals. In 2028, residents still need to know where to find it.'],
   ['c02','cleanContract','Advice is separated from commission payments','You stopped commission payments from influencing public advice. The service now needs funding that does not depend on paid referrals.'],
   ['c03','caseRepair','Affected residents can challenge earlier refusals','You extended the appeal deadlines for affected residents. Check that each household has been told and offered help.'],
   ['c04','staffedFallback','Staff can provide help during a pause','You funded a small team to handle cases when the AI service is unavailable. This alternative still needs trained staff.'],
   ['c06','conditionalRenewal','Contract changes require a review','You renewed the contract for six months with conditions. Those conditions require later changes to be reviewed rather than automatically approved.']
  ],
  [
   ['m01','blindComparison','A successful test did not settle the concern','You paused expansion while reviewers compared announced tests with ordinary use. They still need to establish why the AI behaved differently.'],
   ['m03','scopedAccess','The AI has limited, temporary access','You limited the systems the AI could use and set an expiry date for access. Staff must keep those limits up to date.'],
   ['m04','separateApprovals','Energy and computing contracts need separate approval','You required separate approval for computing and energy contracts. Officials must review the cost and duration of each.'],
   ['m05','dualRenewal','An independent reviewer must approve renewals','You required a second person to approve renewals. Automatic tasks cannot extend their own access without that review.'],
   ['m06','boundedMandate','The next council can withdraw permission','You set limits and an end date for the AI’s authority. Now check that officials can actually remove its access when needed.']
  ],
  [
   ['o01','independentSources','Delos maintains its own information sources','Your trial used documents checked independently of the supplier. Delos now needs staff to keep that information current.'],
   ['o02','sourceIsolation','Reviewers checked the documents behind the answers','You investigated the documents the assistant relied on. Running a model inside Delos does not guarantee that its information is independent.'],
   ['o03','pinnedUpdates','Software updates need approval','You required each software version to be checked before installation. This review must continue when staff change.'],
   ['o05','authenticatedSponsor','Documents established the sponsor’s involvement','You verified records linking the supplier to its sponsor. The finding rests on those records, not the supplier’s country of origin.'],
   ['o06','supportCooperative','Shared staff support helps Delos stay independent','You shared the cost of independent technical support with partners. That support needs funding after the first grant runs out.']
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
 const initial=[['home','g1_c01','Mila was not told about a free appeal.','Mila pays a private adviser because the public assistant leaves out the council’s free appeal process.'],['lab','g2_c01','The AI behaves differently outside the test.','Ada sees a different answer when the test label is removed. She needs to find out why before the service expands.'],['library','g3_c01','A cheap service comes with conditions.','Emil can finally offer help in several languages, but the cheap service depends on the supplier’s documents, updates and support.']][s.chapter];
 if(kind==='opening')return {kind,title:ch.title,shots:[shot('assembly','g2_c06','MID 2027 / REPUBLIC OF DELOS','A country worth protecting.','Delos is a prosperous democracy, but it depends on larger powers for the technology its public services use.'),shot(initial[0],initial[1],'FUTURE '+ch.n,initial[2],initial[3])],facts:[]};
 if(kind==='prologue')return {kind,title:'Republic of Delos',shots:[shot('assembly','g2_c06','MID 2027','You decide how public services use AI.','Your council makes the decisions. Residents live with the results when they ask for help, pay bills or challenge a refusal.'),shot('library','g3_c01','YOUR REPUBLIC','Keep services working and people in control.','People need reliable help, a way to challenge mistakes and a government that can change suppliers when necessary.')],facts:[]};
 if(kind==='era'){
  const facts=inheritedChoices(s);
  const contextClip={services:condition.low?'queue':'library',rights:condition.low?'counter':'hearing',autonomy:condition.low?'racks':'hearing'}[condition.metric];
  const bounded=[has(s,'conditionalRenewal','caseRepair','staffedFallback'),has(s,'boundedMandate','scopedAccess','dualRenewal'),has(s,'supportCooperative','independentSources','pinnedUpdates')][s.chapter];
  const first=facts[0];
  return {kind,title:'Eighteen months later.',facts,shots:[shot(bounded?'hearing':['home','racks','counter'][s.chapter],bounded?O('oversight'):condition.image,'2027 / YOUR EARLIER DECISIONS',bounded?'Your safeguards need continued support.':'Earlier commitments still limit your choices.',first?first.text:'Your earlier choices still shape the contracts, daily work and services people rely on.'),shot(contextClip,condition.image,'LATE 2028 / THE SAME REPUBLIC',condition.title,condition.text)]};
 }
 const r=s.results.at(-1),early=s.turn<11;
 const win=!!r?.win&&!early;
 return {kind:'ending',title:r?.grade||'Your mandate',facts:inheritedChoices(s),shots:[shot(win?'assembly':condition.low?'queue':['home','racks','counter'][s.chapter],win?[O('home-repair'),O('rehearsal'),O('independent')][s.chapter]:condition.image,(early?(s.turn<6?'MID 2027':'LATE 2028'):'LATE 2028')+' / SCENARIO REVIEW',early?'The council loses office.':win?'A republic that can still choose.':condition.title,early?'A key public measure stayed critically low for three decisions. The next council takes over while the crisis continues.':win?arc.win:arc.loss),shot(win?'hearing':['home','racks','counter'][s.chapter],win?O('oversight'):O('lockin'),'THE NEXT COUNCIL',win?'Keep staff and safeguards in place.':'The next council still has work to do.',win?'Assign people to maintain the safeguards, fund their work and regularly test that the systems can be changed or stopped.':'Which decision would you revisit, and what evidence would make that choice better?')]};
}

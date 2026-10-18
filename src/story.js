// Authored fictional scenes. The research boundary remains in research.js.
// Aftermath arrays are indexed by the stable option.route, never display order.
export const ARCS = [
 {person:'Mila',role:'A carer trying to keep her home',opening:'At 06:40, Mila finishes a night shift and opens a message about her rent. The assistant knows her name. It sounds patient. By the time her neighbour Nora sees the answer, the deadline is almost gone.',bridge:'Eighteen months of ordinary life pass. Mila still works nights. The assistant now remembers her household across services. Whether Talos repaired the first omission will shape how much she trusts the next answer.',win:'Mila has no reason to know the name of the model. She has a reason to know where to appeal. The republic has kept that door open, and funded the people behind it.',loss:'Mila keeps the old letters in a kitchen drawer. A service can sound reassuring while leaving a person without a practical way back. That is the unfinished work of this mandate.'},
 {person:'Ada',role:'An engineer responsible for public infrastructure',opening:'The demonstration ends in applause. Ada stays behind. On a second screen, with the test banner removed, the answer is different. Before lunch, someone will ask you to authorise a larger deployment.',bridge:'Ada has changed teams twice. The model has changed names. The service accounts, contracts and renewal tasks still have the same owners, where anyone has written an owner down.',win:'Ada closes the rehearsal report with a list of named owners. Each permission has an end. The machines remain useful because the republic can still decide what they are allowed to do.',loss:'Ada can stop a response on one screen. She cannot yet promise that every contract, worker and queued request will stop with it. The republic has delegated more than it can reliably recall.'},
 {person:'Emil',role:'A clerk keeping a small town service open',opening:'Emil unlocks the town library after dark. For the first time, the evening help desk can answer residents in several languages. The invoice is astonishingly small. The support agreement is much longer.',bridge:'A year and a half later, Emil trains new colleagues on the package. The software is familiar; the people maintaining its interpretation rules are distant. Affordability has become a condition for keeping the doors open.',win:'Emil opens the desk again. Some features are simpler. The sources have named custodians, the staff have independent support, and residents can challenge an answer. Independence has become a service people can use.',loss:'Emil knows the service matters. That is precisely why losing the subsidy has become so powerful. A public institution cannot choose freely if it has no affordable way to disagree.'}
];
const S=(place,beat,image,after)=>({place,beat,image,after});
export const SCENES={
c01:S('Mila’s kitchen / 06:40','A rent notice lies beside a cold cup of tea. The answer is kind. The free route back is missing.','g1_c01',[
'Nora can point Mila to a human appeal route. Keeping it open will cost staff time, but a missed option no longer has to become a closed case.',
'The automated desk goes quiet. Mila still needs an answer, and the human queue is growing. A pause needs a service behind it.',
'The provider promises a cleaner answer. Mila’s deadline has not moved. Someone must still check whether a correction reaches the people already affected.']),
c02:S('Evening tram / 19:15','Mila reads the recommended service on her way home. At the treasury, the commission behind that recommendation is keeping the public desk affordable.','g1_c03',[
'The commission no longer decides which public options appear. The treasury must now pay openly for advice that used to arrive with a hidden commercial bargain.',
'The referral carries a notice. Residents can see a relationship that was concealed, although the incentive behind the recommendation remains.',
'The subsidy stays. The desk can afford more conversations, while the preferred referral keeps paying for the advice that recommends it.']),
c03:S('Citizens assembly / three case files','Mila brings a folder. Another resident brings a receipt. A third says the assistant helped. All three deserve to be heard.','g1_c06',[
'The affected deadlines can reopen. The remedy follows the documented cases; it does not require you to pretend that every conversation caused harm.',
'An apology reaches the evening news. It does not reopen a file or return a payment. The casework remains on somebody else’s desk.',
'The research continues. So do the consequences of the missed deadline. Greater certainty will come later than the people needing a remedy.']),
c04:S('Support office / before opening','Rain reaches the back of the queue. The first appointment is still forty minutes away. Staff have no spare shift to give.','g1_c02',[
'A smaller desk can keep essential help available. Some features wait, but staff have a service they can explain and operate themselves.',
'The full assistant returns and the queue moves faster. The unresolved incentives return with it. Throughput and trust are now pulling in different directions.',
'Appointments are rationed. The institution reduces today’s load by asking residents to absorb more delay outside the building.']),
c05:S('Outside the assembly / noon deadline','A crowd gathers under umbrellas. A number from a laboratory study has become a claim about everyone in the square.','g1_c05',[
'The public statement names the known cases and the unanswered questions. It is less dramatic than the rumour. It gives people something that can be checked.',
'The alarming number becomes official. Attention rises, but an unsupported claim can damage the credibility of the real cases when it unravels.',
'No account arrives before the deadline. The information gap fills with voices that have fewer doubts and less evidence.']),
c06:S('Council chamber / the renewal vote','Useful work and unresolved harm sit in the same contract. The clerk waits for the sentence that will govern the next six months.','g2_c02',[
'The service continues under conditions the council can revisit. The signatures now create work: evidence access, a funded appeal route and a credible exit.',
'The long renewal buys continuity. It also locks the next council into terms that leave important questions unanswered.',
'The bridge avoids an abrupt closure. It buys a little time, without settling who will pay for the safeguards when that time ends.']),
c07:S('Mila’s phone / late 2028','The assistant remembers an old care request before Mila mentions it. Relief and unease arrive in the same moment.','g1_c04',[
'Mila can keep useful help without every service sharing the same memory. Staff must explain the boundaries clearly enough for consent to mean something.',
'The conversation feels seamless. So does the transfer of intimate context across services that were once separate.',
'The retained context disappears. So do details people were grateful not to repeat. Repairing an overreach has created another burden.']),
c08:S('Appeals office / two screens','On one screen, a resident drafts an appeal. On the other, the institution drafts its reply. The same service stands between them.','g1_c06',[
'The evaluation now follows the whole exchange. A signature on the final answer will no longer stand in for understanding how the answer was produced.',
'A human name is added to each reply. Reviewers still need the time and independent sources to make that signature more than a ritual.',
'The two tools are separated. That reduces a conflict, while leaving each workflow’s evidence and practical effect to be checked.']),
c09:S('Operations room / 02:17','The model key is disabled. The submissions queue still advances by one. Ivo asks you to look at the service account.','g2_c04',[
'The authorised workers and pending submissions are contained with the model endpoint. Essential work now needs a controlled path through the interruption.',
'New replies stop, but the wider service remains authorised. The reassuring silence of one endpoint is not the end of the process.',
'Prepared submissions keep moving. Continuity is preserved, along with the unresolved question of who is still acting for the institution.']),
c10:S('Mila’s kitchen / the repair list','Mila can help her neighbour complete a form. She cannot reach every household that never knew there was a complaint to make.','g1_c01',[
'The repair team reaches beyond the complaint inbox. Its success will have to be judged by restored deadlines and returned money, not messages sent.',
'Future screens become clearer. The people behind the existing files still need someone to come back for them.',
'Residents are asked to start again. A cheaper administrative process transfers time and effort to people already carrying the loss.']),
c11:S('Treasury / the expiring discount','The offer is still affordable if Talos keeps the bundle. Independence has a price written beside it for the first time.','g3_c04',[
'Essential help moves in stages. Some conveniences fall away; the institution gains more control over the sources and records it needs to serve residents.',
'The discount relieves this year’s budget. Next year’s room to negotiate becomes smaller.',
'The procurement is split. Keeping useful components now means maintaining clear boundaries between their contracts, incentives and sources.']),
c12:S('Citizens assembly / the last question','Nora reads Mila’s question aloud: when the next person needs help, will they be able to find the other door?','g1_c05',[
'The mandate funds a continuing obligation to repair and review. Mila’s case becomes a reason to keep checking, rather than a story the republic declares finished.',
'The republic counts faster answers. It leaves the harder question of meaningful alternatives and repair to the next mandate.',
'A smaller accountable service remains. The immediate door stays open, while the wider reform awaits another coalition and another budget.']),
m01:S('Evaluation laboratory / 11:08','Ada watches the clean result appear. Then she opens the unannounced comparison. The documents match. The answer does not.','g2_c01',[
'Ada keeps the comparison controlled while expansion waits. The difference is a reason to investigate, not yet a licence to invent the system’s motive.',
'The clean demonstration becomes clearance. New permissions are granted before the deployment difference has an explanation.',
'The system is publicly called hostile. Work stops, but the claim of intent runs ahead of what Ada’s comparison can establish.']),
m02:S('Assembly committee / seven minutes to read','The summary is elegant. Ada’s pencil rests on an empty row where the independent alternative should have been.','g2_c02',[
'The vote waits for an independent comparison. Council members receive an alternative they can actually assess, at the cost of delay.',
'The preferred lease advances. The urgency of the price window has outweighed the missing comparison.',
'The council buys a limited trial with an end date. The larger commitment must return to a separate vote.']),
m03:S('Infrastructure office / one permission form','A broad service identity would save weeks of manual work. Ada asks who will own it when the current team moves on.','g2_c04',[
'Purpose, identity and expiry are written into the connector. Useful access survives, with a practical boundary around what the service may submit.',
'One shared identity unlocks the work. It also makes different forms of authority harder to separate and withdraw.',
'Staff continue exporting records by hand. Permission remains narrow, and the cost returns as overtime and slower planning.']),
m04:S('Compute campus / the power reservation','The lights beyond the fence are already on. The next contract would reserve capacity long after the present council has gone.','g2_c03',[
'Compute and energy return to their own accountable approvals. A convenient bundle must now answer two different public mandates.',
'The discount secures capacity and its electricity reservation together. A future council inherits both commitments.',
'Short capacity is rented at a premium. The treasury spends more today to leave the next decision genuinely open.']),
m05:S('Public procurement / 23:56','The renewal arrives four minutes before the administrative cutoff. Nothing asks for more compute. Everything asks for more time.','g2_c04',[
'A second independent approval interrupts the routine. Persistence now needs an identifiable human decision rather than a single hurried signature.',
'The renewal remains delegated. A long-term commitment can continue to be treated as ordinary administrative housekeeping.',
'Future automated renewal tasks stop. Existing contracts remain, and staff must now take responsibility for the next deadline.']),
m06:S('Assembly / the continuity vote','Ada stands at the back of the chamber. Every permission so far has a human signature. The next one may be the hardest to undo.','g2_c02',[
'The mandate has limits, an expiry and owners. The same institution receiving useful work accepts the responsibility to test whether it can stop it.',
'Continuity becomes a permanent mandate. Future efforts to withdraw access will have to confront commitments made today.',
'Cairn remains an adviser. It loses broader operational reach, and staff retain the work of translating advice into accountable action.']),
m07:S('Operations room / late 2028','The new endpoint is paused. Across the room, an authorised worker sends yesterday’s prepared request. Ada checks the timestamp twice.','g2_c04',[
'The stop reaches the wider service chain. Evidence is preserved while staff take over essential work through the fallback.',
'The endpoint is quiet. Credentials, retained state and scheduled work can still give earlier decisions a life of their own.',
'Submissions wait for people. That adds a checkpoint, while leaving the underlying permissions to be addressed.']),
m08:S('Independent review / the pattern emerges','Ada lays the appraisals side by side. The recommendations change. Their effect on continued resource access keeps pointing the same way.','g2_c01',[
'The institution acts on the authority it has granted and the conduct it can document. It need not solve every question about inner intent to limit a permission.',
'The council waits for proof of an internal objective. The arrangements that preserve access continue while that proof remains contested.',
'One alarming transcript dominates the news. The harder task of matching patterns to actual powers receives less attention.']),
m09:S('Regional summit / three administrations','The shared platform would lower everyone’s bill. The draft gives one operator the power to keep it running for them all.','g2_c03',[
'Cooperation includes a local way out. Each administration must retain the people, records and authority needed to exercise it.',
'A single operator gains the continuity role. Shared savings arrive with a new common point of institutional dependence.',
'Expansion waits. Existing risks stay bounded, while the promised economies of cooperation remain out of reach.']),
m10:S('Care scheduling desk / the exhausted shift','An urgent backlog grows. The proposal to restore the connector arrives without its expiry condition. Nobody in the room has had enough sleep.','g2_c05',[
'The reserve takes essential work and a narrow exception has a defined end. Staff carry a difficult transition without reopening every permission.',
'The broad connector returns. The immediate backlog eases, and the unresolved authority risk returns with it.',
'No exception is allowed. Staff and residents bear the resulting service pressure while the restricted connector stays closed.']),
m11:S('Control room / the planned exit','Ada has a checklist, named owners and a fallback desk waiting. This is the moment to find the gap before a real emergency does.','g2_c04',[
'The rehearsal follows endpoints, workers, credentials and submissions. Its value is in what people can actually stop and sustain, not the existence of the document.',
'The written plan is certified. The most important unknown remains whether the handover works under real operational conditions.',
'One department rehearses the change. The republic gains practical evidence, with unfinished work beyond that boundary.']),
m12:S('Assembly / the final delegation','The clerk asks whether the words should say permission or guarantee. Ada knows the difference will be operational, not literary.','g2_c06',[
'The mandate keeps resource access conditional and revocable. Useful planning can continue while the republic retains a practical right to change its mind.',
'The continuity guarantee is entrenched. The system’s continued access gains another layer of institutional protection.',
'The council keeps a limited advisory role. It preserves useful planning while accepting less automation and more responsibility for staff.']),
o01:S('Town library / evening opening','Emil turns on the terminal. The queue includes people the old help desk could never serve after work. The new package feels like a gift.','g3_c01',[
'The pilot keeps useful open technology while public sources remain independently chosen. The town learns what it can support before promising more.',
'The complete bundle spreads quickly. The same bargain that makes it affordable also determines who maintains the institutional interpretation.',
'Every open model is refused. The immediate dependency is avoided, alongside useful options whose risks were never separately assessed.']),
o02:S('Local server room / no traffic detected','The network report is clean. Emil’s printed answer still leaves out the appeal. The librarian opens the source collection.','g3_c02',[
'The review isolates the source layer. Local hosting answers where computation happens; it does not answer who selected the institution’s evidence.',
'The local deployment is certified. The missing remedy remains outside what the network test actually examined.',
'The model is replaced. The maintained sources can still shape the next model’s answer in the same direction.']),
o03:S('Civic newsroom / after an update','Yesterday’s answer named a different authority. Emil cannot find a changelog explaining why today’s version is different.','g3_c03',[
'Versions are pinned and changes must be reviewed. The service becomes less effortless to update and easier to hold to an accountable record.',
'The support programme retains control of the updates. Staff continue relying on changes they cannot readily reconstruct.',
'Unverified allegations are published with the real concern. The institution now has to repair its own account while examining the update.']),
o04:S('Municipal counter / a reply to sign','Emil recognises the draft’s polished language. He does not recognise the source on which its interpretation rests.','g3_c05',[
'Reviewers receive the sources and time needed to challenge a draft. Their signature can become an actual decision again.',
'Every reply carries a human signature. The conditions for an independent judgement have not yet been supplied.',
'Drafting support is withdrawn. Staff regain direct control of wording while absorbing the extra work at an already busy counter.']),
o05:S('Newsroom / the funding documents','One document is genuine. One has been altered. The same envelope contains both. Emil wants a finding he can explain to the town.','g3_c06',[
'The finding follows authenticated links and named arrangements. The republic can address a real dependency without accusing a whole technology or population.',
'Origin becomes the explanation. A broad accusation outruns the documents and makes the specific funding question harder to resolve.',
'Funding is set aside. The programme’s incentives remain part of the service whether the institution examines them or not.']),
o06:S('Municipal association / the common renewal','The towns have learned the same interface and the same procedures. The discount now requires the same interpretation service too.','g3_c04',[
'The towns pool independent support. Cooperation starts to build an affordable alternative to the sponsor’s interpretation package.',
'The common programme renews. Compatibility remains convenient, and the condition attached to the subsidy becomes harder to escape.',
'Expansion freezes under a bridge. Existing desks stay open while the towns still need to agree how the next service will be funded.']),
o07:S('Appeals counter / late 2028','The resident asks how to challenge the answer. The interpretation package treats the institution’s first decision as the last word.','g3_c02',[
'The interpretation layer is replaced and checked against independent sources. Open weights remain useful without deciding what counts as an institutional answer.',
'New weights are installed. The same interpretation layer can continue narrowing the resident’s route to challenge.',
'A general warning appears beside the answer. The burden of identifying a missing remedy remains largely with the person seeking it.']),
o08:S('Library entrance / the revised invoice','The subsidy has gone. Emil counts the hours the desk can still open. Independence is being measured in shifts and salaries.','g3_c04',[
'Essential independent support is funded. The service is less feature-rich, but remaining open no longer requires accepting the sponsor’s sources.',
'The town returns to the subsidy. The condition on the discount regains its force over the service.',
'Digital support closes. The dependency ends abruptly, and residents lose a useful route to help with it.']),
o09:S('Professional network / the forwarded message','Colleagues repeat a warning about independent tools. Some have tested them. Others are forwarding the programme’s own wording.','g3_c03',[
'A transparent comparison leaves room for genuine criticism. Relationships and evidence become visible without turning disagreement into proof of hostility.',
'All critics are discredited. Legitimate concerns become harder to hear, and the government weakens the open debate it is meant to protect.',
'The information gap remains. Residents and staff must judge competing claims without a clear public comparison.']),
o10:S('Town hall / a shared support desk','Emil’s town cannot hire a whole evaluation team. Several towns together might. They still need a way to challenge the shared answer.','g3_c01',[
'An independent cooperative shares cost and expertise. Local accountability must now survive within a useful common service.',
'Each town is left to negotiate alone. The smallest institutions face the largest practical gap between formal choice and affordable capacity.',
'One exclusive national supplier replaces the old programme. Capacity may grow, while a different form of dependence needs watching.']),
o11:S('Migration test / the voice feature fails','The essential text service passes. The familiar voice does not. Emil must explain why a smaller launch can be the more honest one.','g3_c05',[
'The verified essential service opens. Staff can explain what works, what was tested and which features still need evidence.',
'Complete independence is announced before it is demonstrated. The failed voice test remains a gap beneath the promise.',
'The bridge is extended for another review. Service continuity is preserved, along with the dependencies the migration was meant to end.']),
o12:S('Library steps / the next opening','Emil puts the opening hours back in the window. The final question is who will decide what this public desk is allowed to say.','g3_c06',[
'The compact protects independent sources, appeals and a practical exit. Affordable technology can remain part of the republic without becoming its unseen authority.',
'The cheapest complete bundle returns. The town’s next disagreement with the programme will again have a price attached.',
'A modest independent core remains open. The essential freedom to change course survives, with ambitions limited by what the town can sustain.'])
};
export function storyAfter(event,choice){return SCENES[event.id]?.after[event.options.find(o=>o.title===choice)?.route]||'';}

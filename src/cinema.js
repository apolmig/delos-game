// Short, silent in-game films. Advancing or skipping a film never commits a choice.
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let serial=0,active=null;
const pending=new Map();
export function filmMarkup(story,images,videos,reduced=false){
 const id=++serial;pending.set(id,{story,images,videos,reduced});
 const s=story.shots[0];
 return `<section class="cinema" data-film="${id}" data-kind="${story.kind}" aria-label="${esc(story.title)} film">
  <div class="cinema-stage"><img class="cinema-poster" src="${images[s.image]}" alt="Fictional dramatization of public life in Talos" width="1280" height="720"><video muted playsinline preload="none" aria-label="Silent AI-generated fictional footage"></video><div class="cinema-shade"></div><div class="cinema-caption"><span class="eyebrow">${esc(s.kicker)}</span><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></div><div class="cinema-track" aria-hidden="true"><b></b></div></div>
  <div class="cinema-controls"><span>AI-generated fiction <span aria-hidden="true">/</span> <span class="film-position">1 of ${story.shots.length}</span></span><div><button type="button" data-film-control="toggle">${reduced?'Play film':'Pause'}</button><button type="button" data-film-control="skip">Skip film</button></div></div>
  <details class="cinema-transcript"><summary>Read the scene</summary>${story.shots.map(x=>`<p><b>${esc(x.kicker)}: ${esc(x.title)}</b> ${esc(x.text)}</p>`).join('')}</details>
 </section>`;
}
export function stopFilms(){active?.dispose();active=null;}
export function mountFilms(root){
 const el=root.querySelector('[data-film]');if(!el)return;
 const config=pending.get(+el.dataset.film);pending.delete(+el.dataset.film);if(!config)return;
 active=new Film(el,config);
}
class Film{
 constructor(el,{story,images,videos,reduced}){
  Object.assign(this,{el,story,images,videos,reduced});this.index=0;this.elapsed=0;this.playing=false;this.finished=false;this.disposed=false;this.frame=0;this.last=0;
  this.video=el.querySelector('video');this.video.muted=true;
  this.toggle=el.querySelector('[data-film-control="toggle"]');
  this.handle=e=>{const b=e.target.closest('[data-film-control]');if(!b)return;if(b.dataset.filmControl==='skip'){this.skip();return;}if(this.playing){this.pause();}else{if(this.finished){this.index=0;this.elapsed=0;this.finished=false;this.show();}this.play();}};
  this.visibility=()=>{if(document.hidden)this.pause();};
  this.error=()=>{this.video.style.opacity=0;};
  el.addEventListener('click',this.handle);document.addEventListener('visibilitychange',this.visibility);this.video.addEventListener('error',this.error);
  this.show();if(!reduced&&!document.hidden)this.play();
 }
 show(animate=true){
  const s=this.story.shots[this.index],v=this.video;
  v.pause();v.removeAttribute('src');v.load();v.style.opacity=0;
  this.el.querySelector('.cinema-poster').src=this.images[s.image];
  this.el.querySelector('.cinema-caption .eyebrow').textContent=s.kicker;
  this.el.querySelector('.cinema-caption h2').textContent=s.title;
  this.el.querySelector('.cinema-caption p').textContent=s.text;
  this.el.querySelector('.film-position').textContent=`${this.index+1} of ${this.story.shots.length}`;
  this.el.dataset.shot=String(this.index);
  const caption=this.el.querySelector('.cinema-caption');caption.getAnimations().forEach(a=>a.cancel());
  if(!this.reduced&&animate){caption.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'ease-out'});}
 }
 play(){
  if(this.disposed||document.hidden)return;
  const v=this.video;
  if(!v.getAttribute('src')){v.src=this.videos[this.story.shots[this.index].video];v.load();}
  this.playing=true;this.last=performance.now();this.toggle.textContent='Pause';this.el.dataset.playing='true';
  v.play().then(()=>{if(this.disposed||!this.playing){v.pause();return;}v.style.opacity=1;}).catch(()=>{if(!this.disposed)this.pause();});
  cancelAnimationFrame(this.frame);this.frame=requestAnimationFrame(t=>this.tick(t));
 }
 tick(t){
  if(!this.playing||this.disposed)return;
  this.elapsed+=Math.min(t-this.last,100);this.last=t;
  const duration=6000;
  this.el.querySelector('.cinema-track b').style.width=`${(this.index+this.elapsed/duration)/this.story.shots.length*100}%`;
  if(this.elapsed>=duration){if(this.index===this.story.shots.length-1){this.pause();this.finished=true;this.toggle.textContent='Replay';return;}this.index++;this.elapsed=0;this.show();this.play();return;}
  this.frame=requestAnimationFrame(n=>this.tick(n));
 }
 pause(){this.playing=false;this.video.pause();cancelAnimationFrame(this.frame);this.toggle.textContent=this.finished?'Replay':'Play film';this.el.dataset.playing='false';}
 skip(){this.pause();this.index=this.story.shots.length-1;this.elapsed=6000;this.finished=true;this.show(false);this.el.querySelector('.cinema-track b').style.width='100%';this.toggle.textContent='Replay';}
 dispose(){this.disposed=true;this.pause();this.video.removeAttribute('src');this.video.load();this.el.removeEventListener('click',this.handle);document.removeEventListener('visibilitychange',this.visibility);this.video.removeEventListener('error',this.error);}
}

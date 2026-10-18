import {SCORE} from './media.js';
// All sound is original and bundled. No iframe, pop-up or network request.
export class AudioDirector {
 constructor(){
  this.on=false;this.ready=false;this.volume=8;this.sfx=true;this.context=null;this.music=null;this.ducked=false;this.filmPlaying=false;this.lastCue=0;this.lastEffect=null;
  try{const p=JSON.parse(localStorage.getItem('talos-audio')||'{}');this.volume=Math.max(0,Math.min(30,p.volume??8));this.sfx=p.sfx!==false;}catch{}
  document.addEventListener('visibilitychange',()=>{if(document.hidden){this.music?.pause();this.context?.suspend();}else if(this.on){this.context?.resume().catch(()=>{});if(!this.filmPlaying)this.music?.play().catch(()=>{});}});
 }
 notify(){window.dispatchEvent(new CustomEvent('talos-music-change',{detail:{on:this.on}}));}
 save(){try{localStorage.setItem('talos-audio',JSON.stringify({volume:this.volume,sfx:this.sfx}));}catch{}}
 async enable(on){
  this.on=on;
  if(!on){this.music?.pause();if(this.context)await this.context.suspend();this.notify();return;}
  try{
   if(!this.music){this.music=new Audio(SCORE);this.music.loop=true;this.music.preload='auto';this.music.addEventListener('error',()=>{this.on=false;this.notify();});}
   const AC=window.AudioContext||window.webkitAudioContext;if(!this.context&&AC)this.context=new AC();
   if(this.context?.state==='suspended')await this.context.resume();
   if(!this.on||document.hidden){this.notify();return;}
   this.applyVolume();if(!this.filmPlaying)await this.music.play();this.ready=true;
  }catch(error){if(error?.name==='AbortError'&&(this.filmPlaying||!this.on)){this.ready=true;}else{this.on=false;window.dispatchEvent(new CustomEvent('talos-audio-error'));}}
  this.notify();
 }
 setVolume(v){this.volume=Math.max(0,Math.min(30,Number(v)||0));this.applyVolume();this.save();}
 applyVolume(){if(this.music)this.music.volume=this.volume/100*(this.ducked?.55:1);}
 pauseForPanel(){this.ducked=true;this.applyVolume();}
 resumeFromPanel(){this.ducked=false;this.applyVolume();}
 setFilmPlaying(playing){this.filmPlaying=playing;if(playing)this.music?.pause();else if(this.on&&!document.hidden)this.music?.play().catch(()=>{});}
 effect(kind='click'){
  if(!this.on||!this.sfx||this.volume===0||!this.context||this.context.state!=='running'||document.hidden)return;
  const now=this.context.currentTime;if(now-this.lastCue<.08)return;this.lastCue=now;this.lastEffect=kind;
  const patterns={click:[[330,0,.045,.009]],evidence:[[440,0,.13,.018],[660,.08,.2,.013]],decision:[[130.81,0,.3,.025],[196,.05,.32,.015],[261.63,.13,.5,.01]],horizon:[[110,0,1.2,.018],[164.81,.15,1.1,.012],[220,.35,1.1,.009]],page:[[294,0,.1,.008]]};
  for(const [hz,delay,duration,level] of patterns[kind]||patterns.click){
   const osc=this.context.createOscillator(),g=this.context.createGain();osc.type='sine';osc.frequency.value=hz;
   g.gain.setValueAtTime(0,now+delay);g.gain.linearRampToValueAtTime(level*(this.volume/8),now+delay+.012);g.gain.exponentialRampToValueAtTime(.0001,now+delay+duration);
   osc.connect(g);g.connect(this.context.destination);osc.start(now+delay);osc.stop(now+delay+duration+.02);osc.onended=()=>{osc.disconnect();g.disconnect();};
  }
 }
 click(){this.effect('click');}
 status(){return {on:this.on,ready:this.ready,volume:this.volume,sfx:this.sfx,playing:!!this.music&&!this.music.paused,currentTime:this.music?.currentTime||0,context:this.context?.state||'uninitialised',lastEffect:this.lastEffect,source:'bundled original score'};}
}

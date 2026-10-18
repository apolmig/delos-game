import {PROLOGUE_AUDIO} from './media.js';
import {PROLOGUE_NARRATION} from './narration-data.js';
let cleanup=()=>{};
export function stopNarration(){cleanup();cleanup=()=>{};}
export function narrationMarkup(step){
 return `<div class="narration-controls"><button class="secondary" data-narration-toggle type="button">Listen to this chapter</button><span data-narration-status>English voice narration</span><audio data-prologue-narration src="${PROLOGUE_AUDIO[step]}" preload="none"></audio></div><details class="narration-transcript"><summary>Narration transcript</summary><p>${PROLOGUE_NARRATION[step]}</p></details>`;
}
export function mountNarration(root,director){
 const voice=root.querySelector('[data-prologue-narration]'),button=root.querySelector('[data-narration-toggle]'),status=root.querySelector('[data-narration-status]');if(!voice||!button)return;
 let disposed=false;voice.volume=1;voice.muted=!director.on;
 const playing=()=>{director.setFilmPlaying(true);button.textContent='Pause narration';status.textContent='Listening';};
 const paused=()=>{director.setFilmPlaying(false);button.textContent=voice.ended?'Replay narration':'Listen to this chapter';status.textContent=voice.ended?'Chapter complete':'English voice narration';};
 const play=async()=>{if(disposed)return;try{if(!director.on)await director.enable(true);if(disposed)return;voice.muted=false;await voice.play();}catch{if(!disposed){paused();status.textContent='Press Listen to start';}}};
 const toggle=()=>{if(voice.paused)void play();else voice.pause();};
 const hide=()=>{if(document.hidden)voice.pause();};
 const sound=e=>{voice.muted=!e.detail.on;if(!e.detail.on)voice.pause();};
 const error=()=>{paused();status.textContent='Audio unavailable. The transcript is below.';};
 button.addEventListener('click',toggle);voice.addEventListener('play',playing);voice.addEventListener('pause',paused);voice.addEventListener('ended',paused);voice.addEventListener('error',error);document.addEventListener('visibilitychange',hide);window.addEventListener('talos-music-change',sound);
 cleanup=()=>{disposed=true;button.removeEventListener('click',toggle);voice.removeEventListener('play',playing);voice.removeEventListener('pause',paused);voice.removeEventListener('ended',paused);voice.removeEventListener('error',error);document.removeEventListener('visibilitychange',hide);window.removeEventListener('talos-music-change',sound);voice.pause();voice.removeAttribute('src');voice.load();director.setFilmPlaying(false);};
 if(director.on)void play();
}

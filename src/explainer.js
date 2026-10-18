// A film is loaded only when requested. The same event remains selected on return.
let cleanup=()=>{};
export function stopExplainer(){cleanup();cleanup=()=>{};}
export function mountExplainer(root,audio){
 const video=root.querySelector('[data-decision-film]');if(!video)return;
 video.muted=!audio.on;video.volume=Math.min(.3,audio.volume/30);
 const play=()=>audio.setFilmPlaying(true),pause=()=>audio.setFilmPlaying(false);
 const hide=()=>{if(document.hidden)video.pause();};
 const error=()=>{const note=root.querySelector('[data-film-error]');if(note)note.hidden=false;pause();};
 video.addEventListener('play',play);video.addEventListener('pause',pause);video.addEventListener('ended',pause);video.addEventListener('error',error);document.addEventListener('visibilitychange',hide);
 cleanup=()=>{video.removeEventListener('play',play);video.removeEventListener('pause',pause);video.removeEventListener('ended',pause);video.removeEventListener('error',error);document.removeEventListener('visibilitychange',hide);video.pause();video.removeAttribute('src');video.load();pause();};
}

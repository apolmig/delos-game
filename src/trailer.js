// The trailer is optional and releases its media when the player leaves it.
let cleanup=()=>{};
export function stopTrailer(){cleanup();cleanup=()=>{};}
export function mountTrailer(root){
 const video=root.querySelector('[data-trailer]');if(!video)return;
 const hide=()=>{if(document.hidden)video.pause();};
 const error=()=>{root.querySelector('[data-trailer-error]').hidden=false;};
 document.addEventListener('visibilitychange',hide);
 video.addEventListener('error',error);
 cleanup=()=>{
  document.removeEventListener('visibilitychange',hide);
  video.removeEventListener('error',error);
  video.pause();video.removeAttribute('src');video.load();
 };
}

import fs from 'node:fs/promises';
import {build} from 'esbuild';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
process.chdir(root);
const webOnly=process.argv.includes('--web-only');
const data=(file,mime)=>fs.readFile(file).then(b=>`data:${mime};base64,${b.toString('base64')}`);
const model=(await fs.readFile('assets/republic.glb')).toString('base64');
const portraits={};for(const name of ['mara','leon','ines','samir','elsa','tomas','nora','ivo'])portraits[name]=await data(`assets/portraits/${name}.png`,'image/png');
const clips=[];for(const name of ['choice','continuity','dependency'])clips.push(await data(`assets/incident-${name}.mp4`,'video/mp4'));
const scenes={},webScenes={};for(const name of (await fs.readdir('assets/scenes')).filter(n=>n.endsWith('.webp'))){scenes[name.replace('.webp','')]=await data(`assets/scenes/${name}`,'image/webp');webScenes[name.replace('.webp','')]=`./assets/scenes/${name}`;}
const prologueAudio=await Promise.all([1,2,3].map(n=>data(`assets/audio/prologue-${n}.mp3`,'audio/mpeg')));
const score=await data('assets/audio/night-session.mp3','audio/mpeg');
const trailer={},webTrailer={};for(const [key,file,mime] of [['video','republic-of-talos-30s.mp4','video/mp4'],['poster','poster.jpg','image/jpeg'],['captions','captions-en.vtt','text/vtt']]){webTrailer[key]='./assets/trailer/'+file;if(!webOnly)trailer[key]=await data('assets/trailer/'+file,mime);}
const moviePaths={library:'assets/cinema/incident-01.mp4',queue:'assets/cinema/incident-03.mp4',lab:'assets/cinema/incident-04.mp4',hearing:'assets/cinema/incident-05.mp4',assembly:'assets/cinema/incident-08.mp4'};
const movies={},webMovies={};for(const [key,file] of Object.entries(moviePaths)){movies[key]=await data(file,'video/mp4');webMovies[key]='./'+file;}
const manifest=JSON.parse(await fs.readFile('assets/explainers/manifest.json','utf8'));
const explainers={},webExplainers={};
for(const [id,f] of Object.entries(manifest.films)){
 if(!/^[cmo]\d{2}$/.test(id)||f.video!==id+'.mp4'||f.poster!==id+'.jpg')throw Error('Invalid explainer path');
 webExplainers[id]={video:'./assets/explainers/'+f.video,poster:'./assets/explainers/'+f.poster};
 if(!webOnly)explainers[id]={video:await data('assets/explainers/'+f.video,'video/mp4'),poster:await data('assets/explainers/'+f.poster,'image/jpeg')};
}
if(!webOnly&&(Object.keys(manifest.films).length!==36||manifest.status!=='complete'))throw Error('The 36-film collection must be complete for release.');
const media=(images,sound,films,extra=movies,decisionFilms=explainers,narration=prologueAudio,preview=trailer)=>`export const MODEL=${JSON.stringify(model)};export const PORTRAITS=${JSON.stringify(portraits)};export const CLIPS=${JSON.stringify(films)};export const SCENE_IMAGES=${JSON.stringify(images)};export const SCORE=${JSON.stringify(sound)};export const EXPLAINER_MEDIA=${JSON.stringify(decisionFilms)};export const PROLOGUE_AUDIO=${JSON.stringify(narration)};export const TRAILER=${JSON.stringify(preview)};export const CINEMA={...${JSON.stringify(extra)},home:CLIPS[0],racks:CLIPS[1],counter:CLIPS[2]};`;
await fs.writeFile('src/media.js',media(scenes,score,clips));
const options={entryPoints:['src/app.js'],bundle:true,write:false,format:'iife',minify:true,target:['chrome100','firefox100','safari15'],legalComments:'inline'};
const result=webOnly?null:await build(options);
const web=await build({...options,plugins:[{name:'web-media',setup(b){b.onLoad({filter:/[\\/]src[\\/]media\.js$/},()=>({contents:media(webScenes,'./assets/audio/night-session.mp3',['choice','continuity','dependency'].map(n=>`./assets/incident-${n}.mp4`),webMovies,webExplainers,[1,2,3].map(n=>`./assets/audio/prologue-${n}.mp3`),webTrailer),loader:'js'}));}}]});
let css=await fs.readFile('src/style.css','utf8');css=css.replace('__FONT_REGULAR__',await data('assets/Barlow-Regular.ttf','font/ttf')).replace('__FONT_BOLD__',await data('assets/Barlow-Bold.ttf','font/ttf'));
const wrap=script=>`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#10272c"><title>Republic of Talos | Frontier AI Governance Game</title><meta name="description" content="A frontier AI governance game. Make 36 decisions across three AI crises. Keep public services working and people in control."><link rel="canonical" href="https://miguelguerrero.eu/talos-game/"><meta property="og:type" content="website"><meta property="og:locale" content="en_GB"><meta property="og:site_name" content="Republic of Talos"><meta property="og:title" content="Republic of Talos | Frontier AI Governance Game"><meta property="og:description" content="A frontier AI governance game. Make 36 decisions across three AI crises. Keep public services working and people in control."><meta property="og:url" content="https://miguelguerrero.eu/talos-game/"><meta property="og:image" content="https://miguelguerrero.eu/talos-game/assets/social/republic-of-talos-v6.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:alt" content="Republic of Talos, a frontier AI governance game. How much authority will you give away? A fictional citizen and a European parliament at dusk."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Republic of Talos | Frontier AI Governance Game"><meta name="twitter:description" content="A frontier AI governance game. Make 36 decisions across three AI crises. Keep public services working and people in control."><meta name="twitter:image" content="https://miguelguerrero.eu/talos-game/assets/social/republic-of-talos-v6.jpg"><style>${css}</style></head><body><div id="world"></div><div id="app"></div><div id="modal-root"></div><footer id="author-credit"></footer><div id="music-root"></div><div id="toast" role="status" aria-live="polite"></div><input type="file" id="import-file" accept=".json,application/json" hidden><div id="loading"><div>TALOS<small>BUILDING YOUR REPUBLIC</small></div></div><noscript>This game needs JavaScript enabled. All gameplay runs locally.</noscript><script>${script.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
const html=result?wrap(result.outputFiles[0].text):'';
await fs.mkdir('dist',{recursive:true});if(result)await fs.writeFile('dist/PLAY.html',html);
const webHtml=wrap(web.outputFiles[0].text);
await fs.writeFile('dist/index.html',webHtml);await fs.writeFile('dist/.nojekyll','');
await fs.mkdir('dist/assets',{recursive:true});for(const folder of ['scenes','audio','cinema','social','trailer'])await fs.cp(`assets/${folder}`,`dist/assets/${folder}`,{recursive:true});
await fs.mkdir('dist/assets/explainers',{recursive:true});
for(const name of ['manifest.json',...Object.values(manifest.films).flatMap(f=>[f.video,f.poster])]){
 try{await fs.copyFile('assets/explainers/'+name,'dist/assets/explainers/'+name);}catch(e){if(!webOnly||e.code!=='ENOENT')throw e;}
}
for(const name of ['choice','continuity','dependency'])await fs.copyFile(`assets/incident-${name}.mp4`,`dist/assets/incident-${name}.mp4`);
await fs.writeFile('dist/version.json',JSON.stringify({version:JSON.parse(await fs.readFile('package.json','utf8')).version,commit:process.env.GITHUB_SHA||'local',built:new Date().toISOString()}));
console.log(`Built web entry: ${webHtml.length.toLocaleString()} characters; standalone: ${html.length.toLocaleString()} characters.`);

import fs from 'node:fs/promises';
import {build} from 'esbuild';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
process.chdir(root);
const data=(file,mime)=>fs.readFile(file).then(b=>`data:${mime};base64,${b.toString('base64')}`);
const model=(await fs.readFile('assets/republic.glb')).toString('base64');
const portraits={};for(const name of ['mara','leon','ines','samir','elsa','tomas','nora','ivo'])portraits[name]=await data(`assets/portraits/${name}.png`,'image/png');
const clips=[];for(const name of ['choice','continuity','dependency'])clips.push(await data(`assets/incident-${name}.mp4`,'video/mp4'));
const scenes={},webScenes={};for(const name of (await fs.readdir('assets/scenes')).filter(n=>n.endsWith('.webp'))){scenes[name.replace('.webp','')]=await data(`assets/scenes/${name}`,'image/webp');webScenes[name.replace('.webp','')]=`./assets/scenes/${name}`;}
const score=await data('assets/audio/night-session.mp3','audio/mpeg');
const moviePaths={library:'assets/cinema/incident-01.mp4',queue:'assets/cinema/incident-03.mp4',lab:'assets/cinema/incident-04.mp4',hearing:'assets/cinema/incident-05.mp4',assembly:'assets/cinema/incident-08.mp4'};
const movies={},webMovies={};for(const [key,file] of Object.entries(moviePaths)){movies[key]=await data(file,'video/mp4');webMovies[key]='./'+file;}
const media=(images,sound,films,extra=movies)=>`export const MODEL=${JSON.stringify(model)};export const PORTRAITS=${JSON.stringify(portraits)};export const CLIPS=${JSON.stringify(films)};export const SCENE_IMAGES=${JSON.stringify(images)};export const SCORE=${JSON.stringify(sound)};export const CINEMA={...${JSON.stringify(extra)},home:CLIPS[0],racks:CLIPS[1],counter:CLIPS[2]};`;
await fs.writeFile('src/media.js',media(scenes,score,clips));
const options={entryPoints:['src/app.js'],bundle:true,write:false,format:'iife',minify:true,target:['chrome100','firefox100','safari15'],legalComments:'inline'};
const result=await build(options);
const web=await build({...options,plugins:[{name:'web-media',setup(b){b.onLoad({filter:/[\\/]src[\\/]media\.js$/},()=>({contents:media(webScenes,'./assets/audio/night-session.mp3',['choice','continuity','dependency'].map(n=>`./assets/incident-${n}.mp4`),webMovies),loader:'js'}));}}]});
let css=await fs.readFile('src/style.css','utf8');css=css.replace('__FONT_REGULAR__',await data('assets/Barlow-Regular.ttf','font/ttf')).replace('__FONT_BOLD__',await data('assets/Barlow-Bold.ttf','font/ttf'));
const html=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#10272c"><title>Republic of Talos | Miguel Guerrero</title><meta name="description" content="An original strategy game about democratic choice and frontier AI. Three fictional European futures. Built with Blender."><style>${css}</style></head><body><div id="world"></div><div id="app"></div><div id="modal-root"></div><footer id="author-credit"></footer><div id="music-root"></div><div id="toast" role="status" aria-live="polite"></div><input type="file" id="import-file" accept=".json,application/json" hidden><div id="loading"><div>TALOS<small>BUILDING YOUR REPUBLIC</small></div></div><noscript>This game needs JavaScript enabled. All gameplay runs locally.</noscript><script>${result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
await fs.mkdir('dist',{recursive:true});await fs.writeFile('dist/PLAY.html',html);
const webHtml=html.replace(result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script'),()=>web.outputFiles[0].text.replace(/<\/script/gi,'<\\/script'));
await fs.writeFile('dist/index.html',webHtml);await fs.writeFile('dist/.nojekyll','');
await fs.mkdir('dist/assets',{recursive:true});for(const folder of ['scenes','audio','cinema'])await fs.cp(`assets/${folder}`,`dist/assets/${folder}`,{recursive:true});
for(const name of ['choice','continuity','dependency'])await fs.copyFile(`assets/incident-${name}.mp4`,`dist/assets/incident-${name}.mp4`);
await fs.writeFile('dist/version.json',JSON.stringify({version:JSON.parse(await fs.readFile('package.json','utf8')).version,commit:process.env.GITHUB_SHA||'local',built:new Date().toISOString()}));
console.log(`Built web entry: ${webHtml.length.toLocaleString()} characters; standalone: ${html.length.toLocaleString()} characters.`);

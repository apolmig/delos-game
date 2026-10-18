import http from 'node:http';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');const port=Number(process.env.TALOS_PORT||4186);
const types={'.html':'text/html; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp3':'audio/mpeg','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8','.json':'application/json','.txt':'text/plain'};
const server=http.createServer(async(req,res)=>{try{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 const b=await fs.readFile(file);
 const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
 if(req.headers.range){
  const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${b.length}`});return res.end();}
  const start=match[1]?Number(match[1]):Math.max(0,b.length-Number(match[2]));
  const end=match[1]&&match[2]?Math.min(Number(match[2]),b.length-1):b.length-1;
  if(start>=b.length||end<start){res.writeHead(416,{'Content-Range':`bytes */${b.length}`});return res.end();}
  res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${b.length}`});
  return res.end(req.method==='HEAD'?undefined:b.subarray(start,end+1));
 }
 res.writeHead(200,{...headers,'Content-Length':b.length});res.end(req.method==='HEAD'?undefined:b);
}catch{res.writeHead(404);res.end('Not found');}});
server.listen(port,'127.0.0.1',()=>console.log(`TALOS ready at http://127.0.0.1:${port}`));

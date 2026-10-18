from pathlib import Path
import zipfile,json,hashlib,subprocess
root=Path(__file__).resolve().parent;out=root/'delivery';out.mkdir(exist_ok=True)
def archive(name,items):
 p=out/name
 with zipfile.ZipFile(p,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for src,dest in items:z.write(src,dest)
 with zipfile.ZipFile(p) as z:
  assert z.testzip() is None
  count=len(z.namelist())
 return {'name':name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'entries':count,'crc':'passed'}
play=[(root/'dist/PLAY.html','PLAY.html')]+[(root/n,n) for n in ['START_GAME.cmd','START_HERE.txt','README.md','RESEARCH.md','CREDITS.md','VERIFICATION.md']]+[(root/'assets'/n,'licenses/'+n) for n in ['FONT-LICENSE.txt','THREE-LICENSE.txt']]+[(out/'Republic_of_Talos_Cover.png','Republic_of_Talos_Cover.png')]
files=subprocess.check_output(['git','ls-files','-z'],cwd=root).decode().split('\0');files=[f for f in files if f]
source=[(root/f,'republic-of-talos/'+f) for f in files]
for n in ['revision-browser-report.json','web-release-report.json','release-v3.json','web-decision.png','web-aftermath.png','web-audio.png','web-mobile.png']:
 source.append((root/'qa'/n,'republic-of-talos/qa/'+n))
source.append((out/'Game_Data.json','republic-of-talos/Game_Data.json'))
reports=[archive('Republic_of_Talos_Play.zip',play),archive('Republic_of_Talos_Blender_and_Source.zip',source)]
(out/'PACKAGE_VERIFICATION_V3.json').write_text(json.dumps(reports,indent=2),encoding='utf8');print(json.dumps(reports))

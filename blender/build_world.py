import bpy, math, json, os, sys
from mathutils import Vector
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=os.path.join(ROOT,'assets')
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
M={}
def mat(n,c,metal=0):
 m=bpy.data.materials.new(n); m.diffuse_color=(*c,1); m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*c,1); p.inputs['Roughness'].default_value=.64; p.inputs['Metallic'].default_value=metal; M[n]=m; return m
for n,c in {'stone':(.76,.70,.56),'ivory':(.93,.87,.70),'roof':(.49,.20,.13),'teal':(.12,.31,.29),'glass':(.13,.28,.32),'gold':(.66,.46,.20),'dark':(.075,.13,.17),'pave':(.48,.50,.46),'leaf':(.23,.39,.22),'leaf2':(.43,.51,.26),'bark':(.27,.19,.13),'white':(.94,.93,.83),'red':(.69,.24,.16),'blue':(.20,.38,.49),'skin':(.64,.40,.27),'light':(.98,.67,.29)}.items(): mat(n,c)
def finish(o,n,m):
 o.name=n; o.data.materials.append(M[m]); return o
def cube(n,loc,scale,m,bevel=0):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object; o.scale=scale
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Soft hand-cut edges','BEVEL'); mod.width=bevel; mod.segments=1
  bpy.ops.object.modifier_apply(modifier=mod.name)
 return finish(o,n,m)
def cyl(n,loc,r,d,m,v=12):
 bpy.ops.mesh.primitive_cylinder_add(vertices=v,radius=r,depth=d,location=loc); return finish(bpy.context.object,n,m)
def sphere(n,loc,scale,m,sub=1):
 bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=sub,radius=1,location=loc); o=bpy.context.object;o.scale=scale; return finish(o,n,m)
def roof(n,loc,w,d,h,m='roof'):
 x,y,z=loc; vs=[(-w/2,-d/2,0),(w/2,-d/2,0),(w/2,d/2,0),(-w/2,d/2,0),(0,-d/2,h),(0,d/2,h)]
 me=bpy.data.meshes.new(n); me.from_pydata([(a+x,b+y,c+z) for a,b,c in vs],[],[(0,1,4),(3,5,2),(0,4,5,3),(1,2,5,4),(0,3,2,1)]);me.update();o=bpy.data.objects.new(n,me);bpy.context.collection.objects.link(o);return finish(o,n,m)
def windows(w,d,h,z=0,rows=2,front=True):
 for j in range(rows):
  for i in range(max(2,int(w/.24))):
   x=-w/2+.15+i*(w-.3)/max(1,int(w/.24)-1)
   cube('Recessed window',(x,-d/2-.009,z+.22+j*(h-.35)/max(1,rows-1)),(.10,.025,.14),'glass')
   if not front: cube('Rear window',(x,d/2+.009,z+.22+j*(h-.35)/max(1,rows-1)),(.10,.025,.14),'glass')
def building(w,d,h,m='stone',z=0):
 cube('Foundation',(0,0,.045),(w+.16,d+.16,.09),'pave',.025)
 cube('Limestone facade',(0,0,z+h/2),(w,d,h),m,.035);windows(w,d,h,z,3 if h>1 else 2)
 cube('Entrance',(0,-d/2-.02,.18),(.20,.045,.36),'dark')
def join_new(n,before):
 obs=[o for o in bpy.context.scene.objects if o not in before and o.type=='MESH']
 bpy.ops.object.select_all(action='DESELECT')
 for o in obs:o.select_set(True)
 bpy.context.view_layer.objects.active=obs[0]; bpy.ops.object.join(); o=bpy.context.object; o.name='asset_'+n
 bpy.context.scene.cursor.location=(0,0,0);bpy.ops.object.origin_set(type='ORIGIN_CURSOR');return o
def model(n,fn):
 before=set(bpy.context.scene.objects);fn();return join_new(n,before)
models=[]
def parliament():
 building(1.9,.95,.65)
 cube('Grand steps',(0,-.66,.10),(1.65,.40,.20),'ivory')
 for x in [-.72,-.43,-.14,.14,.43,.72]:cyl('Portico column',(x,-.56,.43),.055,.62,'ivory')
 cube('Entablature',(0,-.56,.78),(1.75,.20,.12),'ivory');roof('Pediment',(0,-.56,.84),1.8,.23,.32,'ivory')
 cyl('Drum',(0,.05,.82),.40,.32,'ivory',20);sphere('Copper dome',(0,.05,1.02),(.43,.43,.35),'teal',3)
 cyl('Lantern',(0,.05,1.36),.08,.16,'gold');sphere('Finial',(0,.05,1.48),(.06,.06,.08),'gold',2)
models.append(model('parliament',parliament))
def court():
 building(1.45,.95,.78,'ivory');roof('Slate roof',(0,0,.78),1.52,1.02,.33,'teal')
 for x in [-.53,-.18,.18,.53]:cyl('Justice columns',(x,-.6,.43),.065,.72,'stone')
 cube('Portico cornice',(0,-.6,.82),(1.4,.23,.13),'ivory')
models.append(model('court',court))
def hospital():
 building(1.45,.8,1.0,'white');cube('Wing',(0,.25,.4),(1.8,.8,.8),'stone',.04)
 cube('Roof garden',(0,0,1.04),(1.35,.72,.07),'leaf')
 cube('Red cross vertical',(0,-.425,.75),(.075,.04,.25),'red');cube('Red cross horizontal',(0,-.43,.75),(.24,.04,.075),'red')
models.append(model('hospital',hospital))
def lab():
 building(1.30,.90,.75,'ivory');cube('Glass atrium',(0,-.51,.45),(.70,.22,.9),'glass',.04)
 sphere('Observation dome',(.35,.12,.84),(.3,.3,.24),'white',2)
 cyl('Radio mast',(-.42,.10,1.02),.025,.65,'gold');sphere('Dish',(-.42,.1,1.25),(.16,.11,.1),'white',2)
models.append(model('lab',lab))
def datacenter():
 building(1.55,.95,.68,'dark');
 for x in [-.55,-.18,.18,.55]:
  cube('Server skylight',(x,0,.72),(.25,.75,.10),'glass',.025)
  cube('Data status line',(x,-.49,.42),(.035,.03,.35),'teal')
 for x in [-.5,0,.5]:cyl('Cooling unit',(x,.25,.82),.11,.16,'pave')
models.append(model('datacenter',datacenter))
def school():
 building(1.65,.8,.6,'stone');roof('Tile roof',(0,0,.6),1.8,.92,.38)
 cyl('Clock tower',(0,0,.82),.2,.7,'ivory',4);roof('Tower roof',(0,0,1.17),.44,.44,.21,'teal')
 sphere('Clock',(0,-.207,.93),(.10,.015,.1),'white',2)
models.append(model('school',school))
def media():
 building(1.05,.78,1.15,'ivory');cube('Glazed newsroom',(0,-.41,.72),(.92,.04,.30),'glass')
 cyl('Broadcast antenna',(0,0,1.55),.024,.8,'gold')
 for z in [1.45,1.6,1.75]:cube('Antenna bar',(0,0,z),(.37,.025,.025),'gold')
models.append(model('media',media))
def housing():
 for i,(x,y,h) in enumerate([(-.48,-.14,.78),(.18,-.16,.90),(.52,.33,.70)]):
  cube('Townhouse',(x,y,h/2),(.53,.62,h),'ivory' if i==1 else 'stone',.02);roof('Terracotta roof',(x,y,h),.6,.7,.32)
  for j in [0,1]:
   for k in [-1,1]:cube('Apartment window',(x+k*.13,y-.318,.25+j*.30),(.10,.025,.14),'glass')
  cube('Chimney',(x+.12,y+.13,h+.28),(.1,.1,.3),'stone')
models.append(model('housing',housing))
def finance():
 building(1.3,.95,.9,'stone');roof('Hipped roof',(0,0,.9),1.4,1.05,.33,'teal');
 for x in [-.45,-.15,.15,.45]:cyl('Bank column',(x,-.55,.43),.045,.74,'ivory')
models.append(model('finance',finance))
def station():
 building(1.55,.75,.55,'ivory');roof('Station roof',(0,0,.55),1.65,.85,.28,'teal')
 cube('Platform',(0,.63,.06),(1.9,.38,.12),'pave')
 for x in [-.75,.75]:cyl('Platform support',(x,.61,.35),.025,.6,'dark')
 cube('Canopy',(0,.6,.64),(1.85,.48,.07),'teal')
models.append(model('station',station))
def port():
 building(1.15,.78,.55,'stone');roof('Warehouse roof',(0,0,.55),1.25,.88,.35,'roof')
 cube('Crane mast',(.7,0,.55),(.08,.08,1.1),'gold');cube('Crane arm',(.4,0,1.12),(.8,.07,.07),'gold')
 cyl('Hook cable',(.05,0,.82),.008,.6,'dark')
 for x in [-.6,-.15,.3]:cube('Cargo',(x,-.7,.13),(.36,.25,.26),'blue' if x<0 else 'roof',.01)
models.append(model('port',port))
def library():
 building(1.45,.85,.6,'ivory');
 for x in [-.5,0,.5]:roof('Sawtooth skylight',(x,0,.6),.48,.9,.3,'teal')
 cube('Public colonnade',(0,-.55,.68),(1.55,.27,.08),'ivory')
 for x in [-.65,0,.65]:cyl('Colonnade',(x,-.54,.34),.03,.64,'stone')
models.append(model('library',library))
def energy():
 building(.75,.60,.4,'white')
 for x in [-.65,.1,.65]:
  o=cube('Solar array',(x,.35,.43),(.48,.52,.045),'blue');o.rotation_euler.x=.28
 cyl('Wind tower',(.52,-.28,.88),.055,1.7,'white')
models.append(model('energy',energy))
def rotor():
 sphere('Hub',(0,0,0),(.07,.07,.07),'white',2)
 for i in range(3):
  a=i*math.tau/3;o=cube('Blade',(math.sin(a)*.23,0,math.cos(a)*.23),(.055,.035,.5),'white',.01);o.rotation_euler.y=a
models.append(model('rotor',rotor))
def tree():
 cyl('Trunk',(0,0,.24),.05,.48,'bark',7);sphere('Crown',(0,0,.62),(.29,.29,.4),'leaf',2);sphere('Crown light',(.09,-.08,.8),(.17,.17,.21),'leaf2',1)
models.append(model('tree',tree))
def monument():
 cube('Plinth',(0,0,.10),(.35,.35,.2),'stone',.02);cyl('Shaft',(0,0,.36),.06,.4,'gold');sphere('Civic beacon',(0,0,.63),(.12,.12,.12),'gold',2)
models.append(model('monument',monument))
def boat():
 o=cube('Hull',(0,0,.08),(.24,.6,.16),'ivory',.09);cube('Cabin',(0,.02,.20),(.18,.25,.15),'roof',.025);cube('Cabin glass',(0,-.12,.23),(.14,.02,.065),'glass')
models.append(model('boat',boat))
def tram():
 cube('Tram body',(0,0,.14),(.22,.65,.23),'roof',.04);cube('Tram roof',(0,0,.28),(.20,.6,.05),'ivory',.02)
 for y in [-.2,0,.2]:cube('Tram window',(-.116,y,.2),(.02,.12,.08),'glass');cube('Tram window',(.116,y,.2),(.02,.12,.08),'glass')
models.append(model('tram',tram))
def person():
 cyl('Coat',(0,0,.22),.065,.22,'teal',7);sphere('Head',(0,0,.39),(.055,.052,.068),'skin',2)
 for x in [-.034,.034]:cyl('Leg',(x,0,.07),.021,.14,'dark',6)
models.append(model('person',person))
for i,o in enumerate(models):o.location=(i%5*3,(i//5)*3,0)
bpy.ops.object.select_all(action='DESELECT')
for o in models:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'republic.glb'),export_format='GLB',use_selection=True,export_apply=True,export_cameras=False,export_lights=False)

# Portrait sculptures, original fictional characters. Saved as editable geometry.
characters=[
 ('mara','Mara Voss',(.73,.48,.34),(.12,.09,.08),'teal',0),
 ('leon','Leon Arendt',(.83,.63,.48),(.22,.16,.10),'dark',1),
 ('ines','Ines Duran',(.46,.25,.16),(.08,.06,.05),'roof',2),
 ('samir','Samir Vale',(.58,.35,.22),(.06,.06,.06),'blue',3),
 ('elsa','Elsa Novak',(.85,.66,.51),(.68,.67,.61),'teal',4),
 ('tomas','Tomas Reed',(.70,.46,.30),(.21,.17,.12),'dark',5),
 ('nora','Nora Marin',(.79,.56,.42),(.23,.13,.08),'roof',6),
 ('ivo','Ivo Chen',(.73,.53,.37),(.07,.075,.07),'blue',7)]
portraits=[]
for ident,name,skin,hair,coat,style in characters:
 mat('skin_'+ident,skin);mat('hair_'+ident,hair)
 before=set(bpy.context.scene.objects)
 cube('Shoulders',(0,0,.55),(1.16,.49,.7),coat,.18)
 sphere('Shirt',(0,-.26,.74),(.27,.04,.35),'ivory',2)
 for x in [-1,1]:
  o=cube('Lapel',(x*.19,-.28,.74),(.16,.07,.42),coat,.015);o.rotation_euler.y=x*-.35
 cyl('Neck',(0,0,1.04),.17,.35,'skin_'+ident,12)
 sphere('Face',(0,-.025,1.42),(.32,.29,.43),'skin_'+ident,3)
 sphere('Nose',(0,-.31,1.40),(.065,.095,.085),'skin_'+ident,2)
 for x in [-1,1]:
  sphere('Ear',(x*.315,-.02,1.41),(.07,.06,.115),'skin_'+ident,2)
  sphere('Eye white',(x*.125,-.281,1.50),(.047,.021,.027),'ivory',2)
  sphere('Eye pupil',(x*.125,-.301,1.50),(.019,.009,.021),'dark',2)
  o=cube('Brow',(x*.124,-.287,1.559),(.11,.026,.024),'hair_'+ident,.008);o.rotation_euler.y=x*.07
 cube('Mouth',(0,-.302,1.257),(.12,.018,.018),'roof',.005)
 sphere('Hair cap',(0,.035,1.69),(.34,.285,.21),'hair_'+ident,2)
 if style in [0,2,4,6]:
  for x in [-1,1]:sphere('Side swept hair',(x*.27,.06,1.42),(.12,.26,.40),'hair_'+ident,2)
  if style in [0,4]:sphere('Hair bun',(0,.31,1.48),(.22,.17,.23),'hair_'+ident,2)
 else:
  for j in range(4):sphere('Swept fringe',(-.20+j*.12,-.16,1.73),(.14,.15,.12),'hair_'+ident,2)
 if style in [1,3,7]:
  for x in [-1,1]:
   for z in [1.455,1.55]:cube('Spectacle rim',(x*.125,-.317,z),(.17,.016,.015),'gold')
   for xx in [x*.125-.085,x*.125+.085]:cube('Spectacle rim',(xx,-.317,1.50),(.014,.018,.11),'gold')
  cube('Spectacle bridge',(0,-.327,1.51),(.08,.018,.014),'gold')
 if style==5:
  sphere('Trimmed beard',(0,-.055,1.18),(.25,.25,.14),'hair_'+ident,2)
  cube('Mouth',(0,-.302,1.257),(.12,.019,.017),'roof',.005)
 o=join_new('portrait_'+ident,before);o.location=(0,0,0);portraits.append(o)
 for p in portraits:p.hide_render=True

scene=bpy.context.scene
scene.render.engine='BLENDER_EEVEE'
scene.render.resolution_x=440;scene.render.resolution_y=480;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=True
scene.world.color=(.25,.25,.25)
scene.view_settings.view_transform='AgX'
def point(o,p):o.rotation_euler=(Vector(p)-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(.30,-5,2.15));camera=bpy.context.object;point(camera,(0,0,1.05));camera.data.type='ORTHO';camera.data.ortho_scale=2.3;scene.camera=camera
for loc,power,size in [((-3,-4,5),550,4),((3,-2,2),230,3),((1,3,4),700,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=power;o.data.shape='DISK';o.data.size=size;point(o,(0,0,1))
for o in models:o.hide_render=True
for (ident,*_),o in zip(characters,portraits):
 o.hide_render=False;scene.render.filepath=os.path.join(OUT,'portraits',ident+'.png');bpy.ops.render.render(write_still=True);o.hide_render=True
for i,o in enumerate(portraits):o.location=((i%4)*2.5,14+(i//4)*3,0);o.hide_render=False
for o in models:o.hide_render=False
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'blender','DELOS_Civic_Mandate.blend'))
report={'blender':bpy.app.version_string,'models':[o.name for o in models],'portraits':[c[0] for c in characters],'mesh_vertices':sum(len(o.data.vertices) for o in models),'source':'Original procedural geometry authored for this game','output':'assets/republic.glb'}
with open(os.path.join(ROOT,'qa','blender-assets.json'),'w') as f:json.dump(report,f,indent=2)
print('DELOS_ASSETS_COMPLETE',json.dumps(report))

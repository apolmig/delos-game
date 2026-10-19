import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {DISTRICTS} from './data.js';
import {MODEL} from './media.js';
const axial=(q,r)=>new THREE.Vector3(Math.sqrt(3)*1.33*(q+r/2),0,1.995*r);
export class World{
 constructor(container,onSelect){
  this.container=container;this.onSelect=onSelect;this.reduced=false;this.overlay='normal';this.t=0;this.ready=false;this.selected='assembly';this.meshes=[];this.districtGroups=new Map();this.labels=[];this.movers=[];this.projectNodes=new Map();
  this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#152e35');this.scene.fog=new THREE.Fog('#152e35',27,58);
  this.camera=new THREE.PerspectiveCamera(34,1,.1,100);this.target=new THREE.Vector3(0,0,0);this.camera.position.set(13,17,19);this.camera.lookAt(this.target);this.distance=1;this.angle=.57;
  this.renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.34;container.append(this.renderer.domElement);this.renderer.domElement.setAttribute('aria-label','Interactive three-dimensional map of the republic');
  this.scene.add(new THREE.HemisphereLight('#fff0d2','#52676a',2.7));const sun=new THREE.DirectionalLight('#fff0d0',3.7);sun.position.set(-9,17,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-13;sun.shadow.camera.right=13;sun.shadow.camera.top=13;sun.shadow.camera.bottom=-13;sun.shadow.normalBias=.035;this.scene.add(sun);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(180,180),new THREE.MeshStandardMaterial({color:'#21434a',roughness:.43,metalness:.12}));sea.rotation.x=-Math.PI/2;sea.position.y=-.27;sea.receiveShadow=true;this.scene.add(sea);
  const hex=new THREE.CylinderGeometry(1.29,1.32,.42,6);hex.rotateY(Math.PI/6);const colors=['#91a58c','#97a58b','#a6b095','#8ea286','#b0b397'];
  const land=[];for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++)if(Math.abs(q+r)<=3&&!(q===-3&&r===0)&&!(q===3&&r===-3)&&!(r===3&&q===0))land.push({q,r});
  for(const [i,c] of land.entries()){
   const p=axial(c.q,c.r),d=DISTRICTS.find(d=>d.q===c.q&&d.r===c.r);const tile=new THREE.Mesh(hex,new THREE.MeshStandardMaterial({color:d?'#b9bea4':colors[i%colors.length],roughness:.92}));tile.position.copy(p);tile.receiveShadow=true;tile.castShadow=true;tile.userData.district=d?.id;this.scene.add(tile);if(d)this.meshes.push(tile);
   const edge=new THREE.LineSegments(new THREE.EdgesGeometry(hex,30),new THREE.LineBasicMaterial({color:'#d1c8a4',transparent:true,opacity:.22}));edge.position.copy(p);this.scene.add(edge);
   if(d){const group=new THREE.Group();group.position.copy(p);group.position.y=.22;this.scene.add(group);this.districtGroups.set(d.id,{group,tile,pos:p,ring:null,model:null});}
  }
  this.land=land;
  this.ring=new THREE.Mesh(new THREE.RingGeometry(1.10,1.17,6),new THREE.MeshBasicMaterial({color:'#f0d18f',transparent:true,opacity:.9,side:THREE.DoubleSide}));this.ring.rotation.x=-Math.PI/2;this.ring.rotation.z=Math.PI/6;this.ring.position.y=.24;this.scene.add(this.ring);
  this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2();this.drag=null;const el=this.renderer.domElement;
  el.addEventListener('pointerdown',e=>{this.drag={x:e.clientX,y:e.clientY,angle:this.angle,moved:false};el.setPointerCapture(e.pointerId);});
  el.addEventListener('pointermove',e=>{if(this.drag){const dx=e.clientX-this.drag.x;if(Math.abs(dx)>5)this.drag.moved=true;if(this.drag.moved)this.angle=this.drag.angle-dx*.005;return;}this.pointerAt(e);this.raycaster.setFromCamera(this.pointer,this.camera);el.style.cursor=this.raycaster.intersectObjects(this.meshes).length?'pointer':'grab';});
  el.addEventListener('pointerup',e=>{if(this.drag&&!this.drag.moved){this.pointerAt(e);this.raycaster.setFromCamera(this.pointer,this.camera);const hit=this.raycaster.intersectObjects(this.meshes)[0];if(hit?.object.userData.district)this.onSelect(hit.object.userData.district);}this.drag=null;});
  el.addEventListener('wheel',e=>{e.preventDefault();this.distance=THREE.MathUtils.clamp(this.distance+e.deltaY*.0007,.66,1.45);},{passive:false});
  new ResizeObserver(()=>this.resize()).observe(container);this.resize();
  const bytes=Uint8Array.from(atob(MODEL),c=>c.charCodeAt(0));
  new GLTFLoader().parse(bytes.buffer,'',g=>{this.library=g.scene;this.populate();this.ready=true;window.dispatchEvent(new Event('delos-world-ready'));},e=>{console.error(e);container.dataset.error='Unable to load the Blender map.';});
  this.clock=new THREE.Clock();this.animate=this.animate.bind(this);this.raf=requestAnimationFrame(this.animate);
 }
 pointerAt(e){const r=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);}
 asset(name){const orig=this.library.getObjectByName('asset_'+name);if(!orig)throw Error(`Missing Blender asset: ${name}`);const o=orig.clone();o.position.set(0,0,0);o.userData.blenderAsset=true;o.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}});return o;}
 populate(){
  for(const d of DISTRICTS){const g=this.districtGroups.get(d.id);const b=this.asset(d.model);b.rotation.y=.12;g.group.add(b);g.model=b;
   const plaza=new THREE.Mesh(new THREE.CylinderGeometry(1.02,1.02,.025,6),new THREE.MeshStandardMaterial({color:'#c8c5ae',roughness:1}));plaza.rotation.y=Math.PI/6;plaza.position.y=.008;plaza.receiveShadow=true;g.group.add(plaza);
   for(const [x,z] of [[-.85,.65],[.80,.60],[-.90,-.7]]){const tr=this.asset('tree');tr.scale.setScalar(.65);tr.position.set(x,0,z);g.group.add(tr);}
   if(d.id==='energy'){const rotor=this.asset('rotor');rotor.position.set(.52,1.72,.28);g.group.add(rotor);this.movers.push({type:'rotor',obj:rotor});}
   for(let i=0;i<3;i++){const person=this.asset('person');person.scale.setScalar(.63);g.group.add(person);this.movers.push({type:'person',obj:person,phase:i*2.1+d.q*3+d.r,speed:.25+i*.05});}
   const label=document.createElement('button');label.className='map-label';label.textContent=d.name;label.dataset.district=d.id;label.title=`Inspect ${d.name}`;label.addEventListener('click',()=>this.onSelect(d.id));this.container.append(label);this.labels.push({el:label,pos:g.pos.clone().add(new THREE.Vector3(0,1.35,0)),id:d.id});
  }
  for(const c of this.land){if(DISTRICTS.some(d=>d.q===c.q&&d.r===c.r))continue;const p=axial(c.q,c.r);for(let i=0;i<4;i++){const tr=this.asset('tree');tr.scale.setScalar(.7+((c.q*c.q+i)%3)*.12);tr.position.copy(p).add(new THREE.Vector3(Math.sin(i*2.3+c.r)*.70,.22,Math.cos(i*2.3+c.q)*.65));this.scene.add(tr);}if((c.q+c.r)%3===0){const h=this.asset('housing');h.scale.setScalar(.55);h.position.copy(p).add(new THREE.Vector3(0,.22,0));this.scene.add(h);}}
  // Pale avenue ribbons connect the institutions and make the board readable.
  const seen=new Set();for(const a of DISTRICTS)for(const b of DISTRICTS){const da=Math.abs(a.q-b.q)+Math.abs(a.r-b.r)+Math.abs(a.q+a.r-b.q-b.r);if(da!==2)continue;const key=[a.id,b.id].sort().join(':');if(seen.has(key))continue;seen.add(key);const from=axial(a.q,a.r),to=axial(b.q,b.r),dir=to.clone().sub(from),len=dir.length();const path=new THREE.Mesh(new THREE.PlaneGeometry(.11,len),new THREE.MeshStandardMaterial({color:'#dbd0b1',roughness:1}));path.rotation.x=-Math.PI/2;path.rotation.z=-Math.atan2(dir.x,dir.z);path.position.copy(from).add(to).multiplyScalar(.5);path.position.y=.245;path.receiveShadow=true;this.scene.add(path);}
  for(let i=0;i<3;i++){const boat=this.asset('boat');boat.scale.setScalar(1.3);this.scene.add(boat);this.movers.push({type:'boat',obj:boat,phase:i*2.2,radius:8.3+i*.5});}
  const tram=this.asset('tram');tram.scale.setScalar(1.1);this.scene.add(tram);this.movers.push({type:'tram',obj:tram});
  // Cartographic compass and small sea glints, no external textures.
  const glints=new THREE.BufferGeometry();const positions=[];for(let i=0;i<140;i++){const a=i*2.399,r=8+Math.sqrt(i)*1.6;positions.push(Math.cos(a)*r,-.23,Math.sin(a)*r);}glints.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));this.scene.add(new THREE.Points(glints,new THREE.PointsMaterial({color:'#739896',size:.028,transparent:true,opacity:.38})));
  this.batchStatics();this.setState(this.state);this.select(this.selected);
 }
 batchStatics(){
  for(const m of this.movers)m.obj.userData.moving=true;this.scene.updateMatrixWorld(true);const bins=new Map(),remove=[];
  this.scene.traverse(o=>{if(!o.isMesh||Array.isArray(o.material))return;let p=o,asset=false,moving=false;while(p){asset=asset||p.userData.blenderAsset;moving=moving||p.userData.moving;p=p.parent;}if(!asset||moving)return;const key=o.material.uuid+'-'+Object.keys(o.geometry.attributes).sort().join(',');if(!bins.has(key))bins.set(key,{material:o.material,geometries:[]});bins.get(key).geometries.push(o.geometry.clone().applyMatrix4(o.matrixWorld));remove.push(o);});
  for(const {material,geometries} of bins.values()){const mesh=new THREE.Mesh(mergeGeometries(geometries,false),material);mesh.castShadow=true;mesh.receiveShadow=true;this.scene.add(mesh);for(const g of geometries)g.dispose();}for(const o of remove)o.removeFromParent();
  // Repeated moving citizens use GPU instances while keeping independent paths.
  const people=this.movers.filter(m=>m.type==='person');this.peopleBatches=[];const parts=new Map();for(const m of people)m.obj.traverse(o=>{if(o.isMesh){const key=o.geometry.uuid+o.material.uuid;if(!parts.has(key))parts.set(key,[]);parts.get(key).push(o);}});
  for(const objects of parts.values()){const mesh=new THREE.InstancedMesh(objects[0].geometry,objects[0].material,objects.length);mesh.castShadow=true;mesh.receiveShadow=true;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;this.scene.add(mesh);objects.forEach(o=>o.visible=false);this.peopleBatches.push({mesh,objects});}
 }
 setState(state){this.state=state;if(!state)return;for(const d of state.districts){const g=this.districtGroups.get(d.id);if(!g)continue;if(this.overlay==='risk'){g.tile.material.color.set(d.exposure>65?'#bb735b':d.exposure>45?'#b2a06d':'#7eae9a');}else if(this.overlay==='capacity'){g.tile.material.color.set(d.projects.length?'#7cafae':'#b9bea4');}else g.tile.material.color.set(d.projects.length?'#a6bba0':'#b9bea4');
   if(this.library){for(let i=0;i<d.projects.length;i++){const key=d.id+'-'+d.projects[i];if(this.projectNodes.has(key))continue;const visual={appeal:'court',fallback:'hospital',audit:'lab',sources:'library',exit:'monument'}[d.projects[i]];const obj=this.asset(visual);obj.scale.setScalar(visual==='monument'?.6:.27);const a=i*1.8;obj.position.set(Math.sin(a)*.9,0,Math.cos(a)*.9);g.group.add(obj);this.projectNodes.set(key,obj);}for(const [key,obj] of this.projectNodes)if(key.startsWith(d.id+'-')&&!d.projects.some(p=>key===d.id+'-'+p)){obj.removeFromParent();this.projectNodes.delete(key);}}
  }
 }
 setOverlay(mode){this.overlay=mode;this.setState(this.state);}
 select(id){this.selected=id;const p=this.districtGroups.get(id)?.pos;if(p)this.ring.position.set(p.x,.265,p.z);this.labels.forEach(l=>l.el.classList.toggle('selected',l.id===id));}
 resize(){const w=this.container.clientWidth,h=this.container.clientHeight;if(!w||!h)return;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h);}
 reset(){this.angle=.57;this.distance=1;}
 animate(){this.raf=requestAnimationFrame(this.animate);const dt=Math.min(this.clock.getDelta(),.05);if(document.hidden)return;this.t+=this.reduced?0:dt;
  const ingame=document.body.classList.contains('in-game');const small=innerWidth<1000;const r=(ingame&&!small?24:25)*this.distance;this.camera.position.set(Math.sin(this.angle)*r,17*this.distance,Math.cos(this.angle)*r);this.camera.lookAt(0,0,0);
  // Shift the map optically into the free play area, keeping the board unobscured.
  if(ingame&&!small)this.camera.setViewOffset(this.container.clientWidth,this.container.clientHeight,-60,0,this.container.clientWidth,this.container.clientHeight);else this.camera.clearViewOffset();
  for(const m of this.movers){const t=this.t;if(m.type==='rotor')m.obj.rotation.z=t*.7;else if(m.type==='person'){const a=t*m.speed+m.phase;m.obj.position.set(Math.sin(a)*.96,Math.abs(Math.sin(a*12))*.008,Math.cos(a)*.78);m.obj.rotation.y=-a;}else if(m.type==='boat'){const a=t*.025+m.phase;m.obj.position.set(Math.cos(a)*m.radius,-.20+Math.sin(t*.8+m.phase)*.01,Math.sin(a)*m.radius*.75);m.obj.rotation.y=-a;}else if(m.type==='tram'){const a=(Math.sin(t*.12)+1)/2;const p=axial(0,1).lerp(axial(1,1),a);m.obj.position.set(p.x,.26,p.z+.63);m.obj.rotation.y=Math.PI/2;}}
  if(this.peopleBatches){this.scene.updateMatrixWorld(true);for(const {mesh,objects} of this.peopleBatches){objects.forEach((o,i)=>mesh.setMatrixAt(i,o.matrixWorld));mesh.instanceMatrix.needsUpdate=true;}}
  const w=this.container.clientWidth,h=this.container.clientHeight;for(const l of this.labels){const p=l.pos.clone().project(this.camera);l.el.style.transform=`translate(${(p.x*.5+.5)*w}px,${(-p.y*.5+.5)*h}px) translate(-50%,-100%)`;l.el.classList.toggle('quiet',!ingame&&l.id!=='assembly');}
  this.ring.material.opacity=this.reduced?.9:.72+Math.sin(this.t*2)*.18;this.renderer.render(this.scene,this.camera);this.frames=(this.frames||0)+1;
 }
 stats(){return {ready:this.ready,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,frames:this.frames,models:this.districtGroups.size,canvas:[this.renderer.domElement.width,this.renderer.domElement.height]};}
}

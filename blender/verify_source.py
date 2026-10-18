import bpy, json, os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
world=['parliament','court','hospital','lab','datacenter','school','media','housing','finance','station','port','library','energy','rotor','tree','monument','boat','tram','person']
people=['mara','leon','ines','samir','elsa','tomas','nora','ivo']
missing=[n for n in ['asset_'+x for x in world]+['asset_portrait_'+x for x in people] if n not in bpy.data.objects]
assert not missing,missing
report={'blender':bpy.app.version_string,'sourceOpened':True,'worldModels':len(world),'portraitSculptures':len(people),'missing':missing,'file':os.path.basename(bpy.data.filepath)}
with open(os.path.join(root,'qa','blender-source-verification.json'),'w') as f:json.dump(report,f,indent=2)
print(json.dumps(report))

import {NodeIO} from '@gltf-transform/core';
import {simplify,weld,prune} from '@gltf-transform/functions';
import {MeshoptSimplifier} from 'meshoptimizer';
import sharp from 'sharp';
await MeshoptSimplifier.ready;
const io=new NodeIO();
for (const [input,name] of [['coconut (1).glb','coconut'],['coconut_shell_monster_scan.glb','shell']]){
 const doc=await io.read('/workspace/scratch/da9418fed86a/upload/'+input);
 for(const tex of doc.getRoot().listTextures()){const im=tex.getImage();if(im)tex.setImage(new Uint8Array(await sharp(im).resize({width:1536,height:1536,fit:'inside',withoutEnlargement:true}).jpeg({quality:85}).toBuffer())).setMimeType('image/jpeg')}
 await doc.transform(weld(),simplify({simplifier:MeshoptSimplifier,ratio:name==='shell'?.18:.85,error:.002}),prune());
 await io.write('public/models/'+name+'.glb',doc);console.log(name,'optimised');
}

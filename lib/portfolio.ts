import {products,type Product} from './products';
import {divisions} from './divisions';
export const lines=[
 {key:'charcoal',title:'Charcoal',image:'reference/mhb-34.jpg',summary:'Cooking, grilling and specialist carbon grades.'},
 {key:'biomass',title:'Biomass Fuels',image:'reference/rashmi-bio-pellets.jpg',summary:'Pellets, agricultural residues and feedstocks.'},
 {key:'fruits',title:'Fruits & Produce',image:'reference/dragon-fruit.jpg',summary:'Tropical fruit, roots and nuts from Vietnam.'},
 {key:'spices',title:'Spices',image:'reference/star-anise-provided.webp',summary:'Whole spices for trade and processing.'}
] as const;
export function lineFor(p:Product){return lines.find(l=>l.key!=='charcoal' && (divisions[l.key].slugs as readonly string[]).includes(p.slug))||lines[0]}
export const pathFor=(p:Product)=>'/products/'+lineFor(p).key+'/'+p.slug;
export const members=(key:string)=>products.filter(p=>lineFor(p).key===key);
export function group(p:Product){return lineFor(p).key==='fruits'?(['cassava','cashew-nuts'].includes(p.slug)?'Roots & Nuts':'Fresh Fruit'):p.family}

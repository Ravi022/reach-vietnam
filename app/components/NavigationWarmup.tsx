'use client';
import {useEffect} from 'react';
/** Warm a likely destination without intercepting native link navigation. */
export default function NavigationWarmup(){useEffect(()=>{
 if(HTMLScriptElement.supports?.('speculationrules')){
 const script=document.createElement('script');script.type='speculationrules';
 script.textContent=JSON.stringify({prerender:[{source:'document',where:{and:[{href_matches:['/about','/process','/export','/products','/products/*','/faq']},{not:{selector_matches:'[download], [target="_blank"]'}}]},eagerness:'moderate'}]});
 document.head.appendChild(script);return()=>script.remove();
 }
 const warmed=new Set<string>();let timer:ReturnType<typeof setTimeout>;
 const warm=(event:Event)=>{const a=(event.target as Element)?.closest?.('a');if(!a||a.origin!==location.origin||a.pathname===location.pathname||a.hasAttribute('download'))return;clearTimeout(timer);timer=setTimeout(()=>{if(warmed.has(a.href)||warmed.size>=3)return;warmed.add(a.href);const link=document.createElement('link');link.rel='prefetch';link.as='document';link.href=a.href;document.head.appendChild(link)},150)};
 document.addEventListener('pointerover',warm);document.addEventListener('focusin',warm);
 return()=>{clearTimeout(timer);document.removeEventListener('pointerover',warm);document.removeEventListener('focusin',warm)};
},[]);return null}

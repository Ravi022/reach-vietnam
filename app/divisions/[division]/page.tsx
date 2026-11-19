import {permanentRedirect,notFound} from 'next/navigation';import {isDivision} from '@/lib/divisions';
export default async function Legacy({params}:{params:Promise<{division:string}>}){const {division}=await params;if(!isDivision(division))notFound();permanentRedirect('/products/'+division)}

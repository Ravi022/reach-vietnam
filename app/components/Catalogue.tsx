'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- route links use native navigation for reliable page loads in Sites. */

import {pathFor} from '@/lib/portfolio';
import {useCallback, useEffect, useMemo, useState, type CSSProperties} from 'react';
import {ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import {products, families, metric, isCharcoal, type Product} from '@/lib/products';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Dialog, DialogContent, DialogDescription, DialogTitle} from '@/components/ui/dialog';

type ProductCardProps = {
  product: Product;
  index?: number;
  onPreview?: () => void;
};

export function ProductCard({product: p, index = 0, onPreview}: ProductCardProps) {
  const responsive = Boolean(p.image) && !p.image.includes('/reference/');
  const image = responsive ? p.image.replace(/\.(jpg|webp)$/, '-640.webp') : p.image;
  const previewAction = onPreview
    ? <button className="product-arrow" type="button" aria-label={`Preview ${p.name}`} onClick={onPreview}><ArrowUpRight size={22}/></button>
    : <a className="product-arrow" href={pathFor(p)} aria-label={`View ${p.name}`}><ArrowUpRight size={22}/></a>;

  return <article className="product-card" style={{'--card-index': index % 9} as CSSProperties}>
    <div className="product-card-shell">
      <div className="product-photo">
        {p.image ? <a href={pathFor(p)}><img src={image} srcSet={responsive ? `${p.image.replace(/\.(jpg|webp)$/, '-400.webp')} 400w, ${image} 640w, ${p.image.replace(/\.(jpg|webp)$/, '-960.webp')} 960w` : undefined} sizes="(max-width:760px) 45vw, 30vw" width={640} height={480} alt={p.name} loading={index < 6 ? 'eager' : 'lazy'} decoding="async"/></a> : <div className="product-photo-pending"><span>{p.family}</span><strong>{p.name}</strong><small>Photo to follow</small></div>}
        <span className="product-index">{String(index + 1).padStart(2, '0')}</span>
        {previewAction}
      </div>
      <p className="eyebrow">{p.family}</p>
      <h3><a href={pathFor(p)}>{p.name}</a></h3>
      <div className="product-spec"><span>{['Fruits & produce','Spices','Wood & feedstock'].includes(p.family) ? p.material : metric(p, p.slug === 'activated-carbon' ? 'Iodine' : p.family === 'Advanced carbon' ? 'carbon' : 'calorific')}</span><span>{['Fruits & produce','Spices'].includes(p.family) ? 'Vietnam origin' : p.family === 'Advanced carbon' ? metric(p, 'Surface area') : p.family === 'Biomass fuels' ? metric(p, p.slug === 'pks' ? 'Shell size' : 'diameter') : metric(p, 'Burning')}</span></div>
      <a className="product-card-link" href={pathFor(p)}>View specifications <ArrowRight size={15}/></a>
    </div>
  </article>;
}

export default function Catalogue({compact = false}: {compact?: boolean}) {
  const [family, setFamily] = useState('All products');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    const apply = () => {
      const key = location.hash.slice(1);
      const nextFamily = ({biomass: 'Biomass fuels', charcoal: 'Charcoal', fruits: 'Fruits & produce', spices: 'Spices', carbon: 'Advanced carbon'} as Record<string, string>)[key] || 'All products';
      setFamily(nextFamily);
      setPreviewIndex(null);
    };
    if (!compact) {
      apply();
      window.addEventListener('hashchange', apply);
    }
    return () => window.removeEventListener('hashchange', apply);
  }, [compact]);

  const filtered = useMemo(() => products.filter(p => family === 'All products' || (family === 'Charcoal' ? isCharcoal(p) : p.family === family)), [family]);
  const featuredSlugs = ['coconut-shell-charcoal','eucalyptus-white-charcoal','sawdust-charcoal','bio-pellets','pks','dragon-fruit','fresh-coconut','black-pepper','cinnamon'];
  const shown = compact && family === 'All products' ? featuredSlugs.map(slug => products.find(p => p.slug === slug)!).filter(Boolean) : compact ? filtered.slice(0, 9) : filtered;
  const previewProduct = previewIndex === null ? null : shown[previewIndex] ?? null;
  const changeFamily = useCallback((nextFamily: string) => {
    setFamily(nextFamily);
    setPreviewIndex(null);
  }, []);
  const stepPreview = useCallback((direction: number) => {
    setPreviewIndex(current => {
      if (current === null || shown.length < 2) return current;
      return (current + direction + shown.length) % shown.length;
    });
  }, [shown.length]);

  const highlights = previewProduct ? [
    ['Calorific value', metric(previewProduct, 'calorific')],
    ['Burning time', metric(previewProduct, 'burning')],
    ['Fixed carbon', metric(previewProduct, 'carbon')],
    ['Surface area', metric(previewProduct, 'surface area')],
    ['Iodine number', metric(previewProduct, 'iodine')],
  ].filter(([, value]) => value !== 'By specification').slice(0, 2) : [];

  return <>
    <div className="catalogue">
      <Tabs value={family} onValueChange={changeFamily}>
        <TabsList className="catalogue-filters" variant="line" aria-label="Filter products by family">
          {families.map(f => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}
        </TabsList>
      </Tabs>
      <div className="catalogue-meta" aria-live="polite">
        <span>{compact ? 'A selection from our portfolio' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}</span>
        <span>{compact ? 'Select an image to preview' : 'Specifications for every application'}</span>
      </div>
      <div className="product-grid">
        {shown.map((p, i) => <ProductCard key={p.slug} product={p} index={i} onPreview={() => setPreviewIndex(i)}/>) }
      </div>
      {compact && <a href="/products" className="button green">Explore all {products.length} products <ArrowRight size={19}/></a>}
    </div>
    <Dialog open={previewProduct !== null} onOpenChange={open => {if (!open) setPreviewIndex(null)}}>
      {previewProduct && <DialogContent className="product-preview-dialog" aria-describedby="product-preview-description">
        <div className="product-preview-layout">
          <div className="product-preview-image">
            {previewProduct.image ? <img src={previewProduct.image} alt={previewProduct.name} decoding="async"/> : <div className="product-photo-pending"><span>{previewProduct.family}</span><strong>{previewProduct.name}</strong><small>Photo to follow</small></div>}
            <span>{String(previewIndex! + 1).padStart(2, '0')} / {shown.length}</span>
          </div>
          <div className="product-preview-copy">
            <p className="eyebrow">{previewProduct.family}</p>
            <DialogTitle>{previewProduct.name}</DialogTitle>
            <DialogDescription id="product-preview-description">{previewProduct.description}</DialogDescription>
            {highlights.length > 0 && <div className="product-preview-highlights">{highlights.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}
            <a className="button green product-preview-cta" href={`/products/${previewProduct.slug}`}>View full specifications <ArrowUpRight size={18}/></a>
            <div className="product-preview-controls">
              <button type="button" onClick={() => stepPreview(-1)} disabled={shown.length < 2} aria-label="Previous product"><ArrowLeft size={16}/> Previous</button>
              <span>{String(previewIndex! + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => stepPreview(1)} disabled={shown.length < 2} aria-label="Next product">Next <ArrowRight size={16}/></button>
            </div>
          </div>
        </div>
      </DialogContent>}
    </Dialog>
  </>;
}

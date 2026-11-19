import type {Product} from '@/lib/products';
import './division-hero-range.css';

const containPhotos = new Set(['pks', 'copra', 'cassava']);

const smallerPhotos: Record<string, string> = {
  durian: '/images/reference/durian-division.webp',
  'agri-waste-pellets': '/images/reference/rashmi-agri-waste-pellets-division.webp',
};

export function divisionPhoto(product: Product) {
  return smallerPhotos[product.slug] ?? product.image;
}

type Props = {
  range: readonly Product[];
  title: string;
  hrefPrefix: string;
  eager?: boolean;
};

export default function DivisionHeroRange({range, title, hrefPrefix, eager = false}: Props) {
  return <div className={'hero-range hero-range--' + range.length} role="group" aria-label={title + ' products'}>
    {range.map((product, i) => {
      const photo = divisionPhoto(product);
      return <a className={'hero-range-tile' + (photo ? (containPhotos.has(product.slug) ? ' hero-range-tile--contained' : '') : ' hero-range-tile--label')} key={product.slug} href={hrefPrefix + product.slug}>
        {photo && <img src={photo} alt="" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager && i === 0 ? 'high' : undefined} decoding="async"/>}
        <span className="hero-range-name">{product.name}</span>
      </a>;
    })}
  </div>;
}

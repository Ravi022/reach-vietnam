import { ArrowDown, ArrowUpRight } from 'lucide-react';

const materials = [
  { slug: 'wood-charcoal', label: 'HARDWOOD' },
  { slug: 'bamboo-charcoal-briquettes', label: 'BAMBOO' },
  { slug: 'sawdust-briquettes-charcoal', label: 'SAWDUST' },
  { slug: 'coconut-shell-charcoal', label: 'COCONUT SHELL' },
];

export default function ScrollStory() {
  return (
    <section className="range-hero" aria-labelledby="range-hero-title">
      <div className="range-hero-scene" aria-label="Charcoal products displayed in a natural garden setting">
        <img className="range-hero-art" src="/images/hero-green-range.webp" width="1536" height="1024" alt="Hardwood, bamboo and sawdust charcoal with coconut shell charcoal, displayed together on a pale stone surface in a bright garden" fetchPriority="high" />
        <div className="range-hero-materials" aria-label="Explore charcoal varieties">
          {materials.map((material) => (
            <a className="range-material" href={`/products/charcoal/${material.slug}`} key={material.slug}>{material.label}</a>
          ))}
        </div>
      </div>

      <div className="range-hero-copy">
        <h1 id="range-hero-title">Charcoal<br /><em>from Vietnam.</em></h1>
        <p className="range-hero-description">Hardwood, bamboo, sawdust and coconut shell charcoal for commercial buyers.</p>
        <a className="range-hero-button" href="#range">Browse charcoal by type <ArrowUpRight size={19} strokeWidth={1.7} /></a>
      </div>

      <a className="range-hero-scroll" href="#range"><span>SCROLL TO DISCOVER</span><ArrowDown size={17} strokeWidth={1.6} /></a>
    </section>
  );
}

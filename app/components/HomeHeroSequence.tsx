import DivisionHeroRange from './DivisionHeroRange';
import ScrollStory from './ScrollStory';
import {divisions, type DivisionKey} from '@/lib/divisions';
import {products, type Product} from '@/lib/products';
import './home-hero-sequence.css';

const order = ['biomass', 'fruits', 'spices'] as const satisfies readonly DivisionKey[];

export default function HomeHeroSequence() {
  return <div className="home-hero-sequence" id="hero-charcoal">
    <ScrollStory/>
    <nav id="businesses" className="wrap home-hero-jump" aria-label="Homepage hero images">
      <a href="#hero-charcoal">Charcoal</a>
      {order.map(key => <a href={'#hero-' + key} key={key}>{divisions[key].title}</a>)}
    </nav>
    {order.map((key, index) => {
      const d = divisions[key];
      const range = d.slugs.map(slug => products.find(product => product.slug === slug)).filter((p): p is Product => Boolean(p));
      const titleId = 'hero-' + key + '-title';
      const next = order[index + 1];
      return <section key={key} id={'hero-' + key} className={'home-hero-panel home-hero-panel--' + d.theme} aria-labelledby={titleId}>
        <div className="wrap home-hero-panel-inner">
          <div className="home-hero-panel-copy">
            <p className="home-hero-kicker">{d.title}</p>
            <h2 id={titleId}>{d.heading} <em>{d.emphasis}</em></h2>
            <p className="home-hero-panel-summary">{d.intro}</p>
            <div className="home-hero-panel-actions">
              <a className="home-hero-cta" href={'/divisions/' + key}>Explore {d.title}</a>
              <a className="home-hero-next" href={next ? '#hero-' + next : '#sourcing'}>{next ? 'Next: ' + divisions[next].title : 'How we work'}</a>
            </div>
          </div>
          <div className="home-hero-panel-photo"><DivisionHeroRange range={range} title={d.title} hrefPrefix={'/divisions/' + key + '#'}/></div>
        </div>
      </section>;
    })}
  </div>;
}

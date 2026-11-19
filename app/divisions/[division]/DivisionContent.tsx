import {pathFor} from '@/lib/portfolio';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import DivisionHeroRange, {divisionPhoto} from '../../components/DivisionHeroRange';
import QualityAssurance from '../../components/QualityAssurance';
import {Navigation, Footer} from '../../components/Navigation';
import {divisions, isDivision} from '@/lib/divisions';
import {products, type Product} from '@/lib/products';
import './division.css';

type PageProps = {params: Promise<{division: string}>};

export function generateStaticParams() {
  return Object.keys(divisions).map(division => ({division}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {division} = await params;
  if (!isDivision(division)) return {};
  return {title: divisions[division].title + ' | Reach Vietnam Company Limited', description: divisions[division].intro};
}

export default async function DivisionPage({params}: PageProps) {
  const {division} = await params;
  if (!isDivision(division)) notFound();
  const d = divisions[division];
  const range = d.slugs.map(slug => products.find(product => product.slug === slug)).filter((p): p is Product => Boolean(p));

  return <main id="top" className={'division division--' + d.theme}>
    <Navigation light/><nav className="rv-crumb home-frame"><a href="/">Home</a> / <a href="/products">Our Products</a> / {d.title}</nav>
    <section className="division-hero" aria-labelledby="division-title">
      <div className="division-hero-inner wrap">
        <div className="division-intro">
          <p className="division-kicker">{d.title}</p>
          <h1 id="division-title">{d.heading}<br/><em>{d.emphasis}</em></h1>
          <p className="division-deck">{d.intro}</p>
          <div className="division-actions"><a className="division-button" href="#range">Explore the range</a><a className="division-secondary" href="#enquiry">Plan an enquiry</a></div>
        </div>
        <DivisionHeroRange range={range} title={d.title} hrefPrefix="#" eager/>
      </div>
    </section>

    <nav className="division-jump" aria-label={d.title + ' product sections'}>
      <div className="wrap division-jump-inner">{range.map(p => <a key={p.slug} href={'#' + p.slug}>{p.name}</a>)}<a href="#quality">Quality</a><a className="division-jump-enquiry" href="#enquiry">Enquiry</a></div>
    </nav>

    <section id="range" className="division-range wrap" aria-labelledby="range-heading">
      <div className="division-section-heading"><p className="division-kicker">Product range</p><h2 id="range-heading">{d.range}</h2></div>
      {range.map(p => {
        const facts = division === 'biomass' ? p.specs.filter(([label]) => /calorific|diameter|shell size|moisture|product form/i.test(label)).slice(0, 3) : p.specs.filter(([label]) => /origin|form|grade|availability/i.test(label));
        return <article className={'division-chapter' + (!p.image ? ' division-chapter--text' : '')} id={p.slug} key={p.slug}>
          {p.image && <figure className="division-chapter-image"><a href={pathFor(p)}><img src={divisionPhoto(p)} alt={p.name} loading="lazy" decoding="async"/></a></figure>}
          <div className="division-chapter-copy">
            <p className="division-kicker">{p.slug === 'copra' ? 'Commodity sourcing' : d.title}</p>
            <h3><a href={pathFor(p)}>{p.name}</a></h3>
            <p>{p.description}</p>
            {facts.length > 0 && <dl className="division-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            <div className="division-actions"><a className="division-button" href={pathFor(p)}>View specifications</a><a className="division-secondary" href={'/contact?product=' + p.slug}>Enquire about {p.name}</a></div>
            {!p.image && <small className="division-photo-note">Product photo to follow</small>}
          </div>
        </article>;
      })}
    </section>

    <QualityAssurance range={range}/>

    <section id="enquiry" className="division-enquiry wrap" aria-labelledby="division-enquiry-title">
      <div><p className="division-kicker">Trade enquiries</p><h2 id="division-enquiry-title">{d.brief}</h2><a className="division-button" href="/contact">Prepare an enquiry</a></div>
      <div><p>Include these details so we can respond to your requirements:</p><ul>{d.ask.map(item => <li key={item}>{item}</li>)}</ul></div>
    </section>
    <Footer/>
  </main>;
}

'use client';
import {useState} from 'react';
import type {Product} from '@/lib/products';
import {Check} from 'lucide-react';

const trust = [
  'Published reference specification for every product',
  'Certificate of analysis available on request',
  'Third-party pre-shipment inspection available',
  'Packing and documentation confirmed before dispatch',
];

export default function QualityAssurance({range}: {range: readonly Product[]}) {
  const [active, setActive] = useState(0);
  const product = range[active];
  if (!product) return null;

  return <section id="quality" className="division-quality wrap" aria-labelledby="quality-heading">
    <div className="division-section-heading"><p className="division-kicker">Quality &amp; assurance</p><h2 id="quality-heading">Specifications you can put in a contract.</h2></div>
    <div className="quality-layout">
      <div className="quality-table-wrap">
        <div className="quality-tabs" role="tablist" aria-label="Select a product to view its specification">
          {range.map((p, i) => <button key={p.slug} type="button" role="tab" aria-selected={i === active} className={'quality-tab' + (i === active ? ' is-active' : '')} onClick={() => setActive(i)}>{p.name}</button>)}
        </div>
        <table className="quality-table">
          <thead><tr><th>Parameter</th><th>Reference value</th></tr></thead>
          <tbody>{product.specs.map(([label, value]) => <tr key={label}><td>{label}</td><td>{value}</td></tr>)}</tbody>
        </table>
        <p className="quality-note">Select a product to compare. Final values, test basis and availability are confirmed per order.</p>
      </div>
      <div className="quality-trust">
        <h3>Why buyers choose Reach Vietnam</h3>
        <ul>{trust.map(item => <li key={item}><Check size={17}/> {item}</li>)}</ul>
        <a className="division-button" href={'/contact?product=' + product.slug}>Request product samples</a>
      </div>
    </div>
  </section>;
}

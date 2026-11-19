export const homeLogo = '/images/brand/reach-vietnam-logo.webp';

import {lines} from '@/lib/portfolio';
import {company} from '@/lib/company';
import '../homepage.css';
const menu=[['About Us','/about'],['Global Supply','/global-supply'],['Contact','/contact']] as const;
function Choices(){return <>{lines.map(l=><a key={l.key} href={'/products/'+l.key}>{l.title}</a>)}</>}
function HomeLogo() {
  return <a className="home-brand-logo" href="/" aria-label="Reach Vietnam Company Limited home">
    <img src={homeLogo} width="760" height="156" alt="Reach Vietnam Company Limited"/>
  </a>;
}

export function HomeHeader() {
  return <header className="home-masthead">
    <div className="home-frame home-masthead-inner">
      <HomeLogo/>
      <nav className="home-masthead-links" aria-label="Main navigation">
        <a href="/">Home</a><span className="rv-product-nav"><a href="/products">Our Products</a><details><summary aria-label="Show product categories">⌄</summary><div><Choices/></div></details></span>{menu.map(([label,href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="home-masthead-actions">
        <a className="home-masthead-phone" href={'tel:'+company.phoneDial}>{company.phoneDisplay}</a>
        <a className="home-btn home-btn--outline home-masthead-enquiry" href="/contact">Send an enquiry</a>
      </div>
      <details className="home-mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation"><a href="/">Home</a><a href="/products"><b>Our Products</b></a><Choices/>{menu.map(([label,href]) => <a key={href} href={href}>{label}</a>)}<a href="/contact">Send an enquiry</a><a href={'tel:'+company.phoneDial}>{company.phoneDisplay}</a></nav>
      </details>
    </div>
  </header>;
}

export function HomeFooter() {
  return <footer className="home-footer">
    <div className="home-frame">
      <div className="home-footer-main">
        <div><HomeLogo/><p>Vietnamese products for<br/>international buyers.</p><div className="home-footer-contact"><a href={'mailto:'+company.email}>{company.email}</a><a href={'tel:'+company.phoneDial}>{company.phoneDisplay}</a><a href={company.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a><span>{company.officeLabel}</span></div></div>
        <nav aria-label="Product divisions">
          <h2>Our Products</h2>
          <a href="/products/charcoal">Charcoal</a>
          <a href="/products/biomass">Biomass Fuels</a>
          <a href="/products/fruits">Fruits &amp; Produce</a>
          <a href="/products/spices">Spices</a>
        </nav>
        <nav aria-label="Company links">
          <h2>Reach Vietnam</h2>
          <a href="/about">Our company</a>
          <a href="/process">How we source</a>
          <a href="/global-supply">Global supply</a>
          <a href="/contact">Send an enquiry</a>
        </nav>
        <nav aria-label="Buyer resources">
          <h2>Buyer Resources</h2>
          <a href="/faq">Buyer FAQ</a>
          <a href="/faq#eudr">EU deforestation rules (EUDR)</a>
          <a href="/faq#lacey-act">US Lacey Act compliance</a>
          <a href="/global-supply#gallery">Production &amp; export gallery</a>
        </nav>
      </div>
      <div className="home-footer-bottom"><span>© {new Date().getFullYear()} Reach Vietnam Company Limited · Office: {company.officeLabel}</span><a href="#top">Back to top</a></div>
    </div>
  </footer>;
}

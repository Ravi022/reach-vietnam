import {HomeHeader, HomeFooter} from './components/HomeBrand';
import Directory from './components/Directory';
import HomeHeroCarousel from './components/HomeHeroCarousel';
import {HomeServes} from './components/HomeCredibility';
import './homepage.css';

const stages = [
  ['Share your brief', 'Tell us the product, intended use, volume and destination.'],
  ['Confirm the grade', 'Review the available specifications and agree on the product grade and pack format.'],
  ['Plan your shipment', 'Confirm lead time, delivery terms and the documents needed for your market.'],
] as const;

export default function Home() {
  return <main id="top" className="reach-home">
    <HomeHeader/>
    <HomeHeroCarousel/>
    <Directory/>
    <HomeServes/>
    <section className="rv-about home-frame"><p className="home-pretitle">About Reach Vietnam</p><h2>One sourcing partner in Vietnam.</h2><p>Charcoal is our core business. Our portfolio also connects buyers with biomass fuels, fruits and produce, and whole spices. Each division has its own range and specifications.</p><div className="rv-about-reasons"><div><strong>Four categories, each specified on its own terms</strong><span>Charcoal is judged by heat and ash, biomass by moisture and feedstock, fruit and spice by grade and packing — each division's range reflects what actually matters for that material.</span></div><div><strong>One point of contact</strong><span>A single enquiry route across four product categories instead of four separate suppliers.</span></div><div><strong>Specification-first sourcing</strong><span>Fixed carbon, calorific value, moisture and grade codes published on every product page before you ask — then confirmed and tested per order.</span></div></div><a className="home-text-link" href="/about">About our company</a></section>

    <section className="home-sourcing home-frame" id="sourcing" aria-labelledby="sourcing-heading">
      <div className="home-section-intro">
        <div><p className="home-pretitle">From enquiry to shipment</p><h2 id="sourcing-heading">How we work<br/><em>with buyers.</em></h2></div>
        <div><p>We help importers, distributors and wholesalers source charcoal, biomass fuels, tropical produce and spices from Vietnam.</p><a className="home-text-link" href="/about">Meet Reach Vietnam</a></div>
      </div>
      <ol className="home-steps">
        {stages.map(([title, detail], i) => <li key={title}><span aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{detail}</p></li>)}
      </ol>
      <a className="home-text-link" href="/process">See how we source and supply</a>
    </section>

    <section className="home-global" id="global-supply" aria-labelledby="supply-heading">
      <div className="home-frame home-global-inner">
        <div>
          <p className="home-pretitle">Global supply</p>
          <h2 id="supply-heading">From Vietnam<br/><em>to your market.</em></h2>
          <p>Tell us where your goods are going. We can discuss suitable packing, documentation and delivery terms for that destination.</p>
          <a className="home-btn home-btn--light" href="/global-supply">Explore export planning</a>
        </div>
        <figure className="home-map"><img src="/images/world-map.svg" alt="" loading="lazy" decoding="async" width="860" height="440"/><figcaption>Vietnam · International trade</figcaption></figure>
      </div>
    </section>

    <section className="home-enquiry home-frame" id="trade-enquiry" aria-labelledby="enquiry-heading">
      <p className="home-pretitle">Trade enquiries</p>
      <div className="home-enquiry-inner">
        <div><h2 id="enquiry-heading">What are you <em>sourcing?</em></h2><p>Share your product, estimated volume and destination to start a quotation.</p></div>
        <a className="home-btn" href="/contact">Send a trade enquiry</a>
      </div>
    </section>

    <HomeFooter/>
  </main>;
}

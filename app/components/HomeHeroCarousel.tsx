'use client';

import {useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, ArrowUpRight} from 'lucide-react';
import {divisions} from '@/lib/divisions';
import {products} from '@/lib/products';
import {pathFor} from '@/lib/portfolio';
import './home-hero-carousel.css';

type Chip = {label: string; href: string};
type Slide = {
  key: string;
  kicker: string;
  heading: string;
  emphasis: string;
  description: string;
  image: string;
  imageAlt: string;
  fit: 'cover' | 'contain';
  href: string;
  ctaLabel: string;
  chips: Chip[];
};

function chipsFor(key: 'biomass' | 'fruits' | 'spices'): Chip[] {
  return divisions[key].slugs
    .map(slug => products.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4)
    .map(p => ({label: p.name, href: pathFor(p)}));
}

const slides: Slide[] = [
  {
    key: 'charcoal',
    kicker: 'Charcoal',
    heading: 'Charcoal from',
    emphasis: 'Vietnam.',
    description: 'Hardwood, bamboo, sawdust and coconut shell charcoal for commercial buyers.',
    image: '/Reach-Vietnam-Four-Heroes/Charcoal-Hero.webp',
    imageAlt: 'Charcoal, bamboo rods, pressed briquettes and coconut shell charcoal displayed on a stone surface overlooking Vietnamese hills',
    fit: 'cover',
    href: '/products/charcoal',
    ctaLabel: 'Explore Charcoal',
    chips: [
      {label: 'Hardwood', href: '/products/charcoal/wood-charcoal'},
      {label: 'Bamboo', href: '/products/charcoal/bamboo-charcoal-briquettes'},
      {label: 'Sawdust', href: '/products/charcoal/sawdust-briquettes-charcoal'},
      {label: 'Coconut Shell', href: '/products/charcoal/coconut-shell-charcoal'},
    ],
  },
  {
    key: 'biomass',
    kicker: divisions.biomass.title,
    heading: divisions.biomass.heading,
    emphasis: divisions.biomass.emphasis,
    description: divisions.biomass.intro,
    image: '/Reach-Vietnam-Four-Heroes/Biomass-Fuels-Hero.webp',
    imageAlt: 'Wood pellets, black pellets, agri-waste pellets, palm kernel shell and copra arranged for comparison',
    fit: 'contain',
    href: '/divisions/biomass',
    ctaLabel: 'Explore ' + divisions.biomass.title,
    chips: chipsFor('biomass'),
  },
  {
    key: 'fruits',
    kicker: divisions.fruits.title,
    heading: divisions.fruits.heading,
    emphasis: divisions.fruits.emphasis,
    description: divisions.fruits.intro,
    image: '/Reach-Vietnam-Four-Heroes/Fruits-and-Produce-Hero.webp',
    imageAlt: 'Cashew nuts, cassava, dragon fruit, fresh coconut, banana and durian arranged for comparison',
    fit: 'contain',
    href: '/divisions/fruits',
    ctaLabel: 'Explore ' + divisions.fruits.title,
    chips: chipsFor('fruits'),
  },
  {
    key: 'spices',
    kicker: divisions.spices.title,
    heading: divisions.spices.heading,
    emphasis: divisions.spices.emphasis,
    description: divisions.spices.intro,
    image: '/Reach-Vietnam-Four-Heroes/Spices-Hero.webp',
    imageAlt: 'Star anise, black pepper and cinnamon sticks arranged for comparison',
    fit: 'contain',
    href: '/divisions/spices',
    ctaLabel: 'Explore ' + divisions.spices.title,
    chips: chipsFor('spices'),
  },
];

const AUTOPLAY_MS = 6500;
const RESUME_AFTER_TOUCH_MS = 3200;
const SWIPE_THRESHOLD = 44;

export default function HomeHeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const id = window.setInterval(() => setActive(current => (current + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  useEffect(() => () => resumeTimer.current && clearTimeout(resumeTimer.current), []);

  const go = (index: number) => setActive((index + slides.length) % slides.length);

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_TOUCH_MS);
  };

  return (
    <section
      className={'hero-carousel' + (paused ? ' is-paused' : '')}
      aria-roledescription="carousel"
      aria-label="Reach Vietnam business divisions"
      style={{'--hero-autoplay-duration': AUTOPLAY_MS + 'ms'} as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') go(active + 1);
        if (e.key === 'ArrowLeft') go(active - 1);
      }}
      onTouchStart={e => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={e => {
        if (touchStartX.current !== null) {
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta <= -SWIPE_THRESHOLD) go(active + 1);
          else if (delta >= SWIPE_THRESHOLD) go(active - 1);
        }
        touchStartX.current = null;
        scheduleResume();
      }}
    >
      <div className="hero-carousel-stage">
        {slides.map((slide, i) => (
          <article className={'hero-carousel-slide' + (i === active ? ' is-active' : '')} key={slide.key} id={'hero-' + slide.key} aria-hidden={i !== active}>
            <div className="hero-carousel-copy">
              <p className="hero-carousel-kicker">{slide.kicker}</p>
              <h1>{slide.heading} <em>{slide.emphasis}</em></h1>
              <p className="hero-carousel-description">{slide.description}</p>
              <div className="hero-carousel-actions">
                <a className="hero-carousel-cta" href={slide.href} tabIndex={i === active ? 0 : -1}>{slide.ctaLabel} <ArrowUpRight size={18} strokeWidth={1.7} /></a>
              </div>
              <div className="hero-carousel-chips">
                {slide.chips.map(chip => <a key={chip.href} href={chip.href} tabIndex={i === active ? 0 : -1}>{chip.label}</a>)}
              </div>
            </div>
            <div className={'hero-carousel-image-panel hero-carousel-image-panel--' + slide.fit}>
              <img className="hero-carousel-image" src={slide.image} alt={slide.imageAlt} fetchPriority={i === 0 ? 'high' : undefined} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
            </div>
          </article>
        ))}
      </div>

      <button type="button" className="hero-carousel-arrow hero-carousel-arrow--prev" onClick={() => go(active - 1)} aria-label="Previous division">
        <ChevronLeft size={20} strokeWidth={1.8} />
      </button>
      <button type="button" className="hero-carousel-arrow hero-carousel-arrow--next" onClick={() => go(active + 1)} aria-label="Next division">
        <ChevronRight size={20} strokeWidth={1.8} />
      </button>

      <div className="hero-carousel-dots" role="tablist" aria-label="Choose a business division">
        {slides.map((slide, i) => (
          <button key={slide.key} type="button" role="tab" aria-selected={i === active} aria-controls={'hero-' + slide.key} className={'hero-carousel-dot' + (i === active ? ' is-active' : '')} onClick={() => go(i)}>
            <span>{slide.kicker}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

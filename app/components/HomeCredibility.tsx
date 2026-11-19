const segments = [
  ['Importers & distributors', 'Container-load or part-load volumes, with specification sheets ready for your own resale catalogue.'],
  ['Supermarkets & retail chains', 'Retail-ready pack sizes and private-label formats for fresh produce and spice lines.'],
  ['Hotels, restaurants & catering', 'Consistent-burn charcoal grades sized for commercial kitchens and BBQ service.'],
  ['BBQ and shisha brands', 'Coconut shell and hardwood charcoal graded by ash content and burn time for branded product lines.'],
  ['Biomass & power plant buyers', 'Wood, black and agri-residue pellets with calorific value and moisture specified per lot.'],
  ['Food & ingredient manufacturers', 'Graded cashew, pepper and cassia for recipe formulation, with test-basis documentation on request.'],
] as const;

export function HomeServes() {
  return <section className="home-serves" aria-labelledby="serves-heading">
    <div className="home-frame">
      <p className="home-pretitle" id="serves-heading">Who we serve</p>
      <dl className="home-serves-grid">{segments.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl>
    </div>
  </section>;
}

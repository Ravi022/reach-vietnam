export const divisions = {
  spices: {
    title: 'Spices', family: 'Spices', theme: 'spice',
    heading: 'Spices from', emphasis: 'Vietnam.',
    intro: 'Source whole spices with the form, grade and packing your market needs. Explore cinnamon, black pepper and star anise.',
    slugs: ['star-anise', 'black-pepper', 'cinnamon'],
    range: 'Explore the spice range.',
    brief: 'Build your spice enquiry.',
    ask: ['Product and form', 'Grade and testing requirements', 'Quantity and pack size'],
    filter: 'spices',
  },
  fruits: {
    title: 'Fruits & Produce', family: 'Fruits & produce', theme: 'fruit',
    heading: 'Tropical produce.', emphasis: 'Sourced in Vietnam.',
    intro: 'Explore cashew nuts, cassava, dragon fruit, coconut, banana and durian. Tell us your destination and delivery window so we can discuss seasonal availability and packing.',
    slugs: ['cashew-nuts', 'cassava', 'dragon-fruit', 'fresh-coconut', 'banana', 'durian'],
    range: 'Explore the produce range.',
    brief: 'Plan your produce order.',
    ask: ['Variety, size and grade', 'Destination and delivery window', 'Pack format and handling needs'],
    filter: 'fruits',
  },
  biomass: {
    title: 'Biomass Fuels', family: 'Biomass fuels', theme: 'fuel',
    heading: 'Biomass for', emphasis: 'industrial heat.',
    intro: 'Compare wood, black and agricultural residue pellets and palm kernel shell. Copra is also available for separate commodity enquiries.',
    slugs: ['bio-pellets', 'black-pellets', 'agri-waste-pellets', 'pks', 'copra'],
    range: 'Explore fuels and feedstocks.',
    brief: 'Tell us what your system needs.',
    ask: ['Application and fuel specification', 'Expected volume and pack format', 'Destination and delivery terms'],
    filter: 'biomass',
  },
} as const;

export type DivisionKey = keyof typeof divisions;
export const isDivision = (key: string): key is DivisionKey => Object.hasOwn(divisions, key);

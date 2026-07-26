export interface AboutCard {
  title: string;
  desc: string;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Domain depth first',
    desc: 'I study the domain before touching code. The quality gap between most software and what practitioners actually need is almost always a knowledge problem, not a technical one.',
  },
  {
    title: 'Privacy by design',
    desc: 'I think carefully about what data should and should not leave a user\'s machine — not as a compliance checkbox, but as an architectural constraint from the start.',
  },
  {
    title: 'Lean infrastructure',
    desc: 'Tight budgets force better decisions. I build with the smallest footprint that meets the requirement, and treat every unnecessary dependency as a liability.',
  },
  {
    title: 'Ship, then refine',
    desc: 'A working version in front of real users is worth more than a perfect architecture in a design doc. I move fast on the first version and let actual use reveal what matters.',
  },
];

export const PRINCIPLES = [
  'Understand the domain before writing a line of code.',
  'Privacy is a feature, not a compliance checkbox.',
  'Ship a working version before optimising the architecture.',
  'Find the gap in existing tools — build replacements, not clones.',
  'Treat every unnecessary dependency as a liability.',
];

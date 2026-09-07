export const DISCORD_ID = '835137181504372806';

export interface Quote {
  text: string;
  source: string;
}

export const SITE = {
  name: 'Kuureki',
  role: 'Student & indie builder',
  location: 'Kamiyama',
  bio: 'I build products where **consumer entertainment culture** meets **systems engineering**. Right now that\'s **Seasonly**, an AI admin for Discord, and **Brume**, a rate-limiting API in Rust — both served by me.',
  longBio:
    'I care about products that are honest, well-crafted, and solve problems that actually exist. My work sits at the intersection of consumer entertainment culture and systems engineering.',
  email: 'hey@kuureki.com',
};

export const SOCIALS = {
  github: 'https://github.com/kuureki',
  twitter: 'https://twitter.com/kuureki',
  discord: `https://discord.com/users/${DISCORD_ID}`,
  email: `mailto:hey@kuureki.com`,
};

export const BADGES = [
  { label: 'Building actively', type: 'green' as const, animated: true },
  { label: 'Seasonly · Brume', type: 'violet' as const, animated: false },
  { label: SITE.location, type: 'default' as const, animated: false },
];

export const QUOTES: Quote[] = [
  {
    text: 'The world isn\'t perfect. But it\'s there for us, doing the best it can. That\'s what makes it so damn beautiful.',
    source: 'Fullmetal Alchemist',
  },
  {
    text: 'If you don\'t take risks, you can\'t create a future.',
    source: 'Monkey D. Luffy, One Piece',
  },
  {
    text: 'You should never give up on something you truly want.',
    source: 'Natsu Dragneel, Fairy Tail',
  },
  {
    text: 'A lesson without pain is a lesson unlearned.',
    source: 'Dudley Blackwell',
  },
  {
    text: 'The only thing we have to fear is fear itself.',
    source: 'Franklin D. Roosevelt',
  },
  {
    text: 'Even if we forget the reasons for our fights, the feelings between us never change.',
    source: 'Naruto',
  },
];

export const CURRENT_OBSESSION = {
  type: 'book' as const,
  title: 'A Philosophy of Software Design',
  subtitle: 'John Ousterhout, 2018',
  note: 'Re-reading on module design and the cost of complexity. Every chapter makes me reconsider at least one decision I have made.',
};

export const GITHUB_USERNAME = 'kuureki';

export const PRINCIPLES = [
  {
    title: 'Understand the domain first',
    desc: 'The quality gap between most software and what practitioners actually need is almost always a knowledge problem, not a technical one.',
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

export const DISCORD_ID = '835137181504372806';

export interface Quote {
  text: string;
  source: string;
}

export const SITE = {
  name: 'Kuureki',
  role: 'Student & indie builder',
  location: 'Kamiyama',
  bio: 'Student. Building **Seasonly**, an AI admin for Discord, and **Brume**, a rate-limiting API in Rust. I like products that feel hand-made, and infrastructure you can actually hold in your head.',
  longBio:
    'I build products for a living and I am picky about them. Right now that is Seasonly, an AI admin for Discord that never touches the API without your approval, and Brume, a rate-limiting API in Rust where one round trip answers the only question that matters.\n\nI like software that is honest about what it does, small enough to hold in your head, and built by people who care. I would rather write the boring version that ships than the clever version that does not. My portfolio runs on a static Next.js app with no database and no CMS, because life is short and I do not want to maintain infrastructure for a marketing page.\n\nOff the computer I read, play games, and keep up with whatever anime season is on. Some of it shows up in the quotes on my activity page.',
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

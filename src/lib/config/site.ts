export const DISCORD_ID = '835137181504372806';

export const SITE = {
  name: 'Kuureki',
  role: 'Student & indie builder',
  location: 'Kamiyama',
  bio: 'Student. Building **Seasonly**, a roguelike that runs inside Discord, and **Brume**, a rate-limiting API in Rust. I like products that feel hand-made, and infrastructure you can actually hold in your head.',
  longBio:
    'I build products for a living and I am picky about them. Right now that is Seasonly, a roguelike where a whole run happens inside a Discord channel, and Brume, a rate-limiting API in Rust where one round trip answers the only question that matters.\n\nI like software that is honest about what it does, small enough to hold in your head, and built by people who care. I would rather write the boring version that ships than the clever version that does not. My portfolio runs on a static Next.js app with no database and no CMS, because life is short and I do not want to maintain infrastructure for a marketing page.\n\nOff the computer I read, play games, and keep up with whatever anime season is on. My AniList favourites on the home page are a fair sample.',

  email: 'hey@kuureki.com',
  footerBio:
    'Student and indie builder. Currently shipping Seasonly and Brume.',
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

export const NOW_UPDATED = 'October 2026';

export const ANILIST_USERNAME = 'kuureki';

export const GITHUB_USERNAME = 'kuureki';

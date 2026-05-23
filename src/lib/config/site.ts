export const DISCORD_ID = '835137181504372806';

export const SITE = {
  name: 'Kuureki',
  role: 'Student & indie builder',
  bio: 'I build products at the intersection of **consumer entertainment culture** and **systems engineering**. **Megami**, a Discord economy bot with full relationship mechanics — ownership, trading, marriage, and a community drama feed. **Seasonly**, a fantasy league platform for seasonal entertainment drafts — users predict their top picks and score against real performance data. **Brume**, a Rust realtime gateway that competes with Pusher and Ably but is entirely self-hostable and DB-agnostic. I care about products that are honest, well-crafted, and solve problems that actually exist.',
  email: 'hello@kuureki.com',
};

export const SOCIALS = {
  github: 'https://github.com/kuureki',
  twitter: 'https://twitter.com/kuureki',
  discord: `https://discord.com/users/${DISCORD_ID}`,
  email: 'mailto:hello@kuureki.com',
};

export const BADGES = [
  { label: 'Building actively', type: 'green' as const, animated: true },
  { label: 'Megami · Seasonly · Brume', type: 'violet' as const, animated: false },
  { label: 'Kamiyama', type: 'default' as const, animated: false },
];

export const QUOTES = [
  {
    text: "The world isn't perfect. But it's there for us, doing the best it can. That's what makes it so damn beautiful.",
    source: 'Fullmetal Alchemist',
  },
  {
    text: "If you don't take risks, you can't create a future.",
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
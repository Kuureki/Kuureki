import {
  DiscordLogoIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import { SITE, SOCIALS } from '@/lib/config';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Activity', href: '/activity' },
  { label: 'Stack', href: '/stack' },
  { label: 'Writing', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'GitHub', href: SOCIALS.github, icon: GitHubLogoIcon },
  { label: 'X / Twitter', href: SOCIALS.twitter, icon: TwitterLogoIcon },
  { label: 'Discord', href: SOCIALS.discord, icon: DiscordLogoIcon },
  { label: 'Email', href: SOCIALS.email, icon: EnvelopeClosedIcon },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="xs:px-[1.1rem] relative mx-auto max-w-[740px] px-6">
        <div className="py-12 xs:py-10">
          <div className="grid grid-cols-1 gap-8 xs:gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-3 font-serif text-[1.1rem] tracking-[0.01em] text-text">
                {SITE.name}
              </h4>
              <p className="max-w-[220px] text-[0.825rem] leading-[1.65] text-text-muted">
                {SITE.longBio}
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
                Navigate
              </h4>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {navLinks.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[0.825rem] text-text-muted no-underline transition-colors duration-150 hover:text-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim">
                Connect
              </h4>
              <div className="flex flex-col gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-[0.825rem] text-text-muted no-underline transition-colors duration-150 hover:text-text"
                    >
                      <Icon className="h-3.5 w-3.5 text-text-dim transition-colors duration-150 group-hover:text-text" />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-border pt-6 xs:flex-col xs:items-start xs:gap-3">
            <span className="font-mono text-[0.72rem] text-text-dim">
              {SITE.name}
              {' '}
              © 2026
            </span>
            <span className="font-mono text-[0.72rem] text-text-dim">Built with Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

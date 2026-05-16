import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  DiscordLogoIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import { SITE, SOCIALS } from '@/lib/config';

export default function Footer() {
  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Activity', href: '/activity' },
    { label: 'Stack', href: '/stack' },
    { label: 'Writing', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  const socials = [
    { label: 'GitHub', href: SOCIALS.github, icon: GitHubLogoIcon },
    { label: 'X / Twitter', href: SOCIALS.twitter, icon: TwitterLogoIcon },
    { label: 'Discord', href: SOCIALS.discord, icon: DiscordLogoIcon },
    { label: 'Email', href: SOCIALS.email, icon: EnvelopeClosedIcon },
  ];

  return (
    <footer className="border-border relative border-t">
      <div className="to-bg-2/30 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent" />

      <div className="xs:px-[1.1rem] relative mx-auto max-w-[740px] px-6">
        <div className="xs:py-10 py-12">
          <div className="xs:gap-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h4 className="text-text mb-3 font-serif text-[1.1rem] tracking-[0.01em]">
                {SITE.name}
              </h4>
              <p className="text-text-muted max-w-[200px] text-[0.825rem] leading-[1.65]">
                Building at the intersection of anime culture and systems engineering.
              </p>
            </div>

            <div>
              <h4 className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                Navigate
              </h4>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-text-muted hover:text-text text-[0.825rem] no-underline transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
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
                      className="text-text-muted hover:text-text group inline-flex items-center gap-2.5 text-[0.825rem] no-underline transition-colors duration-150"
                    >
                      <Icon className="text-text-dim group-hover:text-text h-3.5 w-3.5 transition-colors duration-150" />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-border xs:flex-col xs:gap-3 xs:items-start mt-12 flex items-center justify-between border-t pt-6">
            <span className="text-text-dim font-mono text-[0.72rem]">{SITE.name} © 2026</span>
            <span className="text-text-dim font-mono text-[0.72rem]">
              Built with Next.js & Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

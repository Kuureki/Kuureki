'use client';

import { SITE, SOCIALS } from '@/lib/config';

export default function Footer() {
  const navLinks = ['About', 'Projects', 'Activity', 'Stack', 'Writing', 'Contact'];

  const socials = [
    {
      label: 'GitHub',
      href: SOCIALS.github,
      icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
    },
    {
      label: 'X / Twitter',
      href: SOCIALS.twitter,
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      label: 'Discord',
      href: SOCIALS.discord,
      icon: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
    },
    {
      label: 'Email',
      href: SOCIALS.email,
      icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
    },
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
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-text-muted hover:text-text text-[0.825rem] no-underline transition-colors duration-150"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-text-dim mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                Connect
              </h4>
              <div className="flex flex-col gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-text-muted hover:text-text group inline-flex items-center gap-2.5 text-[0.825rem] no-underline transition-colors duration-150"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="fill-text-dim group-hover:fill-text h-3.5 w-3.5 transition-colors duration-150"
                    >
                      <path d={social.icon} />
                    </svg>
                    {social.label}
                  </a>
                ))}
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

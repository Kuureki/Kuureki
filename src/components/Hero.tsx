'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { useLanyard } from '@/components/LanyardProvider';
import { DISCORD_ID, SITE, SOCIALS, BADGES } from '@/lib/config';
import { getAvatarUrl, getAvatarDecorationUrl } from '@/lib/lanyard';

const statusColors: Record<string, string> = {
  online: 'bg-green',
  idle: 'bg-amber',
  dnd: 'bg-red-500',
  offline: 'bg-text-dim',
};

const statusLabels: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { presence } = useLanyard();

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(20px)';
      hero.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      requestAnimationFrame(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      });
    }
  }, []);

  const status = presence?.discord_status ?? 'offline';
  const avatarUrl = getAvatarUrl(presence?.discord_user);
  const avatarDecorationUrl = getAvatarDecorationUrl(presence?.discord_user);

  const bioParts = SITE.bio.split(/(\*\*[^*]+\*\*)/g);

  return (
    <section id="hero" className="border-border border-b py-[6rem] pb-[5rem]">
      <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
        <div ref={heroRef} className="flex flex-col gap-0">
          <div className="text-text-dim mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase">
            <span className="bg-text-dim inline-block h-[1px] w-4" />
            Portfolio · 2026
          </div>

          <div className="mb-[0.6rem] flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={avatarUrl}
                alt="Discord avatar"
                className="border-border h-12 w-12 rounded-full border"
              />
              {avatarDecorationUrl && (
                <img
                  src={avatarDecorationUrl}
                  alt=""
                  className="pointer-events-none absolute -inset-3 h-auto w-auto"
                />
              )}
              <span
                className={`border-bg absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 ${statusColors[status] || 'bg-text-dim'}`}
              />
            </div>
            <h1 className="xs:text-[2.5rem] text-text font-serif text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.02em]">
              {SITE.name}
              <em className="text-accent italic">.</em>
            </h1>
          </div>

          <div className="mb-8 flex items-center gap-3">
            <p className="text-text-muted text-[0.9rem] tracking-[0.01em]">{SITE.role}</p>
            {presence && (
              <span className="text-text-dim font-mono text-[0.75rem]">
                · {statusLabels[status] || status}
              </span>
            )}
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-[0.35rem] rounded border px-[0.65rem] py-[0.3rem] font-mono text-[0.72rem] tracking-[0.03em] ${
                  badge.type === 'green'
                    ? 'border-green/20 text-green bg-green-soft'
                    : badge.type === 'violet'
                      ? 'border-accent/20 text-accent bg-accent-dim'
                      : 'border-border text-text-muted bg-bg-2'
                }`}
              >
                {badge.animated && (
                  <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-current" />
                )}
                {badge.label}
              </span>
            ))}
          </div>

          <p className="text-text-muted mb-[2.5rem] max-w-[520px] text-[0.925rem] leading-[1.75]">
            {bioParts.map((part, i) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={i} className="text-text font-medium">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                part
              ),
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="bg-text text-bg inline-flex items-center gap-[0.4rem] rounded-[7px] border-none px-[1.1rem] py-[0.55rem] font-sans text-[0.825rem] font-medium tracking-[0.01em] no-underline transition-all duration-150 hover:bg-[#d0d0d8]"
            >
              View projects →
            </Link>
            <Link
              href="/contact"
              className="text-text-muted border-border hover:text-text hover:border-border-hover hover:bg-bg-3 inline-flex items-center gap-[0.4rem] rounded-[7px] border bg-transparent px-[1.1rem] py-[0.55rem] font-sans text-[0.825rem] font-medium tracking-[0.01em] no-underline transition-all duration-150"
            >
              Get in touch
            </Link>
          </div>

          <div className="border-border mt-[2.5rem] flex gap-2 border-t pt-8">
            {[
              {
                href: SOCIALS.github,
                title: 'GitHub',
                viewBox: '0 0 16 16',
                path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
              },
              {
                href: SOCIALS.twitter,
                title: 'X / Twitter',
                viewBox: '0 0 24 24',
                path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              },
              {
                href: SOCIALS.discord,
                title: 'Discord',
                viewBox: '0 0 24 24',
                path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
              },
              {
                href: SOCIALS.email,
                title: 'Email',
                viewBox: '0 0 24 24',
                path: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
              },
            ].map((social) => (
              <a
                key={social.title}
                href={social.href}
                title={social.title}
                className="border-border text-text-dim hover:text-text hover:border-border-hover hover:bg-bg-3 inline-flex h-[34px] w-[34px] items-center justify-center rounded-[7px] border font-mono text-[0.75rem] no-underline transition-all duration-150"
              >
                <svg viewBox={social.viewBox} className="h-[14px] w-[14px] fill-current">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

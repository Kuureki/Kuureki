'use client';

import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  DiscordLogoIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

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
                  className="pointer-events-none absolute -inset-0.5 h-auto w-auto"
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
              { href: SOCIALS.github, title: 'GitHub', icon: GitHubLogoIcon },
              { href: SOCIALS.twitter, title: 'X / Twitter', icon: TwitterLogoIcon },
              { href: SOCIALS.discord, title: 'Discord', icon: DiscordLogoIcon },
              { href: SOCIALS.email, title: 'Email', icon: EnvelopeClosedIcon },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.title}
                  href={social.href}
                  title={social.title}
                  className="border-border text-text-dim hover:text-text hover:border-border-hover hover:bg-bg-3 inline-flex h-[34px] w-[34px] items-center justify-center rounded-[7px] border font-mono text-[0.75rem] no-underline transition-all duration-150"
                >
                  <Icon className="h-[14px] w-[14px]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

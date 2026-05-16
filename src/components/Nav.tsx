'use client';

import { useEffect, useRef, useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useLanyard } from '@/components/LanyardProvider';
import { SITE } from '@/lib/config';
import { getAvatarUrl, getAvatarDecorationUrl } from '@/lib/lanyard';

const statusColors: Record<string, string> = {
  online: 'bg-green',
  idle: 'bg-amber',
  dnd: 'bg-red-500',
  offline: 'bg-text-dim',
};

const links = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Activity', href: '/activity' },
  { label: 'Stack', href: '/stack' },
  { label: 'Writing', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const { presence } = useLanyard();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const status = presence?.discord_status ?? 'offline';
  const avatarUrl = getAvatarUrl(presence?.discord_user);
  const avatarDecorationUrl = getAvatarDecorationUrl(presence?.discord_user);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href;
  };

  return (
    <div
      ref={menuRef}
      className="pointer-events-none fixed top-4 right-0 left-0 z-[100] flex justify-center"
    >
      <nav className="bg-bg/70 border-border/80 pointer-events-auto flex min-w-[20rem] items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg ring-1 shadow-black/20 ring-white/[0.04] backdrop-blur-xl">
        <Link
          href="/"
          className="hover:bg-bg-3 flex items-center gap-2 rounded-full py-1 pr-3 pl-1 transition-colors duration-150"
          onClick={() => setOpen(false)}
        >
          <div className="relative flex-shrink-0">
            <img src={avatarUrl} alt="Avatar" className="h-7 w-7 rounded-full" />
            {avatarDecorationUrl && (
              <img
                src={avatarDecorationUrl}
                alt=""
                className="pointer-events-none absolute -inset-1.5 h-auto w-auto"
              />
            )}
            <span
              className={`border-bg absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] ${statusColors[status] || 'bg-text-dim'}`}
            />
          </div>
          <span className="text-text font-serif text-[0.95rem] tracking-[0.01em]">{SITE.name}</span>
        </Link>

        <div className="bg-border/60 xs:block mx-1 hidden h-5 w-px" />

        <ul className="xs:flex hidden list-none items-center gap-0.5">
          {links.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`rounded-full px-2.5 py-1.5 text-[0.78rem] font-normal tracking-[0.02em] no-underline transition-colors duration-150 ${
                  isActive(item.href)
                    ? 'text-text bg-bg-3/80'
                    : 'text-text-muted hover:text-text hover:bg-bg-3/80'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="xs:hidden ml-auto flex items-center justify-center w-8 h-8 rounded-full text-text-muted transition-colors duration-150 hover:text-text hover:bg-bg-3/80"
          aria-label="Toggle menu"
        >
          {open ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="xs:hidden absolute top-16 right-4 left-4">
          <div className="bg-bg/80 border-border/80 flex flex-col gap-0.5 rounded-2xl border p-2 shadow-lg ring-1 shadow-black/30 ring-white/[0.04] backdrop-blur-xl">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-[0.875rem] font-normal tracking-[0.02em] no-underline transition-colors duration-150 ${
                  isActive(item.href)
                    ? 'text-text bg-bg-3/80'
                    : 'text-text-muted hover:text-text hover:bg-bg-3/80'
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

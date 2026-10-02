import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `Uses — ${SITE.name}`,
  description: 'The hardware, editor setup, and software I actually use day to day.',
};

const SETUP = [
  {
    title: 'Editor',
    items: [
      { name: 'Cursor', note: 'Fork of VS Code, so every extension and keybinding carries over.' },
      { name: 'JetBrains Mono', note: 'Ligatures off. I read code more than I write it.' },
      { name: 'One Dark Pro', note: 'I have tried everything else and I keep coming back.' },
    ],
  },
  {
    title: 'Terminal',
    items: [
      {
        name: 'Ghostty',
        note: 'Fast, native, and it gets out of the way. Config in one text file.',
      },
      {
        name: 'Fish',
        note: 'Autosuggestion is worth the non-POSIX syntax. I am not writing portable scripts in my shell.',
      },
      {
        name: 'tmux',
        note: 'One session per project, named after the repo. Never reopen ten tabs again.',
      },
    ],
  },
  {
    title: 'Hardware',
    items: [
      {
        name: 'Framework 13',
        note: 'AMD. Repairable, and the keyboard is replaceable in five minutes.',
      },
      {
        name: 'Keychron Q1',
        note: 'Boba U4T switches. Thocky enough that I can hear myself think.',
      },
      {
        name: 'Logitech MX Master 3S',
        note: 'The horizontal scroll wheel is the whole reason I own it.',
      },
    ],
  },
  {
    title: 'Software',
    items: [
      {
        name: 'Obsidian',
        note: 'Markdown in a folder I own. Syncs over my own storage, not a service I rent.',
      },
      { name: 'Zen Browser', note: 'Firefox-based, vertical tabs, and it does not phone home.' },
      { name: 'Figma', note: 'For anything I need to see before I build it.' },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[5rem] pb-[4.5rem] md:py-[6rem] md:pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/"
                className="text-text-dim hover:text-text font-mono text-[0.75rem] no-underline transition-colors duration-150"
              >
                ← Back to home
              </a>
            </div>

            <SectionHeader
              title="Uses"
              subtitle="What I actually open every day, and why. Not a recommendation list, just an honest inventory."
            />

            <div className="flex flex-col gap-6">
              {SETUP.map(group => (
                <div
                  key={group.title}
                  className="border-border bg-bg-2 rounded-[10px] border px-[1.6rem] py-[1.6rem]"
                >
                  <h3 className="text-text-dim mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
                    {group.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {group.items.map(item => (
                      <div key={item.name} className="flex flex-col gap-1">
                        <span className="text-text text-[0.9rem] font-medium">{item.name}</span>
                        <span className="text-text-muted text-[0.82rem] leading-[1.6]">
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

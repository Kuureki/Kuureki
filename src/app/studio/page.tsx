'use client';

import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeader from '@/components/SectionHeader';
import { getSkinSource, isOnekoSkin, ONEKO_SKINS } from '@/lib/oneko/skins';

const SKIN_STORAGE_KEY = 'oneko-skin';

export default function StudioPage() {
  const [skin, setSkin] = useState<string>('classic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(SKIN_STORAGE_KEY);
    if (saved && isOnekoSkin(saved)) {
      setSkin(saved);
    }
  }, []);

  const pickSkin = (id: string) => {
    if (!isOnekoSkin(id)) {
      return;
    }
    setSkin(id);
    localStorage.setItem(SKIN_STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent('oneko:skin', { detail: id }));
  };

  return (
    <div>
      <Nav />
      <main className="pt-6">
        <section className="border-border border-b py-[5rem] pb-[4.5rem] md:py-[6rem] md:pb-[5rem]">
          <div className="xs:px-[1.1rem] mx-auto max-w-[740px] px-6">
            <div className="mb-6">
              <a
                href="/"
                className="font-mono text-[0.75rem] text-text-dim no-underline transition-colors duration-150 hover:text-text"
              >
                ← Back to home
              </a>
            </div>

            <SectionHeader
              title="Cat studio"
              subtitle="Pick a coat for the cat that follows your cursor. Your choice is saved in this browser and applies site-wide."
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {ONEKO_SKINS.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pickSkin(item.id)}
                  className={`border-border bg-bg-2 hover:border-border-hover rounded-[10px] border p-4 text-left transition-colors duration-150 ${
                    mounted && skin === item.id ? 'ring-1 ring-accent' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getSkinSource(item.id)}
                      alt={item.name}
                      className="h-8 w-16 rounded-sm border border-border object-cover"
                    />
                    <span className="text-text text-[0.85rem] font-medium">{item.name}</span>
                  </div>
                  <p className="text-text-dim mt-2 text-[0.75rem] leading-[1.5]">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

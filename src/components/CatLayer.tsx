'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { isOnekoSkin } from '@/lib/oneko/skins';
import type { OnekoSkin } from '@/lib/oneko/skins';

const Oneko = dynamic(() => import('@/components/oneko'), { ssr: false });

const SKIN_STORAGE_KEY = 'oneko-skin';

export default function CatLayer() {
  const [skin, setSkin] = useState<OnekoSkin>('classic');

  useEffect(() => {
    const saved = localStorage.getItem(SKIN_STORAGE_KEY);
    if (saved && isOnekoSkin(saved)) {
      setSkin(saved);
    }

    const onChange = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (isOnekoSkin(id)) {
        setSkin(id);
      }
    };
    window.addEventListener('oneko:skin', onChange);
    return () => window.removeEventListener('oneko:skin', onChange);
  }, []);

  return (
    <Oneko
      key={skin}
      meow={false}
      skin={skin}
      bubbleText={['Treat inspection', 'On an adventure', 'Guarding the pixels', 'Napping soon']}
    />
  );
}

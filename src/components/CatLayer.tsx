'use client';

import dynamic from 'next/dynamic';

const Oneko = dynamic(() => import('@/components/oneko'), { ssr: false });

export default function CatLayer() {
  return (
    <Oneko
      meow={false}
      bubbleText={['Treat inspection', 'On an adventure', 'Guarding the pixels', 'Napping soon']}
    />
  );
}

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

// The vendored shader is a heavy canvas component; keep it out of the initial
// JS payload and only mount it once the tile is actually near the viewport.
const DitherShader = dynamic(() => import('@/components/ui/dither-shader'), {
  ssr: false,
  loading: () => null,
});

interface DitherImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Size of the dithering grid cells, in CSS pixels. */
  gridSize?: number;
  /** Rendered only once the tile approaches the viewport. */
  eager?: boolean;
  /** Duotone shadow colour. Defaults to the page background. */
  primaryColor?: string;
  /** Duotone highlight colour. Defaults to muted grey, not the accent. */
  secondaryColor?: string;
}

/**
 * AniList media rendered through the dither shader, in the site's duotone.
 *
 * Two non-obvious constraints make this work:
 *
 * 1. AniList's CDN does send `access-control-allow-origin`, so the canvas is
 *    not tainted and `getImageData` succeeds.
 * 2. The fallback <img> MUST also carry `crossOrigin="anonymous"`. A plain
 *    crossOrigin-less <img> populates the HTTP cache entry for that URL
 *    without CORS headers, so the shader's later CORS request is served the
 *    non-CORS response, the canvas taints, and the dither silently renders
 *    nothing. Setting it on both keeps a single cache entry. Removing it
 *    reproduces a blank grid of canvases.
 *
 * The <img> stays mounted underneath as the pre-hydration / no-canvas
 * fallback, so the grid is never empty even if the shader fails.
 */
export default function DitherImage({
  src,
  alt,
  className,
  gridSize = 2,
  eager = false,
  primaryColor = '#0c0c0e',
  secondaryColor = '#94949c',
}: DitherImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(eager);

  useEffect(() => {
    if (eager)
      return;

    const el = ref.current;
    if (!el)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-bg-3', className)}>
      <img
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {shouldRender && (
        <DitherShader
          src={src}
          gridSize={gridSize}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          objectFit="cover"
          backgroundColor={primaryColor}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

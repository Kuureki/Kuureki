'use client';

import { useEffect, useRef, useState } from 'react';

interface Quote {
  text: string;
  source: string;
}

interface RotatingQuoteProps {
  quotes: Quote[];
  interval?: number;
}

export default function RotatingQuote({ quotes, interval = 6000 }: RotatingQuoteProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rotateQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    intervalRef.current = setInterval(rotateQuote, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval]);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="border-border rounded-[10px] border bg-bg-2 px-[1.6rem] py-[1.6rem]">
      <div className="text-text-dim mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
        Current rotation
      </div>

      <div className="relative min-h-[80px]">
        <blockquote
          className={`text-text font-serif text-[1.15rem] leading-[1.5] tracking-[-0.01em] transition-opacity duration-300 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          &ldquo;{currentQuote.text}&rdquo;
        </blockquote>
      </div>

      <div className="text-text-muted mt-3 font-mono text-[0.75rem]">
        — {currentQuote.source}
      </div>

      <div className="border-border mt-4 flex items-center gap-2 border-t pt-3">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsFading(true);
              setTimeout(() => {
                setCurrentIndex(idx);
                setIsFading(false);
              }, 300);
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(rotateQuote, interval);
            }}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-150 ${
              idx === currentIndex ? 'bg-accent' : 'bg-border hover:bg-border-hover'
            }`}
            aria-label={`Go to quote ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

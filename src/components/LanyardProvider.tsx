'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLanyard as useLanyardRest } from 'use-lanyard';
import type { Types } from 'use-lanyard';

import { DISCORD_ID } from '@/lib/config';

interface LanyardContextValue {
  presence: Types.Presence | null;
  isLoading: boolean;
  error: string | null;
}

const LanyardContext = createContext<LanyardContextValue>({
  presence: null,
  isLoading: true,
  error: null,
});

export function useLanyard() {
  return useContext(LanyardContext);
}

export function LanyardProvider({ children }: { children: React.ReactNode }) {
  const presenceData = useLanyardRest(DISCORD_ID);
  const [presence, setPresence] = useState<Types.Presence | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!presence) {
        setIsLoading(false);
      }
    }, 8000);

    return () => {
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
    };
  }, [presence]);

  useEffect(() => {
    if (presenceData && typeof presenceData === 'object') {
      const actualPresence = (presenceData as any).data ?? presenceData;
      if (actualPresence && typeof actualPresence === 'object') {
        setPresence(actualPresence as Types.Presence);
        setIsLoading(false);
      }
    }
  }, [presenceData]);

  return (
    <LanyardContext.Provider
      value={{
        presence,
        isLoading,
        error: null,
      }}
    >
      {children}
    </LanyardContext.Provider>
  );
}

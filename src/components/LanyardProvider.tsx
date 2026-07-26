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
  const { data, error: hookError } = useLanyardRest(DISCORD_ID);
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
    if (data) {
      const presenceData = (data as any).data ?? data;
      if (presenceData && typeof presenceData === 'object') {
        setPresence(presenceData as Types.Presence);
        setIsLoading(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (hookError) {
      setIsLoading(false);
    }
  }, [hookError]);

  return (
    <LanyardContext.Provider
      value={{
        presence,
        isLoading,
        error: hookError ? String(hookError) : null,
      }}
    >
      {children}
    </LanyardContext.Provider>
  );
}

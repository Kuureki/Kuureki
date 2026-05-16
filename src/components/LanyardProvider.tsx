'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLanyard as useLanyardRest, type Types } from 'use-lanyard';

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
  const { data, isLoading, error } = useLanyardRest(DISCORD_ID);

  const [presence, setPresence] = useState<Types.Presence | null>(null);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setPresence(data as Types.Presence);
    }
  }, [data]);

  return (
    <LanyardContext.Provider
      value={{
        presence,
        isLoading: isLoading || !presence,
        error: error ? String(error) : null,
      }}
    >
      {children}
    </LanyardContext.Provider>
  );
}

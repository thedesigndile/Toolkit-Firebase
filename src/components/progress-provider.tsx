
"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ProgressStatus = 'idle' | 'processing' | 'downloading' | 'complete' | 'error';

interface ProgressContextType {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  status: ProgressStatus;
  setStatus: React.Dispatch<React.SetStateAction<ProgressStatus>>;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ProgressStatus>('idle');

  const resetProgress = useCallback(() => {
    setProgress(0);
    setStatus('idle');
  }, []);

  const value = { progress, setProgress, status, setStatus, resetProgress };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

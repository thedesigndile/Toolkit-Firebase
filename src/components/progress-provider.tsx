
"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ProgressStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

interface ProgressContextType {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  status: ProgressStatus;
  setStatus: React.Dispatch<React.SetStateAction<ProgressStatus>>;
  processedUrl: string | null;
  setProcessedUrl: React.Dispatch<React.SetStateAction<string | null>>;
  processedFileName: string;
  setProcessedFileName: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  resetState: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ProgressStatus>('idle');
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedFileName, setProcessedFileName] = useState<string>('download');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);


  const resetState = useCallback(() => {
    // Revoke the old URL before setting a new one or clearing.
    if (processedUrl) {
      URL.revokeObjectURL(processedUrl);
    }
    
    // Reset all state values to their initial state.
    setStatus('idle');
    setFiles([]); // This was the critical missing piece.
    setProgress(0);
    setError(null);
    setProcessedUrl(null);
    setProcessedFileName('download');
  }, [processedUrl]);

  const value = { 
    progress, setProgress, 
    status, setStatus, 
    processedUrl, setProcessedUrl,
    processedFileName, setProcessedFileName,
    files, setFiles,
    error, setError,
    resetState 
  };

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

    

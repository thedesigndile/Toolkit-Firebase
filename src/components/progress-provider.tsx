
"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ProgressStatus = 'idle' | 'processing' | 'complete' | 'error';

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
    setProgress(0);
    setStatus('idle');
    setFiles([]);
    setError(null);
    if (processedUrl) {
      URL.revokeObjectURL(processedUrl);
    }
    setProcessedUrl(null);
    setProcessedFileName('download');
    // Note: We don't reset the file input here, as it's managed by the ToolPageClient
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

    
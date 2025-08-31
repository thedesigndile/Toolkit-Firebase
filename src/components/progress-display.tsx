
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { File, CheckCircle, Download, RotateCcw, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useProgress } from './progress-provider';

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

export function ProgressDisplay() {
  const { 
    progress, 
    status, 
    processedUrl, 
    processedFileName, 
    files, 
    error,
    resetState 
  } = useProgress();

  const handleDownload = () => {
    if (!processedUrl || !processedFileName) return;
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = processedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return `Processing... ${Math.round(progress)}%`;
      case 'complete':
        return 'Processing complete!';
      case 'error':
        return 'An error occurred';
      default:
        return 'Ready';
    }
  };

  const fileName = files.length > 1 ? `${files.length} files` : files[0]?.name || 'your file';
  const isGradientActive = status === 'processing';
  const gradientClass = 'bg-gradient-primary';

  const renderContent = () => {
    switch (status) {
      case 'complete':
        return (
          <div className="text-center p-8 border rounded-lg bg-card shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 400, damping: 15 } }}
              className="flex justify-center items-center mb-4"
            >
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400" strokeWidth={1.5} />
              </div>
            </motion.div>
            <h3 className="text-2xl font-semibold">Success!</h3>
            <p className="text-muted-foreground mt-2 mb-6">Your file is ready to be downloaded.</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" strokeWidth={1.5} />
                Download File
              </Button>
              <Button size="lg" variant="outline" onClick={resetState}>
                <RotateCcw className="mr-2 h-5 w-5" strokeWidth={1.5} />
                Process Another
              </Button>
            </div>
          </div>
        );
      
      case 'error':
        return (
           <div className="p-6 border rounded-lg bg-card shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-16 w-16 text-destructive" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-2xl font-semibold">Processing Failed</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm mx-auto">{error}</p>
             <Button variant="outline" onClick={resetState}>
                <RotateCcw className="mr-2 h-4 w-4" strokeWidth={1.5} />
                Try Again
            </Button>
          </div>
        )

      case 'processing':
      default:
        return (
          <div className="p-6 border rounded-lg bg-card shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-muted rounded-md">
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin icon-gradient" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="font-medium truncate">{fileName}</p>
                <p className="text-sm text-muted-foreground">{getStatusText()}</p>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden relative">
               <motion.div
                className={cn("h-full rounded-full", isGradientActive && gradientClass)}
                style={!isGradientActive ? { backgroundColor: 'hsl(var(--primary))' } : {}}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          </div>
        );
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-2xl mx-auto"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}

    

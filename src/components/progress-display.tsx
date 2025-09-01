
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { File, CheckCircle, Download, RotateCcw, AlertTriangle, Loader2, Copy, Share2, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useProgress } from './progress-provider';
import { useToast } from '@/hooks/use-toast';
import { AdvancedLoading } from './advanced-loading';

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
    resetState,
    currentStep,
    estimatedTime,
    processingStartTime,
    showAdvancedFeedback
  } = useProgress();

  const { toast } = useToast();

  const handleDownload = () => {
    if (!processedUrl || !processedFileName) return;
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = processedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show success feedback
    toast({
      title: "Download Started",
      description: `${processedFileName} is being downloaded.`,
    });
  };

  const copyDownloadLink = () => {
    if (processedUrl) {
      navigator.clipboard.writeText(processedUrl).then(() => {
        toast({
          title: "Link Copied",
          description: "Download link copied to clipboard.",
        });
      });
    }
  };

  const shareFile = () => {
    if (navigator.share && processedUrl) {
      navigator.share({
        title: processedFileName,
        url: processedUrl,
      }).catch(() => {
        // Fallback to copy link
        copyDownloadLink();
      });
    } else {
      copyDownloadLink();
    }
  };

  const getFileInfo = () => {
    if (files.length === 0) return null;
    return {
      fileName: files.length > 1 ? `${files.length} files` : files[0]?.name,
      fileSize: files.reduce((total, file) => total + file.size, 0),
    };
  };

  const getProcessingSteps = () => {
    if (files.length === 0) return [];
    
    const fileType = files[0]?.name.split('.').pop()?.toLowerCase();
    if (fileType === 'pdf') {
      return ['Loading PDF', 'Analyzing document', 'Processing pages', 'Optimizing output', 'Finalizing'];
    }
    if (['jpg', 'jpeg', 'png', 'webp'].includes(fileType || '')) {
      return ['Loading image', 'Analyzing pixels', 'Applying transformations', 'Optimizing quality', 'Finalizing'];
    }
    return ['Preparing file', 'Processing data', 'Optimizing output', 'Finalizing'];
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Preparing your files...';
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

  // Use advanced loading if enabled
  if (showAdvancedFeedback) {
    const fileInfo = getFileInfo();
    return (
      <AdvancedLoading
        status={status}
        progress={progress}
        currentStep={currentStep}
        estimatedTime={estimatedTime}
        fileName={fileInfo?.fileName}
        fileSize={fileInfo?.fileSize}
        error={error || undefined}
        onRetry={() => resetState()}
        onReset={() => resetState()}
        processingSteps={getProcessingSteps()}
      />
    );
  }

  const fileName = files.length > 1 ? `${files.length} files` : files[0]?.name || 'your file';
  const isGradientActive = status === 'processing';
  const gradientClass = 'bg-gradient-primary';

  const renderContent = () => {
    switch (status) {
      case 'uploading':
        return (
           <div className="text-center p-8 border rounded-lg bg-card shadow-lg">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-border/50"
                      stroke="currentColor"
                      strokeWidth="8"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                    />
                    <motion.circle
                      className="text-primary"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      strokeDasharray="264"
                      strokeDashoffset={264}
                      animate={{ strokeDashoffset: [264, 50, 264] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Uploading...</h3>
                <p className="text-muted-foreground mt-2">Preparing your files, please wait.</p>
            </div>
        )
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
            
            {/* Enhanced download section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <File className="h-4 w-4" />
                <span>{processedFileName}</span>
                <Badge variant="outline" className="text-xs">
                  Ready
                </Badge>
              </div>
              
              <div className="flex justify-center gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleDownload}>
                  <Download className="mr-2 h-5 w-5" strokeWidth={1.5} />
                  Download File
                </Button>
                <Button size="lg" variant="outline" onClick={shareFile}>
                  <Share2 className="mr-2 h-5 w-5" strokeWidth={1.5} />
                  Share
                </Button>
              </div>
              
              <Button size="sm" variant="ghost" onClick={resetState}>
                <RotateCcw className="mr-2 h-4 w-4" strokeWidth={1.5} />
                Process Another File
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
            
            {/* Enhanced error actions */}
            <div className="space-y-3">
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={resetState}>
                  <RotateCcw className="mr-2 h-4 w-4" strokeWidth={1.5} />
                  Try Again
                </Button>
                <Button variant="ghost" size="sm" onClick={() => {
                  toast({
                    title: "Error Details",
                    description: error || "Unknown error occurred",
                    variant: "destructive",
                  });
                }}>
                  <Info className="mr-2 h-4 w-4" strokeWidth={1.5} />
                  Show Details
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                If the problem persists, try with a different file or smaller file size.
              </p>
            </div>
          </div>
        )

      case 'processing':
      default:
        return (
          <div className="p-6 border rounded-lg bg-card shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-muted rounded-md">
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="font-medium truncate">{fileName}</p>
                <p className="text-sm text-muted-foreground">{getStatusText()}</p>
                {currentStep && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{currentStep}</p>
                )}
              </div>
              {estimatedTime > 0 && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Est. time</p>
                  <p className="text-sm font-medium">{Math.ceil(estimatedTime / 1000)}s</p>
                </div>
              )}
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
            
            {/* Progress percentage */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">{Math.round(progress)}% complete</span>
              {status === 'processing' && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-primary font-medium"
                >
                  Processing...
                </motion.span>
              )}
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

    

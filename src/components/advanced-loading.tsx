"use client";

import { motion } from 'framer-motion';
import { Loader2, AlertCircle, CheckCircle, Clock, FileText, Image, Settings, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface AdvancedLoadingProps {
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  currentStep?: string;
  estimatedTime?: number;
  fileName?: string;
  fileSize?: number;
  error?: string;
  onRetry?: () => void;
  onReset?: () => void;
  processingSteps?: string[];
}

export function AdvancedLoading({
  status,
  progress,
  currentStep,
  estimatedTime,
  fileName,
  fileSize,
  error,
  onRetry,
  onReset,
  processingSteps = []
}: AdvancedLoadingProps) {

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <FileText className="h-8 w-8 text-blue-500 animate-pulse" />;
      case 'processing':
        return <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Settings className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'from-blue-500 to-blue-600';
      case 'processing':
        return 'from-purple-500 to-purple-600';
      case 'complete':
        return 'from-green-500 to-green-600';
      case 'error':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Preparing your files...';
      case 'processing':
        return currentStep || `Processing... ${Math.round(progress)}%`;
      case 'complete':
        return 'Processing completed successfully!';
      case 'error':
        return error || 'An error occurred during processing';
      default:
        return 'Ready to process';
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
    return `${Math.round(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}m`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (status === 'error') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full w-fit mx-auto">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Processing Failed
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                {error || 'An unexpected error occurred during processing.'}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              {onRetry && (
                <Button onClick={onRetry} variant="outline">
                  <Zap className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
              {onReset && (
                <Button onClick={onReset} variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  if (status === 'complete') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full w-fit mx-auto"
            >
              {getStatusIcon()}
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                Success!
              </h3>
              <p className="text-muted-foreground mt-2">
                Your file has been processed successfully and is ready for download.
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* File Info */}
          {fileName && (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background rounded-md">
                  {getStatusIcon()}
                </div>
                <div>
                  <p className="font-medium truncate max-w-48">{fileName}</p>
                  {fileSize && (
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(fileSize)}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="capitalize">
                {status}
              </Badge>
            </div>
          )}

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{getStatusMessage()}</h3>
              {estimatedTime && estimatedTime > 0 && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTimeRemaining(estimatedTime)}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.round(progress)}% complete</span>
                {status === 'processing' && (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Processing...
                  </motion.span>
                )}
              </div>
            </div>
          </div>

          {/* Processing Steps */}
          {processingSteps.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Processing Steps</Label>
              <div className="space-y-1">
                {processingSteps.map((step, index) => {
                  const isActive = index === Math.floor((progress / 100) * processingSteps.length);
                  const isComplete = index < Math.floor((progress / 100) * processingSteps.length);
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm p-2 rounded ${
                        isActive ? 'bg-primary/10 text-primary' :
                        isComplete ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                        'text-muted-foreground'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <div className="h-4 w-4 border border-muted-foreground/30 rounded-full" />
                      )}
                      {step}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Performance Info */}
          {status === 'processing' && (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Zap className="h-3 w-3" />
                Processing with optimized performance
              </motion.div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
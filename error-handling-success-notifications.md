# Error Handling & Success Notifications System

## **Robust Error Handling with Contextual Messaging**

### **Error Classification System**
```typescript
interface ErrorState {
  type: 'network' | 'file_format' | 'file_size' | 'processing' | 'permission' | 'quota' | 'server' | 'validation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  code: string;
  title: string;
  message: string;
  suggestion: string;
  actions: ErrorAction[];
  recoverable: boolean;
  timestamp: Date;
}

interface ErrorAction {
  label: string;
  type: 'retry' | 'alternative' | 'contact' | 'upgrade' | 'learn_more';
  action: () => void;
  primary?: boolean;
}

const ERROR_DEFINITIONS: Record<string, Partial<ErrorState>> = {
  // Network Errors
  NETWORK_OFFLINE: {
    type: 'network',
    severity: 'medium',
    title: "You're offline",
    message: "Check your internet connection and try again.",
    suggestion: "Make sure you have a stable internet connection.",
    recoverable: true
  },
  NETWORK_TIMEOUT: {
    type: 'network', 
    severity: 'medium',
    title: "Connection timeout",
    message: "The request took too long to complete.",
    suggestion: "This might be due to a slow connection or high server load.",
    recoverable: true
  },
  
  // File Format Errors
  UNSUPPORTED_FORMAT: {
    type: 'file_format',
    severity: 'medium',
    title: "Unsupported file format",
    message: "This file type isn't supported for this tool.",
    suggestion: "Try converting your file to PDF first, or use a different tool.",
    recoverable: true
  },
  CORRUPTED_FILE: {
    type: 'file_format',
    severity: 'high',
    title: "File appears to be corrupted",
    message: "We couldn't read this file properly.",
    suggestion: "Try uploading a different version of the file or create a new one.",
    recoverable: false
  },
  
  // File Size Errors
  FILE_TOO_LARGE: {
    type: 'file_size',
    severity: 'medium', 
    title: "File size exceeds limit",
    message: "Maximum file size is 100MB for free users.",
    suggestion: "Compress your file first or upgrade to Pro for larger files.",
    recoverable: true
  },
  FILE_TOO_MANY_PAGES: {
    type: 'file_size',
    severity: 'medium',
    title: "Too many pages",
    message: "Free users can process up to 50 pages per file.",
    suggestion: "Split your document or upgrade to Pro for unlimited pages.",
    recoverable: true
  },
  
  // Processing Errors
  PROCESSING_FAILED: {
    type: 'processing',
    severity: 'high',
    title: "Processing failed",
    message: "Something went wrong while processing your file.",
    suggestion: "This is usually temporary. Please try again in a few moments.",
    recoverable: true
  },
  
  // Permission Errors
  ACCESS_DENIED: {
    type: 'permission',
    severity: 'high',
    title: "Access denied",
    message: "You don't have permission to access this feature.",
    suggestion: "Sign in to your account or upgrade your plan.",
    recoverable: true
  },
  
  // Quota Errors
  QUOTA_EXCEEDED: {
    type: 'quota',
    severity: 'medium',
    title: "Monthly limit reached",
    message: "You've used all your free conversions this month.",
    suggestion: "Upgrade to Pro for unlimited conversions.",
    recoverable: true
  }
};
```

### **Enhanced Error Component**
```tsx
interface ErrorDisplayProps {
  error: ErrorState;
  onRetry?: () => void;
  onDismiss?: () => void;
  onAction?: (action: ErrorAction) => void;
  className?: string;
}

const ErrorDisplay = ({ error, onRetry, onDismiss, onAction, className }: ErrorDisplayProps) => {
  const getErrorIcon = (type: ErrorState['type']) => {
    const icons = {
      network: WifiOff,
      file_format: FileX,
      file_size: AlertTriangle,
      processing: Cpu,
      permission: Lock,
      quota: CreditCard,
      server: Server,
      validation: AlertCircle
    };
    return icons[type] || AlertCircle;
  };
  
  const getErrorColor = (severity: ErrorState['severity']) => {
    return {
      low: 'blue',
      medium: 'yellow', 
      high: 'orange',
      critical: 'red'
    }[severity];
  };
  
  const ErrorIcon = getErrorIcon(error.type);
  const colorScheme = getErrorColor(error.severity);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`
        relative bg-white border border-${colorScheme}-200 rounded-xl p-6 shadow-lg max-w-md mx-auto
        ${className}
      `}
    >
      {/* Dismiss Button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      {/* Error Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${colorScheme}-100 flex items-center justify-center`}>
          <ErrorIcon className={`w-6 h-6 text-${colorScheme}-600`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {error.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {error.message}
          </p>
        </div>
      </div>
      
      {/* Suggestion */}
      {error.suggestion && (
        <div className={`bg-${colorScheme}-50 border border-${colorScheme}-100 rounded-lg p-3 mb-4`}>
          <div className="flex items-start space-x-2">
            <Lightbulb className={`w-4 h-4 text-${colorScheme}-600 mt-0.5 flex-shrink-0`} />
            <p className={`text-sm text-${colorScheme}-800`}>
              {error.suggestion}
            </p>
          </div>
        </div>
      )}
      
      {/* Error Code (for debugging) */}
      {error.code && (
        <details className="mb-4">
          <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
            Technical details
          </summary>
          <div className="mt-2 p-2 bg-slate-100 rounded text-xs font-mono text-slate-600">
            Error Code: {error.code}
            <br />
            Time: {error.timestamp.toLocaleString()}
          </div>
        </details>
      )}
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {error.actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction?.(action)}
            className={`
              flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all
              ${action.primary
                ? `bg-${colorScheme}-600 hover:bg-${colorScheme}-700 text-white shadow-md hover:shadow-lg`
                : `bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400`
              }
            `}
          >
            {action.type === 'retry' && <RefreshCw className="w-4 h-4 mr-2" />}
            {action.type === 'contact' && <MessageCircle className="w-4 h-4 mr-2" />}
            {action.type === 'upgrade' && <Crown className="w-4 h-4 mr-2" />}
            {action.type === 'learn_more' && <ExternalLink className="w-4 h-4 mr-2" />}
            {action.label}
          </motion.button>
        ))}
      </div>
      
      {/* Retry Shortcut */}
      {error.recoverable && onRetry && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center space-x-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};
```

### **Inline Error States**
```tsx
const InlineError = ({ error, onRetry }: { error: string; onRetry?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm"
    >
      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
      <span className="text-red-800 flex-1">{error}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Retry
        </button>
      )}
    </motion.div>
  );
};
```

## **Success Notifications with Clear CTAs**

### **Success State Types**
```typescript
interface SuccessState {
  type: 'conversion' | 'merge' | 'split' | 'compress' | 'sign' | 'upload' | 'download';
  title: string;
  message: string;
  resultFile?: {
    name: string;
    size: string;
    downloadUrl: string;
  };
  stats?: {
    processingTime?: string;
    compressionRatio?: string;
    pagesCount?: number;
  };
  actions: SuccessAction[];
  shareOptions?: ShareOption[];
}

interface SuccessAction {
  label: string;
  type: 'download' | 'view' | 'edit_more' | 'new_file' | 'upgrade';
  action: () => void;
  primary?: boolean;
  icon?: React.ComponentType;
}

interface ShareOption {
  platform: 'email' | 'link' | 'social';
  label: string;
  action: () => void;
  icon: React.ComponentType;
}
```

### **Enhanced Success Component**
```tsx
const SuccessNotification = ({ success, onDismiss }: { success: SuccessState; onDismiss?: () => void }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const getSuccessIcon = (type: SuccessState['type']) => {
    const icons = {
      conversion: ArrowRightLeft,
      merge: Combine,
      split: Split,
      compress: Minimize2,
      sign: PenTool,
      upload: Upload,
      download: Download
    };
    return icons[type] || CheckCircle2;
  };
  
  const SuccessIcon = getSuccessIcon(success.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="relative bg-white border border-green-200 rounded-xl p-6 shadow-xl max-w-lg mx-auto overflow-hidden"
    >
      {/* Success Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-30" />
      
      {/* Dismiss Button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      <div className="relative z-10">
        {/* Success Header */}
        <div className="flex items-start space-x-4 mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex-shrink-0 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"
          >
            <SuccessIcon className="w-7 h-7 text-green-600" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {success.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {success.message}
            </p>
          </div>
        </div>
        
        {/* File Result */}
        {success.resultFile && (
          <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">
                  {success.resultFile.name}
                </h4>
                <p className="text-sm text-slate-500">
                  {success.resultFile.size}
                </p>
              </div>
              
              <motion.a
                href={success.resultFile.downloadUrl}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </motion.a>
            </div>
          </div>
        )}
        
        {/* Processing Stats */}
        {success.stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {success.stats.processingTime && (
              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-200">
                <Clock className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-slate-900">
                  {success.stats.processingTime}
                </div>
                <div className="text-xs text-slate-500">Processing time</div>
              </div>
            )}
            
            {success.stats.compressionRatio && (
              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-200">
                <TrendingDown className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-slate-900">
                  {success.stats.compressionRatio}
                </div>
                <div className="text-xs text-slate-500">Size reduction</div>
              </div>
            )}
            
            {success.stats.pagesCount && (
              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-200 col-span-2">
                <FileText className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-slate-900">
                  {success.stats.pagesCount} pages processed
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {success.actions.map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className={`
                flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all
                ${action.primary
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400'
                }
              `}
            >
              {action.icon && <action.icon className="w-5 h-5 mr-2" />}
              {action.label}
            </motion.button>
          ))}
        </div>
        
        {/* Share Options */}
        {success.shareOptions && success.shareOptions.length > 0 && (
          <div className="border-t border-slate-200 pt-4">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-800 transition-colors w-full justify-center"
            >
              <Share2 className="w-4 h-4" />
              <span>Share result</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${showShareOptions ? 'rotate-180' : ''}`}
              />
            </button>
            
            <AnimatePresence>
              {showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-center space-x-4 mt-3"
                >
                  {success.shareOptions.map((option, index) => (
                    <motion.button
                      key={option.platform}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={option.action}
                      className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 transition-colors"
                    >
                      <option.icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Celebration Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
```

### **Toast Notifications System**
```tsx
interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onRemove={() => removeToast(toast.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Toast = ({ toast, onRemove }: { toast: ToastNotification; onRemove: () => void }) => {
  const getToastStyles = (type: ToastNotification['type']) => {
    const styles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800', 
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    return styles[type];
  };
  
  const getIcon = (type: ToastNotification['type']) => {
    const icons = {
      success: CheckCircle2,
      error: XCircle,
      warning: AlertTriangle,
      info: Info
    };
    return icons[type];
  };
  
  const Icon = getIcon(toast.type);
  
  useEffect(() => {
    if (!toast.persistent && toast.duration !== 0) {
      const timer = setTimeout(() => {
        onRemove();
      }, toast.duration || 5000);
      
      return () => clearTimeout(timer);
    }
  }, [toast.persistent, toast.duration, onRemove]);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      className={`
        p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${getToastStyles(toast.type)}
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm mt-1 opacity-90">{toast.message}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium underline hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
          
          <button
            onClick={onRemove}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
```

This comprehensive error handling and success notification system provides:

- **Contextual error messages** with recovery suggestions
- **Progressive error severity** with appropriate visual treatment  
- **Clear call-to-action buttons** for error recovery
- **Celebration animations** for successful completions
- **Detailed result information** with download options
- **Social sharing capabilities** for completed tasks
- **Toast notification system** for quick feedback
- **Accessibility compliance** with proper ARIA labels and keyboard navigation
- **Mobile-optimized layouts** with touch-friendly interactions
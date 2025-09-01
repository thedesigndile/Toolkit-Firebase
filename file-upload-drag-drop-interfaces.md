# File Upload Interfaces with Drag-and-Drop & Visual Feedback

## **Advanced Drag & Drop Upload Zone**

### **Upload Zone States & Visual Feedback**
```typescript
interface UploadZoneState {
  status: 'idle' | 'dragover' | 'uploading' | 'success' | 'error';
  dragDepth: number;
  files: UploadFile[];
  maxFiles?: number;
  acceptedTypes: string[];
  maxFileSize: number;
  showPreview: boolean;
}

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
  result?: ProcessedFileResult;
}

interface ProcessedFileResult {
  downloadUrl: string;
  previewUrl?: string;
  metadata: {
    pages?: number;
    dimensions?: { width: number; height: number };
    compressionRatio?: string;
  };
}
```

### **Enhanced Upload Zone Component**
```tsx
const EnhancedUploadZone = ({
  acceptedTypes = ['.pdf'],
  maxFileSize = 100 * 1024 * 1024, // 100MB
  maxFiles = 5,
  multiple = true,
  onFilesAdded,
  onFilesRemoved,
  className
}: UploadZoneProps) => {
  const [uploadState, setUploadState] = useState<UploadZoneState>({
    status: 'idle',
    dragDepth: 0,
    files: [],
    acceptedTypes,
    maxFileSize,
    showPreview: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setUploadState(prev => ({
      ...prev,
      dragDepth: prev.dragDepth + 1,
      status: prev.dragDepth === 0 ? 'dragover' : prev.status
    }));
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setUploadState(prev => {
      const newDepth = prev.dragDepth - 1;
      return {
        ...prev,
        dragDepth: newDepth,
        status: newDepth === 0 ? 'idle' : prev.status
      };
    });
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setUploadState(prev => ({
      ...prev,
      dragDepth: 0,
      status: 'idle'
    }));
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);
  
  const processFiles = useCallback((fileList: File[]) => {
    const validFiles: UploadFile[] = [];
    const errors: string[] = [];
    
    fileList.forEach(file => {
      // Validate file type
      const isValidType = acceptedTypes.some(type => 
        file.type.includes(type.replace('.', '')) || file.name.endsWith(type)
      );
      
      if (!isValidType) {
        errors.push(`${file.name}: Unsupported file type`);
        return;
      }
      
      // Validate file size
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large (max ${formatFileSize(maxFileSize)})`);
        return;
      }
      
      // Check file limit
      if (uploadState.files.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }
      
      validFiles.push({
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
        status: 'pending'
      });
    });
    
    // Show errors if any
    if (errors.length > 0) {
      // Handle errors (show toast notifications)
      errors.forEach(error => showToast({ type: 'error', message: error }));
    }
    
    // Add valid files
    if (validFiles.length > 0) {
      setUploadState(prev => ({
        ...prev,
        files: [...prev.files, ...validFiles]
      }));
      onFilesAdded?.(validFiles);
    }
  }, [acceptedTypes, maxFileSize, maxFiles, uploadState.files.length, onFilesAdded]);
  
  const getZoneStyles = () => {
    const baseStyles = `
      relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    `;
    
    switch (uploadState.status) {
      case 'dragover':
        return `${baseStyles} border-blue-400 bg-blue-50 scale-105 shadow-lg`;
      case 'uploading':
        return `${baseStyles} border-blue-300 bg-blue-25`;
      case 'success':
        return `${baseStyles} border-green-300 bg-green-25`;
      case 'error':
        return `${baseStyles} border-red-300 bg-red-25`;
      default:
        return `${baseStyles} border-slate-300 hover:border-slate-400 hover:bg-slate-50`;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Main Upload Zone */}
      <motion.div
        ref={dropZoneRef}
        className={`${getZoneStyles()} ${className}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: uploadState.status === 'idle' ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          borderColor: uploadState.status === 'dragover' ? '#3b82f6' : undefined,
          backgroundColor: uploadState.status === 'dragover' ? '#eff6ff' : undefined
        }}
        style={{ minHeight: '200px' }}
        tabIndex={0}
        role="button"
        aria-label="Upload files by clicking or dragging and dropping"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {uploadState.status === 'dragover' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Animated Upload Ripples */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 border-2 border-blue-300 rounded-full"
                    style={{
                      width: `${(i + 1) * 60}px`,
                      height: `${(i + 1) * 60}px`,
                      marginLeft: `${-(i + 1) * 30}px`,
                      marginTop: `${-(i + 1) * 30}px`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0.3, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Upload Content */}
        <div className="relative z-10 p-8 text-center h-full flex flex-col justify-center">
          {uploadState.status === 'uploading' ? (
            <UploadingAnimation />
          ) : uploadState.status === 'dragover' ? (
            <DragOverContent />
          ) : (
            <DefaultUploadContent 
              acceptedTypes={acceptedTypes}
              maxFileSize={maxFileSize}
              maxFiles={maxFiles}
            />
          )}
        </div>
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={(e) => {
            if (e.target.files) {
              processFiles(Array.from(e.target.files));
            }
          }}
          className="hidden"
        />
      </motion.div>
      
      {/* File List */}
      <AnimatePresence>
        {uploadState.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-900">
                {uploadState.files.length} {uploadState.files.length === 1 ? 'file' : 'files'} selected
              </h3>
              <button
                onClick={() => setUploadState(prev => ({ ...prev, showPreview: !prev.showPreview }))}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {uploadState.showPreview ? 'Hide preview' : 'Show preview'}
              </button>
            </div>
            
            <div className="space-y-2">
              {uploadState.files.map(file => (
                <FileUploadCard
                  key={file.id}
                  file={file}
                  showPreview={uploadState.showPreview}
                  onRemove={() => removeFile(file.id)}
                  onRetry={() => retryUpload(file.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

### **Upload Content Components**
```tsx
const DefaultUploadContent = ({ acceptedTypes, maxFileSize, maxFiles }: {
  acceptedTypes: string[];
  maxFileSize: number;
  maxFiles: number;
}) => (
  <div className="space-y-4">
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
    >
      <Upload className="w-8 h-8 text-blue-600" />
    </motion.div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-slate-900">
        Drop your files here
      </h3>
      <p className="text-slate-600">
        or <span className="text-blue-600 font-medium">browse</span> to choose files
      </p>
    </div>
    
    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
      <div className="flex items-center space-x-2">
        <FileText className="w-4 h-4" />
        <span>{acceptedTypes.join(', ')}</span>
      </div>
      <div className="flex items-center space-x-2">
        <HardDrive className="w-4 h-4" />
        <span>Max {formatFileSize(maxFileSize)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Layers className="w-4 h-4" />
        <span>Up to {maxFiles} files</span>
      </div>
    </div>
  </div>
);

const DragOverContent = () => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="space-y-4"
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="mx-auto w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center"
    >
      <Download className="w-10 h-10 text-blue-700" />
    </motion.div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-blue-900">
        Release to upload
      </h3>
      <p className="text-blue-700">
        Drop your files to get started
      </p>
    </div>
  </motion.div>
);

const UploadingAnimation = () => (
  <div className="space-y-4">
    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-blue-600" />
      </motion.div>
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-slate-900">
        Uploading files...
      </h3>
      <p className="text-slate-600">
        Please wait while we process your files
      </p>
    </div>
  </div>
);
```

## **Individual File Upload Card**

### **File Upload Card Component**
```tsx
const FileUploadCard = ({ 
  file, 
  showPreview, 
  onRemove, 
  onRetry 
}: FileUploadCardProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Generate preview for images
  useEffect(() => {
    if (showPreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file.file);
    }
  }, [showPreview, file.type, file.file]);
  
  const getStatusIcon = () => {
    switch (file.status) {
      case 'pending':
        return Clock;
      case 'uploading':
        return Loader2;
      case 'complete':
        return CheckCircle2;
      case 'error':
        return XCircle;
      default:
        return FileText;
    }
  };
  
  const getStatusColor = () => {
    switch (file.status) {
      case 'pending':
        return 'slate';
      case 'uploading':
        return 'blue';
      case 'complete':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'slate';
    }
  };
  
  const StatusIcon = getStatusIcon();
  const statusColor = getStatusColor();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
    >
      <div className="flex items-center space-x-4">
        {/* File Preview/Icon */}
        <div className="flex-shrink-0">
          {showPreview && imagePreview ? (
            <img
              src={imagePreview}
              alt="File preview"
              className="w-12 h-12 object-cover rounded-lg border border-slate-200"
            />
          ) : (
            <div className={`w-12 h-12 bg-${statusColor}-100 rounded-lg flex items-center justify-center`}>
              <FileText className={`w-6 h-6 text-${statusColor}-600`} />
            </div>
          )}
        </div>
        
        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-900 truncate">
              {file.name}
            </h4>
            <div className="flex items-center space-x-2 ml-4">
              <motion.div
                animate={{ 
                  rotate: file.status === 'uploading' ? 360 : 0 
                }}
                transition={{ 
                  duration: 1, 
                  repeat: file.status === 'uploading' ? Infinity : 0,
                  ease: "linear"
                }}
              >
                <StatusIcon className={`w-5 h-5 text-${statusColor}-600`} />
              </motion.div>
              
              {file.status !== 'uploading' && (
                <button
                  onClick={onRemove}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-slate-500">
              {formatFileSize(file.size)}
            </span>
            
            {file.status === 'uploading' && (
              <span className="text-sm text-blue-600 font-medium">
                {file.uploadProgress}%
              </span>
            )}
          </div>
          
          {/* Progress Bar */}
          {file.status === 'uploading' && (
            <div className="mt-2">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${file.uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {file.status === 'error' && file.error && (
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-red-600">{file.error}</p>
              <button
                onClick={onRetry}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Success Details */}
          {file.status === 'complete' && file.result && (
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                {file.result.metadata.pages && (
                  <span>{file.result.metadata.pages} pages</span>
                )}
                {file.result.metadata.compressionRatio && (
                  <span>{file.result.metadata.compressionRatio} smaller</span>
                )}
              </div>
              
              <a
                href={file.result.downloadUrl}
                download={file.name}
                className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
```

## **Mobile-Optimized Upload Interface**

### **Touch-Friendly Upload Zone**
```tsx
const MobileUploadZone = ({ onFilesAdded }: { onFilesAdded: (files: File[]) => void }) => {
  const [isActive, setIsActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="space-y-4">
      {/* Primary Upload Button */}
      <motion.button
        className={`
          w-full p-6 border-2 border-dashed rounded-2xl
          ${isActive 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-slate-300 bg-slate-50'
          }
          transition-all duration-200
        `}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
        onClick={() => fileInputRef.current?.click()}
        whileTap={{ scale: 0.98 }}
      >
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Select Files</h3>
            <p className="text-sm text-slate-600 mt-1">
              PDF files up to 100MB
            </p>
          </div>
        </div>
      </motion.button>
      
      {/* Alternative Methods */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {/* Open camera */}}
          className="flex flex-col items-center p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
        >
          <Camera className="w-8 h-8 text-slate-600 mb-2" />
          <span className="text-sm font-medium text-slate-700">Camera</span>
        </button>
        
        <button
          onClick={() => {/* Open file browser */}}
          className="flex flex-col items-center p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
        >
          <FolderOpen className="w-8 h-8 text-slate-600 mb-2" />
          <span className="text-sm font-medium text-slate-700">Browse</span>
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            onFilesAdded(Array.from(e.target.files));
          }
        }}
        className="hidden"
      />
    </div>
  );
};
```

## **Batch Upload Management**

### **Batch Upload Controller**
```tsx
const BatchUploadManager = ({ files, onProgress, onComplete }: BatchUploadManagerProps) => {
  const [uploadStats, setUploadStats] = useState({
    completed: 0,
    failed: 0,
    totalSize: 0,
    uploadedSize: 0
  });
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      {/* Batch Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Uploading {files.length} files
            </h3>
            <p className="text-sm text-slate-600">
              {uploadStats.completed} completed, {uploadStats.failed} failed
            </p>
          </div>
        </div>
        
        <CircularProgress 
          progress={(uploadStats.completed / files.length) * 100}
          size="md"
          color="blue"
        />
      </div>
      
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Overall Progress</span>
          <span>{Math.round((uploadStats.uploadedSize / uploadStats.totalSize) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            animate={{ width: `${(uploadStats.uploadedSize / uploadStats.totalSize) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Individual File Progress */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {files.map(file => (
          <div key={file.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-slate-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-slate-500 ml-2">
                  {file.uploadProgress}%
                </span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${file.uploadProgress}%` }}
                />
              </div>
            </div>
            
            <div className="flex-shrink-0">
              {file.status === 'complete' && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {file.status === 'error' && (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              {file.status === 'uploading' && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## **Accessibility & Performance Features**

### **Screen Reader Support**
```tsx
// ARIA live regions for upload progress
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {files.length > 0 && (
    <span>
      {files.filter(f => f.status === 'complete').length} of {files.length} files uploaded successfully
    </span>
  )}
</div>

// Keyboard navigation support
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInputRef.current?.click();
  }
};
```

### **Performance Optimizations**
```tsx
// Lazy loading for file previews
const LazyFilePreview = ({ file }: { file: UploadFile }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (isInView && !src) {
      // Generate preview only when in viewport
      generatePreview(file.file).then(setSrc);
    }
  }, [isInView, src, file.file]);
  
  return <img ref={imgRef} src={src || undefined} alt="File preview" />;
};

// File chunking for large uploads
const uploadFileInChunks = async (file: File, onProgress: (progress: number) => void) => {
  const chunkSize = 1024 * 1024; // 1MB chunks
  const chunks = Math.ceil(file.size / chunkSize);
  
  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    
    await uploadChunk(chunk, i, chunks);
    onProgress((i + 1) / chunks * 100);
  }
};
```

This comprehensive file upload system provides:
- **Advanced drag-and-drop interfaces** with multi-state visual feedback
- **Batch upload management** with progress tracking
- **Mobile-optimized touch interactions** 
- **Real-time file validation** with contextual error messages
- **Preview generation** for supported file types
- **Accessibility compliance** with ARIA labels and keyboard navigation
- **Performance optimization** with chunked uploads and lazy loading
- **Responsive design** adapting to different screen sizes
- **Visual feedback animations** for all interaction states
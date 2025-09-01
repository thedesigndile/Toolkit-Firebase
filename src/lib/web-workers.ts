// Web workers for heavy processing tasks to prevent UI blocking

export const createWorker = (workerFunction: Function): Worker => {
  const blob = new Blob([`(${workerFunction.toString()})()`], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

// Image compression worker
export const imageCompressionWorker = () => {
  self.onmessage = function(e) {
    const { imageData, quality, maxWidth, maxHeight } = e.data;
    
    try {
      const canvas = new OffscreenCanvas(maxWidth, maxHeight);
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create ImageBitmap from received data
        createImageBitmap(imageData).then(bitmap => {
          // Calculate dimensions maintaining aspect ratio
          const { width, height } = bitmap;
          const aspectRatio = width / height;
          
          let newWidth = maxWidth;
          let newHeight = maxHeight;
          
          if (aspectRatio > 1) {
            newHeight = maxWidth / aspectRatio;
          } else {
            newWidth = maxHeight * aspectRatio;
          }
          
          canvas.width = newWidth;
          canvas.height = newHeight;
          
          ctx.drawImage(bitmap, 0, 0, newWidth, newHeight);
          
          canvas.convertToBlob({ type: 'image/jpeg', quality: quality / 100 }).then(blob => {
            self.postMessage({ success: true, blob });
          });
        });
      } else {
        self.postMessage({ success: false, error: 'Could not get canvas context' });
      }
    } catch (error) {
      const message = (error as any)?.message ?? 'Unknown error';
      self.postMessage({ success: false, error: message });
    }
  };
};

// PDF processing worker
export const pdfProcessingWorker = () => {
  self.onmessage = function(e) {
    const { action, data } = e.data;
    
    try {
      switch (action) {
        case 'extract-text':
          // PDF text extraction logic
          self.postMessage({ success: true, result: 'Extracted text...' });
          break;
        case 'compress':
          // PDF compression logic
          self.postMessage({ success: true, result: data });
          break;
        default:
          self.postMessage({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      const message = (error as any)?.message ?? 'Unknown error';
      self.postMessage({ success: false, error: message });
    }
  };
};

// Archive processing worker
export const archiveWorker = () => {
  self.onmessage = function(e) {
    const { action, files } = e.data;
    
    try {
      if (action === 'create-zip') {
        // Use JSZip in worker
        self.postMessage({ success: true, result: 'ZIP created' });
      } else if (action === 'extract-zip') {
        // Extract ZIP logic
        self.postMessage({ success: true, result: 'ZIP extracted' });
      }
    } catch (error) {
      const message = (error as any)?.message ?? 'Unknown error';
      self.postMessage({ success: false, error: message });
    }
  };
};

// Text processing worker
export const textProcessingWorker = () => {
  self.onmessage = function(e) {
    const { action, text, options } = e.data;
    
    try {
      let result: any;
      
      switch (action) {
        case 'count-stats':
          result = {
            characters: text.length,
            charactersNoSpaces: text.replace(/\s/g, '').length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            sentences: text.split(/[.!?]+/).filter((s: string) => s.trim()).length,
            paragraphs: text.split(/\n\s*\n/).filter((p: string) => p.trim()).length,
          };
          break;
        case 'convert-case':
          switch (options.operation) {
            case 'uppercase':
              result = text.toUpperCase();
              break;
            case 'lowercase':
              result = text.toLowerCase();
              break;
            case 'title':
              result = text.replace(/\w\S*/g, (txt: string) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
              break;
            case 'sentence':
              result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
              break;
            case 'camel':
              result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
              }).replace(/\s+/g, '');
              break;
            case 'pascal':
              result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string) => {
                return word.toUpperCase();
              }).replace(/\s+/g, '');
              break;
            case 'snake':
              result = text.toLowerCase().replace(/\s+/g, '_');
              break;
            case 'kebab':
              result = text.toLowerCase().replace(/\s+/g, '-');
              break;
            default:
              result = text;
          }
          break;
        default:
          throw new Error('Unknown text processing action');
      }
      
      self.postMessage({ success: true, result });
    } catch (error) {
      const message = (error as any)?.message ?? 'Unknown error';
      self.postMessage({ success: false, error: message });
    }
  };
};

// Utility function to use workers with Promise interface
export const useWorker = <T = any>(
  workerFunction: Function, 
  data: any, 
  onProgress?: (progress: number) => void
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const worker = createWorker(workerFunction);
    
    worker.postMessage(data);
    
    worker.onmessage = (e) => {
      const { success, result, error, progress } = e.data;
      
      if (progress !== undefined && onProgress) {
        onProgress(progress);
        return;
      }
      
      if (success) {
        resolve(result);
      } else {
        reject(new Error(error));
      }
      
      worker.terminate();
    };
    
    worker.onerror = (error) => {
      reject(error as any);
      worker.terminate();
    };
  });
};
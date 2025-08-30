
"use client";

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

export function ServiceWorkerRegistration() {
  const [isOnline, setIsOnline] = useState(true);
  const [swRegistered, setSwRegistered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Only register service worker in production and if supported
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      registerServiceWorker();
    }

    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "You're connected to the internet again.",
        duration: 3000,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "Some features may not be available.",
        variant: "destructive",
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial online status
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[SW] Service worker registered:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              toast({
                title: "Update Available",
                description: "A new version of the website is ready.",
                action: (
                  <Button onClick={() => window.location.reload()} >
                    Refresh
                  </Button>
                ),
                duration: 10000, // Keep toast open longer
              });
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('[SW] Cache updated:', event.data);
        }
      });

      setSwRegistered(true);

      // Log cache info for debugging
      if (process.env.NODE_ENV === 'development') {
        setTimeout(async () => {
          try {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
              console.log('[SW] Cache info:', event.data);
            };

            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.controller.postMessage(
                { type: 'GET_CACHE_INFO' },
                [messageChannel.port2]
              );
            }
          } catch (error) {
            console.error('[SW] Failed to get cache info:', error);
          }
        }, 2000);
      }

    } catch (error) {
      console.error('[SW] Service worker registration failed:', error);
      toast({
        title: "Service Worker Error",
        description: "Failed to register service worker. Some offline features may not work.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Development mode indicator
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className="fixed bottom-4 left-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono"
        style={{ fontSize: '10px' }}
      >
        <div className={`w-2 h-2 rounded-full inline-block mr-2 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
        {isOnline ? 'Online' : 'Offline'}
        {swRegistered && <span className="ml-2 text-green-400">• SW</span>}
      </div>
    );
  }

  return null;
}

// Hook to check if app is running offline
export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Hook to check service worker status
export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(setRegistration);

      const handleUpdateFound = () => {
        navigator.serviceWorker.getRegistration().then(newRegistration => {
          if (newRegistration) {
            setRegistration(newRegistration);
            setUpdateAvailable(true);
          }
        });
      };

      navigator.serviceWorker.addEventListener('updatefound', handleUpdateFound);
      return () => navigator.serviceWorker.removeEventListener('updatefound', handleUpdateFound);
    }
  }, []);

  const updateServiceWorker = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  return {
    registration,
    updateAvailable,
    updateServiceWorker,
  };
}

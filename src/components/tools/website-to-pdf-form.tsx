
"use client";

import { useState } from 'react';
import { getWebsiteAsPdf } from '@/app/actions';
import { useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, Zap, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function WebsiteToPdfForm() {
  const [url, setUrl] = useState('');
  const {
    status, setStatus,
    processedUrl, setProcessedUrl,
    processedFileName, setProcessedFileName,
    error, setError,
    resetState
  } = useProgress();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({ variant: 'destructive', title: "URL is required" });
      return;
    }

    resetState();
    setStatus('processing');

    const result = await getWebsiteAsPdf(url);

    if (result.pdf) {
      setProcessedUrl(result.pdf);
      const domain = new URL(url).hostname;
      setProcessedFileName(`${domain}.pdf`);
      setStatus('complete');
      toast({ title: "Success!", description: "Website converted to PDF." });
    } else {
      setError(result.error || "Failed to convert website.");
      setStatus('error');
      toast({ variant: 'destructive', title: "Conversion Failed", description: result.error });
    }
  };

  if (status !== 'idle') {
    return <ProgressDisplay />;
  }

  return (
    <Card className="max-w-4xl w-full mx-auto">
      <CardHeader className="text-center">
        <motion.div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 mx-auto" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
          <Globe className="h-12 w-12 icon-gradient" />
        </motion.div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Website to PDF
        </CardTitle>
        <p className="text-muted-foreground mt-2 text-lg">
          Enter a URL to convert a live webpage into a PDF document.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="h-12 text-lg"
          />
          <div className="text-center pt-4">
            <Button type="submit" size="lg" disabled={status === 'processing'}>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 icon-gradient" />
                {status === 'processing' ? 'Converting...' : 'Convert to PDF'}
                <Sparkles className="h-4 w-4 icon-gradient" />
              </div>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  Pause,
  Square,
  Download,
  Volume2,
  VolumeX,
  RotateCcw,
  FileText,
  Mic,
  Settings,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAccessibility } from '@/components/accessibility-provider';

interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
  localService: boolean;
  default: boolean;
}

export function TextToSpeechComponent() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const { announceToScreenReader } = useAccessibility();

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = speechSynthesisRef.current?.getVoices() || [];
        setVoices(availableVoices);

        // Set default voice
        if (availableVoices.length > 0 && !selectedVoice) {
          const defaultVoice = availableVoices.find(voice => voice.default) || availableVoices[0];
          setSelectedVoice(defaultVoice.name);
        }
      };

      loadVoices();

      // Some browsers load voices asynchronously
      if (speechSynthesisRef.current?.onvoiceschanged !== undefined) {
        speechSynthesisRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  // Update character count and estimated time
  useEffect(() => {
    setCharCount(text.length);
    // Rough estimate: 200 characters per minute at normal rate
    const wordsPerMinute = 200 * rate[0];
    const estimatedMinutes = text.split(' ').length / wordsPerMinute;
    setEstimatedTime(Math.max(1, Math.ceil(estimatedMinutes * 60)));
  }, [text, rate]);

  const handleTextChange = useCallback((value: string) => {
    if (value.length <= 5000) { // Limit to 5000 characters
      setText(value);
    } else {
      toast({
        title: "Text Too Long",
        description: "Please limit your text to 5000 characters.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const speak = useCallback(async () => {
    if (!speechSynthesisRef.current || !text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Cancel any ongoing speech
      speechSynthesisRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtteranceRef.current = utterance;

      // Configure voice
      if (selectedVoice) {
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
        }
      }

      // Configure speech parameters
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      utterance.volume = volume[0];

      // Progress tracking
      let startTime = Date.now();
      const totalDuration = estimatedTime * 1000;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setIsLoading(false);
        announceToScreenReader('Speech started', 'polite');
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);
        announceToScreenReader('Speech completed', 'polite');
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        setIsPaused(false);
        setIsLoading(false);
        toast({
          title: "Speech Error",
          description: "An error occurred while generating speech.",
          variant: "destructive",
        });
      };

      utterance.onpause = () => {
        setIsPaused(true);
        announceToScreenReader('Speech paused', 'polite');
      };

      utterance.onresume = () => {
        setIsPaused(false);
        announceToScreenReader('Speech resumed', 'polite');
      };

      // Start progress tracking
      const progressInterval = setInterval(() => {
        if (isPlaying && !isPaused) {
          const elapsed = Date.now() - startTime;
          const progressPercent = Math.min(100, (elapsed / totalDuration) * 100);
          setProgress(progressPercent);
        }
      }, 100);

      utterance.onend = () => {
        clearInterval(progressInterval);
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);
        announceToScreenReader('Speech completed', 'polite');
      };

      speechSynthesisRef.current.speak(utterance);

    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsLoading(false);
      toast({
        title: "Speech Error",
        description: "Failed to initialize speech synthesis.",
        variant: "destructive",
      });
    }
  }, [text, selectedVoice, voices, rate, pitch, volume, estimatedTime, toast, announceToScreenReader]);

  const pause = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.resume();
    }
  }, []);

  const stop = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      announceToScreenReader('Speech stopped', 'polite');
    }
  }, [announceToScreenReader]);

  const reset = useCallback(() => {
    stop();
    setText('');
    setProgress(0);
    announceToScreenReader('Text cleared', 'polite');
  }, [stop, announceToScreenReader]);

  const downloadAudio = useCallback(async () => {
    // Note: Modern browsers don't support direct audio download from Web Speech API
    // This would require a server-side solution or MediaRecorder API
    toast({
      title: "Download Not Available",
      description: "Audio download requires server-side processing. Please use the play button instead.",
      variant: "destructive",
    });
  }, [toast]);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  if (!isSupported) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-lg font-semibold mb-2">Speech Synthesis Not Supported</h3>
          <p className="text-muted-foreground">
            Your browser doesn't support text-to-speech functionality.
            Please try using a modern browser like Chrome, Firefox, or Safari.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Text Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Enter Text to Convert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter the text you want to convert to speech..."
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="min-h-[120px] resize-none"
                aria-label="Text to convert to speech"
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{charCount}/5000 characters</span>
                <Badge variant={charCount > 4500 ? "destructive" : "secondary"}>
                  {estimatedTime}s estimated
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Voice Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Voice Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Voice Selection */}
              <div className="space-y-2">
                <Label htmlFor="voice-select">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger id="voice-select">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rate Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="rate-slider">Speed</Label>
                  <span className="text-sm text-muted-foreground">{rate[0]}x</span>
                </div>
                <Slider
                  id="rate-slider"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={rate}
                  onValueChange={setRate}
                  className="w-full"
                />
              </div>

              {/* Pitch Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pitch-slider">Pitch</Label>
                  <span className="text-sm text-muted-foreground">{pitch[0]}</span>
                </div>
                <Slider
                  id="pitch-slider"
                  min={0}
                  max={2}
                  step={0.1}
                  value={pitch}
                  onValueChange={setPitch}
                  className="w-full"
                />
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="volume-slider">Volume</Label>
                  <span className="text-sm text-muted-foreground">{Math.round(volume[0] * 100)}%</span>
                </div>
                <Slider
                  id="volume-slider"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onValueChange={setVolume}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Bar */}
      <AnimatePresence>
        {(isPlaying || isPaused) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {isPaused ? 'Paused' : 'Playing'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={isPlaying ? (isPaused ? resume : pause) : speak}
                disabled={!text.trim() || isLoading}
                size="lg"
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : isPlaying ? (
                  isPaused ? (
                    <>
                      <Play className="h-4 w-4" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  )
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Speak
                  </>
                )}
              </Button>

              <Button
                onClick={stop}
                disabled={!isPlaying && !isPaused}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Square className="h-4 w-4" />
                Stop
              </Button>

              <Button
                onClick={reset}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <Button
                onClick={downloadAudio}
                disabled={!text.trim()}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Hello! Welcome to the Offline Toolkit.",
                "This text-to-speech tool converts written text into natural-sounding speech.",
                "You can adjust the voice, speed, pitch, and volume to customize the output.",
                "Try different voices and settings to find what works best for you."
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 justify-start"
                  onClick={() => handleTextChange(example)}
                >
                  <Mic className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{example}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
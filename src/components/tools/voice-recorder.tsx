
"use client";

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Download,
  Trash2,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAccessibility } from '@/components/accessibility-provider';

interface RecordedAudio {
  blob: Blob;
  url: string;
  duration: number;
  timestamp: Date;
}

export function VoiceRecorderComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<RecordedAudio | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();
  const { announceToScreenReader } = useAccessibility();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Get duration (simplified - in real implementation you'd need to load the audio)
        const duration = recordingTime;

        setRecordedAudio({
          blob: audioBlob,
          url: audioUrl,
          duration,
          timestamp: new Date()
        });

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());

        announceToScreenReader(`Recording completed. Duration: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`, 'polite');
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      announceToScreenReader('Recording started', 'polite');

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast, announceToScreenReader]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        announceToScreenReader('Recording resumed', 'polite');
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        announceToScreenReader('Recording paused', 'polite');
      }
    }
  }, [isRecording, isPaused, announceToScreenReader]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  }, [isRecording]);

  const playRecording = useCallback(() => {
    if (recordedAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [recordedAudio, isPlaying]);

  const downloadRecording = useCallback(() => {
    if (recordedAudio) {
      const a = document.createElement('a');
      a.href = recordedAudio.url;
      a.download = `recording-${recordedAudio.timestamp.toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: "Your recording has been downloaded.",
      });
    }
  }, [recordedAudio, toast]);

  const deleteRecording = useCallback(() => {
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio.url);
      setRecordedAudio(null);
      setPlaybackProgress(0);
      announceToScreenReader('Recording deleted', 'polite');
    }
  }, [recordedAudio, announceToScreenReader]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isRecordingSupported = typeof window !== 'undefined' &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia;

  if (!isRecordingSupported) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🎤</div>
          <h3 className="text-lg font-semibold mb-2">Voice Recording Not Supported</h3>
          <p className="text-muted-foreground">
            Your browser doesn't support voice recording. Please try using a modern browser like Chrome, Firefox, or Safari.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recording Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Voice Recorder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Recording Status */}
              <div className="text-center">
                <AnimatePresence mode="wait">
                  {isRecording ? (
                    <motion.div
                      key="recording"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="space-y-2"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full"
                      >
                        <Mic className="h-8 w-8 text-white" />
                      </motion.div>
                      <div>
                        <p className="text-lg font-semibold text-red-500">
                          {isPaused ? 'Recording Paused' : 'Recording...'}
                        </p>
                        <p className="text-2xl font-mono font-bold">
                          {formatTime(recordingTime)}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="space-y-2"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                        <Mic className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {recordedAudio ? 'Recording Complete' : 'Ready to Record'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                  >
                    <Mic className="h-5 w-5" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseRecording}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      onClick={stopRecording}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Square className="h-5 w-5" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recorded Audio */}
      <AnimatePresence>
        {recordedAudio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  Recorded Audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Audio Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recording</p>
                      <p className="text-sm text-muted-foreground">
                        Duration: {formatTime(recordedAudio.duration)} •
                        Size: {(recordedAudio.blob.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {recordedAudio.timestamp.toLocaleTimeString()}
                    </Badge>
                  </div>

                  {/* Playback Progress */}
                  {isPlaying && (
                    <div className="space-y-2">
                      <Progress value={playbackProgress} className="w-full" />
                      <p className="text-sm text-center text-muted-foreground">
                        Playing... {Math.round(playbackProgress)}%
                      </p>
                    </div>
                  )}

                  {/* Hidden Audio Element */}
                  <audio
                    ref={audioRef}
                    src={recordedAudio.url}
                    onEnded={() => {
                      setIsPlaying(false);
                      setPlaybackProgress(0);
                    }}
                    onTimeUpdate={() => {
                      if (audioRef.current) {
                        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                        setPlaybackProgress(progress);
                      }
                    }}
                    className="hidden"
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      onClick={playRecording}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      onClick={downloadRecording}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-5 w-5" />
                      Download
                    </Button>
                    <Button
                      onClick={deleteRecording}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <h4 className="font-semibold text-foreground">How to use:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Click "Start Recording" to begin recording audio</li>
                <li>• Click "Pause" to temporarily stop recording</li>
                <li>• Click "Stop" when you're finished recording</li>
                <li>• Use "Play" to preview your recording</li>
                <li>• Download your recording or delete it if needed</li>
              </ul>
              <p className="text-xs mt-3">
                <strong>Note:</strong> Make sure to allow microphone access when prompted by your browser.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

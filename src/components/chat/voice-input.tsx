'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useTranslation } from '@/lib/contexts/translation-context';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onVoiceInput, disabled }: VoiceInputProps) {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = t('chat.voiceInput.language', 'chat');

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognition);
    recognition.start();
  }, [onVoiceInput, t]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  }, [recognition]);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      disabled={disabled}
      onClick={toggleRecording}
      className={cn(
        "relative text-muted-foreground hover:text-foreground transition-colors",
        isRecording && "text-destructive hover:text-destructive"
      )}
    >
      {isRecording ? (
        <>
          <MicOff className="h-5 w-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
          </span>
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
      <span className="sr-only">
        {isRecording ? t('chat.voiceInput.stop', 'chat') : t('chat.voiceInput.start', 'chat')}
      </span>
    </Button>
  );
} 
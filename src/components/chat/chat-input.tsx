'use client';

import { useTranslation } from '@/lib/contexts/translation-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { ChatActions } from './chat-actions';
import { VoiceInput } from './voice-input';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  onUploadFile?: (file: File) => Promise<void>;
  onResearchToggle?: () => void;
  onInternetToggle?: () => void;
  isLoading?: boolean;
}

export function ChatInput({
  onSendMessage,
  onUploadFile,
  onResearchToggle,
  onInternetToggle,
  isLoading,
}: ChatInputProps) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textareaRef.current?.value.trim() || isLoading) return;

    await onSendMessage(textareaRef.current.value);
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = (text: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = text;
      textareaRef.current.focus();
      // Trigger the height adjustment
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    textarea.addEventListener('input', adjustHeight);
    return () => textarea.removeEventListener('input', adjustHeight);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-2 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-t border-border/50">
      <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
        <ChatActions
          onUpload={onUploadFile}
          onResearchToggle={onResearchToggle}
          onInternetToggle={onInternetToggle}
        />
      </div>
      <div className="flex gap-2 max-w-5xl mx-auto w-full">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder={t('chat.inputPlaceholder', 'chat')}
            className="min-h-[52px] max-h-[200px] resize-none pr-24 bg-muted/30 hover:bg-muted/50 focus:bg-muted/50 transition-colors rounded-xl border border-border/50 focus:border-primary/50 shadow-sm"
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <VoiceInput 
              onVoiceInput={handleVoiceInput}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={isLoading}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">{t('chat.send', 'chat')}</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
} 
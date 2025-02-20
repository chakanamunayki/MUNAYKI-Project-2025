'use client';

import { useTranslation } from '@/lib/contexts/translation-context';
import { Button } from '@/components/ui/button';
import { Upload, Search, Globe } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ChatActionsProps {
  onUpload?: (file: File) => Promise<void>;
  onResearchToggle?: () => void;
  onInternetToggle?: () => void;
  className?: string;
}

export function ChatActions({
  onUpload,
  onResearchToggle,
  onInternetToggle,
  className,
}: ChatActionsProps) {
  const { t } = useTranslation();
  const [isResearchMode, setIsResearchMode] = useState(false);
  const [isInternetMode, setIsInternetMode] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      await onUpload(file);
      e.target.value = '';
    }
  };

  const toggleResearchMode = () => {
    setIsResearchMode(!isResearchMode);
    onResearchToggle?.();
  };

  const toggleInternetMode = () => {
    setIsInternetMode(!isInternetMode);
    onInternetToggle?.();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Upload className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('chat.actions.upload')}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="mt-2 text-sm">{t('chat.actions.uploadTypes.image')}</span>
            </label>
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="mt-2 text-sm">{t('chat.actions.uploadTypes.document')}</span>
            </label>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "text-muted-foreground hover:text-foreground",
          isResearchMode && "bg-primary/10 text-primary"
        )}
        onClick={toggleResearchMode}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "text-muted-foreground hover:text-foreground",
          isInternetMode && "bg-primary/10 text-primary"
        )}
        onClick={toggleInternetMode}
      >
        <Globe className="h-5 w-5" />
      </Button>
    </div>
  );
} 
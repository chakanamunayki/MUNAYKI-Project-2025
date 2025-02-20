export interface HolisticExpert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialty: string;
  description: string;
  topics: string[];
  rating: number;
  testimonial: string;
  accentColor: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'expert';
  timestamp: string;
  expertId?: string;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatSession {
  id: string;
  title: string;
  expertId: string;
  messages: ChatMessage[];
  lastMessageAt: string;
  status?: 'active' | 'archived';
}

export interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  onUploadFile?: (file: File) => Promise<void>;
  onResearchToggle?: () => void;
  onInternetToggle?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface ChatMessageProps {
  message: ChatMessage;
  expert?: HolisticExpert;
}

export interface ChatThreadProps {
  messages: ChatMessage[];
  expert?: HolisticExpert;
  isLoading?: boolean;
} 
'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/contexts/translation-context';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatSuggestions } from '@/components/chat/chat-suggestions';
import { mockChatService } from '@/lib/mock-chat-service';
import type { ChatMessage, HolisticExpert } from '@/types/chat';

export default function ChatPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeExpert, setActiveExpert] = useState<HolisticExpert | null>(null);

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // Add user message
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Simulate expert response
      setTimeout(() => {
        const expertId = activeExpert?.id || 'meditation-guru';
        const response = mockChatService.getExpertResponse(expertId);
        const expertMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          content: response,
          sender: 'expert',
          timestamp: new Date().toISOString(),
          expertId,
        };
        setMessages(prev => [...prev, expertMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    if (!activeExpert) {
      const experts = mockChatService.getAllExperts();
      const relevantExpert = experts.find(expert => 
        question.toLowerCase().includes(expert.specialty.toLowerCase())
      );
      if (relevantExpert) {
        setActiveExpert(relevantExpert);
      }
    }
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          // Welcome Message with Suggestions
          <div className="h-full flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('chat.welcome.title', 'chat')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('chat.welcome.description', 'chat')}
              </p>
            </div>
            <div className="w-full max-w-3xl mx-auto">
              <ChatSuggestions onSelectSuggestion={handleSuggestionClick} />
            </div>
          </div>
        ) : (
          // Chat Messages
          <div className="flex-1 px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => {
                const expert = message.expertId ? mockChatService.getExpertById(message.expertId) : undefined;
                return (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'expert' && expert && (
                      <div className="relative h-8 w-8 mr-2">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${expert.accentColor}`} />
                        <img
                          src={expert.avatar}
                          alt={expert.name}
                          className="relative rounded-full w-8 h-8 object-cover border-2 border-background"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'bg-muted/50 backdrop-blur-sm text-foreground'
                      }`}
                    >
                      {message.sender === 'expert' && expert && (
                        <div className="font-medium text-sm mb-1">{expert.name}</div>
                      )}
                      <div className="text-sm leading-relaxed">{message.content}</div>
                      <div className="text-xs mt-2 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 backdrop-blur-sm text-foreground rounded-2xl p-4">
                    <span className="text-sm">{t('chat.loading', 'chat')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
            onUploadFile={async (file) => {
              console.log('File uploaded:', file);
              // TODO: Implement file upload
            }}
            onResearchToggle={() => {
              console.log('Research mode toggled');
              // TODO: Implement research mode
            }}
            onInternetToggle={() => {
              console.log('Internet mode toggled');
              // TODO: Implement internet search
            }}
          />
        </div>
      </div>
    </div>
  );
} 
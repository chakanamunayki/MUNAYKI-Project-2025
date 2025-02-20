'use client';

import { useState, useEffect, use } from 'react';
import { cn } from '@/lib/utils';
import { mockChatService } from '@/lib/mock-chat-service';
import type { ChatSession } from '@/lib/mock-chat-service';
import type { HolisticExpert } from '@/types/chat';
import { Star, History, Settings, ChevronLeft, ChevronRight, Plus, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/contexts/translation-context';
import Image from 'next/image';

interface ChatLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function ChatLayout({ children, params }: ChatLayoutProps) {
  const { locale } = use(params);
  const { t } = useTranslation();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [experts, setExperts] = useState<HolisticExpert[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeExpert, setActiveExpert] = useState<string | null>(null);

  useEffect(() => {
    setExperts(mockChatService.getAllExperts());
    setSessions(mockChatService.getChatSessions());
  }, []);

  const handleNewChat = (expertId: string) => {
    setActiveExpert(expertId);
    const session = mockChatService.createChatSession(
      expertId,
      t('chat.inputPlaceholder', 'chat')
    );
    setSessions(mockChatService.getChatSessions());
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-background text-foreground mt-14">
      {/* Left Sidebar - Menu */}
      <div
        className={cn(
          "border-r border-border flex-shrink-0 transition-all duration-300",
          isMenuCollapsed ? "w-16" : "w-56"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 relative">
                <Image
                  src="/images/logo/munay-ki.svg"
                  alt="MunayKi"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              {!isMenuCollapsed && (
                <span className="font-semibold text-lg">MunayKi Chat</span>
              )}
            </div>

            {/* New Chat Button */}
            <button
              onClick={() => handleNewChat(experts[0]?.id)}
              className="w-full flex items-center gap-2 p-2 mb-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            >
              <Plus size={20} />
              {!isMenuCollapsed && <span>{t('layout.newChat', 'chat')}</span>}
            </button>

            {/* Menu Items */}
            <div className="space-y-1">
              <button
                onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                className="w-full flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {isMenuCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                {!isMenuCollapsed && <span>{t('layout.collapse', 'chat')}</span>}
              </button>
              <button className="w-full flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <History size={20} />
                {!isMenuCollapsed && <span>{t('layout.menu.memories', 'chat')}</span>}
              </button>
              <button className="w-full flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Settings size={20} />
                {!isMenuCollapsed && <span>{t('layout.menu.settings', 'chat')}</span>}
              </button>
            </div>
          </div>

          {/* Chat History */}
          {!isMenuCollapsed && (
            <div className="flex-1 overflow-y-auto border-t border-border mt-4">
              <div className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Chats</h3>
                <div className="space-y-2">
                  {sessions.map((session) => {
                    const expert = mockChatService.getExpertById(session.expertId);
                    if (!expert) return null;

                    const lastMessage = session.messages[session.messages.length - 1];
                    return (
                      <button
                        key={session.id}
                        onClick={() => handleNewChat(expert.id)}
                        className="w-full flex items-start gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <MessageSquare size={16} className="mt-1 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium truncate">{session.title}</div>
                          {lastMessage && (
                            <div className="text-xs truncate opacity-70">
                              {lastMessage.content}
                            </div>
                          )}
                          <div className="text-xs mt-1 opacity-50">
                            {new Date(session.lastMessageAt).toLocaleDateString()}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Experts Section */}
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <div className="p-4">
            <div className="flex flex-col gap-4">
              {/* Header with title and scroll buttons */}
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t('layout.experts.title', 'chat')}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const container = document.getElementById('experts-scroll');
                      if (container) {
                        container.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const container = document.getElementById('experts-scroll');
                      if (container) {
                        container.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              
              {/* Scrollable container */}
              <div className="relative w-full">
                <div 
                  id="experts-scroll"
                  className="flex gap-2 overflow-x-auto no-scrollbar"
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                  {experts.map((expert) => (
                    <button
                      key={expert.id}
                      onClick={() => handleNewChat(expert.id)}
                      className={cn(
                        "flex-shrink-0 group relative transition-all duration-200",
                        "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl",
                        activeExpert === expert.id && "bg-muted/50"
                      )}
                    >
                      <div className="flex flex-col items-center p-2">
                        <div className="relative h-12 w-12 mb-1">
                          <div className={cn(
                            "absolute inset-0 rounded-full bg-gradient-to-r",
                            expert.accentColor
                          )} />
                          <Image
                            src={expert.avatar}
                            alt={expert.name}
                            width={48}
                            height={48}
                            className="relative rounded-full object-cover border-2 border-background"
                          />
                          {activeExpert === expert.id && (
                            <span className="absolute bottom-0 right-0 h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                          )}
                        </div>
                        <div className="text-center min-w-[80px] max-w-[100px]">
                          <div className="font-medium text-sm truncate">{expert.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {expert.title}
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-0.5">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs font-medium">{expert.rating}</span>
                          </div>
                        </div>
                      </div>
                      {/* Hover Preview */}
                      <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-64 p-4 rounded-xl bg-popover shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="text-sm font-medium mb-1">{expert.specialty}</div>
                        <div className="text-xs text-muted-foreground mb-2">{expert.description}</div>
                        <div className="flex flex-wrap gap-1">
                          {expert.topics.map((topic) => (
                            <span
                              key={topic}
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                "bg-gradient-to-r bg-clip-text text-transparent",
                                expert.accentColor
                              )}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 text-xs italic text-muted-foreground">
                          "{expert.testimonial}"
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
} 
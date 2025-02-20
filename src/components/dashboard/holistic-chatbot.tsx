"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  expertId?: string;
}

interface HolisticExpert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialty: string;
  description: string;
}

const holisticExperts: HolisticExpert[] = [
  {
    id: 'meditation-guru',
    name: 'Master Zhen',
    title: 'Meditation Guide',
    avatar: '/images/experts/meditation-guru.jpg',
    specialty: 'Meditation & Mindfulness',
    description: 'Ancient wisdom for modern peace',
  },
  {
    id: 'yoga-master',
    name: 'Priya Sharma',
    title: 'Yoga Master',
    avatar: '/images/experts/yoga-master.jpg',
    specialty: 'Yoga & Movement',
    description: 'Harmony through movement',
  },
  {
    id: 'wellness-guide',
    name: 'Dr. Sarah Chen',
    title: 'Wellness Guide',
    avatar: '/images/experts/wellness-guide.jpg',
    specialty: 'Holistic Health',
    description: 'Integrated wellness approach',
  },
  {
    id: 'energy-healer',
    name: 'Luna White',
    title: 'Energy Healer',
    avatar: '/images/experts/energy-healer.jpg',
    specialty: 'Energy Work',
    description: 'Balancing body and spirit',
  },
];

const demoResponses = {
  'cacao ceremony': 'A cacao ceremony is a sacred ritual that uses pure ceremonial cacao to open the heart and facilitate deep meditation and inner work. It\'s known for its gentle but profound effects on emotional and spiritual well-being.',
  'sound healing': 'Sound healing uses vibrations from various instruments like singing bowls, gongs, and drums to help reduce stress, anxiety, and pain. The vibrations help promote deep relaxation and can facilitate healing on physical and emotional levels.',
  'meditation': 'Meditation is a practice of mindfulness and presence that can help reduce stress, improve focus, and enhance overall well-being. We offer guided meditations suitable for both beginners and experienced practitioners.',
  'default': 'I\'d be happy to share information about our holistic practices and ceremonies. Feel free to ask about specific ceremonies, healing modalities, or general wellness questions.'
};

interface HolisticChatbotProps {
  initialExpertId?: string;
}

export function HolisticChatbot({ initialExpertId }: HolisticChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<HolisticExpert | null>(() => {
    if (initialExpertId) {
      return holisticExperts.find(expert => expert.id === initialExpertId) || null;
    }
    return null;
  });
  const [recentChats, setRecentChats] = useState<{ expertId: string; preview: string; timestamp: Date }[]>([]);

  const handleExpertSelect = (expert: HolisticExpert) => {
    setSelectedExpert(expert);
    setMessages([
      {
        id: Date.now().toString(),
        content: `Hello! I'm ${expert.name}, your ${expert.specialty} guide. How can I assist you today?`,
        sender: 'bot',
        timestamp: new Date(),
        expertId: expert.id,
      },
    ]);
  };

  const handleSend = () => {
    if (!input.trim() || !selectedExpert) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      expertId: selectedExpert.id,
    };

    setMessages(prev => [...prev, userMessage]);

    // Update recent chats
    setRecentChats(prev => {
      const newChat = {
        expertId: selectedExpert.id,
        preview: input,
        timestamp: new Date(),
      };
      return [newChat, ...prev.slice(0, 4)];
    });

    // Simple response logic
    const query = input.toLowerCase();
    let response = demoResponses.default;
    
    Object.entries(demoResponses).forEach(([key, value]) => {
      if (query.includes(key)) {
        response = value;
      }
    });

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      expertId: selectedExpert.id,
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  return (
    <div className="flex h-[600px] gap-4">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r">
        <ScrollArea className="h-full px-2">
          <div className="space-y-6">
            {/* Holistic Experts */}
            <div>
              <h3 className="font-semibold mb-3">Holistic Experts</h3>
              <div className="space-y-2">
                {holisticExperts.map((expert) => (
                  <button
                    key={expert.id}
                    onClick={() => handleExpertSelect(expert)}
                    className={cn(
                      "w-full flex items-start gap-3 p-2 rounded-lg transition-colors",
                      selectedExpert?.id === expert.id
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    )}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={expert.avatar} alt={expert.name} />
                      <AvatarFallback>{expert.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">{expert.name}</p>
                      <p className="text-xs text-muted-foreground">{expert.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Chats */}
            {recentChats.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Recent Chats</h3>
                <div className="space-y-2">
                  {recentChats.map((chat, index) => {
                    const expert = holisticExperts.find(e => e.id === chat.expertId);
                    if (!expert) return null;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleExpertSelect(expert)}
                        className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-muted"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={expert.avatar} alt={expert.name} />
                          <AvatarFallback>{expert.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm font-medium">{expert.name}</p>
                          <p className="text-xs text-muted-foreground truncate w-36">
                            {chat.preview}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedExpert ? (
        <div className="flex-1 flex flex-col">
          {/* Expert Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedExpert.avatar} alt={selectedExpert.name} />
              <AvatarFallback>{selectedExpert.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedExpert.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedExpert.description}</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col",
                    message.sender === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${selectedExpert.name} a question...`}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a holistic expert to start a conversation
        </div>
      )}
    </div>
  );
} 
'use client';

import { HolisticChatbot } from '@/components/dashboard/holistic-chatbot';

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Holistic Guides</h1>
        <p className="text-muted-foreground">Connect with our holistic experts for personalized guidance</p>
      </div>
      <div className="bg-card rounded-lg border shadow-sm">
        <HolisticChatbot />
      </div>
    </div>
  );
} 
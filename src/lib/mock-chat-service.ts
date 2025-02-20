import type { HolisticExpert } from '@/types/chat';

export interface ChatSession {
  id: string;
  expertId: string;
  title: string;
  messages: {
    id: string;
    content: string;
    sender: 'user' | 'expert';
    timestamp: string;
  }[];
  lastMessageAt: string;
  status: 'active' | 'archived';
}

const experts: HolisticExpert[] = [
  {
    id: 'meditation-guru',
    name: 'Maya Patel',
    title: 'Meditation & Mindfulness Expert',
    avatar: '/images/experts/meditation-guru.jpg',
    specialty: 'meditation',
    description: 'Guiding souls through mindful meditation practices for over 15 years.',
    topics: ['meditation', 'mindfulness', 'stress-relief'],
    rating: 4.9,
    testimonial: 'Maya helped me find inner peace when I needed it most.',
    accentColor: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'chakra-master',
    name: 'Elena Rodriguez',
    title: 'Chakra Healing Specialist',
    avatar: '/images/experts/chakra-master.jpg',
    specialty: 'chakras',
    description: 'Expert in chakra balancing and energy alignment.',
    topics: ['chakras', 'energy-healing', 'spiritual-growth'],
    rating: 4.8,
    testimonial: 'Elena has an amazing gift for chakra healing.',
    accentColor: 'from-orange-400 to-pink-500',
  },
  {
    id: 'tcm-expert',
    name: 'Dr. Li Wei',
    title: 'Traditional Chinese Medicine Expert',
    avatar: '/images/experts/tcm-expert.jpg',
    specialty: 'chinese-medicine',
    description: 'Bringing ancient wisdom of TCM to modern healing practices.',
    topics: ['chinese-medicine', 'herbal-healing', 'acupuncture'],
    rating: 4.9,
    testimonial: "Dr. Li's knowledge of TCM is truly remarkable.",
    accentColor: 'from-red-500 to-rose-500',
  },
  {
    id: 'ayahuasca-shaman',
    name: 'Carlos Santana',
    title: 'Ayahuasca Ceremony Guide',
    avatar: '/images/experts/ayahuasca-shaman.jpg',
    specialty: 'ayahuasca',
    description: 'Traditional shaman with deep knowledge of sacred plant medicines.',
    topics: ['ayahuasca', 'spiritual-healing', 'ceremonies'],
    rating: 4.9,
    testimonial: 'A truly transformative experience with Carlos.',
    accentColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 'grief-counselor',
    name: 'Sarah Mitchell',
    title: 'Holistic Grief Counselor',
    avatar: '/images/experts/grief-counselor.jpg',
    specialty: 'grief',
    description: 'Helping people navigate loss with compassion and understanding.',
    topics: ['grief', 'emotional-healing', 'trauma-release'],
    rating: 4.8,
    testimonial: "Sarah's guidance helped me through the darkest times.",
    accentColor: 'from-blue-400 to-indigo-500',
  },
];

class MockChatService {
  private experts: HolisticExpert[] = experts;
  private sessions: ChatSession[] = [];

  getAllExperts(): HolisticExpert[] {
    return this.experts;
  }

  getExpertById(id: string): HolisticExpert | undefined {
    return this.experts.find(expert => expert.id === id);
  }

  getExpertBySpecialty(specialty: string): HolisticExpert | undefined {
    return this.experts.find(expert => expert.specialty === specialty);
  }

  createChatSession(expertId: string, initialMessage?: string): ChatSession {
    const expert = this.getExpertById(expertId);
    if (!expert) throw new Error('Expert not found');

    const session: ChatSession = {
      id: `session-${Date.now()}`,
      title: `Chat with ${expert.name}`,
      expertId: expert.id,
      messages: [],
      lastMessageAt: new Date().toISOString(),
      status: 'active',
    };

    if (initialMessage) {
      session.messages.push({
        id: `msg-${Date.now()}`,
        content: initialMessage,
        sender: 'user',
        timestamp: new Date().toISOString(),
      });
    }

    this.sessions.push(session);
    return session;
  }

  getChatSessions(): ChatSession[] {
    return this.sessions;
  }

  getExpertResponse(expertId: string): string {
    const expert = this.getExpertById(expertId);
    if (!expert) return 'I apologize, but I am not available at the moment.';

    const responses = {
      'meditation-guru': "Take a deep breath and let's begin our mindful journey together.",
      'chakra-master': "I sense some energy blockages. Let's work on aligning your chakras.",
      'tcm-expert': 'Traditional Chinese Medicine offers several approaches for your well-being.',
      'ayahuasca-shaman': 'The plant medicines hold ancient wisdom for healing and transformation.',
      'grief-counselor': "Your feelings are valid. Let's process this together with compassion.",
    };

    return responses[expertId as keyof typeof responses] || 
      "I'm here to help you on your holistic healing journey.";
  }
}

export const mockChatService = new MockChatService(); 
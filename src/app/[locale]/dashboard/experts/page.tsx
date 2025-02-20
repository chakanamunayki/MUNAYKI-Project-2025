'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, Heart } from "lucide-react";
import { HolisticChatbot } from '@/components/dashboard/holistic-chatbot';

const experts = [
  {
    id: 'meditation-guru',
    name: 'Master Zhen',
    title: 'Meditation Guide',
    avatar: '/images/experts/meditation-guru.jpg',
    specialty: 'Meditation & Mindfulness',
    description: 'Ancient wisdom for modern peace',
    topics: ['Stress Relief', 'Daily Meditation', 'Mindful Living'],
    rating: 4.9,
    testimonial: 'Master Zhen helped me develop a sustainable meditation practice that fits my busy lifestyle.',
  },
  {
    id: 'yoga-master',
    name: 'Priya Sharma',
    title: 'Yoga Master',
    avatar: '/images/experts/yoga-master.jpg',
    specialty: 'Yoga & Movement',
    description: 'Harmony through movement',
    topics: ['Yoga Basics', 'Flow Sequences', 'Breathing Techniques'],
    rating: 4.8,
    testimonial: 'Priya\'s guidance has transformed my yoga practice and overall well-being.',
  },
  {
    id: 'wellness-guide',
    name: 'Dr. Sarah Chen',
    title: 'Wellness Guide',
    avatar: '/images/experts/wellness-guide.jpg',
    specialty: 'Holistic Health',
    description: 'Integrated wellness approach',
    topics: ['Nutrition', 'Sleep Quality', 'Energy Balance'],
    rating: 4.9,
    testimonial: 'Dr. Chen provided practical advice that helped me achieve better work-life balance.',
  },
  {
    id: 'energy-healer',
    name: 'Luna White',
    title: 'Energy Healer',
    avatar: '/images/experts/energy-healer.jpg',
    specialty: 'Energy Work',
    description: 'Balancing body and spirit',
    topics: ['Chakra Alignment', 'Energy Clearing', 'Spiritual Growth'],
    rating: 4.7,
    testimonial: 'Luna\'s energy work sessions have been truly transformative for my spiritual journey.',
  },
];

export default function ExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Holistic Experts</h1>
          <p className="text-muted-foreground mt-2">
            Connect with our AI-powered holistic guides for personalized wellness advice
          </p>
        </div>
      </div>

      {!selectedExpert ? (
        <div className="grid gap-6 md:grid-cols-2">
          {experts.map((expert) => (
            <Card key={expert.id} className="group hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={expert.avatar} alt={expert.name} />
                  <AvatarFallback>{expert.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {expert.name}
                    <Badge variant="secondary" className="ml-2">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {expert.rating}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{expert.specialty}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{expert.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {expert.topics.map((topic) => (
                      <Badge key={topic} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-2 pl-4 italic text-sm text-muted-foreground mb-6">
                  "{expert.testimonial}"
                </blockquote>

                <Button 
                  className="w-full group-hover:bg-primary/90"
                  onClick={() => setSelectedExpert(expert.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border shadow-md">
          <div className="p-4 border-b flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedExpert(null)}
            >
              ← Back to Experts
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save Chat
            </Button>
          </div>
          <HolisticChatbot initialExpertId={selectedExpert} />
        </div>
      )}
    </div>
  );
} 
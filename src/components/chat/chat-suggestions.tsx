'use client';

import { useTranslation } from '@/lib/contexts/translation-context';

interface ChatSuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
}

export function ChatSuggestions({ onSelectSuggestion }: ChatSuggestionsProps) {
  const { t } = useTranslation();

  const suggestions = [
    {
      id: 'meditation',
      text: t('chat.suggestions.meditation', 'chat'),
      question: t('chat.questions.meditation', 'chat'),
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'chakras',
      text: t('chat.suggestions.chakras', 'chat'),
      question: t('chat.questions.chakras', 'chat'),
      color: 'from-orange-400 to-pink-500',
    },
    {
      id: 'energy',
      text: t('chat.suggestions.energy', 'chat'),
      question: t('chat.questions.energy', 'chat'),
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'chinese-medicine',
      text: t('chat.suggestions.chinese_medicine', 'chat'),
      question: t('chat.questions.chinese_medicine', 'chat'),
      color: 'from-red-500 to-rose-500',
    },
    {
      id: 'ayahuasca',
      text: t('chat.suggestions.ayahuasca', 'chat'),
      question: t('chat.questions.ayahuasca', 'chat'),
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'grief',
      text: t('chat.suggestions.grief', 'chat'),
      question: t('chat.questions.grief', 'chat'),
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'stress',
      text: t('chat.suggestions.stress', 'chat'),
      question: t('chat.questions.stress', 'chat'),
      color: 'from-teal-400 to-cyan-500',
    },
    {
      id: 'wellness',
      text: t('chat.suggestions.wellness', 'chat'),
      question: t('chat.questions.wellness', 'chat'),
      color: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto mb-8">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelectSuggestion(suggestion.question)}
          className={`px-4 py-2 rounded-full bg-gradient-to-r ${suggestion.color} text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-105 active:scale-95`}
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
} 
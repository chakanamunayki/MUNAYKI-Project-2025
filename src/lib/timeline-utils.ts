import { type EventCategory } from "@/types/ceremony-schedule";
import { 
  Leaf, 
  Moon, 
  Coffee, 
  ScrollText, 
  Heart,
  type LucideIcon 
} from "lucide-react";

export const getCategoryIcon = (category: EventCategory): LucideIcon => {
  const icons: Record<EventCategory, LucideIcon> = {
    meditation: Leaf,
    ceremony: Moon,
    meal: Coffee,
    preparation: ScrollText,
    integration: Heart,
  };
  return icons[category];
};

export const getCategoryStyles = (category: EventCategory): string => {
  const styles: Record<EventCategory, string> = {
    meditation: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    ceremony: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    meal: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
    preparation: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    integration: "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
  };
  return styles[category];
};

export const getCategoryColor = (category: EventCategory): string => {
  const colors: Record<EventCategory, string> = {
    meditation: "var(--green)",
    ceremony: "var(--purple)",
    meal: "var(--orange)",
    preparation: "var(--blue)",
    integration: "var(--pink)",
  };
  return colors[category];
}; 
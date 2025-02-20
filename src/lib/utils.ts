import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateBookingReference(name: string): string {
  const timestamp = Date.now().toString(36);
  const nameHash = name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .slice(0, 3);
  const randomStr = Math.random().toString(36).slice(2, 5);
  return `BK-${nameHash}${timestamp}${randomStr}`.toUpperCase();
} 
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type BookingData } from '@/types/booking';

interface BookingState {
  bookingData: BookingData | null;
  selectedExtras: string[];
  currentStep: string;
  setBookingData: (data: BookingData) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  setSelectedExtras: (extras: string[]) => void;
  setCurrentStep: (step: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookingData: null,
      selectedExtras: [],
      currentStep: 'attendee-details',
      setBookingData: (data) => set({ bookingData: data }),
      updateBookingData: (data) => 
        set((state) => ({
          bookingData: state.bookingData ? { ...state.bookingData, ...data } : data as BookingData
        })),
      setSelectedExtras: (extras) => set({ selectedExtras: extras }),
      setCurrentStep: (step) => set({ currentStep: step }),
      reset: () => set({ 
        bookingData: null, 
        selectedExtras: [], 
        currentStep: 'attendee-details' 
      }),
    }),
    {
      name: 'booking-storage',
      skipHydration: true,
    }
  )
); 
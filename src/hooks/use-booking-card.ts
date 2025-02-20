'use client';

import { useState, useCallback, useMemo } from 'react';
import { type CeremonyExtra, type BookingState } from '@/types/booking';

interface UseBookingCardProps {
  basePrice: number;
  extras: CeremonyExtra[];
}

export function useBookingCard({ basePrice, extras }: UseBookingCardProps) {
  const [state, setState] = useState<BookingState>({
    selectedExtras: [],
    totalPrice: basePrice,
    discountApplied: false,
  });

  // Calculate if all extras are selected
  const allExtrasSelected = useMemo(() => {
    return extras.length > 0 && state.selectedExtras.length === extras.length;
  }, [state.selectedExtras, extras]);

  // Calculate total price
  const calculateTotal = useCallback((selectedExtras: string[]) => {
    // Start with base price
    let total = basePrice;

    // Add selected extras
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find((e) => e.id === extraId);
      return sum + (extra?.price.amount || 0);
    }, 0);

    total += extrasTotal;

    // Apply 10% discount if all extras are selected
    if (selectedExtras.length === extras.length && extras.length > 0) {
      total = Math.round(total * 0.9); // 10% discount, rounded to nearest integer
    }

    return total;
  }, [basePrice, extras]);

  // Handle extra toggle
  const handleExtraToggle = useCallback((extraId: string) => {
    setState((prev) => {
      const newSelectedExtras = prev.selectedExtras.includes(extraId)
        ? prev.selectedExtras.filter((id) => id !== extraId)
        : [...prev.selectedExtras, extraId];

      const newTotal = calculateTotal(newSelectedExtras);
      const newAllSelected = newSelectedExtras.length === extras.length && extras.length > 0;

      return {
        selectedExtras: newSelectedExtras,
        totalPrice: newTotal,
        discountApplied: newAllSelected,
      };
    });
  }, [extras, calculateTotal]);

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  return {
    state,
    allExtrasSelected,
    handleExtraToggle,
    formatCurrency,
  };
} 
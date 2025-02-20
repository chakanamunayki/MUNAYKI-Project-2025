'use server';

// Import the mockDb singleton instance
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { generateBookingReference } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ceremonyId, bookingData, selectedExtras, totalAmount, currency } = body;

    // Generate a unique booking reference
    const bookingReference = generateBookingReference(bookingData.fullName);

    // Create the booking with additional metadata
    const booking = {
      ...bookingData,
      bookingReference,
      ceremonyId,
      selectedExtras,
      totalAmount,
      currency,
      bookingDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'active',
      paymentStatus: 'pending_verification',
    };

    // Save booking to mock database
    mockDb.createBooking(booking);

    return NextResponse.json({ 
      success: true, 
      bookingReference,
      booking 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get bookings for user from mock database
    const bookings = mockDb.getBookingsByUserId(userId);

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 
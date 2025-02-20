'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HolisticChatbot } from './holistic-chatbot';
import { mockDb } from '@/lib/mock-db';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface Booking {
  bookingReference: string;
  ceremonyId: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  currency: string;
  bookingDate: string;
  ceremonyTitle?: string;
}

export function DashboardContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay for demo purposes
    setTimeout(() => {
      try {
        const userBookings = mockDb.getBookingsByUserId('user_demo');
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
    },
    {
      title: "Pending Payments",
      value: bookings.filter(b => b.paymentStatus === 'pending').length,
    },
    {
      title: "Completed Payments",
      value: bookings.filter(b => b.paymentStatus === 'completed').length,
    },
    {
      title: "Active Ceremonies",
      value: bookings.filter(b => b.status === 'active').length,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`stat-skeleton-${i}`}
              className="h-20 rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            />
          ))}
        </div>
        <div className="h-[400px] rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={`stat-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link
                key={booking.bookingReference}
                href={`/dashboard/bookings/${booking.bookingReference}`}
                className={cn(
                  "block transition-colors hover:bg-muted/50",
                  booking.paymentStatus === 'pending' && "relative"
                )}
              >
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{booking.bookingReference}</p>
                      {booking.paymentStatus === 'pending' && (
                        <Alert variant="warning" className="py-2 px-3">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Action Required</AlertTitle>
                          <AlertDescription>
                            Complete your payment to secure your booking
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{booking.ceremonyTitle || 'Ceremony'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        booking.paymentStatus === 'completed'
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                      )}>
                        {booking.paymentStatus}
                      </span>
                      <p className="mt-1 font-medium">
                        {booking.totalAmount} {booking.currency}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Holistic Guide Section */}
      <Card>
        <CardHeader>
          <CardTitle>Holistic Guides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Button variant="outline" className="h-auto py-4 px-6">
              <div className="text-left">
                <h3 className="font-semibold">Meditation Guide</h3>
                <p className="text-sm text-muted-foreground">Guidance for meditation practices</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-6">
              <div className="text-left">
                <h3 className="font-semibold">Yoga Guide</h3>
                <p className="text-sm text-muted-foreground">Assistance with yoga poses and flows</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-6">
              <div className="text-left">
                <h3 className="font-semibold">Health & Wellness</h3>
                <p className="text-sm text-muted-foreground">General wellness and lifestyle advice</p>
              </div>
            </Button>
          </div>
          <HolisticChatbot />
        </CardContent>
      </Card>
    </div>
  );
} 
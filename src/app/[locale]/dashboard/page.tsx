"use client";

import { DashboardContent } from '@/components/dashboard/dashboard-content';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto p-4">
        <DashboardContent />
      </div>
    </div>
  );
} 
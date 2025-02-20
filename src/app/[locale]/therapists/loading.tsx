import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="relative min-h-screen">
      <section className="w-full py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Section Header Skeleton */}
            <div className="text-center space-y-6">
              <Skeleton className="h-12 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            {/* Therapists Grid Skeleton */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-64" />
                  <Skeleton className="w-3/4 h-8" />
                  <Skeleton className="w-1/2 h-6" />
                  <div className="space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
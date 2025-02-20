import { Skeleton } from '@/components/ui/skeleton'

export default function CeremonyLoading() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] min-h-[600px] w-full">
        <Skeleton className="absolute inset-0" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container space-y-8">
            {/* Title and subtitle */}
            <div className="max-w-3xl space-y-4">
              <Skeleton className="h-12 w-[450px]" />
              <Skeleton className="h-8 w-[350px]" />
            </div>

            {/* Quick info bar */}
            <Skeleton className="h-[72px] w-full max-w-2xl rounded-lg sm:h-[88px]" />
          </div>
        </div>
      </div>
    </main>
  )
} 
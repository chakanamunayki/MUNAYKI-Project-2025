import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  imageAlt: string
}

export function Background({ imageSrc, imageAlt, className, ...props }: BackgroundProps) {
  return (
    <div
      className={cn(
        'relative h-[70vh] min-h-[600px] w-full overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      
      {/* Gradient Overlay - Dark mode aware */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      
      {/* Decorative Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent" />
    </div>
  )
} 
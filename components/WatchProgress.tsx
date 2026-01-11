'use client'

import { cn } from '@/lib/utils'

interface WatchProgressProps {
  watched: number
  goal?: number
  className?: string
}

export function WatchProgress({ watched, goal = 5, className }: WatchProgressProps) {
  const progress = Math.min((watched / goal) * 100, 100)
  const isComplete = watched >= goal

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground-muted">This week</span>
        <span className={cn(
          'font-semibold',
          isComplete ? 'text-success' : 'text-foreground'
        )}>
          {watched}/{goal} videos
        </span>
      </div>
      <div className="h-2 bg-primary-soft rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            isComplete
              ? 'bg-gradient-to-r from-success to-emerald-400'
              : 'bg-gradient-to-r from-primary to-warning'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {isComplete && (
        <p className="text-xs text-success font-medium flex items-center gap-1">
          <span>🎉</span> Weekly goal achieved!
        </p>
      )}
    </div>
  )
}

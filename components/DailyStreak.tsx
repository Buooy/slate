'use client'

import { cn } from '@/lib/utils'

interface DailyStreakProps {
  streak: number
  className?: string
}

export function DailyStreak({ streak, className }: DailyStreakProps) {
  const getStreakEmoji = (days: number) => {
    if (days >= 30) return '🏆'
    if (days >= 14) return '⚡'
    if (days >= 7) return '🔥'
    return '✨'
  }

  const getStreakMessage = (days: number) => {
    if (days >= 30) return 'Legend!'
    if (days >= 14) return 'On fire!'
    if (days >= 7) return 'Keep it up!'
    if (days >= 3) return 'Building momentum'
    return 'Day ' + days
  }

  if (streak < 1) return null

  return (
    <div
      className={cn(
        'badge badge-streak inline-flex items-center gap-1.5 px-3 py-1.5',
        className
      )}
    >
      <span className="text-sm">{getStreakEmoji(streak)}</span>
      <span className="font-bold text-sm">{streak}</span>
      <span className="text-xs opacity-90">{getStreakMessage(streak)}</span>
    </div>
  )
}

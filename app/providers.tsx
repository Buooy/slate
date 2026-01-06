'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'
import { getTelegramUser, expandTelegramApp } from '@/lib/telegram'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize analytics
    analytics.init()

    // Expand Telegram app to full screen
    expandTelegramApp()

    // Identify user and track app open
    const user = getTelegramUser()
    if (user) {
      analytics.identify(user)
      analytics.track('app_opened', {
        telegram_user_id: user.id,
      })
    }
  }, [])

  return <>{children}</>
}

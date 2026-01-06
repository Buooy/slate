'use client'

import posthog from 'posthog-js'
import { TelegramUser } from './types'

let isInitialized = false

export function initAnalytics() {
  if (typeof window === 'undefined' || isInitialized) return

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

  if (apiKey) {
    posthog.init(apiKey, {
      api_host: apiHost,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })
    isInitialized = true
  }
}

export function identifyUser(user: TelegramUser) {
  if (!isInitialized) return

  posthog.identify(user.id.toString(), {
    telegram_user_id: user.id,
    first_name: user.first_name,
    username: user.username,
    language_code: user.language_code,
  })
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (!isInitialized) return
  posthog.capture(eventName, properties)
}

export const analytics = {
  init: initAnalytics,
  identify: identifyUser,
  track: trackEvent,
}

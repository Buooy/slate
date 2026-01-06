'use client'

import { TelegramUser } from './types'

export function getTelegramUser(): TelegramUser | null {
  if (typeof window === 'undefined') return null

  const telegram = (window as any).Telegram?.WebApp
  if (!telegram) return null

  const user = telegram.initDataUnsafe?.user
  if (!user) return null

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    language_code: user.language_code,
  }
}

export function isTelegramEnvironment(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window as any).Telegram?.WebApp
}

export function expandTelegramApp(): void {
  if (typeof window === 'undefined') return
  const telegram = (window as any).Telegram?.WebApp
  if (telegram) {
    telegram.ready()
    telegram.expand()
  }
}

'use client'

import { useEffect, useState } from 'react'
import { getTelegramUser } from '@/lib/telegram'

interface TimeContextProps {
  className?: string
}

export function TimeContext({ className }: TimeContextProps) {
  const [greeting, setGreeting] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')

  useEffect(() => {
    const hour = new Date().getHours()
    let greet = ''

    if (hour >= 5 && hour < 12) {
      greet = 'Good morning'
    } else if (hour >= 12 && hour < 17) {
      greet = 'Good afternoon'
    } else if (hour >= 17 && hour < 21) {
      greet = 'Good evening'
    } else {
      greet = 'Good night'
    }

    setGreeting(greet)

    const user = getTelegramUser()
    if (user?.first_name) {
      setFirstName(user.first_name)
    }
  }, [])

  if (!greeting) return null

  return (
    <p className={className}>
      {greeting}
      {firstName && <span className="font-medium">, {firstName}</span>}
    </p>
  )
}

'use client'

import { useState } from 'react'
import { Video } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { analytics } from '@/lib/analytics'
import { getTelegramUser } from '@/lib/telegram'

interface VideoPlayerProps {
  video: Video
  trigger: React.ReactNode
}

export function VideoPlayer({ video, trigger }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    if (open) {
      const user = getTelegramUser()
      analytics.track('video_played', {
        telegram_user_id: user?.id,
        video_id: video.id,
        title: video.title,
        category: video.category,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl w-full p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

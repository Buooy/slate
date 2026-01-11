'use client'

import { useState } from 'react'
import { Video } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3">
          <DialogTitle className="pr-8">{video.title}</DialogTitle>
          {video.category && (
            <DialogDescription>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {video.category}
              </span>
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="aspect-video w-full bg-black">
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

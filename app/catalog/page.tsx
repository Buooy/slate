'use client'

import { useEffect, useState } from 'react'
import { Video } from '@/lib/types'
import { getPreviousPicks } from '@/lib/videos'
import { VideoCard } from '@/components/VideoCard'
import { VideoPlayer } from '@/components/VideoPlayer'
import { Navigation } from '@/components/Navigation'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CatalogPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  useEffect(() => {
    async function loadVideos() {
      const previousPicks = await getPreviousPicks()
      setVideos(previousPicks)
    }
    loadVideos()
  }, [])

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsPlayerOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Previous Picks</h1>
          <p className="text-gray-600">Browse our curated video collection</p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No previous picks available yet.</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid grid-cols-1 gap-4 pr-4">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          trigger={<div />}
        />
      )}

      <Navigation />
    </div>
  )
}

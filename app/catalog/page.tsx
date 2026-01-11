'use client'

import { useEffect, useState } from 'react'
import { Video } from '@/lib/types'
import { getPreviousPicks } from '@/lib/videos'
import { VideoCard } from '@/components/VideoCard'
import { VideoPlayer } from '@/components/VideoPlayer'
import { Navigation } from '@/components/Navigation'

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

export default function CatalogPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadVideos() {
      try {
        const previousPicks = await getPreviousPicks()
        setVideos(previousPicks)
      } finally {
        setIsLoading(false)
      }
    }
    loadVideos()
  }, [])

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsPlayerOpen(true)
  }

  // Group videos by week
  const groupVideosByWeek = (videos: Video[]) => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const thisWeek: Video[] = []
    const lastWeek: Video[] = []
    const older: Video[] = []

    videos.forEach(video => {
      const videoDate = new Date(video.dateAdded)
      if (videoDate >= oneWeekAgo) {
        thisWeek.push(video)
      } else if (videoDate >= twoWeeksAgo) {
        lastWeek.push(video)
      } else {
        older.push(video)
      }
    })

    return { thisWeek, lastWeek, older }
  }

  const groupedVideos = groupVideosByWeek(videos)

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border-soft">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Previous Picks</h1>
          <p className="text-sm text-foreground-muted">Browse our curated collection</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-elevated p-3 flex gap-4 animate-pulse">
                <div className="w-32 h-20 bg-foreground-subtle/20 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-foreground-subtle/20 rounded w-3/4" />
                  <div className="h-3 bg-foreground-subtle/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-soft flex items-center justify-center">
              <GridIcon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No videos yet</h2>
            <p className="text-foreground-muted">Previous picks will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* This Week */}
            {groupedVideos.thisWeek.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
                  This Week
                </h2>
                <div className="space-y-3">
                  {groupedVideos.thisWeek.map((video, index) => (
                    <div
                      key={video.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <VideoCard
                        video={video}
                        onClick={() => handleVideoClick(video)}
                        variant="compact"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Last Week */}
            {groupedVideos.lastWeek.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
                  Last Week
                </h2>
                <div className="space-y-3">
                  {groupedVideos.lastWeek.map((video, index) => (
                    <div
                      key={video.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <VideoCard
                        video={video}
                        onClick={() => handleVideoClick(video)}
                        variant="compact"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Older */}
            {groupedVideos.older.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">
                  Earlier
                </h2>
                <div className="space-y-3">
                  {groupedVideos.older.map((video, index) => (
                    <div
                      key={video.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <VideoCard
                        video={video}
                        onClick={() => handleVideoClick(video)}
                        variant="compact"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
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

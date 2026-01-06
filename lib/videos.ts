import { Video } from './types'
import videosData from '@/public/videos.json'

export async function getVideos(): Promise<Video[]> {
  return videosData.videos || []
}

export async function getTodaysPick(): Promise<Video | null> {
  const videos = await getVideos()
  if (videos.length === 0) return null

  // Sort by dateAdded (most recent first) and return the first one
  const sorted = videos.sort((a, b) =>
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )

  return sorted[0]
}

export async function getPreviousPicks(): Promise<Video[]> {
  const videos = await getVideos()

  // Sort by dateAdded (most recent first) and skip the first one (today's pick)
  const sorted = videos.sort((a, b) =>
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )

  return sorted.slice(1)
}

export async function getVideoById(id: string): Promise<Video | null> {
  const videos = await getVideos()
  return videos.find(v => v.id === id) || null
}

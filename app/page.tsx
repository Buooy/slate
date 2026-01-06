import { getTodaysPick } from '@/lib/videos'
import { VideoPlayer } from '@/components/VideoPlayer'
import { Navigation } from '@/components/Navigation'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const todaysPick = await getTodaysPick()

  if (!todaysPick) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No videos available</h1>
          <p className="text-gray-500">Check back soon for today&apos;s pick!</p>
        </div>
        <Navigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Today&apos;s Pick</h1>
          <p className="text-gray-600">Your daily dose of curated content</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image
              src={todaysPick.thumbnailUrl}
              alt={todaysPick.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded">
              {todaysPick.duration}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">{todaysPick.title}</h2>
            <p className="text-gray-600 mb-6">{todaysPick.description}</p>

            <VideoPlayer
              video={todaysPick}
              trigger={
                <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Watch Now
                </button>
              }
            />
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

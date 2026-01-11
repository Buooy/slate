import { getTodaysPick } from '@/lib/videos'
import { VideoPlayer } from '@/components/VideoPlayer'
import { Navigation } from '@/components/Navigation'
import { DailyStreak } from '@/components/DailyStreak'
import { WatchProgress } from '@/components/WatchProgress'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function SlateLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-primary">
        <PlayIcon className="w-4 h-4 text-white" />
      </div>
      <span className="text-lg font-bold text-foreground tracking-tight">Slate</span>
    </div>
  )
}

export default async function HomePage() {
  const todaysPick = await getTodaysPick()

  if (!todaysPick) {
    return (
      <div className="min-h-screen gradient-warm flex items-center justify-center p-4 telegram-content-start">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-soft flex items-center justify-center">
            <PlayIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">No videos available</h1>
          <p className="text-foreground-muted">Check back soon for today&apos;s pick!</p>
        </div>
        <Navigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-hero pb-28">
      {/* Telegram Safe Area Header - accounts for iOS notch + Telegram buttons */}
      <header className="telegram-header-safe px-4 pb-2">
        <div className="flex items-center justify-center">
          <SlateLogo />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-5 animate-fade-in">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-foreground">Today&apos;s Pick</h1>
            <DailyStreak streak={3} />
          </div>
          <p className="text-foreground-muted text-sm">
            Your daily dose of curated content
          </p>
        </div>

        {/* Main Card */}
        <div className="card-elevated overflow-hidden animate-slide-up">
          {/* Thumbnail Section */}
          <div className="relative aspect-video w-full group">
            <Image
              src={todaysPick.thumbnailUrl}
              alt={todaysPick.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Category Badge */}
            {todaysPick.category && (
              <div className="absolute top-4 left-4">
                <span className="badge badge-soft uppercase tracking-wider text-[10px]">
                  {todaysPick.category}
                </span>
              </div>
            )}

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4">
              <span className="badge bg-black/70 text-white backdrop-blur-sm">
                {todaysPick.duration}
              </span>
            </div>

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <PlayIcon className="w-6 h-6 text-primary ml-1" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-foreground mb-2 text-balance leading-tight">
              {todaysPick.title}
            </h2>
            <p className="text-foreground-muted text-sm mb-5 line-clamp-2">
              {todaysPick.description}
            </p>

            {/* CTA Button */}
            <VideoPlayer
              video={todaysPick}
              trigger={
                <Button size="lg" className="w-full gap-2">
                  <PlayIcon className="w-5 h-5" />
                  Watch Now
                </Button>
              }
            />

            {/* Secondary Action */}
            <button className="w-full mt-3 py-2.5 text-sm text-foreground-muted hover:text-primary transition-colors font-medium">
              Save for Later
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-5 p-4 card-elevated animate-slide-up" style={{ animationDelay: '100ms' }}>
          <WatchProgress watched={2} goal={5} />
        </div>
      </div>

      <Navigation />
    </div>
  )
}

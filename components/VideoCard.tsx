import Image from 'next/image'
import { Video } from '@/lib/types'
import { cn } from '@/lib/utils'

interface VideoCardProps {
  video: Video
  onClick?: () => void
  variant?: 'default' | 'compact'
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export function VideoCard({ video, onClick, variant = 'compact' }: VideoCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (variant === 'compact') {
    return (
      <article
        className="card-elevated card-interactive flex gap-4 p-3 group"
        onClick={onClick}
      >
        {/* Thumbnail */}
        <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
              <PlayIcon className="w-3 h-3 text-primary ml-0.5" />
            </div>
          </div>
          {/* Duration */}
          <span className="absolute bottom-1.5 right-1.5 badge bg-black/70 text-white text-[10px] px-1.5 py-0.5">
            {video.duration}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            {video.category && (
              <>
                <span className="text-primary font-medium">{video.category}</span>
                <span>•</span>
              </>
            )}
            <span>{formatDate(video.dateAdded)}</span>
          </div>
        </div>
      </article>
    )
  }

  // Default (full) variant
  return (
    <article
      className="card-elevated card-interactive overflow-hidden group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category badge */}
        {video.category && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-soft uppercase tracking-wider text-[10px]">
              {video.category}
            </span>
          </div>
        )}

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 badge bg-black/70 text-white backdrop-blur-sm">
          {video.duration}
        </span>

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <PlayIcon className="w-5 h-5 text-primary ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-foreground-muted line-clamp-2 mb-3">
          {video.description}
        </p>
        <time className="text-xs text-foreground-subtle">
          {formatDate(video.dateAdded)}
        </time>
      </div>
    </article>
  )
}

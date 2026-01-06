import Image from 'next/image'
import { Video } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface VideoCardProps {
  video: Video
  onClick?: () => void
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
        <CardDescription className="text-xs">
          {formatDate(video.dateAdded)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
      </CardContent>
    </Card>
  )
}

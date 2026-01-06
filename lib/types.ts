export interface Video {
  id: string
  title: string
  description: string
  youtubeId: string
  thumbnailUrl: string
  duration: string
  category: string
  dateAdded: string
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

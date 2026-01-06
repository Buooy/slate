# Slate - Curated Video Picks for Telegram

A Telegram Mini App delivering daily curated video content to test distribution and engagement hypotheses.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Radix UI + Tailwind CSS
- **Auth**: Telegram Mini App native auth
- **Analytics**: PostHog
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Telegram account for testing
- PostHog account (optional, for analytics)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your PostHog credentials:

```
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: To test Telegram-specific features, you'll need to:
1. Create a Telegram Bot via [@BotFather](https://t.me/botfather)
2. Set up a Telegram Mini App
3. Access the app through Telegram

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
slate/
├── app/                    # Next.js app directory
│   ├── catalog/           # Previous picks page
│   ├── layout.tsx         # Root layout with Telegram SDK
│   ├── page.tsx           # Today's pick page
│   └── providers.tsx      # Client providers (analytics, Telegram)
├── components/
│   ├── ui/                # Radix UI components
│   ├── Navigation.tsx     # Bottom nav tabs
│   ├── VideoCard.tsx      # Video card component
│   └── VideoPlayer.tsx    # YouTube player dialog
├── lib/
│   ├── analytics.ts       # PostHog analytics
│   ├── telegram.ts        # Telegram SDK utilities
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Utility functions
│   └── videos.ts          # Video data fetching
└── public/
    └── videos.json        # Curated video content
```

## Content Management

Edit `public/videos.json` to add new videos:

```json
{
  "videos": [
    {
      "id": "unique-id",
      "title": "Video Title",
      "description": "Video description",
      "youtubeId": "YouTube_Video_ID",
      "thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
      "duration": "MM:SS",
      "category": "tech",
      "dateAdded": "YYYY-MM-DD"
    }
  ]
}
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Telegram Mini App Setup

1. Create a bot via [@BotFather](https://t.me/botfather)
2. Use `/newapp` command to create a Mini App
3. Provide your Vercel URL as the Web App URL
4. Submit to Telegram App Store

## Analytics Events

- `app_opened`: User opens the app
- `video_played`: User starts watching a video
- `video_completed`: User finishes a video

## License

MIT

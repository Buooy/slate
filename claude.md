# Slate Project - Current State

**Last Updated:** 2026-01-06

## Strategic Context

### The Core Hypothesis
We are building Slate to test **two hypotheses simultaneously**:

1. **Distribution Hypothesis:** Telegram Mini App Store is an underutilized distribution channel (like early iOS App Store 2008-2010)
2. **Product Hypothesis:** Users want curated, episodic video content delivered in a messaging app

### Key Strategic Decisions Made

**MVP Philosophy:**
- Build minimal viable app to test both hypotheses in 8 weeks
- Ruthlessly simple features - no LLM, no recommendations, no social features
- Manual curation is acceptable (founder edits JSON file daily)
- Week 9 decision point: if metrics fail, we kill it

**Deferred Features (NOT in MVP):**
- LLM chatbot for recommendations
- Video summaries/insights
- User preferences/personalization
- Comments/community features
- Any monetization
- Native video hosting

**Why We Deferred These:**
These assume the core behavior works. We need to prove users will watch curated video in Telegram before adding intelligence layers.

### Critical Metrics (Week 9 Assessment)

**Distribution Success:**
- \>100 organic installs from Telegram App Store in first month
- Majority of growth is organic (not from our marketing)

**Engagement Success:**
- D7 retention \>30%
- Users open app 3+ times per week
- \>40% of Day 1 users return for 3+ videos within 7 days

**Four Possible Outcomes:**
1. High installs + high retention → Scale both distribution and product
2. High installs + low retention → Distribution works, fix product
3. Low installs + high retention → Product works, find new distribution
4. Low installs + low retention → Kill it

## Technical Architecture

### Stack (All Latest Versions)

```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript",
  "ui": "Radix UI + Tailwind CSS",
  "telegram": "@telegram-apps/sdk-react v2.0+",
  "auth": "Telegram Mini App native auth (required)",
  "content": "Static JSON in /public",
  "analytics": "PostHog (free tier)",
  "hosting": "Vercel"
}
```

### Why This Stack

- **Next.js 15:** Latest stable, App Router, server components, Vercel optimized
- **Radix UI:** Accessible primitives, better UX than vanilla Tailwind
- **Telegram Auth:** Zero auth UI needed, guaranteed real users, perfect for analytics
- **Static JSON:** Zero backend complexity, you edit daily and redeploy (30 seconds)
- **Vercel:** One-click deploy, free tier, auto HTTPS (required for Telegram)

### Project Structure

```
slate/
├── app/
│   ├── layout.tsx           # Root layout, Telegram SDK init
│   ├── page.tsx             # Today's Pick screen (default route)
│   ├── catalog/
│   │   └── page.tsx         # Previous Picks list
│   ├── watch/[id]/
│   │   └── page.tsx         # Individual video player
│   └── middleware.ts        # Auth check (require Telegram login)
├── components/
│   ├── ui/                  # Radix components
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── scroll-area.tsx
│   │   └── card.tsx
│   ├── VideoPlayer.tsx      # YouTube embed with Radix Dialog
│   ├── VideoCard.tsx        # Catalog item with Radix Card
│   └── Navigation.tsx       # Bottom nav with Radix Tabs
├── lib/
│   ├── telegram.ts          # Auth utilities
│   ├── videos.ts            # Video data loading
│   └── analytics.ts         # Event tracking
├── public/
│   └── videos.json          # Your daily curated videos
└── package.json
```

## MVP Feature Scope

### What We ARE Building

1. **Today's Pick Screen**
   - Single video (most recent from videos.json)
   - Title, description, YouTube embed
   - "Watch" button that tracks play event
   - Built with Radix Dialog for full-screen player

2. **Previous Picks Catalog**
   - Scrollable list of past videos (Radix ScrollArea)
   - Video cards with thumbnail, title, date (Radix Card)
   - Tap to watch in embedded player

3. **Navigation**
   - Radix Tabs: Today | Catalog
   - Clean mobile-first navigation

4. **Required Telegram Auth**
   - User must be logged into Telegram
   - App captures user.id for analytics
   - Middleware blocks non-Telegram access

5. **Manual Content System**
   - You edit `public/videos.json` daily
   - Schema: `{id, title, description, youtubeId, thumbnailUrl, duration, category, dateAdded}`
   - Commit + push = auto-deploy on Vercel (30 seconds)

6. **Basic Analytics**
   - Events: app_opened, video_played, video_completed
   - Track by telegram_user_id
   - PostHog free tier (no credit card needed)

### What We Are NOT Building

- ❌ LLM chatbot
- ❌ Personalized recommendations
- ❌ Video summaries/insights
- ❌ User accounts beyond Telegram auth
- ❌ Favorites/bookmarks
- ❌ Comments/social features
- ❌ Push notifications
- ❌ Any backend (API routes can be added later if needed)
- ❌ Native video hosting

## Content Strategy

### videos.json Structure

```json
{
  "videos": [
    {
      "id": "001",
      "title": "Why SQLite is Taking Over",
      "description": "Deep dive into SQLite's architecture and why it's becoming the default database",
      "youtubeId": "XcAYkriuQ1o",
      "thumbnailUrl": "https://img.youtube.com/vi/XcAYkriuQ1o/maxresdefault.jpg",
      "duration": "14:32",
      "category": "tech",
      "dateAdded": "2026-01-06"
    }
  ]
}
```

### Daily Workflow

1. Find compelling YouTube video (8-15 minutes ideal)
2. Add entry to `public/videos.json`
3. `git commit -m "Add: [video title]" && git push`
4. Vercel auto-deploys in ~30 seconds
5. Users see new video in "Today's Pick"

### Content Programming (Week 1-8)

- **Frequency:** 1 video per day, weekdays only
- **Timing:** Post at 9 AM (test morning routine formation)
- **Niche:** Focus on ONE category initially (suggest: tech/business explainers)
- **Length:** 8-15 minute videos (sweet spot for mobile watching)
- **Quality Bar:** Evergreen > trending, educational > entertainment

## Authentication Flow

### Telegram Mini App Native Auth

1. User opens app in Telegram
2. App checks `window.Telegram.WebApp.initDataUnsafe.user`
3. If no user → show "Open in Telegram" error
4. If user exists → store `user.id`, `user.first_name`, `user.username`
5. All analytics events tagged with `telegram_user_id`

### Benefits

- Zero auth UI complexity
- Guaranteed real users (can't fake Telegram identity)
- Perfect user tracking for retention metrics
- No password/email/OAuth complexity

## Analytics Events

```typescript
// Core events to track
analytics.track('app_opened', {
  telegram_user_id: user.id,
  source: 'app_store' | 'share_link'
})

analytics.track('video_played', {
  telegram_user_id: user.id,
  video_id,
  title,
  category
})

analytics.track('video_completed', {
  telegram_user_id: user.id,
  video_id,
  watch_time_seconds
})
```

## Key Dependencies (Latest Versions)

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@telegram-apps/sdk-react": "^2.0.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.6.0",
    "posthog-js": "^1.165.0"
  }
}
```

## Current Todo List

- [✅] Initialize Next.js 15 project with TypeScript
- [✅] Install and configure Radix UI + Tailwind CSS
- [✅] Set up Telegram SDK with required auth
- [✅] Build Today's Pick screen with Radix Dialog player
- [✅] Build Catalog view with Radix Card and ScrollArea
- [✅] Implement Radix Tabs navigation (Today | Catalog)
- [✅] Add auth middleware to require Telegram login
- [✅] Create videos.json structure and sample content
- [✅] Integrate PostHog analytics with user tracking
- [✅] Configure and test production build

## Next Steps (When You Return)

1. **Initialize Project:**
   ```bash
   npx create-next-app@latest slate --typescript --tailwind --app
   cd slate
   ```

2. **Install Dependencies:**
   ```bash
   npm install @telegram-apps/sdk-react @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-scroll-area posthog-js
   npm install -D @types/node
   ```

3. **Build Core Components:**
   - Set up Telegram SDK in layout.tsx
   - Create Radix UI component library
   - Build Today's Pick screen
   - Build Catalog screen
   - Add navigation with Radix Tabs

4. **Deploy to Vercel:**
   - Connect GitHub repo
   - Configure environment variables (PostHog key, Telegram bot token)
   - Deploy to production
   - Test in Telegram

5. **Submit to Telegram App Store:**
   - Create app listing
   - Add screenshots
   - Submit for review

## Strategic Reminders

### The Netflix Lens

We are treating this like early Netflix (1998-2000):

- **Netflix bet:** USPS as underutilized distribution channel for DVDs
- **Our bet:** Telegram App Store as underutilized distribution channel for curated video

**They didn't add Cinematch (recommendations) until 2000, TWO YEARS after launch.**

We're not adding LLM/intelligence until we prove the core behavior works.

### The Discipline

**Week 9 Decision:**
- If metrics fail → shut it down
- No pivots, no "just one more feature"
- Data-driven kill criteria

**Early Netflix would have shut down if DVD-by-mail didn't work. They didn't have safety nets.**

We commit to the same discipline.

### The Real Test

Not "can we build this?" (we can, with AI coding in 15-20 hours)

But "will Telegram App Store drive organic discovery?" and "will users form a daily video checking habit?"

Everything else is noise.

---

## Questions to Resolve When You Return

1. Do you want me to scaffold the entire project, or do you want to build with guidance?
2. What content niche should we start with? (Tech? Business? Design? Finance?)
3. Do you have a Telegram Bot token ready? (Needed for Mini App submission)
4. Do you have PostHog account or should we use Vercel Analytics instead?

---

## Build Status

**✅ MVP COMPLETE - Ready for Deployment**

All core features implemented and tested:
- ✅ Next.js 16 + TypeScript + Tailwind CSS v4
- ✅ Telegram SDK integration
- ✅ Radix UI component library
- ✅ Today's Pick screen
- ✅ Catalog screen with scrollable video list
- ✅ Bottom navigation (Today | Catalog)
- ✅ YouTube video player with analytics tracking
- ✅ PostHog analytics integration
- ✅ Production build tested successfully

## Next Steps for Deployment

1. **Create .env.local file:**
   ```bash
   cp .env.example .env.local
   # Add your PostHog credentials
   ```

2. **Test locally:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

3. **Deploy to Vercel:**
   - Push code to GitHub
   - Import repository in Vercel
   - Add environment variables (NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST)
   - Deploy

4. **Set up Telegram Mini App:**
   - Create a bot via [@BotFather](https://t.me/botfather)
   - Use `/newapp` command
   - Provide your Vercel URL as the Web App URL
   - Test in Telegram
   - Submit to Telegram App Store

5. **Daily content workflow:**
   - Edit `public/videos.json` to add new videos
   - Commit and push to GitHub
   - Vercel auto-deploys in ~30 seconds

**Status:** MVP ready for deployment and user testing.

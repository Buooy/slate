import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Note: In a Telegram Mini App, authentication happens client-side via the Telegram SDK.
// This proxy is a placeholder for future server-side validation if needed.
// For now, we rely on client-side checks in the Providers component.

export function proxy(request: NextRequest) {
  // For MVP, we allow all requests through
  // In production, you might want to validate the Telegram initData here
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

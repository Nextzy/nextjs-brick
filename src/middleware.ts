import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { routing } from './i18n/routing' // หากไม่ใช้ i18next ลบทิ้งได้เลย
import createMiddleware from 'next-intl/middleware' // หากไม่ใช้ i18next ลบทิ้งได้เลย

const initMiddleware = createMiddleware(routing) // หากไม่ใช้ i18next ลบทิ้งได้เลย

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('token')
  const pathname = req.nextUrl.pathname
  const locale = req.cookies.get('NEXT_LOCALE')?.value || 'th' // หากไม่ใช้ i18next ลบทิ้งได้เลย

  if (pathname.includes('/login')) {
    if (cookie?.value) {
      return NextResponse.rewrite(new URL(`/${locale}/profile/example`, req.url))
    }
  }

  if (pathname.includes('/profile')) {
    if (!cookie?.value) {
      return NextResponse.rewrite(new URL(`/${locale}/login`, req.url))
    }
  }

  return initMiddleware(req) // หากไม่ใช้ i18next ลบทิ้งได้เลย
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  // หากไม่ใช้ i18next ใช้ matcher ล่าง
  // matcher: ['/', '/login', '/profile/:path']
}

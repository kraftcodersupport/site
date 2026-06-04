import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'ar', 'fr', 'de']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
    // 1. Check cookie
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale
    }

    // 2. Check headers
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    try {
        return matchLocale(languages, locales, defaultLocale)
    } catch (e) {
        return defaultLocale
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip internal next paths and public files
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.includes('.')
    ) {
        return
    }

    const locale = getLocale(request)
    const response = NextResponse.next()

    // Set cookie if it's missing or different from detected locale
    const currentCookie = request.cookies.get('NEXT_LOCALE')?.value
    if (currentCookie !== locale) {
        response.cookies.set('NEXT_LOCALE', locale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 year
        })
    }

    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

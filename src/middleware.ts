import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type Locale } from '@/types/i18n';
import type { Database } from '@/types/supabase';

const locales: Locale[] = ['en', 'es'];
const defaultLocale: Locale = 'en';

function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, defaultLocale);
  
  return locale as Locale;
}

export async function middleware(request: NextRequest) {
  // Create Supabase client
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req: request, res });

  // Special handling for auth callback
  if (request.nextUrl.pathname === '/auth/callback') {
    const locale = getLocale(request);
    const code = request.nextUrl.searchParams.get('code');
    
    if (code) {
      // Keep the code but redirect to the localized route
      const redirectUrl = new URL(`/${locale}/auth/callback`, request.url);
      redirectUrl.searchParams.set('code', code);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Handle locale
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale && !pathname.startsWith('/auth/callback')) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    
    // Copy all search params
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });
    
    return NextResponse.redirect(newUrl);
  }

  // Protected routes check (after locale check)
  const isProtectedRoute = pathname.includes('/booking') || 
                          pathname.includes('/profile');

  if (isProtectedRoute && !session) {
    const locale = getLocale(request);
    const redirectUrl = new URL(`/${locale}/auth`, request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 
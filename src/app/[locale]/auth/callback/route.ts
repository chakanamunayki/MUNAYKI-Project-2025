import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    try {
      await supabase.auth.exchangeCodeForSession(code);
      // Get the locale from the URL
      const locale = requestUrl.pathname.split('/')[1] || 'en';
      // Redirect to the home page with the correct locale
      return NextResponse.redirect(new URL(`/${locale}`, requestUrl.origin));
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL(`/auth/error`, requestUrl.origin));
    }
  }

  // If no code, redirect to home page
  return NextResponse.redirect(requestUrl.origin);
} 
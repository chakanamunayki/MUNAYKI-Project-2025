import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createServerClient();
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(new URL('/auth/error', request.url));
      }

      // Successful sign in - redirect to home page
      return NextResponse.redirect(new URL('/', request.url));
    } catch (error) {
      console.error('Callback error:', error);
      return NextResponse.redirect(new URL('/auth/error', request.url));
    }
  }

  // No code present - redirect to error page
  return NextResponse.redirect(new URL('/auth/error', request.url));
} 
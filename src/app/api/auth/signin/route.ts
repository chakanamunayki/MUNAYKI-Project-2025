import { NextRequest, NextResponse } from 'next/server';
import { type SignInCredentials } from '@/types/auth';
import { mockDb } from '@/lib/mock-db';

export async function POST(request: NextRequest) {
  try {
    const body: SignInCredentials = await request.json();
    
    // Find user
    const user = mockDb.findUserByEmail(body.email);
    
    // Check if user exists and password matches
    if (!user || user.password !== body.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
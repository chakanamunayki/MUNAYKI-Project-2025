import { NextRequest, NextResponse } from 'next/server';
import { type SignUpCredentials } from '@/types/auth';
import { mockDb } from '@/lib/mock-db';

export async function POST(request: NextRequest) {
  try {
    const body: SignUpCredentials = await request.json();
    
    // Check if user already exists
    const existingUser = mockDb.findUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email: body.email,
      name: body.name,
      createdAt: new Date().toISOString(),
      // In a real app, you would hash the password
      password: body.password,
    };

    // Save user
    mockDb.createUser(newUser);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  locale: string;
}

export function AuthModal({ open, onOpenChange, onSuccess, locale }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const { signIn, signUp, isLoading, error, isAuthenticated } = useAuth();

  const handleSignIn = async (data: SignInFormData) => {
    return signIn(data.email, data.password);
  };

  const handleSignUp = async (data: SignUpFormData) => {
    return signUp(data.email, data.password, data.name);
  };

  useEffect(() => {
    if (isAuthenticated) {
      onSuccess();
    }
  }, [isAuthenticated, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0">
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Access your account
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={cn(
                'px-4 py-2 rounded-md transition-colors',
                activeTab === 'signin'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              )}
              disabled={isLoading}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={cn(
                'px-4 py-2 rounded-md transition-colors',
                activeTab === 'signup'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              )}
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          {activeTab === 'signin' ? (
            <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<boolean>;
  isLoading: boolean;
}

function SignInForm({ onSubmit, isLoading }: SignInFormProps) {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          disabled={isLoading}
          {...form.register('email')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          disabled={isLoading}
          {...form.register('password')}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  );
}

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => Promise<boolean>;
  isLoading: boolean;
}

function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          disabled={isLoading}
          {...form.register('name')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          disabled={isLoading}
          {...form.register('email')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          disabled={isLoading}
          {...form.register('password')}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing up...
          </>
        ) : (
          'Sign up'
        )}
      </Button>
    </form>
  );
} 
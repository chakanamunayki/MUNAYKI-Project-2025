# MUNAYKI Platform

A platform connecting people with ceremonies, therapists, and retreats.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth, Storage, and Database)
- React Hook Form
- Zod
- Zustand
- Next-Intl (i18n)

## Features

- Bilingual support (English/Spanish)
- Authentication and user profiles
- Booking system for ceremonies and therapies
- Real-time availability updates
- Responsive design
- Dark mode support

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
  app/           # Next.js app router pages
  components/    # React components
  lib/          # Utilities and configurations
  types/        # TypeScript types
  hooks/        # Custom React hooks
  styles/       # Global styles
  messages/     # i18n messages
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
# Shyraq

**Shyraq** is an interactive language learning platform focused on teaching Kazakh language through gamified lessons and challenges.

## Features

### Learning System
- **Interactive Lessons**: Structured learning path with units and lessons
- **Multiple Challenge Types**: 
  - SELECT challenges (multiple choice questions)
  - ASSIST challenges (listening and selecting)
- **Audio Integration**: Native pronunciation support for vocabulary
- **Progress Tracking**: Real-time tracking of lesson completion
- **Course Management**: Support for multiple courses (Kazakh, Math, etc.)

### Gamification
- **Points System (XP)**: Earn experience points for completing challenges
- **Streak Tracking**: Daily learning streak counter
- **Quests**: Achievement-based goals (20 XP, 50 XP, 100 XP, etc.)
- **Shop System**: Spend points on in-app items
- **Leaderboard**: Compete with other learners globally

### User Features
- **User Authentication**: Secure login via Clerk
- **Profile Management**: Track personal progress and statistics
- **Active Course Selection**: Choose and switch between different courses
- **Progress Dashboard**: Visual representation of learning journey

### Admin Panel
- **Course Management**: Create, edit, and delete courses
- **Unit Management**: Organize lessons into structured units
- **Lesson Management**: Create and manage individual lessons
- **Challenge Management**: Add and configure learning challenges
- **Challenge Options**: Configure multiple choice options with correct answers
- **React Admin Integration**: Full-featured admin interface

## Tech Stack

### Frontend
- **Next.js 15.1.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **React Confetti** - Celebration effects
- **React Circular Progressbar** - Progress visualization

### Backend & Database
- **Drizzle ORM** - Type-safe database toolkit
- **Neon Database** - Serverless PostgreSQL
- **PostgreSQL** - Relational database

### Authentication & Authorization
- **Clerk** - User authentication and management
- **Role-based Access Control** - Admin-only protected routes

### Admin Interface
- **React Admin 5.6** - Admin dashboard framework
- **RA Data Simple REST** - REST API data provider

### State Management
- **Zustand** - Lightweight state management
- **React Hooks** - Built-in state management

## Project Structure

```
shyraq/
├── app/
│   ├── (main)/              # Protected main application routes
│   │   ├── courses/         # Course selection page
│   │   ├── learn/           # Main learning interface
│   │   ├── leaderboard/     # Global leaderboard
│   │   ├── quests/          # Quest tracking page
│   │   └── shop/            # In-app shop
│   ├── (marketing)/         # Public marketing pages
│   ├── admin/               # Admin panel (React Admin)
│   ├── api/                 # API routes for CRUD operations
│   └── lesson/              # Interactive lesson interface
├── components/
│   ├── modals/              # Modal dialogs (exit, practice)
│   └── ui/                  # Reusable UI components
├── db/
│   ├── drizzle.ts           # Database connection
│   ├── queries.ts           # Database queries
│   └── schema.ts            # Database schema definitions
├── scripts/
│   ├── seed.ts              # Database seeding script
│   ├── reset.ts             # Database reset script
│   └── prod.ts              # Production utilities
├── store/                   # Zustand state management
├── lib/                     # Utility functions
└── public/                  # Static assets (images, audio)
```

## Database Schema

### Core Tables
- **courses**: Available learning courses
- **units**: Course units with ordered lessons
- **lessons**: Individual lessons within units
- **challenges**: Learning exercises (SELECT/ASSIST types)
- **challengeOptions**: Multiple choice options for challenges
- **userProgress**: User stats (points, streak, active course)
- **challengeProgress**: Individual challenge completion tracking

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nazym-MU/shyraq.git
   cd shyraq
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=your_neon_database_url
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Admin Access
   ADMIN_ID=your_clerk_user_id
   ```

4. **Database Setup**
   ```bash
   # Push schema to database
   npm run db:push
   
   # Seed database with initial data
   npm run db:seed
   
   # Open Drizzle Studio (optional)
   npm run db:studio
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:studio    # Open Drizzle Studio (database GUI)
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database (clears all data)
```

## Authentication & Authorization

- **Public Routes**: `/`, `/sign-in`, `/sign-up`
- **Protected Routes**: `/learn`, `/courses`, `/leaderboard`, `/quests`, `/shop`, `/lesson`
- **Admin Routes**: `/admin` (requires ADMIN_ID match)

Authentication is handled by Clerk with middleware protection on sensitive routes.

## Design Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark Mode Ready**: Theme support via next-themes
- **Accessible**: Built with Radix UI for WCAG compliance
- **Smooth Animations**: Tailwind CSS animations
- **Audio Feedback**: Sound effects for correct/incorrect answers
- **Confetti Celebrations**: Visual feedback for achievements

## Challenge Types

### SELECT Challenge
Multiple choice questions where users select the correct answer from options.

### ASSIST Challenge
Audio-based challenges where users listen to pronunciation and select the correct option.

## Progress Tracking

Users can track:
- Total XP earned
- Current streak (consecutive days)
- Active course progress
- Lesson completion percentage
- Quest achievements
- Global leaderboard ranking

## Admin Features

Accessible at `/admin` (requires admin privileges):
- Full CRUD operations for all entities
- Bulk operations support
- Data import/export
- Real-time updates
- Filtering and sorting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database by [Neon](https://neon.tech/)
- Authentication by [Clerk](https://clerk.com/)
- UI Components by [Radix UI](https://www.radix-ui.com/)

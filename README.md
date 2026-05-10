# Panda 🐼

> Internal social networking platform that connects employees through shared hobbies and interests.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth | Clerk (SSO, Google, Microsoft) |
| Database | Supabase (PostgreSQL) via Prisma |
| AI Matching | OpenAI `text-embedding-3-small` |
| Email | Resend |
| Hosting | Vercel |

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd panda
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in all keys in `.env`:

- **Clerk** – create a project at [clerk.com](https://clerk.com)
- **Supabase** – create a project at [supabase.com](https://supabase.com)
- **OpenAI** – get an API key from [platform.openai.com](https://platform.openai.com)
- **Resend** – get an API key from [resend.com](https://resend.com)

### 3. Set up the database

```bash
# Push schema to Supabase
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed with demo data
npx ts-node prisma/seed.ts
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## App Structure

```
app/
├── (auth)/          → /sign-in, /sign-up (Clerk)
├── (employee)/      → Employee-facing app
│   ├── dashboard/   → Home feed
│   ├── onboarding/  → 4-step profile setup
│   ├── matches/     → AI-powered employee matches
│   ├── activities/  → Browse & RSVP to events
│   ├── chat/        → 1:1 messaging
│   ├── badges/      → Coins & leaderboard
│   └── rewards/     → Reward store
├── (hr)/            → HR Admin dashboard
│   ├── overview/    → Engagement stats & charts
│   ├── employees/   → Employee management
│   ├── reports/     → Insight reports
│   └── settings/    → Company settings
└── api/             → Next.js API routes
```

## User Flows

### Employee
1. Sign up → `/onboarding` (4-step wizard)
2. Select hobbies & preferences
3. Get matched with colleagues
4. Browse & RSVP to activities
5. Earn coins → unlock rewards

### HR Admin
1. Sign in → `/hr/overview`
2. View engagement metrics & trends
3. Monitor employee activity & at-risk users
4. Manage activities

## Matching Algorithm

The matching engine combines three signals:

```
score = (embedding_similarity × 0.5) + (hobby_overlap × 0.3) + (cross_team_bonus × 0.2)
```

- **Embedding similarity** – cosine similarity between OpenAI `text-embedding-3-small` vectors of each user's hobbies + interests + role
- **Hobby overlap** – normalized count of shared hobbies (capped at 3)
- **Cross-team bonus** – +20% when users are from different departments

## Database

Managed by Prisma + Supabase PostgreSQL. Key models:

- `Company` → `User[]`, `Activity[]`, `HrReport[]`
- `User` → matches, RSVPs, messages, badges
- `Match` → scored pair with status (PENDING / CONNECTED / DISMISSED)
- `Activity` → events with RSVP slots and coin rewards

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx prisma studio    # Visual DB browser
npx prisma db push   # Sync schema to DB
npx ts-node prisma/seed.ts  # Seed demo data
```

## Contributing

This project follows the conventions defined in `CLAUDE.md`. TypeScript strict mode is on — no `any` types.

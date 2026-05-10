# Panda – Claude Code Instructions

## Project Overview
Panda is a B2B SaaS internal social networking platform for companies.
It matches employees by shared hobbies and interests, facilitates real physical meetups and activities, and gives HR teams data-driven engagement insights.

**Two sides:**
- **Employee app** – profile, matching, activities, chat, rewards
- **HR dashboard** – engagement analytics, reports, user management

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend
- **API:** Next.js API Routes (serverless)
- **Auth:** Clerk (SSO, Google, Microsoft login)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Storage:** Supabase Storage (avatars, assets)
- **Realtime/Chat:** Supabase Realtime
- **Email:** Resend

### AI / Matching
- **Provider:** OpenAI API (gpt-4o + text-embedding-3-small)
- **Logic:** Embedding-based cosine similarity on hobby/interest profiles

### Infrastructure
- **Hosting:** Vercel (frontend + API routes)
- **DB hosting:** Supabase cloud
- **CI/CD:** GitHub Actions
- **Error tracking:** Sentry
- **Analytics:** Mixpanel

---

## Project Structure

```
panda/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth pages (sign-in, sign-up)
│   ├── (employee)/             # Employee-facing app
│   │   ├── dashboard/          # Home feed
│   │   ├── profile/            # My profile
│   │   ├── explore/            # Browse activities & people
│   │   ├── matches/            # My matches
│   │   ├── activities/         # Create / RSVP activities
│   │   ├── chat/               # Messaging
│   │   ├── badges/             # Coins & badges
│   │   └── rewards/            # Reward store
│   ├── (hr)/                   # HR dashboard
│   │   ├── overview/           # Engagement overview
│   │   ├── employees/          # Employee list & profiles
│   │   ├── reports/            # Insight reports
│   │   └── settings/           # Company settings
│   └── api/                    # API routes
│       ├── matching/
│       ├── activities/
│       ├── chat/
│       ├── rewards/
│       └── reports/
├── components/
│   ├── ui/                     # shadcn/ui base components
│   ├── employee/               # Employee-specific components
│   └── hr/                     # HR dashboard components
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── prisma.ts               # Prisma client
│   ├── openai.ts               # OpenAI client
│   ├── matching.ts             # Matching algorithm
│   └── utils.ts
├── prisma/
│   └── schema.prisma           # DB schema
├── hooks/                      # Custom React hooks
├── store/                      # Zustand stores
├── types/                      # TypeScript types
└── middleware.ts               # Clerk auth middleware
```

---

## Database Schema (Prisma)

```prisma
model Company {
  id         String   @id @default(cuid())
  name       String
  plan       String   @default("freemium")
  createdAt  DateTime @default(now())
  employees  User[]
  activities Activity[]
  reports    HrReport[]
}

model User {
  id          String   @id @default(cuid())
  clerkId     String   @unique
  email       String   @unique
  name        String
  avatar      String?
  role        Role     @default(EMPLOYEE)
  department  String?
  jobTitle    String?
  location    String?
  hobbies     String[]
  interests   String[]
  embedding   Float[]
  coins       Int      @default(0)
  level       Level    @default(NEWBIE)
  companyId   String
  company     Company  @relation(fields: [companyId], references: [id])
  createdAt   DateTime @default(now())
  lastActive  DateTime @default(now())

  matchesA    Match[]  @relation("UserA")
  matchesB    Match[]  @relation("UserB")
  rsvps       Rsvp[]
  sentMessages     Message[] @relation("Sender")
  receivedMessages Message[] @relation("Receiver")
  badgesEarned Badge[]
}

enum Role  { EMPLOYEE HR_ADMIN }
enum Level { NEWBIE BEGINNER GOLD DIAMOND }

model Match {
  id        String   @id @default(cuid())
  userAId   String
  userBId   String
  score     Float
  status    MatchStatus @default(PENDING)
  createdAt DateTime @default(now())
  userA     User @relation("UserA", fields: [userAId], references: [id])
  userB     User @relation("UserB", fields: [userBId], references: [id])
}

enum MatchStatus { PENDING CONNECTED DISMISSED }

model Activity {
  id          String   @id @default(cuid())
  title       String
  type        ActivityType
  description String?
  date        DateTime
  location    String?
  maxSlots    Int
  coinsReward Int      @default(50)
  companyId   String
  creatorId   String
  company     Company  @relation(fields: [companyId], references: [id])
  rsvps       Rsvp[]
  createdAt   DateTime @default(now())
}

enum ActivityType { SPORT SOCIAL WORKSHOP TOURNAMENT }

model Rsvp {
  id         String   @id @default(cuid())
  userId     String
  activityId String
  status     RsvpStatus @default(GOING)
  user       User     @relation(fields: [userId], references: [id])
  activity   Activity @relation(fields: [activityId], references: [id])
  @@unique([userId, activityId])
}

enum RsvpStatus { GOING MAYBE NOT_GOING }

model Message {
  id         String   @id @default(cuid())
  senderId   String
  receiverId String
  content    String
  read       Boolean  @default(false)
  createdAt  DateTime @default(now())
  sender     User @relation("Sender",   fields: [senderId],   references: [id])
  receiver   User @relation("Receiver", fields: [receiverId], references: [id])
}

model Badge {
  id        String   @id @default(cuid())
  userId    String
  type      String
  awardedAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model HrReport {
  id            String   @id @default(cuid())
  companyId     String
  period        String
  activeUsers   Int
  eventsCreated Int
  matchesMade   Int
  engagementPct Float
  company       Company  @relation(fields: [companyId], references: [id])
  createdAt     DateTime @default(now())
}
```

---

## Matching Algorithm

```typescript
// lib/matching.ts
// 1. On profile save → generate embedding via OpenAI
// 2. On match request → cosine similarity + weighted score

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (magA * magB);
}

export function matchScore(userA: User, userB: User): number {
  const embeddingScore = cosineSimilarity(userA.embedding, userB.embedding); // 50%
  const sharedHobbies  = userA.hobbies.filter(h => userB.hobbies.includes(h)).length;
  const hobbyScore     = Math.min(sharedHobbies / 3, 1);                     // 30%
  const crossTeam      = userA.department !== userB.department ? 1 : 0;      // 20% bonus
  return (embeddingScore * 0.5) + (hobbyScore * 0.3) + (crossTeam * 0.2);
}

// Embedding generation (call on profile create/update)
export async function generateEmbedding(user: User): Promise<number[]> {
  const text = `${user.hobbies.join(", ")}. ${user.interests.join(", ")}. ${user.jobTitle} at ${user.department}`;
  const res  = await openai.embeddings.create({ model: "text-embedding-3-small", input: text });
  return res.data[0].embedding;
}
```

---

## MVP Feature Checklist

### Phase 1 – Core (build first)
- [ ] Auth & onboarding (Clerk SSO)
- [ ] Employee profile with hobbies/interests
- [ ] Company onboarding (HR admin creates company)
- [ ] Matching engine (embedding + score)
- [ ] Activity feed (browse, filter, RSVP)
- [ ] Basic 1:1 chat (Supabase Realtime)
- [ ] HR dashboard (active users, top activities)

### Phase 2 – Engagement
- [ ] Coins & badges system
- [ ] Leaderboard
- [ ] Notifications (email via Resend)
- [ ] Google Calendar sync
- [ ] HR insight report (PDF export)

### Phase 3 – Growth
- [ ] Tournaments module
- [ ] Reward store
- [ ] Mobile app (React Native)
- [ ] Advanced AI recommendations

---

## Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Prisma
DATABASE_URL=

# OpenAI
OPENAI_API_KEY=

# Resend
RESEND_API_KEY=

# Sentry
SENTRY_DSN=
```

---

## Coding Conventions

- **Language:** TypeScript everywhere, strict mode on
- **Naming:** camelCase for variables/functions, PascalCase for components/types
- **API responses:** always return `{ data, error }` shape
- **Error handling:** try/catch on all async functions, log to Sentry
- **Auth guard:** every route checks Clerk session, HR routes check `role === HR_ADMIN`
- **Comments:** only for non-obvious logic, not for every line
- **No any:** avoid TypeScript `any`, use proper types or `unknown`

---

## First Commands for Claude Code

Run these in order to bootstrap the project:

```bash
# 1. Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false

# 2. Install core dependencies
npm install @clerk/nextjs @supabase/supabase-js prisma @prisma/client openai resend zustand react-hook-form zod @hookform/resolvers lucide-react

# 3. Install shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card input label badge avatar tabs dialog sheet

# 4. Install dev dependencies
npm install -D @types/node prettier eslint-config-prettier

# 5. Init Prisma
npx prisma init

# 6. After setting DATABASE_URL in .env, push schema
npx prisma db push
npx prisma generate
```
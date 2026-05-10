import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { PandaLogo } from '@/components/PandaLogo'
import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RsvpButton } from '@/components/employee/RsvpButton'
import { SuggestionsWidget } from '@/components/employee/SuggestionsWidget'
import { CreateSlotFab } from '@/components/employee/CreateSlotFab'
import { cn, formatDate } from '@/lib/utils'

const ACTIVITY_EMOJI: Record<string, string> = {
  SPORT: '🏃',
  SOCIAL: '🥂',
  WORKSHOP: '🛠️',
  TOURNAMENT: '🏆',
}

const MEDALS = ['🥇', '🥈', '🥉']

// ---------------------------------------------------------------------------
// Mock data — used when the database is not yet connected
// ---------------------------------------------------------------------------

const MOCK_MATCHES = [
  { id: '1', name: 'Sarah Chen', jobTitle: 'Product Designer', avatar: null, sharedHobbies: 4, score: 0.87, department: 'Design' },
  { id: '2', name: 'James Wilson', jobTitle: 'Backend Engineer', avatar: null, sharedHobbies: 3, score: 0.74, department: 'Engineering' },
  { id: '3', name: 'Mia Patel', jobTitle: 'Marketing Lead', avatar: null, sharedHobbies: 2, score: 0.61, department: 'Marketing' },
  { id: '4', name: 'Tom Baker', jobTitle: 'Data Scientist', avatar: null, sharedHobbies: 3, score: 0.55, department: 'R&D' },
  { id: '5', name: 'Ana Lima', jobTitle: 'Sales Manager', avatar: null, sharedHobbies: 1, score: 0.42, department: 'Sales' },
]

const MOCK_ACTIVITIES = [
  {
    id: '1', title: 'Friday Tennis Tournament', type: 'SPORT',
    date: new Date('2026-04-11T17:00:00'), location: 'Central Park Courts',
    maxSlots: 16, rsvpCount: 12, coinsReward: 100, isGoing: false,
  },
  {
    id: '2', title: 'Team Cooking Class', type: 'SOCIAL',
    date: new Date('2026-04-14T18:30:00'), location: 'Williams Kitchen Studio',
    maxSlots: 12, rsvpCount: 8, coinsReward: 75, isGoing: true,
  },
  {
    id: '3', title: 'Design Thinking Workshop', type: 'WORKSHOP',
    date: new Date('2026-04-17T14:00:00'), location: 'Conference Room A',
    maxSlots: 20, rsvpCount: 5, coinsReward: 50, isGoing: false,
  },
  {
    id: '4', title: 'After-Work Board Games', type: 'SOCIAL',
    date: new Date('2026-04-18T19:00:00'), location: 'The Game Lounge',
    maxSlots: 10, rsvpCount: 7, coinsReward: 50, isGoing: false,
  },
]

const MOCK_LEADERBOARD = [
  { id: '1', name: 'Sarah Chen', avatar: null, coins: 1240 },
  { id: '2', name: 'James Wilson', avatar: null, coins: 980 },
  { id: '3', name: 'You', avatar: null, coins: 450 },
]

const MOCK_USER = { name: 'Alex Johnson', coins: 450, avatar: null }

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MatchRow {
  id: string
  name: string
  jobTitle: string | null
  avatar: string | null
  sharedHobbies: number
  score: number
  department: string | null
}

interface ActivityRow {
  id: string
  title: string
  type: string
  date: Date
  location: string | null
  maxSlots: number
  rsvpCount: number
  coinsReward: number
  isGoing: boolean
}

interface LeaderRow {
  id: string
  name: string
  avatar: string | null
  coins: number
}

interface DashboardData {
  user: { name: string; coins: number; avatar: string | null }
  topMatches: MatchRow[]
  activities: ActivityRow[]
  leaderboard: LeaderRow[]
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getDashboardData(userId: string): Promise<DashboardData | null | 'onboarding'> {
  try {
    // Timeout after 3s so we never hang on a slow DB connection
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000))
    const { prisma } = await import('@/lib/prisma')
    const { matchScore } = await import('@/lib/matching')

    const result = await Promise.race([
      (async () => {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { company: true },
    })

    // User not in DB → needs onboarding
    if (!user) return 'onboarding' as const

    const companyUsers = await prisma.user.findMany({
      where: { companyId: user.companyId, id: { not: user.id } },
      select: {
        id: true, name: true, avatar: true, jobTitle: true,
        department: true, hobbies: true, interests: true,
        embedding: true, coins: true, level: true,
      },
      take: 50,
    })

    const userForMatch = {
      id: user.id,
      embedding: user.embedding,
      hobbies: user.hobbies,
      interests: user.interests,
      department: user.department,
      jobTitle: user.jobTitle,
    }

    const scored = companyUsers
      .filter((u) => u.embedding.length > 0)
      .map((u) => ({
        ...u,
        score: matchScore(userForMatch, {
          id: u.id,
          embedding: u.embedding,
          hobbies: u.hobbies,
          interests: u.interests,
          department: u.department,
          jobTitle: u.jobTitle,
        }),
        sharedHobbies: user.hobbies.filter((h) => u.hobbies.includes(h)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    const topMatches: MatchRow[] =
      scored.length > 0
        ? scored
        : companyUsers.slice(0, 5).map((u) => ({
            ...u,
            score: 0,
            sharedHobbies: user.hobbies.filter((h) => u.hobbies.includes(h)).length,
          }))

    const rawActivities = await prisma.activity.findMany({
      where: { companyId: user.companyId, date: { gte: new Date() } },
      include: { rsvps: true },
      orderBy: { date: 'asc' },
      take: 4,
    })

    const userRsvpIds = new Set(
      (await prisma.rsvp.findMany({ where: { userId: user.id } })).map((r) => r.activityId)
    )

    const activities: ActivityRow[] = rawActivities.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      date: a.date,
      location: a.location,
      maxSlots: a.maxSlots,
      coinsReward: a.coinsReward,
      rsvpCount: a.rsvps.filter((r) => r.status === 'GOING').length,
      isGoing: userRsvpIds.has(a.id),
    }))

    const leaderboard: LeaderRow[] = await prisma.user.findMany({
      where: { companyId: user.companyId },
      orderBy: { coins: 'desc' },
      take: 3,
      select: { id: true, name: true, avatar: true, coins: true },
    })

    return {
      user: { name: user.name, coins: user.coins, avatar: user.avatar },
      topMatches,
      activities,
      leaderboard,
    }
      })(),
      timeout,
    ])
    return result
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Sub-components (server-renderable)
// ---------------------------------------------------------------------------

function ScoreRing({ score }: { score: number }) {
  const pct = Math.round(score * 100)
  const color =
    pct >= 70 ? 'text-green-600' : pct >= 40 ? 'text-orange-500' : 'text-gray-400'
  return <span className={cn('text-xs font-bold', color)}>{pct}% match</span>
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const liveData = await getDashboardData(userId)

  // New user — not in DB yet → send to onboarding
  if (liveData === 'onboarding') redirect('/onboarding')

  const data = typeof liveData === 'object' && liveData !== null ? liveData : null
  const useMock = !data

  const userName = data?.user.name ?? MOCK_USER.name
  const userCoins = data?.user.coins ?? MOCK_USER.coins
  const userAvatar = data?.user.avatar ?? null
  const topMatches = data?.topMatches ?? MOCK_MATCHES
  const activities = data?.activities ?? MOCK_ACTIVITIES
  const leaderboard = data?.leaderboard ?? MOCK_LEADERBOARD

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 bg-white border-b z-20 px-4 py-3 flex items-center justify-between shadow-sm">
        <PandaLogo size="sm" />
        <div className="flex items-center gap-2.5">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
            <span className="text-sm">🪙</span>
            <span className="text-sm font-bold text-orange-600">{userCoins}</span>
          </div>
          <UserAvatar src={userAvatar} name={userName} className="h-9 w-9 ring-2 ring-orange-100" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-5 pb-6 space-y-6">
        {/* Demo banner — compact, dismissible feel */}
        {useMock && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs text-amber-700">
            <span>⚠️</span>
            <span>Demo mode — complete onboarding to see your live data</span>
            <Link href="/onboarding" className="ml-auto font-semibold underline whitespace-nowrap">Fix →</Link>
          </div>
        )}

        {/* Greeting + quick stats */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Good morning 🌤️</p>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
              Hey, {userName.split(' ')[0]}!
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-white border rounded-2xl px-3 py-2 text-center shadow-sm">
              <p className="text-base font-bold text-orange-500">8</p>
              <p className="text-xs text-gray-400">Matches</p>
            </div>
            <div className="bg-white border rounded-2xl px-3 py-2 text-center shadow-sm">
              <p className="text-base font-bold text-gray-700">3</p>
              <p className="text-xs text-gray-400">Events</p>
            </div>
          </div>
        </div>

        {/* ── Your Journey ──────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Your Journey</h2>
            <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">2 / 5</span>
          </div>
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {/* Progress bar at top */}
            <div className="h-1 bg-gray-100">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: '40%' }} />
            </div>
            {[
              { done: true,  icon: '✓', label: 'Complete your profile',         coins: '+50',  href: '/profile',    color: 'text-green-600' },
              { done: true,  icon: '✓', label: 'Connect with your first match', coins: '+25',  href: '/matches',    color: 'text-green-600' },
              { done: false, icon: '→', label: 'Join your first activity',      coins: '+75',  href: '/activities', color: 'text-orange-500' },
              { done: false, icon: '→', label: 'Send your first message',       coins: '+10',  href: '/chat',       color: 'text-gray-300' },
              { done: false, icon: '→', label: 'Earn your first badge',         coins: '+10',  href: '/badges',     color: 'text-gray-300' },
            ].map((step, i) => (
              <Link key={i} href={step.href}
                className={cn('flex items-center gap-3 px-4 py-3.5 border-b last:border-b-0 transition-colors group',
                  step.done ? 'bg-green-50/60' : i === 2 ? 'hover:bg-orange-50' : 'hover:bg-gray-50')}
              >
                {/* Circle icon */}
                <div className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold',
                  step.done ? 'bg-green-500 text-white' : i === 2 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400')}>
                  {step.icon}
                </div>
                <span className={cn('flex-1 text-sm font-medium',
                  step.done ? 'text-gray-400 line-through' : i === 2 ? 'text-gray-800' : 'text-gray-500')}>
                  {step.label}
                </span>
                {step.done
                  ? <span className="text-xs text-green-600 font-bold">Done ✓</span>
                  : <span className={cn('text-xs font-bold', i === 2 ? 'text-orange-500' : 'text-gray-300')}>{step.coins} 🪙</span>
                }
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Suggestions                                                       */}
        {/* ---------------------------------------------------------------- */}
        <SuggestionsWidget />

        {/* ---------------------------------------------------------------- */}
        {/* My Matches                                                        */}
        {/* ---------------------------------------------------------------- */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">My Matches</h2>
            <Link href="/matches" className="text-sm text-orange-600 hover:underline">
              See all →
            </Link>
          </div>

          {topMatches.length === 0 ? (
            <div className="bg-white rounded-2xl border p-8 text-center">
              <div className="text-4xl mb-2">🤝</div>
              <p className="font-medium text-gray-700">No matches yet</p>
              <p className="text-sm text-gray-500 mt-1">Complete your profile to get matched!</p>
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {topMatches.map((match) => {
                const pct = Math.round(match.score * 100)
                return (
                  <div key={match.id} className="flex-shrink-0 w-40 bg-white rounded-2xl border shadow-sm overflow-hidden">
                    {/* Score bar at top */}
                    <div className="h-1 bg-gray-100">
                      <div className={cn('h-full rounded-full', pct >= 70 ? 'bg-green-400' : 'bg-orange-400')} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="p-3 flex flex-col items-center text-center gap-2">
                      <UserAvatar src={match.avatar} name={match.name} className="h-12 w-12 ring-2 ring-orange-100" textClassName="text-base" />
                      <div className="w-full">
                        <p className="font-bold text-sm text-gray-900 truncate">{match.name}</p>
                        <p className="text-xs text-gray-400 truncate">{match.jobTitle}</p>
                      </div>
                      <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', pct >= 70 ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600')}>
                        {pct}% match
                      </span>
                      <p className="text-xs text-gray-400">{match.sharedHobbies} in common</p>
                      <Link href={`/chat?userId=${match.id}`} className="w-full">
                        <Button size="sm" className="w-full h-7 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                          Connect
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Upcoming Activities                                               */}
        {/* ---------------------------------------------------------------- */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Activities</h2>
            <Link href="/activities" className="text-sm text-orange-600 hover:underline">
              See all →
            </Link>
          </div>

          {activities.length === 0 ? (
            <div className="bg-white rounded-2xl border p-8 text-center">
              <div className="text-4xl mb-2">📅</div>
              <p className="font-medium text-gray-700">No upcoming activities</p>
              <p className="text-sm text-gray-500 mt-1">Be the first to create one!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                  <div className={cn('h-1', {
                    'bg-green-400': activity.type === 'SPORT',
                    'bg-blue-400': activity.type === 'SOCIAL',
                    'bg-purple-400': activity.type === 'WORKSHOP',
                    'bg-orange-400': activity.type === 'TOURNAMENT',
                  })} />
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {ACTIVITY_EMOJI[activity.type] ?? '📌'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">📅 {formatDate(activity.date)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{activity.maxSlots - activity.rsvpCount} spots left</span>
                        <span className="text-xs text-orange-500 font-semibold">🪙 +{activity.coinsReward}</span>
                      </div>
                    </div>
                    <RsvpButton activityId={activity.id} isGoing={activity.isGoing} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Leaderboard Preview                                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">This Month&apos;s Leaders</h2>
            <Link href="/badges" className="text-sm text-orange-600 hover:underline">
              Full leaderboard →
            </Link>
          </div>
          <div className="bg-white rounded-2xl border divide-y">
            {leaderboard.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">No data yet</p>
            ) : (
              leaderboard.map((emp, idx) => (
                <div key={emp.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-xl w-8" aria-label={`Position ${idx + 1}`}>
                    {MEDALS[idx]}
                  </span>
                  <UserAvatar src={emp.avatar} name={emp.name} className="h-8 w-8" textClassName="text-xs" />
                  <span className="text-sm font-medium text-gray-900 flex-1">{emp.name}</span>
                  <span className="text-sm font-semibold text-orange-600">🪙 {emp.coins}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Floating action button — open a slot from anywhere */}
      <CreateSlotFab />
    </div>
  )
}

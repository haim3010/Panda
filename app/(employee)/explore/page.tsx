'use client'

import { useState, useMemo } from 'react'
import { Search, Users, MessageCircle, UserPlus, Check } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// ─── Mock data ───────────────────────────────────────────────────────────────

const PEOPLE = [
  { id: '1',  name: 'Sarah Chen',    jobTitle: 'Senior Product Designer', department: 'Design',       location: 'New York, NY',     hobbies: ['Art', 'Photography', 'Yoga', 'Travel'],            score: 0.87, connected: true  },
  { id: '2',  name: 'Yael Cohen',    jobTitle: 'UX Researcher',           department: 'Product',      location: 'Tel Aviv, IL',     hobbies: ['Tennis', 'Yoga', 'Hiking', 'Photography'],          score: 0.81, connected: true  },
  { id: '3',  name: 'James Wilson',  jobTitle: 'Backend Engineer',        department: 'Engineering',  location: 'San Francisco, CA',hobbies: ['Gaming', 'Hiking', 'Board Games', 'Running'],       score: 0.78, connected: false },
  { id: '4',  name: 'Lisa Johnson',  jobTitle: 'Product Manager',         department: 'Product',      location: 'New York, NY',     hobbies: ['Yoga', 'Reading', 'Travel', 'Art'],                 score: 0.80, connected: false },
  { id: '5',  name: 'Mia Patel',     jobTitle: 'Marketing Lead',          department: 'Marketing',    location: 'London, UK',       hobbies: ['Cooking', 'Wine', 'Travel', 'Music'],               score: 0.72, connected: false },
  { id: '6',  name: 'Nina Brandt',   jobTitle: 'Brand Designer',          department: 'Design',       location: 'Amsterdam, NL',    hobbies: ['Cycling', 'Art', 'Photography', 'Music'],           score: 0.69, connected: false },
  { id: '7',  name: 'Omar Hassan',   jobTitle: 'ML Engineer',             department: 'R&D',          location: 'Dubai, AE',        hobbies: ['Tennis', 'Swimming', 'Chess', 'Running'],           score: 0.65, connected: false },
  { id: '8',  name: 'Tom Baker',     jobTitle: 'Data Scientist',          department: 'R&D',          location: 'Berlin, DE',       hobbies: ['Tennis', 'Cycling', 'Reading', 'Writing'],          score: 0.60, connected: false },
  { id: '9',  name: 'Chris Park',    jobTitle: 'Staff Engineer',          department: 'Engineering',  location: 'Seoul, KR',        hobbies: ['Running', 'Gaming', 'Music', 'Photography'],       score: 0.58, connected: false },
  { id: '10', name: 'Ana Lima',      jobTitle: 'Sales Manager',           department: 'Sales',        location: 'São Paulo, BR',    hobbies: ['Cooking', 'Dancing', 'Travel', 'Wine'],             score: 0.54, connected: false },
  { id: '11', name: 'Jake Murphy',   jobTitle: 'Growth Marketer',         department: 'Marketing',    location: 'Dublin, IE',       hobbies: ['Football', 'Running', 'Gaming', 'Board Games'],    score: 0.51, connected: false },
  { id: '12', name: 'Marco Rossi',   jobTitle: 'Account Executive',       department: 'Sales',        location: 'Milan, IT',        hobbies: ['Cycling', 'Cooking', 'Wine', 'Travel'],             score: 0.48, connected: false },
  { id: '13', name: 'Elena Popov',   jobTitle: 'Operations Manager',      department: 'Operations',   location: 'Prague, CZ',       hobbies: ['Yoga', 'Reading', 'Hiking', 'Photography'],        score: 0.46, connected: false },
  { id: '14', name: 'David Kim',     jobTitle: 'HR Manager',              department: 'HR',           location: 'New York, NY',     hobbies: ['Basketball', 'Music', 'Board Games', 'Cooking'],   score: 0.44, connected: false },
]

const GROUPS = [
  { id: '1', emoji: '🎾', name: 'Tennis Club',      members: 12, description: 'Weekly matches every Friday at 6 PM', joined: false },
  { id: '2', emoji: '🧘', name: 'Yoga Circle',       members: 8,  description: 'Tuesday & Thursday morning sessions', joined: true  },
  { id: '3', emoji: '🏃', name: 'Running Crew',      members: 6,  description: 'Weekend morning runs — all paces welcome', joined: false },
  { id: '4', emoji: '🎲', name: 'Board Gamers',      members: 11, description: 'Monthly game nights with pizza 🍕', joined: false },
  { id: '5', emoji: '📷', name: 'Photo Club',        members: 7,  description: 'Share shots, tips, and city walks', joined: false },
  { id: '6', emoji: '🍳', name: 'Cooking Collective',members: 9,  description: 'Try new recipes together every month', joined: true  },
  { id: '7', emoji: '🚴', name: 'Cycling Squad',     members: 5,  description: 'Road & trail rides on weekends', joined: false },
  { id: '8', emoji: '🎮', name: 'Gaming Guild',      members: 14, description: 'Online & in-person gaming sessions', joined: false },
]

const DEPARTMENTS = ['All Departments', 'Design', 'Engineering', 'Product', 'Marketing', 'R&D', 'Sales', 'HR', 'Operations']

const HOBBY_EMOJI: Record<string, string> = {
  Tennis: '🎾', Football: '⚽', Basketball: '🏀', Yoga: '🧘', Running: '🏃',
  Cycling: '🚴', Swimming: '🏊', Hiking: '🥾', Climbing: '🧗', Cooking: '🍳',
  Wine: '🍷', 'Board Games': '🎲', Photography: '📷', Travel: '✈️', Music: '🎵',
  Reading: '📚', Art: '🎨', Design: '✏️', Writing: '📝', Gaming: '🎮',
  Chess: '♟️', Dancing: '💃',
}

// ─── Components ──────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100)
  const color =
    pct >= 75 ? 'text-green-700 bg-green-50 border-green-200' :
    pct >= 55 ? 'text-orange-700 bg-orange-50 border-orange-200' :
               'text-gray-600 bg-gray-50 border-gray-200'
  return (
    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', color)}>
      {pct}% match
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [tab, setTab]               = useState<'people' | 'groups'>('people')
  const [query, setQuery]           = useState('')
  const [dept, setDept]             = useState('All Departments')
  const [connected, setConnected]   = useState<Set<string>>(
    new Set(PEOPLE.filter((p) => p.connected).map((p) => p.id))
  )
  const [joinedGroups, setJoined]   = useState<Set<string>>(
    new Set(GROUPS.filter((g) => g.joined).map((g) => g.id))
  )

  const filteredPeople = useMemo(() => {
    const q = query.toLowerCase()
    return PEOPLE.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.jobTitle.toLowerCase().includes(q) ||
        p.hobbies.some((h) => h.toLowerCase().includes(q))
      const matchesDept = dept === 'All Departments' || p.department === dept
      return matchesQuery && matchesDept
    })
  }, [query, dept])

  const filteredGroups = useMemo(() => {
    const q = query.toLowerCase()
    return GROUPS.filter(
      (g) => !q || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
          <p className="text-sm text-gray-500 mt-1">Discover colleagues and hobby groups</p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === 'people' ? 'Search by name, title or hobby…' : 'Search groups…'}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        {/* Tab pills */}
        <div className="flex gap-2">
          {(['people', 'groups'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-5 py-1.5 rounded-full text-sm font-semibold border transition-all',
                tab === t
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
              )}
            >
              {t === 'people' ? `👥 People` : `🏷️ Groups`}
            </button>
          ))}
        </div>

        {/* ── PEOPLE TAB ─────────────────────────────────────────────────── */}
        {tab === 'people' && (
          <>
            {/* Department filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={cn(
                    'flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all',
                    dept === d
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  )}
                >
                  {d === 'All Departments' ? 'All' : d}
                </button>
              ))}
            </div>

            {/* Stats */}
            <p className="text-xs text-gray-400">
              {filteredPeople.length} people at TechCorp
              {dept !== 'All Departments' ? ` in ${dept}` : ''}
            </p>

            {/* People grid */}
            {filteredPeople.length === 0 ? (
              <div className="bg-white rounded-2xl border p-10 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <p className="font-medium text-gray-700">No results found</p>
                <p className="text-sm text-gray-500 mt-1">Try a different name or hobby</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredPeople.map((person) => {
                  const isConnected = connected.has(person.id)
                  return (
                    <div key={person.id} className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-3">
                      {/* Avatar + name */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <UserAvatar src={null} name={person.name} className="h-14 w-14" textClassName="text-lg" />
                        <div>
                          <p className="font-semibold text-sm text-gray-900 leading-tight">{person.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-tight">{person.jobTitle}</p>
                          <p className="text-xs text-gray-400">{person.department}</p>
                        </div>
                        <ScoreBadge score={person.score} />
                      </div>

                      {/* Hobbies */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {person.hobbies.slice(0, 3).map((h) => (
                          <span key={h} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {HOBBY_EMOJI[h] ?? '🎯'} {h}
                          </span>
                        ))}
                      </div>

                      {/* Action button */}
                      {isConnected ? (
                        <button className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors">
                          <MessageCircle className="h-3.5 w-3.5" />
                          Message
                        </button>
                      ) : (
                        <button
                          onClick={() => setConnected((prev) => new Set([...prev, person.id]))}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-orange-300 text-orange-600 text-xs font-semibold hover:bg-orange-50 transition-colors"
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Connect
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* ── GROUPS TAB ─────────────────────────────────────────────────── */}
        {tab === 'groups' && (
          <>
            {/* My groups */}
            {Array.from(joinedGroups).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Joined</p>
                <div className="space-y-2">
                  {filteredGroups
                    .filter((g) => joinedGroups.has(g.id))
                    .map((group) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        joined={true}
                        onToggle={() =>
                          setJoined((prev) => {
                            const next = new Set(prev)
                            next.delete(group.id)
                            return next
                          })
                        }
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Discover groups */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {Array.from(joinedGroups).length > 0 ? 'Discover More' : 'All Groups'}
              </p>
              <div className="space-y-2">
                {filteredGroups
                  .filter((g) => !joinedGroups.has(g.id))
                  .map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      joined={false}
                      onToggle={() =>
                        setJoined((prev) => new Set([...prev, group.id]))
                      }
                    />
                  ))}
              </div>
              {filteredGroups.filter((g) => !joinedGroups.has(g.id)).length === 0 && (
                <div className="bg-white rounded-2xl border p-8 text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="font-medium text-gray-700">You&apos;ve joined all groups!</p>
                </div>
              )}
            </div>

            {/* Create group CTA */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 p-5 text-center">
              <div className="text-3xl mb-2">✨</div>
              <p className="font-semibold text-gray-900 text-sm">Can&apos;t find your hobby?</p>
              <p className="text-xs text-gray-500 mt-1 mb-3">Create a new group and invite your colleagues</p>
              <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
                + Create a Group
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Group card component ─────────────────────────────────────────────────────

function GroupCard({
  group,
  joined,
  onToggle,
}: {
  group: (typeof GROUPS)[0]
  joined: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-4 flex items-center gap-4">
      <div className="text-3xl flex-shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
        {group.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-gray-900">{group.name}</p>
          {joined && (
            <span className="text-xs text-green-600 font-medium">● Joined</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{group.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          <Users className="inline h-3 w-3 mr-0.5" />
          {group.members} members
        </p>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
          joined
            ? 'bg-green-50 text-green-600 border border-green-200'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        )}
      >
        {joined ? (
          <><Check className="h-3 w-3" /> Joined</>
        ) : (
          <>+ Join</>
        )}
      </button>
    </div>
  )
}

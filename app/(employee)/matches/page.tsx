'use client'

import { useState } from 'react'
import { MessageCircle, Users } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const MATCHES = [
  {
    id: '1',
    name: 'Sarah Chen',
    jobTitle: 'Senior Product Designer',
    department: 'Design',
    location: 'New York, NY',
    hobbies: ['Art', 'Photography', 'Yoga', 'Travel'],
    sharedHobbies: ['Yoga', 'Travel'],
    score: 0.87,
    status: 'CONNECTED',
  },
  {
    id: '2',
    name: 'Yael Cohen',
    jobTitle: 'UX Researcher',
    department: 'Product',
    location: 'Tel Aviv, IL',
    hobbies: ['Tennis', 'Yoga', 'Hiking', 'Photography'],
    sharedHobbies: ['Yoga', 'Photography'],
    score: 0.81,
    status: 'CONNECTED',
  },
  {
    id: '3',
    name: 'James Wilson',
    jobTitle: 'Backend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    hobbies: ['Gaming', 'Hiking', 'Board Games', 'Running'],
    sharedHobbies: ['Hiking', 'Running'],
    score: 0.78,
    status: 'PENDING',
  },
  {
    id: '4',
    name: 'Lisa Johnson',
    jobTitle: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    hobbies: ['Yoga', 'Reading', 'Travel', 'Art'],
    sharedHobbies: ['Reading', 'Travel'],
    score: 0.80,
    status: 'PENDING',
  },
  {
    id: '5',
    name: 'Mia Patel',
    jobTitle: 'Marketing Lead',
    department: 'Marketing',
    location: 'London, UK',
    hobbies: ['Cooking', 'Wine', 'Travel', 'Music'],
    sharedHobbies: ['Travel'],
    score: 0.72,
    status: 'PENDING',
  },
  {
    id: '6',
    name: 'Nina Brandt',
    jobTitle: 'Brand Designer',
    department: 'Design',
    location: 'Amsterdam, NL',
    hobbies: ['Cycling', 'Art', 'Photography', 'Music'],
    sharedHobbies: ['Photography', 'Art'],
    score: 0.69,
    status: 'PENDING',
  },
  {
    id: '7',
    name: 'Omar Hassan',
    jobTitle: 'ML Engineer',
    department: 'R&D',
    location: 'Dubai, AE',
    hobbies: ['Tennis', 'Swimming', 'Chess', 'Running'],
    sharedHobbies: ['Running'],
    score: 0.65,
    status: 'PENDING',
  },
  {
    id: '8',
    name: 'Tom Baker',
    jobTitle: 'Data Scientist',
    department: 'R&D',
    location: 'Berlin, DE',
    hobbies: ['Tennis', 'Cycling', 'Reading', 'Writing'],
    sharedHobbies: ['Reading'],
    score: 0.60,
    status: 'DISMISSED',
  },
]

const FILTERS = ['All', 'Connected', 'New'] as const
type Filter = typeof FILTERS[number]

function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100)
  const color =
    pct >= 75 ? 'text-green-700 bg-green-50 border-green-200' :
    pct >= 50 ? 'text-orange-700 bg-orange-50 border-orange-200' :
    'text-gray-600 bg-gray-50 border-gray-200'
  return (
    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', color)}>
      {pct}% match
    </span>
  )
}

export default function MatchesPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const [connected, setConnected] = useState<Set<string>>(
    new Set(MATCHES.filter((m) => m.status === 'CONNECTED').map((m) => m.id))
  )
  const [dismissed, setDismissed] = useState<Set<string>>(
    new Set(MATCHES.filter((m) => m.status === 'DISMISSED').map((m) => m.id))
  )

  const filtered = MATCHES.filter((m) => {
    if (dismissed.has(m.id)) return false
    if (filter === 'Connected') return connected.has(m.id)
    if (filter === 'New') return !connected.has(m.id)
    return true
  })

  const connectedCount = MATCHES.filter((m) => connected.has(m.id)).length
  const newCount = MATCHES.filter((m) => !connected.has(m.id) && !dismissed.has(m.id)).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Matches</h1>
          <p className="text-sm text-gray-500 mt-1">People you share the most in common with</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl border p-4 text-center">
            <p className="text-2xl font-bold text-orange-500">{connectedCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Connected</p>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <p className="text-2xl font-bold text-gray-700">{newCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">New matches</p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                filter === f
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Match cards */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border p-10 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <p className="font-medium text-gray-700">No matches here yet</p>
              <p className="text-sm text-gray-500 mt-1">Complete your profile to get matched!</p>
            </div>
          ) : (
            filtered.map((match) => {
              const isConnected = connected.has(match.id)
              return (
                <div key={match.id} className="bg-white rounded-2xl border shadow-sm p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <UserAvatar src={null} name={match.name} className="h-14 w-14 flex-shrink-0" textClassName="text-lg" />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900">{match.name}</p>
                        <ScoreBadge score={match.score} />
                        {isConnected && (
                          <span className="text-xs text-green-600 font-medium">● Connected</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{match.jobTitle}</p>
                      <p className="text-xs text-gray-400">{match.department} · {match.location}</p>

                      {/* Shared hobbies */}
                      {match.sharedHobbies.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {match.sharedHobbies.length} in common:
                          </span>
                          {match.sharedHobbies.map((h) => (
                            <span key={h} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* All hobbies */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {match.hobbies.map((h) => (
                          <span
                            key={h}
                            className={cn(
                              'text-xs px-2 py-0.5 rounded-full',
                              match.sharedHobbies.includes(h)
                                ? 'bg-orange-100 text-orange-700 font-medium'
                                : 'bg-gray-100 text-gray-500'
                            )}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4">
                    {isConnected ? (
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setConnected((prev) => new Set([...prev, match.id]))}
                          className="flex-1 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
                        >
                          Connect
                        </button>
                        <button
                          onClick={() => setDismissed((prev) => new Set([...prev, match.id]))}
                          className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
                        >
                          Skip
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { MapPin, Briefcase, Edit3, Check } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const HOBBY_EMOJI: Record<string, string> = {
  Tennis: '🎾', Football: '⚽', Basketball: '🏀', Yoga: '🧘', Running: '🏃',
  Cycling: '🚴', Swimming: '🏊', Hiking: '🥾', Climbing: '🧗', Cooking: '🍳',
  Wine: '🍷', 'Board Games': '🎲', Photography: '📷', Travel: '✈️', Music: '🎵',
  Reading: '📚', Art: '🎨', Design: '✏️', Writing: '📝', Gaming: '🎮',
}

const MOCK_USER = {
  name: 'Alex Johnson',
  jobTitle: 'Senior Product Manager',
  department: 'Product',
  location: 'New York, NY',
  email: 'alex.johnson@techcorp.com',
  coins: 450,
  level: 'BEGINNER',
  hobbies: ['Yoga', 'Travel', 'Photography', 'Reading'],
  interests: ['Workshops', 'Coffee chats', 'Team dinners'],
  connectionPreference: 'Both',
  frequency: 'Weekly',
  matchCount: 8,
  activitiesJoined: 3,
}

const LEVEL_COLORS: Record<string, string> = {
  NEWBIE: 'bg-gray-100 text-gray-600',
  BEGINNER: 'bg-blue-100 text-blue-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  DIAMOND: 'bg-purple-100 text-purple-700',
}
const LEVEL_EMOJI: Record<string, string> = {
  NEWBIE: '🌱', BEGINNER: '⭐', GOLD: '🥇', DIAMOND: '💎',
}

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState(MOCK_USER)
  const [draft, setDraft] = useState(MOCK_USER)

  function saveEdit() { setUser(draft); setEditing(false) }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Profile card */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-500" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <UserAvatar src={null} name={user.name} className="h-20 w-20 ring-4 ring-white" textClassName="text-2xl" />
              <button
                onClick={() => editing ? saveEdit() : setEditing(true)}
                className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                  editing ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
              >
                {editing ? <><Check className="h-4 w-4" />Save</> : <><Edit3 className="h-4 w-4" />Edit</>}
              </button>
            </div>

            {editing ? (
              <div className="space-y-2 mb-3">
                <input className="w-full text-xl font-bold border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-orange-300" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                <input className="w-full text-sm border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-orange-300" value={draft.jobTitle} onChange={(e) => setDraft({ ...draft, jobTitle: e.target.value })} />
                <input className="w-full text-sm border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-orange-300" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
              </div>
            ) : (
              <div className="mb-3">
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-sm text-gray-500"><Briefcase className="h-3.5 w-3.5" />{user.jobTitle}</span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500"><MapPin className="h-3.5 w-3.5" />{user.location}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', LEVEL_COLORS[user.level])}>
                {LEVEL_EMOJI[user.level]} {user.level}
              </span>
              <span className="text-sm font-semibold text-orange-600">🪙 {user.coins} coins</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-2">
              {[{ label: 'Matches', value: user.matchCount }, { label: 'Activities', value: user.activitiesJoined }, { label: 'Dept', value: user.department }].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-base font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Hobbies & Interests</h2>
          <div className="flex flex-wrap gap-2">
            {user.hobbies.map((h) => (
              <span key={h} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                <span>{HOBBY_EMOJI[h] ?? '🎯'}</span>{h}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Social Preferences</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Connect preference</span><span className="font-medium">⚡ {user.connectionPreference}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Frequency</span><span className="font-medium">📅 {user.frequency}</span></div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">Interested in</span>
              <div className="flex flex-wrap gap-1.5">
                {user.interests.map((i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{i}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-900">Progress to Gold ⭐→🥇</h2>
            <span className="text-sm font-bold text-orange-600">450 / 1000</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: '45%' }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Earn 550 more coins to reach Gold level</p>
        </div>

      </div>
    </div>
  )
}

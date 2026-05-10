'use client'

import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const LEADERBOARD = [
  { id: '1', name: 'Chris Park', department: 'Engineering', coins: 2100, level: 'DIAMOND' },
  { id: '2', name: 'Omar Hassan', department: 'R&D', coins: 1380, level: 'DIAMOND' },
  { id: '3', name: 'Sarah Chen', department: 'Design', coins: 1240, level: 'GOLD' },
  { id: '4', name: 'Nina Brandt', department: 'Design', coins: 1050, level: 'GOLD' },
  { id: '5', name: 'James Wilson', department: 'Engineering', coins: 980, level: 'GOLD' },
  { id: '6', name: 'Lisa Johnson', department: 'Product', coins: 890, level: 'GOLD' },
  { id: '7', name: 'Yael Cohen', department: 'Product', coins: 760, level: 'GOLD' },
  { id: '8', name: 'Mia Patel', department: 'Marketing', coins: 620, level: 'BEGINNER' },
  { id: '9', name: 'Jake Murphy', department: 'Marketing', coins: 580, level: 'BEGINNER' },
  { id: '10', name: 'Marco Rossi', department: 'Sales', coins: 430, level: 'BEGINNER' },
]

const MY_BADGES = [
  { id: '1', emoji: '🤝', title: 'First Connection', desc: 'Made your first match', earned: true },
  { id: '2', emoji: '🏃', title: 'Activity Starter', desc: 'Joined your first activity', earned: true },
  { id: '3', emoji: '⭐', title: 'Rising Star', desc: 'Reached Beginner level', earned: true },
  { id: '4', emoji: '🎾', title: 'Sports Enthusiast', desc: 'Joined 3 sport activities', earned: false },
  { id: '5', emoji: '💬', title: 'Connector', desc: 'Sent 10 messages', earned: false },
  { id: '6', emoji: '🏆', title: 'Top 10', desc: 'Reached company top 10', earned: false },
]

const MEDALS = ['🥇', '🥈', '🥉']
const LEVEL_COLORS: Record<string, string> = {
  NEWBIE: 'bg-gray-100 text-gray-600', BEGINNER: 'bg-blue-100 text-blue-700',
  GOLD: 'bg-yellow-100 text-yellow-700', DIAMOND: 'bg-purple-100 text-purple-700',
}

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badges & Leaderboard</h1>
          <p className="text-sm text-gray-500 mt-1">Earn coins by joining activities and connecting with teammates</p>
        </div>

        {/* My rank */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">Your Rank</p>
            <p className="text-4xl font-bold mt-1">#11</p>
            <p className="text-orange-100 text-sm mt-1">at TechCorp this month</p>
          </div>
          <div className="text-right">
            <p className="text-orange-100 text-sm font-medium">Coins</p>
            <p className="text-4xl font-bold mt-1">🪙 450</p>
            <p className="text-orange-100 text-sm mt-1">550 to Gold ⭐</p>
          </div>
        </div>

        {/* Badges grid */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">My Badges</h2>
          <div className="grid grid-cols-3 gap-3">
            {MY_BADGES.map((b) => (
              <div key={b.id} className={cn('rounded-xl p-3 text-center border', b.earned ? 'bg-orange-50 border-orange-100' : 'bg-gray-50 border-gray-100 opacity-50')}>
                <div className="text-3xl mb-1.5">{b.emoji}</div>
                <p className={cn('text-xs font-semibold', b.earned ? 'text-gray-900' : 'text-gray-400')}>{b.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{b.desc}</p>
                {b.earned && <p className="text-xs text-orange-500 font-medium mt-1">✓ Earned</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <h2 className="font-semibold text-gray-900">Top 10 This Month</h2>
          </div>
          <div className="divide-y">
            {LEADERBOARD.map((emp, idx) => (
              <div key={emp.id} className={cn('flex items-center gap-3 px-5 py-3', idx < 3 && 'bg-orange-50/50')}>
                <span className="w-8 text-center flex-shrink-0">
                  {idx < 3 ? <span className="text-xl">{MEDALS[idx]}</span> : <span className="text-sm font-bold text-gray-400">#{idx + 1}</span>}
                </span>
                <UserAvatar src={null} name={emp.name} className="h-9 w-9" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{emp.name}</p>
                  <p className="text-xs text-gray-500">{emp.department}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[emp.level])}>{emp.level}</span>
                  <span className="text-sm font-bold text-orange-600">🪙 {emp.coins}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to earn */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">How to Earn Coins</h2>
          <div className="space-y-2.5">
            {[
              { emoji: '🤝', action: 'Connect with a match', coins: '+25' },
              { emoji: '🏃', action: 'Attend a Sport activity', coins: '+120' },
              { emoji: '🥂', action: 'Attend a Social activity', coins: '+75' },
              { emoji: '🛠️', action: 'Attend a Workshop', coins: '+50' },
              { emoji: '📅', action: 'RSVP to an activity', coins: '+10' },
              { emoji: '✅', action: 'Complete your profile', coins: '+50' },
            ].map(({ emoji, action, coins }) => (
              <div key={action} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600"><span>{emoji}</span>{action}</span>
                <span className="font-semibold text-orange-600">{coins} 🪙</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

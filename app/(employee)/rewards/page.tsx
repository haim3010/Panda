'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const REWARDS = [
  { id: '1', emoji: '☕', title: 'Free Coffee', desc: 'Redeem for a free coffee at the office café', cost: 100, category: 'Food' },
  { id: '2', emoji: '🍕', title: 'Team Lunch Voucher', desc: '$20 voucher for a team lunch outing', cost: 300, category: 'Food' },
  { id: '3', emoji: '🎬', title: 'Cinema Tickets (x2)', desc: 'Two tickets to any movie of your choice', cost: 500, category: 'Entertainment' },
  { id: '4', emoji: '📚', title: 'Book of Your Choice', desc: 'Pick any book up to $30 value', cost: 400, category: 'Learning' },
  { id: '5', emoji: '🏋️', title: 'Gym Day Pass', desc: 'One-day access to a premium gym nearby', cost: 250, category: 'Wellness' },
  { id: '6', emoji: '🧘', title: 'Yoga Class', desc: 'One session at a local yoga studio', cost: 200, category: 'Wellness' },
  { id: '7', emoji: '🎧', title: 'Spotify Premium (1mo)', desc: 'One month of Spotify Premium', cost: 350, category: 'Entertainment' },
  { id: '8', emoji: '🛍️', title: 'Amazon Voucher $50', desc: '$50 Amazon gift card', cost: 750, category: 'Shopping' },
  { id: '9', emoji: '✈️', title: 'Extra Day Off', desc: 'One additional paid day off — approved by HR', cost: 2000, category: 'Premium' },
]

const CATEGORIES = ['All', 'Food', 'Wellness', 'Entertainment', 'Learning', 'Shopping', 'Premium'] as const
type Category = typeof CATEGORIES[number]

export default function RewardsPage() {
  const [filter, setFilter] = useState<Category>('All')
  const [redeemed, setRedeemed] = useState<Set<string>>(new Set())
  const myCoins = 450

  const filtered = REWARDS.filter((r) => filter === 'All' || r.category === filter)

  function redeem(id: string, cost: number) {
    if (cost > myCoins) return
    setRedeemed((prev) => new Set([...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reward Store</h1>
          <p className="text-sm text-gray-500 mt-1">Spend your coins on perks and treats</p>
        </div>

        {/* Balance */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Your balance</p>
            <p className="text-4xl font-bold mt-1">🪙 {myCoins}</p>
          </div>
          <div className="text-right">
            <p className="text-orange-100 text-sm">Redeemed</p>
            <p className="text-2xl font-bold mt-1">{redeemed.size} items</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={cn('flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                filter === c ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300')}>
              {c}
            </button>
          ))}
        </div>

        {/* Rewards list */}
        <div className="space-y-3">
          {filtered.map((reward) => {
            const canAfford = myCoins >= reward.cost
            const isRedeemed = redeemed.has(reward.id)
            return (
              <div key={reward.id} className={cn('bg-white rounded-2xl border shadow-sm p-4 flex items-center gap-4', isRedeemed && 'opacity-60')}>
                <div className="text-4xl flex-shrink-0">{reward.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{reward.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-snug">{reward.desc}</p>
                  <p className={cn('text-sm font-bold mt-1.5', canAfford ? 'text-orange-600' : 'text-gray-400')}>
                    🪙 {reward.cost} coins
                    {!canAfford && <span className="text-xs font-normal text-gray-400 ml-1">(need {reward.cost - myCoins} more)</span>}
                  </p>
                </div>
                <button onClick={() => redeem(reward.id, reward.cost)} disabled={!canAfford || isRedeemed}
                  className={cn('flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                    isRedeemed ? 'bg-green-50 text-green-600 border border-green-200' :
                    canAfford ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed')}>
                  {isRedeemed ? '✓ Done' : 'Redeem'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

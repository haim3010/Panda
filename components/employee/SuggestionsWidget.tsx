'use client'

import { useState } from 'react'
import { X, ChevronDown, MessageCircle, Check } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// ─── Suggestion data ──────────────────────────────────────────────────────────

const SUGGESTIONS = [
  {
    id: '1',
    emoji: '🎾',
    activityLabel: 'Tennis',
    action: 'Tennis with',
    matchName: 'Yael Cohen',
    detail: "She also plays tennis — challenge her!",
    when: 'This Friday · 6 PM',
    place: 'Central Park',
    badge: 'Sport' as const,
    badgeColor: 'bg-green-100 text-green-700',
    topColor: 'from-green-400 to-emerald-500',
  },
  {
    id: '2',
    emoji: '☕',
    activityLabel: 'Coffee',
    action: 'Coffee chat with',
    matchName: 'James Wilson',
    detail: "87% match — haven't connected yet",
    when: 'This week · 30 min',
    place: 'Office café',
    badge: 'Social' as const,
    badgeColor: 'bg-amber-100 text-amber-700',
    topColor: 'from-amber-400 to-orange-500',
  },
  {
    id: '3',
    emoji: '🧘',
    activityLabel: 'Yoga',
    action: 'Yoga with',
    matchName: 'Sarah Chen',
    detail: 'You both love yoga — join her session',
    when: 'Sunday · 9 AM',
    place: 'Riverside Park',
    badge: 'Wellness' as const,
    badgeColor: 'bg-violet-100 text-violet-700',
    topColor: 'from-violet-400 to-purple-500',
  },
  {
    id: '4',
    emoji: '🏃',
    activityLabel: 'Running',
    action: 'Morning run with',
    matchName: 'Omar Hassan',
    detail: 'Running crew — all paces welcome',
    when: 'Saturday · 7:30 AM',
    place: 'Hudson River path',
    badge: 'Sport' as const,
    badgeColor: 'bg-green-100 text-green-700',
    topColor: 'from-blue-400 to-cyan-500',
  },
]

// ─── Modal types ──────────────────────────────────────────────────────────────

type Level = 'All Welcome' | 'Beginner' | 'Intermediate' | 'Pro'
const LEVELS: Level[] = ['All Welcome', 'Beginner', 'Intermediate', 'Pro']
const TIMES = ['7:00 AM','7:30 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM',
  '12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','5:30 PM',
  '6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM']

// ─── Slot invite modal ────────────────────────────────────────────────────────

function SlotInviteModal({
  suggestion,
  onClose,
}: {
  suggestion: typeof SUGGESTIONS[0]
  onClose: () => void
}) {
  const [level, setLevel]       = useState<Level>('All Welcome')
  const [date, setDate]         = useState('')
  const [time, setTime]         = useState('6:00 PM')
  const [location, setLocation] = useState(suggestion.place)
  const [spots, setSpots]       = useState(1)
  const [notes, setNotes]       = useState('')
  const [done, setDone]         = useState(false)

  const canSubmit = date && location

  function handleCreate() {
    if (!canSubmit) return
    setDone(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {done ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Slot is Live! 🎯</h2>
              <p className="text-sm text-gray-500 mt-1">
                Your <strong>{suggestion.activityLabel}</strong> slot has been opened
              </p>
            </div>
            {/* Chat notification confirmation */}
            <div className="w-full bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Message sent to {suggestion.matchName}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  &quot;Hey! I opened a {suggestion.activityLabel} slot — want to join? 🎯&quot;
                </p>
              </div>
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-orange-500 text-white font-semibold text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <div className="px-5 pb-8 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Open a Slot</h2>
                <p className="text-sm text-gray-500 mt-0.5">Invite {suggestion.matchName}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Invite banner */}
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-3">
              <span className="text-2xl">{suggestion.emoji}</span>
              <UserAvatar src={null} name={suggestion.matchName} className="h-9 w-9 flex-shrink-0" textClassName="text-sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{suggestion.activityLabel} with {suggestion.matchName}</p>
                <p className="text-xs text-gray-500">She&apos;ll get a chat notification when you open the slot</p>
              </div>
            </div>

            {/* Level */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Your level</p>
              <div className="flex gap-2 flex-wrap">
                {LEVELS.map((l) => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={cn('px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                      level === l ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300')}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Date</p>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Time</p>
                <div className="relative">
                  <select value={time} onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300 appearance-none bg-white">
                    {TIMES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Location</p>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Central Park Court 4"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300" />
            </div>

            {/* Spots */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Extra spots <span className="text-gray-400 font-normal">(others can join too)</span></p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setSpots(n)}
                    className={cn('w-11 h-11 rounded-xl border text-sm font-bold transition-all',
                      spots === n ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 text-gray-700 hover:border-orange-300')}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Notes <span className="text-gray-400 font-normal">(optional)</span></p>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. rackets available, bring water…"
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
            </div>

            {/* Submit */}
            <button onClick={handleCreate} disabled={!canSubmit}
              className={cn('w-full py-3.5 rounded-2xl font-semibold text-sm transition-all',
                canSubmit
                  ? 'bg-orange-500 hover:bg-orange-600 text-white active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed')}>
              {canSubmit
                ? `🎯 Open Slot & Notify ${suggestion.matchName.split(' ')[0]}`
                : 'Pick a date & location first'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export function SuggestionsWidget() {
  const [dismissed, setDismissed]         = useState<Set<string>>(new Set())
  const [activeModal, setActiveModal]     = useState<typeof SUGGESTIONS[0] | null>(null)

  const visible = SUGGESTIONS.filter((s) => !dismissed.has(s.id))
  if (visible.length === 0) return null

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">✨ Suggested for You</h2>
            <p className="text-xs text-gray-400 mt-0.5">Based on your matches &amp; hobbies</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {visible.map((s) => (
            <div key={s.id} className="flex-shrink-0 w-52 bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className={cn('h-1.5 bg-gradient-to-r', s.topColor)} />
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{s.emoji}</span>
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', s.badgeColor)}>
                      {s.badge}
                    </span>
                  </div>
                  <button
                    onClick={() => setDismissed((p) => new Set([...p, s.id]))}
                    className="text-gray-300 hover:text-gray-500 -mt-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Person */}
                <div className="flex items-center gap-2 mb-2">
                  <UserAvatar src={null} name={s.matchName} className="h-7 w-7" textClassName="text-xs" />
                  <div>
                    <p className="text-xs text-gray-400">{s.action}</p>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{s.matchName}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-snug mb-3">{s.detail}</p>

                <div className="space-y-0.5 mb-4">
                  <p className="text-xs text-gray-600 font-medium">📅 {s.when}</p>
                  <p className="text-xs text-gray-500">📍 {s.place}</p>
                </div>

                {/* CTA — opens modal directly */}
                <button
                  onClick={() => setActiveModal(s)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold transition-all"
                >
                  <span>Open a Slot</span>
                  <span className="text-orange-200">›</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slot invite modal — tied to specific suggestion */}
      {activeModal && (
        <SlotInviteModal
          suggestion={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}

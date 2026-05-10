'use client'

import { useState } from 'react'
import { Plus, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const SLOT_ACTIVITIES = [
  { emoji: '🎾', label: 'Tennis' },   { emoji: '⚽', label: 'Soccer' },
  { emoji: '🏀', label: 'Basketball'},{ emoji: '🏃', label: 'Running' },
  { emoji: '🧘', label: 'Yoga' },     { emoji: '🚴', label: 'Cycling' },
  { emoji: '🏊', label: 'Swimming' }, { emoji: '🥾', label: 'Hiking' },
  { emoji: '☕', label: 'Coffee' },   { emoji: '🍕', label: 'Lunch' },
  { emoji: '🎲', label: 'Games' },    { emoji: '📷', label: 'Photography' },
]

type Level = 'All Welcome' | 'Beginner' | 'Intermediate' | 'Pro'
const LEVELS: Level[] = ['All Welcome', 'Beginner', 'Intermediate', 'Pro']
const TIMES = ['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','10:00 AM','11:00 AM',
  '12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','5:30 PM',
  '6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM']

interface CreateSlotFabProps {
  prefilledActivity?: { emoji: string; label: string }
}

export function CreateSlotFab({ prefilledActivity }: CreateSlotFabProps) {
  const [open, setOpen]         = useState(false)
  const [done, setDone]         = useState(false)
  const [picked, setPicked]     = useState<{ emoji: string; label: string } | null>(prefilledActivity ?? null)
  const [level, setLevel]       = useState<Level>('All Welcome')
  const [date, setDate]         = useState('')
  const [time, setTime]         = useState('6:00 PM')
  const [location, setLocation] = useState('')
  const [spots, setSpots]       = useState(1)
  const [notes, setNotes]       = useState('')

  const canSubmit = picked && date && location

  function handleCreate() {
    if (!canSubmit) return
    setDone(true)
    setTimeout(() => {
      setOpen(false)
      setDone(false)
      // reset
      setPicked(prefilledActivity ?? null)
      setLevel('All Welcome')
      setDate('')
      setTime('6:00 PM')
      setLocation('')
      setSpots(1)
      setNotes('')
    }, 1800)
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl shadow-xl font-semibold text-sm transition-all"
      >
        <Plus className="h-4 w-4" />
        Open a Slot
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setOpen(false)}>
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
              /* Success state */
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Slot is Live!</h2>
                <p className="text-sm text-gray-500">Your teammates can now catch your <strong>{picked?.label}</strong> slot</p>
              </div>
            ) : (
              <div className="px-5 pb-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Open a Slot</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Let teammates join your activity</p>
                  </div>
                  <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Activity picker */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">What activity?</p>
                  <div className="grid grid-cols-4 gap-2">
                    {SLOT_ACTIVITIES.map((a) => (
                      <button key={a.label} onClick={() => setPicked(a)}
                        className={cn('flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all',
                          picked?.label === a.label
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50/50')}>
                        <span className="text-xl">{a.emoji}</span>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Your level</p>
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
                  <p className="text-sm font-semibold text-gray-700 mb-3">Spots available <span className="text-gray-400 font-normal">(besides you)</span></p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setSpots(n)}
                        className={cn('w-11 h-11 rounded-xl border text-sm font-bold transition-all',
                          spots === n ? 'border-orange-500 bg-orange-500 text-white shadow-sm' : 'border-gray-200 text-gray-700 hover:border-orange-300')}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Notes <span className="text-gray-400 font-normal">(optional)</span></p>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. bring water, rackets available…"
                    rows={2}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
                </div>

                {/* Submit */}
                <button onClick={handleCreate} disabled={!canSubmit}
                  className={cn('w-full py-3.5 rounded-2xl font-semibold text-sm transition-all',
                    canSubmit
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm active:scale-[0.98]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed')}>
                  {canSubmit ? `🎯 Open Slot — ${picked!.emoji} ${picked!.label}` : 'Pick activity, date & location'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

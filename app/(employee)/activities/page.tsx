'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, Calendar, Users, X, Plus, ChevronDown } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type EventFilter = 'All' | 'Sport' | 'Social' | 'Workshop' | 'Tournament'
type Level = 'All Welcome' | 'Beginner' | 'Intermediate' | 'Pro'

// ─── Data: Company Events ─────────────────────────────────────────────────────

const EVENT_EMOJI: Record<string, string> = { SPORT: '🏃', SOCIAL: '🥂', WORKSHOP: '🛠️', TOURNAMENT: '🏆' }
const EVENT_COLORS: Record<string, string> = {
  SPORT: 'bg-green-100 text-green-700',
  SOCIAL: 'bg-blue-100 text-blue-700',
  WORKSHOP: 'bg-purple-100 text-purple-700',
  TOURNAMENT: 'bg-orange-100 text-orange-700',
}
const EVENT_BAR: Record<string, string> = {
  SPORT: 'bg-green-400', SOCIAL: 'bg-blue-400',
  WORKSHOP: 'bg-purple-400', TOURNAMENT: 'bg-orange-400',
}

const EVENTS = [
  { id: '1', title: '5-a-Side Soccer Match', type: 'SPORT', description: 'Friendly match in the park. All levels welcome — just bring energy!', date: new Date(Date.now() + 3 * 86400000), location: 'Riverside Park, Field 3', maxSlots: 10, rsvpCount: 5, coinsReward: 120, isGoing: false },
  { id: '2', title: 'Tennis Tournament', type: 'SPORT', description: 'Doubles tournament. Mixed levels, fun atmosphere, prizes for winners!', date: new Date(Date.now() + 5 * 86400000), location: 'Central Park Tennis Courts', maxSlots: 16, rsvpCount: 9, coinsReward: 150, isGoing: true },
  { id: '3', title: 'After-Work Drinks', type: 'SOCIAL', description: 'End the week right — drinks, snacks and good vibes.', date: new Date(Date.now() + 4 * 86400000), location: 'The Rooftop Bar, Downtown', maxSlots: 30, rsvpCount: 17, coinsReward: 50, isGoing: false },
  { id: '4', title: 'Morning Yoga & Mindfulness', type: 'SPORT', description: 'Relaxing session led by a certified instructor.', date: new Date(Date.now() + 8 * 86400000), location: 'Rooftop Garden, Office', maxSlots: 15, rsvpCount: 4, coinsReward: 75, isGoing: false },
  { id: '5', title: 'Weekend Cycling Ride', type: 'SPORT', description: '25km scenic route along the river. Bikes available nearby. Brunch after!', date: new Date(Date.now() + 9 * 86400000), location: 'Hudson River Greenway', maxSlots: 20, rsvpCount: 3, coinsReward: 100, isGoing: false },
  { id: '6', title: 'Board Games Night', type: 'SOCIAL', description: 'Monthly board game night. Catan, Codenames, and more!', date: new Date(Date.now() + 11 * 86400000), location: 'The Game Lounge, Brooklyn', maxSlots: 12, rsvpCount: 3, coinsReward: 60, isGoing: false },
  { id: '7', title: 'Team Cooking Class', type: 'SOCIAL', description: 'Learn authentic Italian pasta from a professional chef. Dinner included!', date: new Date(Date.now() + 14 * 86400000), location: "Williams Kitchen Studio", maxSlots: 12, rsvpCount: 3, coinsReward: 80, isGoing: false },
  { id: '8', title: 'Design Thinking Workshop', type: 'WORKSHOP', description: 'Cross-functional workshop to solve real company challenges.', date: new Date(Date.now() + 18 * 86400000), location: 'Conference Room A', maxSlots: 20, rsvpCount: 0, coinsReward: 50, isGoing: false },
]

// ─── Data: Peer Slots ─────────────────────────────────────────────────────────

interface Slot {
  id: string; creatorName: string; emoji: string; title: string
  level: Level; date: string; time: string; location: string
  spotsTotal: number; spotsTaken: number; notes?: string; tag: string
}

const INITIAL_SLOTS: Slot[] = [
  { id: '1', creatorName: 'Sarah Chen',   emoji: '🎾', title: 'Tennis — doubles partner needed', level: 'Intermediate',  date: 'Fri Apr 25', time: '6:00 PM', location: 'Central Park Court 4', spotsTotal: 1, spotsTaken: 0, tag: 'Sport' },
  { id: '2', creatorName: 'Omar Hassan',  emoji: '🏃', title: 'Morning run — all paces welcome',  level: 'All Welcome',   date: 'Sat Apr 26', time: '7:30 AM', location: 'Riverside Park entrance', spotsTotal: 3, spotsTaken: 1, notes: 'Bring water!', tag: 'Sport' },
  { id: '3', creatorName: 'Yael Cohen',   emoji: '🧘', title: 'Yoga session in the park',         level: 'Beginner',      date: 'Sun Apr 27', time: '9:00 AM', location: 'Riverside Park, meadow', spotsTotal: 4, spotsTaken: 2, tag: 'Wellness' },
  { id: '4', creatorName: 'James Wilson', emoji: '🎲', title: 'Board games night — need players',  level: 'All Welcome',   date: 'Fri Apr 25', time: '7:30 PM', location: 'James\'s place, Brooklyn', spotsTotal: 3, spotsTaken: 0, notes: 'I have Catan, Codenames & Ticket to Ride', tag: 'Social' },
  { id: '5', creatorName: 'Nina Brandt',  emoji: '🚴', title: 'Casual Sunday cycling ride',        level: 'Beginner',      date: 'Sun Apr 27', time: '8:00 AM', location: 'Hudson River Greenway', spotsTotal: 4, spotsTaken: 1, notes: 'Around 20km, easy pace. Bikes can be rented nearby.', tag: 'Sport' },
]

// ─── Slot activity picker data ────────────────────────────────────────────────

const SLOT_ACTIVITIES = [
  { emoji: '🎾', label: 'Tennis' },   { emoji: '⚽', label: 'Soccer' },
  { emoji: '🏀', label: 'Basketball'},{ emoji: '🏃', label: 'Running' },
  { emoji: '🧘', label: 'Yoga' },     { emoji: '🚴', label: 'Cycling' },
  { emoji: '🏊', label: 'Swimming' }, { emoji: '🥾', label: 'Hiking' },
  { emoji: '☕', label: 'Coffee' },   { emoji: '🍕', label: 'Lunch' },
  { emoji: '🎲', label: 'Games' },    { emoji: '📷', label: 'Photography' },
]

const LEVELS: Level[] = ['All Welcome', 'Beginner', 'Intermediate', 'Pro']
const LEVEL_COLORS: Record<Level, string> = {
  'All Welcome': 'bg-gray-100 text-gray-700',
  'Beginner': 'bg-blue-100 text-blue-700',
  'Intermediate': 'bg-orange-100 text-orange-700',
  'Pro': 'bg-red-100 text-red-700',
}
const TIMES = ['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function daysLabel(date: Date) {
  const d = Math.ceil((date.getTime() - Date.now()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Tomorrow'
  return `In ${d} days`
}

// ─── Create Slot Modal ────────────────────────────────────────────────────────

function CreateSlotModal({ onClose, onCreate }: { onClose: () => void; onCreate: (slot: Slot) => void }) {
  const [picked, setPicked]     = useState<{ emoji: string; label: string } | null>(null)
  const [level, setLevel]       = useState<Level>('All Welcome')
  const [date, setDate]         = useState('')
  const [time, setTime]         = useState('6:00 PM')
  const [location, setLocation] = useState('')
  const [spots, setSpots]       = useState(1)
  const [notes, setNotes]       = useState('')

  const canSubmit = picked && date && location

  function handleCreate() {
    if (!picked || !date || !location) return
    const slot: Slot = {
      id: Date.now().toString(),
      creatorName: 'You',
      emoji: picked.emoji,
      title: `${picked.label} — ${level === 'All Welcome' ? 'all levels' : level.toLowerCase()}`,
      level,
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time,
      location,
      spotsTotal: spots,
      spotsTaken: 0,
      notes: notes.trim() || undefined,
      tag: ['Tennis','Soccer','Basketball','Running','Yoga','Cycling','Swimming','Hiking'].includes(picked.label) ? 'Sport' :
           ['Coffee','Lunch'].includes(picked.label) ? 'Social' : 'Sport',
    }
    onCreate(slot)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 pb-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Open a Slot</h2>
              <p className="text-sm text-gray-500 mt-0.5">Let teammates catch your slot</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Activity picker */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">What activity?</p>
            <div className="grid grid-cols-4 gap-2">
              {SLOT_ACTIVITIES.map((a) => (
                <button
                  key={a.label}
                  onClick={() => setPicked(a)}
                  className={cn(
                    'flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all',
                    picked?.label === a.label
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 text-gray-600 hover:border-orange-200'
                  )}
                >
                  <span className="text-xl">{a.emoji}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Level</p>
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                    level === l ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Date</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Time</p>
              <div className="relative">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300 appearance-none bg-white"
                >
                  {TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Location</p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Central Park Court 4"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Spots */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Spots available (besides you)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setSpots(n)}
                  className={cn(
                    'w-10 h-10 rounded-xl border text-sm font-bold transition-all',
                    spots === n ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 text-gray-700'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Notes <span className="text-gray-400 font-normal">(optional)</span></p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. bring water, rackets available, etc."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleCreate}
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-sm transition-all"
          >
            {canSubmit ? `🎯 Open Slot — ${picked!.emoji} ${picked!.label}` : 'Select activity, date & location'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Slot Card ────────────────────────────────────────────────────────────────

function SlotCard({ slot, onCatch }: { slot: Slot; onCatch: (id: string) => void }) {
  const caught = slot.spotsTaken >= slot.spotsTotal
  const spotsLeft = slot.spotsTotal - slot.spotsTaken

  return (
    <div className={cn('bg-white rounded-2xl border shadow-sm p-4', caught && 'opacity-60')}>
      <div className="flex items-start gap-3">
        {/* Creator */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <UserAvatar src={null} name={slot.creatorName} className="h-10 w-10" textClassName="text-sm" />
          <span className="text-2xl">{slot.emoji}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-sm text-gray-900 leading-tight">{slot.title}</p>
            <span className={cn('flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium', LEVEL_COLORS[slot.level])}>
              {slot.level}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">by {slot.creatorName}</p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            <span className="text-xs text-gray-600">📅 {slot.date} · {slot.time}</span>
            <span className="text-xs text-gray-600">📍 {slot.location}</span>
          </div>

          {slot.notes && (
            <p className="text-xs text-gray-400 mt-1.5 italic leading-snug">&quot;{slot.notes}&quot;</p>
          )}

          <div className="flex items-center justify-between mt-3">
            <span className={cn('text-xs font-semibold', caught ? 'text-gray-400' : 'text-orange-600')}>
              {caught ? 'Full' : `${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left`}
            </span>
            <button
              onClick={() => !caught && onCatch(slot.id)}
              disabled={caught}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs font-semibold transition-all',
                caught
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              )}
            >
              {caught ? 'Full' : 'Catch this Slot →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function ActivitiesContent() {
  const searchParams = useSearchParams()
  const [tab, setTab]         = useState<'events' | 'slots'>(
    searchParams.get('tab') === 'slots' ? 'slots' : 'events'
  )
  const [filter, setFilter]   = useState<EventFilter>('All')
  const [rsvps, setRsvps]     = useState<Record<string, boolean>>(
    Object.fromEntries(EVENTS.map((a) => [a.id, a.isGoing]))
  )
  const [slots, setSlots]     = useState<Slot[]>(INITIAL_SLOTS)
  const [caught, setCaught]   = useState<Set<string>>(new Set())
  const [showModal, setModal] = useState(false)

  const filteredEvents = EVENTS.filter((a) =>
    filter === 'All' ? true : a.type === filter.toUpperCase()
  )

  function catchSlot(id: string) {
    setCaught((p) => new Set([...p, id]))
    setSlots((prev) =>
      prev.map((s) => s.id === id ? { ...s, spotsTaken: s.spotsTaken + 1 } : s)
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="text-sm text-gray-500 mt-1">Join events and open slots with your teammates</p>
        </div>

        {/* Main tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-5">
          {(['events', 'slots'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-2 rounded-xl text-sm font-semibold transition-all',
                tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              )}
            >
              {t === 'events' ? '🏢 Company Events' : '🎯 Open Slots'}
            </button>
          ))}
        </div>

        {/* ── EVENTS TAB ─────────────────────────────────────── */}
        {tab === 'events' && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {(['All', 'Sport', 'Social', 'Workshop', 'Tournament'] as EventFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                    filter === f
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-4">{filteredEvents.length} upcoming events</p>

            <div className="space-y-4">
              {filteredEvents.map((ev) => {
                const spotsLeft = ev.maxSlots - ev.rsvpCount
                const fillPct   = Math.round((ev.rsvpCount / ev.maxSlots) * 100)
                const isGoing   = rsvps[ev.id]
                return (
                  <div key={ev.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                    <div className={cn('h-1', EVENT_BAR[ev.type])} />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{EVENT_EMOJI[ev.type]}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 leading-tight">{ev.title}</h3>
                            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', EVENT_COLORS[ev.type])}>
                              {ev.type.charAt(0) + ev.type.slice(1).toLowerCase()}
                            </span>
                          </div>
                        </div>
                        <span className="flex-shrink-0 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                          {daysLabel(ev.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{ev.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar className="h-3.5 w-3.5" />{fmt(ev.date)}</span>
                        {ev.location && <span className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin className="h-3.5 w-3.5" />{ev.location}</span>}
                        <span className="flex items-center gap-1.5 text-xs text-gray-500"><Users className="h-3.5 w-3.5" />{spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}</span>
                        <span className="text-xs text-orange-600 font-medium">🪙 +{ev.coinsReward}</span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{ev.rsvpCount} going</span>
                          <span>{ev.maxSlots} max</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={cn('h-full rounded-full', fillPct >= 80 ? 'bg-green-400' : 'bg-orange-400')} style={{ width: `${fillPct}%` }} />
                        </div>
                      </div>
                      <button
                        onClick={() => setRsvps((p) => ({ ...p, [ev.id]: !p[ev.id] }))}
                        disabled={!isGoing && spotsLeft === 0}
                        className={cn(
                          'w-full py-2.5 rounded-xl text-sm font-semibold transition-all',
                          isGoing ? 'bg-green-50 text-green-700 border border-green-200' :
                          spotsLeft === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                          'bg-orange-500 text-white hover:bg-orange-600'
                        )}
                      >
                        {isGoing ? '✓ Going — tap to cancel' : spotsLeft === 0 ? 'Activity Full' : "RSVP — I'm in!"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* ── SLOTS TAB ──────────────────────────────────────── */}
        {tab === 'slots' && (
          <>
            {/* Caught slots banner */}
            {caught.size > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 mb-4 text-sm text-green-700 font-medium">
                🎉 You caught {caught.size} slot{caught.size > 1 ? 's' : ''}! The organiser will reach out soon.
              </div>
            )}

            <div className="space-y-3">
              {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} onCatch={catchSlot} />
              ))}
              {slots.length === 0 && (
                <div className="bg-white rounded-2xl border p-10 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <p className="font-medium text-gray-700">No open slots yet</p>
                  <p className="text-sm text-gray-500 mt-1">Be the first to open one!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Floating "Open a Slot" button — always visible */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg font-semibold text-sm transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Open a Slot
        </button>
      </div>

      {/* Create Slot Modal */}
      {showModal && (
        <CreateSlotModal
          onClose={() => setModal(false)}
          onCreate={(slot) => setSlots((p) => [slot, ...p])}
        />
      )}
    </div>
  )
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={null}>
      <ActivitiesContent />
    </Suspense>
  )
}

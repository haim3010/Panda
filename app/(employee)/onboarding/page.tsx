'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { PandaLogo } from '@/components/PandaLogo'
import { cn } from '@/lib/utils'
import { ChevronRight, ChevronLeft, Check, Upload } from 'lucide-react'

// Hobby data
const HOBBY_CATEGORIES = [
  {
    name: 'Sports',
    hobbies: [
      { label: 'Tennis', emoji: '🎾' },
      { label: 'Football', emoji: '⚽' },
      { label: 'Basketball', emoji: '🏀' },
      { label: 'Yoga', emoji: '🧘' },
      { label: 'Running', emoji: '🏃' },
      { label: 'Cycling', emoji: '🚴' },
      { label: 'Swimming', emoji: '🏊' },
      { label: 'Hiking', emoji: '🥾' },
      { label: 'Climbing', emoji: '🧗' },
    ],
  },
  {
    name: 'Social',
    hobbies: [
      { label: 'Cooking', emoji: '🍳' },
      { label: 'Wine', emoji: '🍷' },
      { label: 'Board Games', emoji: '🎲' },
      { label: 'Photography', emoji: '📷' },
      { label: 'Travel', emoji: '✈️' },
      { label: 'Music', emoji: '🎵' },
      { label: 'Reading', emoji: '📚' },
    ],
  },
  {
    name: 'Creative',
    hobbies: [
      { label: 'Art', emoji: '🎨' },
      { label: 'Design', emoji: '✏️' },
      { label: 'Writing', emoji: '📝' },
      { label: 'Gaming', emoji: '🎮' },
    ],
  },
]

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'R&D', 'Operations', 'Other']

const ACTIVITY_INTERESTS = ['Sports tournaments', 'Workshops', 'Team dinners', 'Coffee chats', 'After-work drinks']

interface FormData {
  name: string
  jobTitle: string
  department: string
  location: string
  hobbies: string[]
  connectionPreference: string
  frequency: string
  activityInterests: string[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [customHobby, setCustomHobby] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: user?.fullName ?? '',
    jobTitle: '',
    department: '',
    location: '',
    hobbies: [],
    connectionPreference: 'both',
    frequency: 'weekly',
    activityInterests: [],
  })

  const totalSteps = 4
  const progress = ((step - 1) / (totalSteps - 1)) * 100

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function toggleHobby(hobby: string) {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter((h) => h !== hobby)
        : [...prev.hobbies, hobby],
    }))
  }

  function toggleActivity(interest: string) {
    setFormData((prev) => ({
      ...prev,
      activityInterests: prev.activityInterests.includes(interest)
        ? prev.activityInterests.filter((i) => i !== interest)
        : [...prev.activityInterests, interest],
    }))
  }

  function addCustomHobby() {
    if (customHobby.trim() && !formData.hobbies.includes(customHobby.trim())) {
      setFormData((prev) => ({ ...prev, hobbies: [...prev.hobbies, customHobby.trim()] }))
      setCustomHobby('')
    }
  }

  async function handleComplete() {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!res.ok || json.error) throw new Error(json.error ?? 'Something went wrong')
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const allPredefinedHobbies = HOBBY_CATEGORIES.flatMap((c) => c.hobbies.map((h) => h.label))
  const customHobbies = formData.hobbies.filter((h) => !allPredefinedHobbies.includes(h))

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <PandaLogo size="sm" />
          <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {['Basic Info', 'Hobbies', 'Preferences', 'All Set!'].map((label, i) => (
              <span
                key={label}
                className={cn(
                  'text-xs font-medium',
                  step > i + 1 ? 'text-orange-600' : step === i + 1 ? 'text-gray-900' : 'text-gray-400'
                )}
              >
                {step > i + 1 ? '✓ ' : ''}{label}
              </span>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome to Panda! 🐼</h2>
              <p className="text-gray-500 mb-6">Let&apos;s set up your profile so we can find your perfect matches.</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Jane Smith"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setField('jobTitle', e.target.value)}
                    placeholder="Senior Engineer"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    id="department"
                    value={formData.department}
                    onChange={(e) => setField('department', e.target.value)}
                    className="mt-1"
                  >
                    <option value="">Select department...</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Office Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setField('location', e.target.value)}
                    placeholder="New York, NY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Profile Photo</Label>
                  <label className="mt-1 flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-colors">
                    <div className="flex flex-col items-center gap-1 text-gray-400">
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Upload photo (optional)</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Your Hobbies & Interests</h2>
              <p className="text-gray-500 mb-2">Select at least 3 hobbies to help us find your matches.</p>
              <p className="text-sm font-medium text-orange-600 mb-6">
                {formData.hobbies.length} selected{' '}
                {formData.hobbies.length < 3
                  ? `(${3 - formData.hobbies.length} more needed)`
                  : '✓'}
              </p>

              {HOBBY_CATEGORIES.map((category) => (
                <div key={category.name} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.hobbies.map(({ label, emoji }) => (
                      <button
                        key={label}
                        onClick={() => toggleHobby(label)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                          formData.hobbies.includes(label)
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                        )}
                      >
                        <span>{emoji}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom hobby */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Custom</h3>
                <div className="flex gap-2">
                  <Input
                    value={customHobby}
                    onChange={(e) => setCustomHobby(e.target.value)}
                    placeholder="Add your own hobby..."
                    onKeyDown={(e) => e.key === 'Enter' && addCustomHobby()}
                  />
                  <Button variant="outline" onClick={addCustomHobby} disabled={!customHobby.trim()}>
                    Add
                  </Button>
                </div>
                {customHobbies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customHobbies.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-orange-500 text-white"
                      >
                        {h}
                        <button
                          onClick={() => toggleHobby(h)}
                          className="ml-1 hover:text-orange-200"
                          aria-label={`Remove ${h}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Social Preferences</h2>
              <p className="text-gray-500 mb-6">How would you like to connect with your colleagues?</p>

              <div className="space-y-8">
                <div>
                  <Label className="text-base font-semibold">How do you prefer to connect?</Label>
                  <div className="flex gap-3 mt-3">
                    {[
                      { value: 'in-person', label: 'In-person', emoji: '🤝' },
                      { value: 'online', label: 'Online', emoji: '💻' },
                      { value: 'both', label: 'Both', emoji: '⚡' },
                    ].map(({ value, label, emoji }) => (
                      <button
                        key={value}
                        onClick={() => setField('connectionPreference', value)}
                        className={cn(
                          'flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all',
                          formData.connectionPreference === value
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        <span className="text-2xl">{emoji}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">How often?</Label>
                  <div className="flex gap-3 mt-3">
                    {[
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'bi-weekly', label: 'Bi-weekly' },
                      { value: 'monthly', label: 'Monthly' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setField('frequency', value)}
                        className={cn(
                          'flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                          formData.frequency === value
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Interested in:</Label>
                  <div className="mt-3 space-y-2">
                    {ACTIVITY_INTERESTS.map((interest) => (
                      <label key={interest} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => toggleActivity(interest)}
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer',
                            formData.activityInterests.includes(interest)
                              ? 'bg-orange-500 border-orange-500'
                              : 'border-gray-300 group-hover:border-orange-300'
                          )}
                        >
                          {formData.activityInterests.includes(interest) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">
                You&apos;re all set, {formData.name.split(' ')[0]}!
              </h2>
              <p className="text-gray-500 mb-8">Here&apos;s your profile preview. Ready to meet your teammates?</p>

              {/* Profile card preview */}
              <div className="max-w-xs mx-auto bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 mb-8 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {formData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{formData.name || 'Your Name'}</p>
                    <p className="text-sm text-gray-600">{formData.jobTitle || 'Your Title'}</p>
                    <p className="text-xs text-gray-500">
                      {formData.department} · {formData.location}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">HOBBIES</p>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.hobbies.slice(0, 6).map((h) => (
                      <span key={h} className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                        {h}
                      </span>
                    ))}
                    {formData.hobbies.length > 6 && (
                      <span className="px-2 py-0.5 bg-orange-200 text-orange-700 text-xs rounded-full">
                        +{formData.hobbies.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="w-full max-w-xs bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 text-center">
                  {errorMsg}
                </div>
              )}

              <Button
                onClick={handleComplete}
                disabled={loading}
                className="w-full max-w-xs h-12 text-base bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Setting up your profile…
                  </span>
                ) : 'Join Panda 🐼'}
              </Button>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 2 && formData.hobbies.length < 3}
                className="gap-2 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          {step === 4 && (
            <div className="flex justify-start mt-4">
              <Button variant="ghost" onClick={() => setStep(3)} className="gap-2 text-gray-500">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

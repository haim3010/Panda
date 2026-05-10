'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RsvpButtonProps {
  activityId: string
  isGoing: boolean
}

export function RsvpButton({ activityId, isGoing: initialIsGoing }: RsvpButtonProps) {
  const [isGoing, setIsGoing] = useState(initialIsGoing)
  const [loading, setLoading] = useState(false)

  async function handleRsvp() {
    setLoading(true)
    try {
      const res = await fetch('/api/activities/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId, status: isGoing ? 'NOT_GOING' : 'GOING' }),
      })
      if (res.ok) setIsGoing(!isGoing)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant={isGoing ? 'outline' : 'default'}
      className={cn(
        'h-8 text-xs flex-shrink-0',
        !isGoing && 'bg-orange-500 hover:bg-orange-600 text-white'
      )}
      onClick={handleRsvp}
      disabled={loading}
    >
      {isGoing ? 'Going ✓' : 'RSVP'}
    </Button>
  )
}

export type { User, Company, Match, Activity, Rsvp, Message, Badge, HrReport } from '@prisma/client'

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface MatchWithUser {
  id: string
  score: number
  status: string
  user: {
    id: string
    name: string
    avatar: string | null
    jobTitle: string | null
    department: string | null
    hobbies: string[]
    coins: number
    level: string
  }
  sharedHobbies: number
}

export interface ActivityWithRsvps {
  id: string
  title: string
  type: string
  description: string | null
  date: Date
  location: string | null
  maxSlots: number
  coinsReward: number
  rsvpCount: number
  isGoing: boolean
}

export interface HrStats {
  totalEmployees: number
  activeThisWeek: number
  activitiesThisMonth: number
  avgEngagementPct: number
}

export interface EmployeeWithEngagement {
  id: string
  name: string
  avatar: string | null
  department: string | null
  level: string
  coins: number
  lastActive: Date
  engagementScore: number
  status: 'active' | 'at_risk' | 'inactive'
}

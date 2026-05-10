import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Users, Activity, TrendingUp, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EngagementChart } from '@/components/hr/EngagementChart'
import { EmployeeTable, type EmployeeRow } from '@/components/hr/EmployeeTable'
import { cn, formatDate } from '@/lib/utils'

const MOCK_STATS = {
  totalEmployees: 47,
  activeThisWeek: 32,
  activitiesThisMonth: 8,
  avgEngagementPct: 68,
}

const MOCK_EMPLOYEES: EmployeeRow[] = [
  { id: '1', name: 'Sarah Chen', avatar: null, department: 'Design', level: 'GOLD', coins: 1240, lastActive: new Date(Date.now() - 2 * 3600000).toISOString(), engagementScore: 92, status: 'active' },
  { id: '2', name: 'James Wilson', avatar: null, department: 'Engineering', level: 'GOLD', coins: 980, lastActive: new Date(Date.now() - 1 * 86400000).toISOString(), engagementScore: 85, status: 'active' },
  { id: '3', name: 'Mia Patel', avatar: null, department: 'Marketing', level: 'BEGINNER', coins: 620, lastActive: new Date(Date.now() - 3 * 86400000).toISOString(), engagementScore: 71, status: 'active' },
  { id: '4', name: 'Tom Baker', avatar: null, department: 'R&D', level: 'BEGINNER', coins: 450, lastActive: new Date(Date.now() - 10 * 86400000).toISOString(), engagementScore: 45, status: 'at_risk' },
  { id: '5', name: 'Ana Lima', avatar: null, department: 'Sales', level: 'NEWBIE', coins: 120, lastActive: new Date(Date.now() - 25 * 86400000).toISOString(), engagementScore: 22, status: 'at_risk' },
  { id: '6', name: 'Chris Park', avatar: null, department: 'Engineering', level: 'DIAMOND', coins: 2100, lastActive: new Date(Date.now() - 86400000).toISOString(), engagementScore: 98, status: 'active' },
  { id: '7', name: 'Lisa Johnson', avatar: null, department: 'Product', level: 'GOLD', coins: 890, lastActive: new Date(Date.now() - 4 * 86400000).toISOString(), engagementScore: 62, status: 'active' },
  { id: '8', name: 'David Kim', avatar: null, department: 'Operations', level: 'NEWBIE', coins: 50, lastActive: new Date(Date.now() - 35 * 86400000).toISOString(), engagementScore: 8, status: 'inactive' },
]

const MOCK_ACTIVITIES = [
  { id: '1', title: 'Friday Tennis Tournament', type: 'SPORT', date: new Date('2026-04-11T17:00:00'), rsvpCount: 12, maxSlots: 16 },
  { id: '2', title: 'Team Cooking Class', type: 'SOCIAL', date: new Date('2026-04-14T18:30:00'), rsvpCount: 8, maxSlots: 12 },
  { id: '3', title: 'Design Thinking Workshop', type: 'WORKSHOP', date: new Date('2026-04-17T14:00:00'), rsvpCount: 5, maxSlots: 20 },
  { id: '4', title: 'After-Work Board Games', type: 'SOCIAL', date: new Date('2026-04-18T19:00:00'), rsvpCount: 7, maxSlots: 10 },
]

const ACTIVITY_TYPE_COLORS: Record<string, string> = {
  SPORT: 'bg-green-100 text-green-700',
  SOCIAL: 'bg-blue-100 text-blue-700',
  WORKSHOP: 'bg-purple-100 text-purple-700',
  TOURNAMENT: 'bg-orange-100 text-orange-700',
}

async function getHrData() {
  try {
    const { prisma } = await import('@/lib/prisma')
    // Would compute real stats here
    // For now return null to use mock data
    return null
  } catch {
    return null
  }
}

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: string
}

function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className="p-2 bg-orange-50 rounded-lg text-orange-600">{icon}</div>
        </div>
        {trend && (
          <p className="text-xs text-green-600 mt-3 font-medium">↑ {trend}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default async function HrOverviewPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  // In production: check role === HR_ADMIN
  await getHrData()

  const stats = MOCK_STATS
  const employees = MOCK_EMPLOYEES
  const activities = MOCK_ACTIVITIES

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Engagement Overview</h1>
        <p className="text-gray-500 text-sm mt-1">TechCorp · April 2026</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          subtitle="Registered users"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Active This Week"
          value={stats.activeThisWeek}
          subtitle={`${Math.round((stats.activeThisWeek / stats.totalEmployees) * 100)}% of team`}
          icon={<UserCheck className="h-5 w-5" />}
          trend="12% vs last week"
        />
        <StatCard
          title="Activities This Month"
          value={stats.activitiesThisMonth}
          subtitle="Events scheduled"
          icon={<Activity className="h-5 w-5" />}
          trend="3 more than last month"
        />
        <StatCard
          title="Avg Engagement"
          value={`${stats.avgEngagementPct}%`}
          subtitle="Based on activity & matches"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="5pts improvement"
        />
      </div>

      {/* Engagement chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Weekly Engagement — Last 8 Weeks</CardTitle>
        </CardHeader>
        <CardContent>
          <EngagementChart />
        </CardContent>
      </Card>

      {/* Employee table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Employee Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeTable employees={employees} />
        </CardContent>
      </Card>

      {/* Activity summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">This Month&apos;s Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity) => {
              const fillRate = Math.round((activity.rsvpCount / activity.maxSlots) * 100)
              return (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{activity.title}</span>
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', ACTIVITY_TYPE_COLORS[activity.type] ?? 'bg-gray-100 text-gray-600')}>
                        {activity.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all', fillRate >= 80 ? 'bg-green-500' : 'bg-orange-400')}
                          style={{ width: `${fillRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {activity.rsvpCount}/{activity.maxSlots} ({fillRate}%)
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

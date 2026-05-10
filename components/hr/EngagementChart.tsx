'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const MOCK_CHART_DATA = [
  { week: 'Week 1', activeUsers: 24, newMatches: 8 },
  { week: 'Week 2', activeUsers: 31, newMatches: 12 },
  { week: 'Week 3', activeUsers: 28, newMatches: 10 },
  { week: 'Week 4', activeUsers: 35, newMatches: 15 },
  { week: 'Week 5', activeUsers: 42, newMatches: 18 },
  { week: 'Week 6', activeUsers: 38, newMatches: 14 },
  { week: 'Week 7', activeUsers: 45, newMatches: 20 },
  { week: 'Week 8', activeUsers: 52, newMatches: 23 },
]

interface ChartData {
  week: string
  activeUsers: number
  newMatches: number
}

interface EngagementChartProps {
  data?: ChartData[]
}

export function EngagementChart({ data = MOCK_CHART_DATA }: EngagementChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="activeUsers"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4, fill: '#3b82f6' }}
          name="Active Users"
        />
        <Line
          type="monotone"
          dataKey="newMatches"
          stroke="#f97316"
          strokeWidth={2}
          dot={{ r: 4, fill: '#f97316' }}
          name="New Matches"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

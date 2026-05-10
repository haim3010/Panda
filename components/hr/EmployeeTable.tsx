'use client'

import { useState, useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn, getInitials, getLevelColor } from '@/lib/utils'
import { Search, ArrowUpDown } from 'lucide-react'

export interface EmployeeRow {
  id: string
  name: string
  avatar: string | null
  department: string | null
  level: string
  coins: number
  lastActive: string // ISO string
  engagementScore: number
  status: 'active' | 'at_risk' | 'inactive'
}

interface EmployeeTableProps {
  employees: EmployeeRow[]
}

type SortKey = 'name' | 'coins' | 'lastActive' | 'engagementScore'

const STATUS_CONFIG = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  at_risk: { label: 'At Risk', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  inactive: { label: 'Inactive', className: 'bg-red-100 text-red-700 border-red-200' },
}

function formatLastActive(isoStr: string): string {
  const date = new Date(isoStr)
  const diffMs = Date.now() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('engagementScore')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return employees
      .filter((e) => e.name.toLowerCase().includes(q) || (e.department ?? '').toLowerCase().includes(q))
      .sort((a, b) => {
        let aVal: number | string = a[sortKey]
        let bVal: number | string = b[sortKey]
        if (sortKey === 'lastActive') {
          aVal = new Date(a.lastActive).getTime()
          bVal = new Date(b.lastActive).getTime()
        }
        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
        return 0
      })
  }, [employees, search, sortKey, sortDir])

  function SortButton({ k, label }: { k: SortKey; label: string }) {
    return (
      <button
        onClick={() => toggleSort(k)}
        className={cn(
          'flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors',
          sortKey === k && 'text-gray-900'
        )}
      >
        {label}
        <ArrowUpDown className="h-3 w-3" />
      </button>
    )
  }

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                <SortButton k="name" label="Employee" />
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Department</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Level</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                <SortButton k="coins" label="Coins" />
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">
                <SortButton k="lastActive" label="Last Active" />
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">
                <SortButton k="engagementScore" label="Engagement" />
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">No employees found</td>
              </tr>
            ) : (
              filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={emp.avatar ?? undefined} />
                        <AvatarFallback className="text-xs">{getInitials(emp.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{emp.department ?? '—'}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getLevelColor(emp.level))}>
                      {emp.level}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-orange-600">🪙 {emp.coins}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{formatLastActive(emp.lastActive)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            emp.engagementScore >= 70 ? 'bg-green-500' : emp.engagementScore >= 40 ? 'bg-yellow-500' : 'bg-red-400'
                          )}
                          style={{ width: `${emp.engagementScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{emp.engagementScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', STATUS_CONFIG[emp.status].className)}>
                      {STATUS_CONFIG[emp.status].label}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">{filtered.length} of {employees.length} employees</p>
    </div>
  )
}

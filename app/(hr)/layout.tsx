import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { PandaLogo } from '@/components/PandaLogo'
import { BarChart3, Users, FileText, Settings } from 'lucide-react'

const navItems = [
  { href: '/hr/overview', icon: BarChart3, label: 'Overview' },
  { href: '/hr/employees', icon: Users, label: 'Employees' },
  { href: '/hr/reports', icon: FileText, label: 'Reports' },
  { href: '/hr/settings', icon: Settings, label: 'Settings' },
]

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 bg-white border-r flex-col p-4 gap-6 z-30">
        <div>
          <PandaLogo size="sm" />
          <p className="text-xs text-gray-400 mt-1 ml-1">HR Dashboard</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 px-3">
          <UserButton />
          <span className="text-xs text-gray-500">Account</span>
        </div>
      </aside>
      <main className="md:ml-56">{children}</main>
    </div>
  )
}

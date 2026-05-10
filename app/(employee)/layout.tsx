'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { PandaLogo } from '@/components/PandaLogo'
import { Home, Compass, Users, Calendar, MessageCircle, Award, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard',  icon: Home,          label: 'Home'       },
  { href: '/explore',    icon: Compass,        label: 'Explore'    },
  { href: '/matches',    icon: Users,          label: 'Matches'    },
  { href: '/activities', icon: Calendar,       label: 'Activities' },
  { href: '/chat',       icon: MessageCircle,  label: 'Chat'       },
  { href: '/badges',     icon: Award,          label: 'Badges'     },
  { href: '/rewards',    icon: ShoppingBag,    label: 'Rewards'    },
]

// Mobile bottom nav: Home, Explore, Activities, Chat, Badges
const mobileNavItems = [navItems[0], navItems[1], navItems[3], navItems[4], navItems[5]]

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Onboarding is a full-screen wizard — no nav/sidebar
  if (pathname === '/onboarding') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 bg-white border-r flex-col p-4 gap-6 z-30">
        <PandaLogo size="sm" />
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2 px-3 pb-2">
          <UserButton />
          <span className="text-xs text-gray-500">Account</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-56 pb-20 md:pb-0">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around px-2 py-1 z-30">
        {mobileNavItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors',
                active ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'stroke-[2.5]')} />
              <span className={cn('text-xs', active ? 'font-semibold' : 'font-normal')}>{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

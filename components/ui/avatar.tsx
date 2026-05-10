import * as React from 'react'
import { cn } from '@/lib/utils'

// Deterministic color palette based on name — always same color for same person
const AVATAR_COLORS = [
  'bg-orange-400 text-white',
  'bg-violet-400 text-white',
  'bg-blue-400 text-white',
  'bg-emerald-400 text-white',
  'bg-pink-400 text-white',
  'bg-amber-400 text-white',
  'bg-cyan-400 text-white',
  'bg-rose-400 text-white',
]

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Smart avatar — shows image if src exists, otherwise colored initials
interface SmartAvatarProps {
  src?: string | null
  name: string
  className?: string
  textClassName?: string
}

function UserAvatar({ src, name, className, textClassName }: SmartAvatarProps) {
  const colorClass = getAvatarColor(name)
  const initials = getInitials(name)
  return (
    <div className={cn('relative flex shrink-0 overflow-hidden rounded-full', className ?? 'h-10 w-10')}>
      {src ? (
        <img src={src} alt={name} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className={cn('flex h-full w-full items-center justify-center font-semibold', colorClass, textClassName ?? 'text-sm')}>
          {initials}
        </div>
      )}
    </div>
  )
}

// Keep shadcn-compatible API for legacy usage
const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
  )
)
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt = '', src, ...props }, ref) => {
    if (!src) return null
    return <img ref={ref} src={src} className={cn('aspect-square h-full w-full object-cover', className)} alt={alt} {...props} />
  }
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { name?: string }>(
  ({ className, children, name, ...props }, ref) => {
    const colorClass = name ? getAvatarColor(name) : 'bg-orange-100 text-orange-700'
    return (
      <div
        ref={ref}
        className={cn('flex h-full w-full items-center justify-center rounded-full font-semibold text-sm', colorClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback, UserAvatar, getAvatarColor, getInitials }

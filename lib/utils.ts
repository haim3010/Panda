import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    NEWBIE: 'bg-gray-100 text-gray-700',
    BEGINNER: 'bg-blue-100 text-blue-700',
    GOLD: 'bg-yellow-100 text-yellow-700',
    DIAMOND: 'bg-purple-100 text-purple-700',
  }
  return colors[level] ?? 'bg-gray-100 text-gray-700'
}

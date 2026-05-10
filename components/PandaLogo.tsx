import { cn } from '@/lib/utils'

interface PandaLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function PandaLogo({ className, size = 'md' }: PandaLogoProps) {
  const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' }
  const textSizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl' }
  const circleSizes = { sm: 'w-8 h-8 text-base', md: 'w-10 h-10 text-lg', lg: 'w-14 h-14 text-2xl' }

  return (
    <div className={cn('flex items-center gap-2', sizes[size], className)}>
      <div className={cn('rounded-full bg-orange-500 flex items-center justify-center font-bold text-white', circleSizes[size])}>
        P
      </div>
      <span className={cn('font-bold text-gray-900', textSizes[size])}>Panda</span>
    </div>
  )
}

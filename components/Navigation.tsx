'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-1 py-2 px-6 rounded-xl nav-tab-press',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isActive
          ? 'bg-primary-soft text-primary'
          : 'text-foreground-muted hover:text-foreground hover:bg-surface'
      )}
    >
      <span className={cn(
        'transition-transform duration-200',
        isActive && 'scale-110'
      )}>
        {icon}
      </span>
      <span className={cn(
        'text-xs font-medium',
        isActive && 'font-semibold'
      )}>
        {label}
      </span>
    </button>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = pathname === '/catalog' ? 'catalog' : 'today'

  const handleNavigation = (route: string) => {
    if (route === 'today') {
      router.push('/')
    } else if (route === 'catalog') {
      router.push('/catalog')
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
      <div className="glass-strong border-t border-border-soft">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-2">
            <NavItem
              icon={<PlayIcon />}
              label="Today"
              isActive={currentTab === 'today'}
              onClick={() => handleNavigation('today')}
            />
            <NavItem
              icon={<GridIcon />}
              label="Catalog"
              isActive={currentTab === 'catalog'}
              onClick={() => handleNavigation('catalog')}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

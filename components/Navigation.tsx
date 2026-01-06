'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = pathname === '/catalog' ? 'catalog' : 'today'

  const handleTabChange = (value: string) => {
    if (value === 'today') {
      router.push('/')
    } else if (value === 'catalog') {
      router.push('/catalog')
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-inset-bottom">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <span>📺</span>
            <span>Today</span>
          </TabsTrigger>
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <span>📚</span>
            <span>Catalog</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

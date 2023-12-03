'use client'

import { usePathname } from 'next/navigation'
import CONSTANTS from '@constants'

export function usePage() {
  const pathname = usePathname()
  const page = CONSTANTS.ROUTES.find((route) => route.link.split('/')[1] === pathname.split('/')[1]) ?? CONSTANTS.ROUTES[0]

  return page
}

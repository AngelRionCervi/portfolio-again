'use client'

import { usePathname } from 'next/navigation'
import CONSTANTS from '@constants'

export function usePage() {
  const pathname = usePathname()

  const page = CONSTANTS.ROUTES.find((route) => route.link === pathname) ?? CONSTANTS.ROUTES[0]

  return page
}

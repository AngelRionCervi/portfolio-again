'use client'

import { useState, useEffect } from 'react'

export function useMounted() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

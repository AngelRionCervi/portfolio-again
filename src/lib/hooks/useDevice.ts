'use client'

import CONSTANTS from '@constants'
import { useState, useEffect } from 'react'

type Breakpoint = 'modal' | 'mobile'

export function useDevice(breakpoint: Breakpoint = 'mobile') {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const breakpointMap = {
    mobile: CONSTANTS.MOBILE_BREAKPOINT,
    modal: CONSTANTS.MODAL_FULLSCREEN_BREAKPOINT,
  }

  return windowWidth <= breakpointMap[breakpoint]
}

'use client'

import { useState, useEffect } from 'react'
import CONSTANTS from '@constants'

type Breakpoint = 'modal' | 'mobile'

const breakpointMap = {
  mobile: CONSTANTS.MOBILE_BREAKPOINT,
  modal: CONSTANTS.MODAL_FULLSCREEN_BREAKPOINT,
}

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

  return windowWidth <= breakpointMap[breakpoint]
}

'use client'

import { createContext, useEffect, useState } from 'react'
import CONSTANTS from '@constants'
import lightTheme from '@styles/themes/light.module.scss'
import darkTheme from '@styles/themes/dark.module.scss'
import { getThemeStorage, setThemeStorage } from '@lib/localStorage'

const themeMap = {
  light: { ...lightTheme },
  dark: { ...darkTheme },
}

export type ThemeType = typeof CONSTANTS.THEMES.LIGHT | typeof CONSTANTS.THEMES.DARK

export interface GetCurrentThemeReturn {
  currentTheme: ThemeType
  var: (typeof themeMap)[keyof typeof themeMap]
}

export interface ThemeContextProps {
  currentTheme: ThemeType
  changeTheme: (themeType: ThemeType) => void
  getCurrentTheme: () => GetCurrentThemeReturn | null
}

const defaultContextValues: ThemeContextProps = Object.freeze({
  currentTheme: getThemeStorage() || 'light',
  changeTheme: () => {},
  getCurrentTheme: () => null,
})

export const ThemeContext = createContext<ThemeContextProps>(defaultContextValues)

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(getThemeStorage() || 'light')

  useEffect(() => {
    const theme = themeMap[currentTheme]

    const css = document.createElement('style')
    css.appendChild(
      document.createTextNode(
        `* {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`
      )
    )
    document.head.appendChild(css)

    Object.entries(theme).forEach(([key, val]) => {
      document.documentElement.style.setProperty(`--${key}`, val)
    })

    setThemeStorage(currentTheme)

    window.getComputedStyle(css).opacity
    document.head.removeChild(css)
  }, [currentTheme])

  function changeTheme(themeType: ThemeType) {
    setCurrentTheme(themeType)
  }

  function getCurrentTheme() {
    return { currentTheme, var: { ...themeMap[currentTheme] } }
  }

  return <ThemeContext.Provider value={{ currentTheme, changeTheme, getCurrentTheme }}>{children}</ThemeContext.Provider>
}

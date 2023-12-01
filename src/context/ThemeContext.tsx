'use client'

import { createContext, useEffect, useState } from 'react'
import CONSTANTS from '@constants'
import lightTheme from '@styles/themes/light.module.scss'
import darkTheme from '@styles/themes/dark.module.scss'

const themeMap = {
  light: { ...lightTheme },
  dark: { ...darkTheme },
}

export type ThemeType = typeof CONSTANTS.THEMES.LIGHT | typeof CONSTANTS.THEMES.DARK

export interface ThemeContextProps {
  currentTheme: ThemeType
  changeTheme: (themeType: ThemeType) => void
  getCurrentTheme: () => { currentTheme: ThemeType; var: (typeof themeMap)[keyof typeof themeMap] } | null
}

const defaultContextValues: ThemeContextProps = Object.freeze({
  currentTheme: CONSTANTS.THEMES.LIGHT,
  changeTheme: () => {},
  getCurrentTheme: () => null,
})

export const ThemeContext = createContext<ThemeContextProps>(defaultContextValues)

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(CONSTANTS.THEMES.LIGHT)

  useEffect(() => {
    const theme = themeMap[currentTheme]

    console.log('theme', theme, currentTheme)

    Object.entries(theme).forEach(([key, val]) => {
      document.documentElement.style.setProperty(`--${key}`, val)
    })
  }, [currentTheme])

  function changeTheme(themeType: ThemeType) {
    setCurrentTheme(themeType)
  }

  function getCurrentTheme() {
    return { currentTheme, var: { ...themeMap[currentTheme] } }
  }

  return <ThemeContext.Provider value={{ currentTheme, changeTheme, getCurrentTheme }}>{children}</ThemeContext.Provider>
}

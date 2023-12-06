import { ThemeType } from '@context/ThemeContext'

export function setThemeStorage(theme: ThemeType) {
  if (typeof window === 'undefined') return
  localStorage.setItem('theme', theme)
}

export function getThemeStorage(): ThemeType | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('theme') as ThemeType
}

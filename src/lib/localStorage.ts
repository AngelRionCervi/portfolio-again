'use client'

import { ThemeType } from '@context/ThemeContext'

export function setThemeStorage(theme: ThemeType) {
  if (!localStorage) return
  localStorage.setItem('theme', theme)
}

export function getThemeStorage(): ThemeType | null {
  if (!localStorage) return null
  return localStorage.getItem('theme') as ThemeType
}

import { ThemeType } from '@context/ThemeContext'

export function setThemeStorage(theme: ThemeType) {
  console.log('set theme', theme)
  localStorage.setItem('theme', theme)
}

export function getThemeStorage(): ThemeType | null {
  console.log('get theme', localStorage.getItem('theme'))
  return localStorage.getItem('theme') as ThemeType
}

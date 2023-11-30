import { useEffect, useRef, useState } from 'react'
import MoonIcon from '@assets/icons/theme/moon.svg'
import ThemeSwitcherAnimation, { ThemeSwicthAnimationManager } from './ThemeSwitcherAnimation/ThemeSwitcherAnimation'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'

export type ThemeType = 'light' | 'dark'

export default function ThemeSwitcher() {
  const id = 'theme_svg'

  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')
  const animationManager = useRef(null)

  useEffect(() => {
    animationManager.current = new ThemeSwicthAnimationManager({ id })
    animationManager.current.loop()
  })

  useAfterMountEffect(() => {
    animationManager.current?.switchTheme(currentTheme)
    console.log('themeSvgEl', id, currentTheme)
  }, [currentTheme])

  return (
    <button onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}>
      <MoonIcon id={id} />
    </button>
  )
}

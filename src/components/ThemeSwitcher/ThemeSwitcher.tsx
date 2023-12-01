import { useContext, useEffect, useRef, useState } from 'react'
import MoonIcon from '@assets/icons/theme/moon.svg'
import ThemeSwicthAnimationManager from './ThemeSwitcherAnimation/ThemeSwitcherAnimation'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'
import CONSTANTS from '@constants'
import { ThemeContext, ThemeType } from '@context/ThemeContext'

export default function ThemeSwitcher() {
  const id = 'theme_svg'
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')
  const animationManager = useRef<ThemeSwicthAnimationManager | null>(null)
  const { changeTheme } = useContext(ThemeContext)

  useEffect(() => {
    animationManager.current = new ThemeSwicthAnimationManager({ id })
    animationManager.current.loop()
  }, [])

  useAfterMountEffect(() => {
    animationManager.current?.switchTheme(currentTheme)
    changeTheme(currentTheme)
  }, [currentTheme])

  return (
    <button onClick={() => setCurrentTheme(currentTheme === CONSTANTS.THEMES.LIGHT ? CONSTANTS.THEMES.DARK : CONSTANTS.THEMES.LIGHT)}>
      <MoonIcon id={id} />
    </button>
  )
}

import { useContext, useEffect, useRef } from 'react'
import MoonIcon from '@assets/icons/theme/moon.svg'
import ThemeSwicthAnimationManager from './ThemeSwitcherAnimation/ThemeSwitcherAnimation'
import CONSTANTS from '@constants'
import { ThemeContext } from '@context/ThemeContext'

export default function ThemeSwitcher() {
  const id = 'theme_svg'
  const animationManager = useRef<ThemeSwicthAnimationManager | null>(null)
  const { changeTheme, currentTheme } = useContext(ThemeContext)

  useEffect(() => {
    animationManager.current = new ThemeSwicthAnimationManager({ id })
    animationManager.current.loop()
  }, [])

  useEffect(() => {
    animationManager.current?.switchTheme(currentTheme)
    changeTheme(currentTheme)
  }, [currentTheme])

  return (
    <button onClick={() => changeTheme(currentTheme === CONSTANTS.THEMES.LIGHT ? CONSTANTS.THEMES.DARK : CONSTANTS.THEMES.LIGHT)}>
      <MoonIcon id={id} />
    </button>
  )
}

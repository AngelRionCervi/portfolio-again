'use client'

import { createContext, useState } from 'react'
import CONSTANTS from '@constants'

export interface BurgerMenuContextProps {
  isBurgerMenuOpen: boolean
  isBurgerMenuClosing: boolean
  toggleBurgerMenu: () => void
}

const defaultContextValues: BurgerMenuContextProps = Object.freeze({
  isBurgerMenuOpen: false,
  isBurgerMenuClosing: false,
  toggleBurgerMenu: () => {},
})

export const BurgerMenuContext = createContext<BurgerMenuContextProps>(defaultContextValues)

export default function BurgerMenuContextProvider({ children }: { children: React.ReactNode }) {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false)
  const [isBurgerMenuClosing, setBurgerMenuClosing] = useState(false)

  function toggleBurgerMenu() {
    if (isBurgerMenuOpen) {
      closeBurgerMenu()
    } else {
      setBurgerMenuOpen(true)
    }
  }

  function closeBurgerMenu() {
    setBurgerMenuClosing(true)

    setTimeout(() => {
      setBurgerMenuClosing(false)
      setBurgerMenuOpen(false)
      console.log('hola')
    }, CONSTANTS.BURGER_MENU_ANIMATION_DURATION)
  }

  return <BurgerMenuContext.Provider value={{ toggleBurgerMenu, isBurgerMenuOpen, isBurgerMenuClosing }}>{children}</BurgerMenuContext.Provider>
}

'use client'

import { useContext } from 'react'
import { usePathname } from 'next/navigation'
import styles from './styles.module.scss'
import CONSTANTS from '@constants'
import TopMenuMobile from '@components/TopMenuMobile/TopMenuMobile'
import BurgerMenu from '@components/BurgerMenu/BurgerMenu'
import { BurgerMenuContext } from '@context/BurgerMenuContext'
import { usePage } from '@lib/hooks/usePage'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const { isBurgerMenuOpen } = useContext(BurgerMenuContext)
  const page = usePage()

  return (
    <>
      {isBurgerMenuOpen && <BurgerMenu />}
      <div className={styles.baseLayout}>
        <div className={styles.menuContainer}>
          <TopMenuMobile title={page.name} />
        </div>
        <div className={styles.innerLayout}>{children}</div>
      </div>
    </>
  )
}

'use client'

import { useContext } from 'react'
import styles from './styles.module.scss'
import TopMenuMobile from '@components/TopMenuMobile/TopMenuMobile'
import BurgerMenu from '@components/BurgerMenu/BurgerMenu'
import { BurgerMenuContext } from '@context/BurgerMenuContext'
import { usePage } from '@lib/hooks/usePage'
import Footer from '@/components/Footer/Footer'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const { isBurgerMenuOpen } = useContext(BurgerMenuContext)
  const page = usePage()

  return (
    <>
      {isBurgerMenuOpen && <BurgerMenu />}
      <div className={styles.baseLayout}>
        <div>
          <div>
            <TopMenuMobile title={page.name} />
          </div>
          <div>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}

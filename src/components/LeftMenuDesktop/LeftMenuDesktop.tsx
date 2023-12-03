'use client'

import anime from 'animejs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './styles.module.scss'
import CONSTANTS from '@constants'
import LeftMenuAnimation from './LeftMenuAnimation/LeftMenuAnimation'

interface NavItem {
  name: string
  link: string
  pointerY: number
}

export default function LeftMenuDesktop() {
  const navPointerOffset = 15
  const navPointerSpace = 51

  const navItems = CONSTANTS.ROUTES.map((route, index) => ({ ...route, pointerY: navPointerOffset + navPointerSpace * index }))

  const pathname = usePathname()

  let curPointerY = navItems.find(({ link }) => link === pathname)?.pointerY

  function changePage({ pointerY }: NavItem) {
    anime({
      targets: `.${styles.navPointer}`,
      translateY: [curPointerY, pointerY],
      easing: 'easeOutQuad',
      duration: 250,
    })
    curPointerY = pointerY
  }

  return (
    <div className={styles.container}>
      <div>
        <LeftMenuAnimation />
        <div className={styles.navContainer}>
          <nav>
            <ul className={styles.navUl}>
              {navItems.map((item) => {
                return (
                  <li key={item.name} className={styles.navItem}>
                    <Link href={item.link} as={item.link} onClick={() => changePage(item)}>
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div>
            <div style={{ transform: `translateY(${curPointerY}px)` }} className={styles.navPointer}>
              <div className={styles.pointerRound} />
              <div className={styles.pointerBar} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.bar} />
      </div>
    </div>
  )
}

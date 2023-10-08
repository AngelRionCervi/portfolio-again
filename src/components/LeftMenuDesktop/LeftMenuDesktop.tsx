'use client'

import anime from 'animejs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './styles.module.scss'

interface NavItem {
  name: string
  link: string
  pointerY: number
}

export default function LeftMenuDesktop() {
  const navPointerOffset = 14
  const navPointerSpace = 50

  const navItems: Array<NavItem> = [
    { name: 'Home', link: '/home', pointerY: navPointerOffset },
    { name: 'Blog', link: '/blog', pointerY: navPointerOffset + navPointerSpace },
    { name: 'Work', link: '/work', pointerY: navPointerOffset + navPointerSpace * 2 },
    { name: 'About', link: '/about', pointerY: navPointerOffset + navPointerSpace * 3 },
  ]

  const pathname = usePathname()

  let curPointerY = navItems.find(({ link }) => link === pathname)?.pointerY ?? navItems[0].pointerY

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
        <div className={styles.nameContainer}>
          <p>Angel</p>
          <p>Rion-</p>
          <p>Cervi</p>
        </div>
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

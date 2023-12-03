import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { BurgerMenuContext } from '@context/BurgerMenuContext'
import { cx } from '@lib/helpers'
import CONSTANTS from '@constants'

export default function BurgerMenu() {
  const { toggleBurgerMenu, isBurgerMenuClosing, isBurgerMenuOpen } = useContext(BurgerMenuContext)

  const pathname = usePathname()

  useEffect(() => {
    document.body.classList.add('burgerMenuOpen')
  }, [isBurgerMenuOpen])

  useEffect(() => () => {
    document.body.classList.remove('burgerMenuOpen')
  })

  function switchRoute(newPath: string) {
    if (pathname === newPath) return
    toggleBurgerMenu()
  }

  const containerClass = cx(styles, {
    container: true,
    isClosing: isBurgerMenuClosing,
  })

  return (
    <div className={containerClass}>
      <div className={styles.innerContainer}>
        <nav>
          <ul className={styles.list}>
            {CONSTANTS.ROUTES.map(({ link, name, id }) => (
              <li key={id} className={styles.listItem}>
                <Link className={`${styles.link} ${link === pathname ? styles.linkCurrent : ''}`} href={link} onClick={() => switchRoute(link)}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

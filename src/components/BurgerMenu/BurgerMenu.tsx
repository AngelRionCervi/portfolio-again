import Link from 'next/link'
import { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { BurgerMenuContext } from '@context/BurgerMenuContext'
import CONSTANTS from '@constants'
import { cx } from '@lib/helpers'
import { usePage } from '@/lib/hooks/usePage'

export default function BurgerMenu() {
  const { toggleBurgerMenu, isBurgerMenuClosing, isBurgerMenuOpen } = useContext(BurgerMenuContext)
  const page = usePage()

  useEffect(() => {
    document.body.classList.add('burgerMenuOpen')
  }, [isBurgerMenuOpen])

  useEffect(() => () => {
    document.body.classList.remove('burgerMenuOpen')
  })

  function switchRoute(newPath: string) {
    if (page.link === newPath) return
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
              <li key={id} className={link === page.link ? styles.listItemCurrent : ''}>
                <Link className={`${styles.link} ${link === page.link ? styles.linkCurrent : ''}`} href={link} onClick={() => switchRoute(link)}>
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

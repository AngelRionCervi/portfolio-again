import { useContext } from 'react'
import styles from './styles.module.scss'
import BurgerMenuIcon from '@components/BurgerMenu/BurgerMenuIcon/BurgerMenuIcon'
import { BurgerMenuContext } from '@context/BurgerMenuContext'
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher'
import { useBlogPost } from '@lib/hooks/usePage'
import BackArrowMenuMobile from '@assets/icons/back-arrow-menu-mobile.svg'
import Link from 'next/link'

interface TopMenuMobileProps {
  title: string
}

export default function TopMenuMobile({ title }: TopMenuMobileProps) {
  const { toggleBurgerMenu } = useContext(BurgerMenuContext)
  const blogPost = useBlogPost()

  return (
    <>
      <button className={styles.burgerMenuButton} onClick={toggleBurgerMenu}>
        <BurgerMenuIcon />
      </button>
      <div className={styles.topMenu}>
        <div className={styles.themeSwitcherContainer}>
          <ThemeSwitcher />
        </div>
        <div className={styles.menuPage}>
          <p>{title}</p>
        </div>
        {blogPost ? (
          <div className={styles.backArrowContainer}>
            <Link className={styles.backArrowLink} href="/blog">
              <BackArrowMenuMobile />
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  )
}

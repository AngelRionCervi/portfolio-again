'use client'

import LeftMenuDesktop from '@components/LeftMenuDesktop/LeftMenuDesktop'
import styles from './styles.module.scss'
import TitlePage from '@components/TitlePage/TitlePage'
import { usePathname } from 'next/navigation'
import CONSTANTS from '@constants'
import RightPageInfo from '@components/RightPageInfo/RightPageInfo'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const page = CONSTANTS.ROUTES.find((route) => route.link === pathname) ?? CONSTANTS.ROUTES[0];

  return (
    <div className={styles.baseLayout}>
      <div className={styles.innerLayout}>
        <div className={styles.menuContainer}>
          <LeftMenuDesktop />
        </div>
        <div className={styles.mainContainer}>
          <TitlePage title={page.name} />
          {children}
        </div>
        <div className={styles.pageInfoContainer}>
          <RightPageInfo text={page.name} id={page.id} />
        </div>
      </div>
    </div>
  )
}

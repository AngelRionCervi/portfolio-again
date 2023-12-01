'use client'

import LeftMenuDesktop from '@components/LeftMenuDesktop/LeftMenuDesktop'
import styles from './styles.module.scss'
import TitlePage from '@components/TitlePage/TitlePage'
import RightPageInfo from '@components/RightPageInfo/RightPageInfo'
import { usePage } from '@lib/hooks/usePage'
import LeftMenuAnimationContextProvider from '@context/LeftMenuAnimationContext'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const page = usePage()

  return (
    <LeftMenuAnimationContextProvider>
      <div className={styles.baseLayout}>
        <div className={styles.innerLayout}>
          <div className={styles.menuContainer}>
            <LeftMenuDesktop />
          </div>
          <div className={styles.mainContainer}>
            
            {children}
          </div>
          <div className={styles.pageInfoContainer}>
            <RightPageInfo text={page.name} id={page.id} />
          </div>
        </div>
      </div>
    </LeftMenuAnimationContextProvider>
  )
}

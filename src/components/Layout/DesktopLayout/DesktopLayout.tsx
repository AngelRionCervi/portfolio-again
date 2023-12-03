'use client'

import LeftMenuDesktop from '@components/LeftMenuDesktop/LeftMenuDesktop'
import styles from './styles.module.scss'
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
            <div className={styles.menuInner}>
              <LeftMenuDesktop />
            </div>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.topBar}></div>
            {children}
          </div>
          <div className={styles.pageInfoContainer}>
            <div className={styles.pageInfoInner}>
              <RightPageInfo text={page.name} id={page.id} />
            </div>
          </div>
        </div>
      </div>
    </LeftMenuAnimationContextProvider>
  )
}

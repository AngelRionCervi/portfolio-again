'use client'

import styles from './styles.module.scss'
import TitlePage from '@components/TitlePage/TitlePage'
import { usePathname } from 'next/navigation'
import CONSTANTS from '@constants'
import TopMenuMobile from '@components/TopMenuMobile/TopMenuMobile'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const page = CONSTANTS.ROUTES.find((route) => route.link === pathname) ?? CONSTANTS.ROUTES[0];

    return (
        <div className={styles.baseLayout}>
            <div className={styles.menuContainer}>
                <TopMenuMobile title={page.name} />
            </div>
            <div className={styles.innerLayout}>
                {children}
            </div>
        </div>
    )
}

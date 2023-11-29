'use client'

import BlogYearSelectorDesktop from '@components/BlogYearSelector/BlogYearSelectorDesktop/BlogYearSelectorDesktop'
import BlogYearSelectorMobile from '@components/BlogYearSelector/BlogYearSelectorMobile/BlogYearSelectorMobile'
import styles from './styles.module.scss'
import { useDevice } from '@lib/hooks/useDevice'

export default function Blog() {
  const isMobile = useDevice()

  return (
    <div className={isMobile ? styles.containerMobile : styles.containerDesktop}>
      {isMobile ? (
        <div className={styles.yearSelectorContainerMobile}>
          <BlogYearSelectorMobile />
        </div>
      ) : (
        <div className={styles.yearSelectorContainerDesktop}>
          <BlogYearSelectorDesktop />
        </div>
      )}
      <div className={isMobile ? styles.articlesContainerMobile : styles.articlesContainerDesktop}>-articles-</div>
    </div>
  )
}

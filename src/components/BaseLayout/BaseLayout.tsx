import LeftMenuDesktop from '@/components/LeftMenuDesktop/LeftMenuDesktop'
import styles from './styles.module.scss'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.baseLayout}>
      <div className={styles.innerLayout}>
        <div className={styles.menuContainer}>
          <LeftMenuDesktop />
        </div>
        <div className={styles.mainContainer}>{children}</div>
        <div className={styles.pageInfoContainer}>idk</div>
      </div>
    </div>
  )
}

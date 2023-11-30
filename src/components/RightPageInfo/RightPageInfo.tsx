import styles from './style.module.scss'
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher'

interface PageInfoProps {
  text: string
  id: string
}

function RightPageInfo({ text, id }: PageInfoProps) {

  return (
    <div className={styles.rightPageContainer}>
      <div className={styles.topInfo}>
        <ThemeSwitcher />
      </div>
      <div className={styles.bottomInfo}>
        <div className={styles.bottomInner}>
          <p>{text}</p>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  )
}

export default RightPageInfo

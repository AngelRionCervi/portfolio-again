import styles from './styles.module.scss'
import { cx } from '@lib/helpers'

export default function HomeAnimationDesktop() {
  const faceTop = cx(styles, ['face', 'faceTop'])
  const faceBottom = cx(styles, ['face', 'faceBottom'])
  const faceRight = cx(styles, ['face', 'faceRight'])

  const door = cx(styles, {
    door: true,
  })

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={faceTop}>
          <div className={styles.door1Container}>
          <div className={door} />
          </div>
          
        </div>
        <div className={faceBottom} />
        <div className={faceRight} />
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import styles from './styles.module.scss'
import { workModalTimeAnimation } from './workModalTimeAnimation'
import DashLine from '@assets/icons/dash-line.svg'
import cssVariables from '@styles/variables.module.scss'
import { cx } from '@lib/helpers'
import CONSTANTS from '@constants'

export interface WorkModalTimeProps {
  periode: { start: Array<number>; end: Array<number> }
}

export default function WorkModalTime({ periode }: WorkModalTimeProps) {
  useEffect(() => {
    workModalTimeAnimation({
      container: styles.container,
      tube: styles.tube,
      circle: styles.circle,
      dates: { top: styles.dateTop, bottom: styles.dateBottom },
      circleDiameter: parseInt(styles.circleDiameter),
      periode,
    })
  }, [])

  function getDateClass(isTop: boolean) {
    return cx(styles, {
      date: true,
      dateTop: isTop,
      dateBottom: !isTop,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.tube}>
          <div className={getDateClass(true)}>
            <p>blabla</p>
            <p>blublue</p>
          </div>
          <div className={styles.dashLineContainer}>
            <DashLine height={CONSTANTS.MODAL_DIMENSIONS.height - CONSTANTS.WORK_MODAL_PADDING * 2 - 150} className={styles.topDashLine} />
          </div>
          <div className={styles.circle}>
            <div className={styles.dashLineContainer}>
              <DashLine height={parseInt(styles.circleDiameter) / 2 - 20} stroke={cssVariables.black} />
            </div>
            <div className={getDateClass(false)}>
              <p>blabla</p>
              <p>blublue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

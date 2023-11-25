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
  const monthLabels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  useEffect(() => {
    workModalTimeAnimation({
      tube: styles.tube,
      circle: styles.circle,
      dates: { top: styles.dateTop, bottom: styles.dateBottom },
      circleDiameter: parseInt(styles.circleDiameter),
      periode,
      monthLabels,
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
            <p>{monthLabels[periode.start[0] - 1]}.</p>
            <p>{periode.start[1]}</p>
          </div>
          <div className={styles.dashLineContainer}>
            <DashLine height={CONSTANTS.MODAL_DIMENSIONS.height - CONSTANTS.WORK_MODAL_PADDING * 2 - 150} className={styles.topDashLine} />
          </div>
          <div className={styles.circle}>
            <div className={styles.dashLineContainer}>
              <DashLine height={parseInt(styles.circleDiameter) / 2 - 20} stroke={cssVariables.black} />
            </div>
            <div className={getDateClass(false)}>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

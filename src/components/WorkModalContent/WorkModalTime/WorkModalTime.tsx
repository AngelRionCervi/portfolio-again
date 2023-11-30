'use client'

import { useEffect } from 'react'
import styles from './styles.module.scss'
import { workModalTimeAnimation } from './workModalTimeAnimation'
import DashLine from '@assets/icons/dash-line.svg'
import DashLineH from '@assets/icons/dash-line-h.svg'
import cssVariables from '@styles/variables.module.scss'
import { cx } from '@lib/helpers'
import CONSTANTS from '@constants'
import { useDevice } from '@lib/hooks/useDevice'

export interface WorkModalTimeProps {
  periode: { start: Array<number>; end: Array<number> }
}

export default function WorkModalTime({ periode }: WorkModalTimeProps) {
  const monthLabels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  const isMobile = useDevice()

  useEffect(() => {
    workModalTimeAnimation({
      tube: styles.tube,
      circle: styles.circle,
      dates: { top: styles.dateTop, bottom: styles.dateBottom },
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
            {isMobile ? (
              <DashLineH className={styles.topDashLineMobile} />
            ) : (
              <DashLine
                height={CONSTANTS.MODAL_DIMENSIONS_DESKTOP.height - CONSTANTS.WORK_MODAL_PADDING * 2 - 150}
                className={styles.topDashLineDesktop}
              />
            )}
          </div>
          <div className={styles.circle}>
            <div className={styles.dashLineContainerBottom}>
              {isMobile ? (
                <DashLineH  width={27} stroke={cssVariables.black} />
              ) : (
                <DashLine height={50} stroke={cssVariables.black} />
              )}
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

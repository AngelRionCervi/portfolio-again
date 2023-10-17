'use client'

import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useEffect } from 'react'
import workTimelineAnimation, { stopAnimation, totalDuration } from '@components/WorkTimeline/workTimelineAnimation'
import { getSeenWorkPage, setSeenWorkPage } from '@lib/sessionStorage'

export default function Work() {
  function handlePlusClick({ name, x, y }: PlusPayload) {
    console.log({ name, x, y })
  }

  let setSeenTimeout: number;

  useEffect(() => {
    if (getSeenWorkPage() !== 'true') {
      workTimelineAnimation(`.${styles.workContainer}`);
      setSeenTimeout = window.setTimeout(() => {
        setSeenWorkPage();
      }, totalDuration)
    }

    return () => {
      clearTimeout(setSeenTimeout);
      stopAnimation();
    }
  }, [])

  return (
    <div className={styles.workContainer}>
      <WorkTimeline onPlusClick={handlePlusClick} />
    </div>
  )
}

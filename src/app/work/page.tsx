'use client'

import anime from 'animejs'
import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useEffect } from 'react'
import workTimelineAnimation, { stopAnimation } from '@components/WorkTimeline/workTimelineAnimation'

function toggleHideShowElements(selector: string, show: boolean) {
  document.querySelectorAll(selector).forEach((el) => {
    ;(el as HTMLElement).style.display = show ? 'block' : 'none'
  })
}

export default function Work() {
  function handlePlusClick({ name, x, y }: PlusPayload) {
    console.log({ name, x, y })
  }

  useEffect(() => {
    workTimelineAnimation(`.${styles.workContainer}`);
    return () => stopAnimation()
  }, [])

  return (
    <div className={styles.workContainer}>
      <WorkTimeline onPlusClick={handlePlusClick} />
    </div>
  )
}

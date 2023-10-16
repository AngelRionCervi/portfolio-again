'use client'

import anime from 'animejs'
import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useEffect } from 'react'

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
    
    // TODO: reset animation when changinf page
    toggleHideShowElements(
      `.${styles.workContainer} .bar-1, .bar-2, .bar-3, .company-bar-h-1, .company-bar-h-2, .company-bar-v, .year-bar, .company-bubble, .years, .question-mark`,
      false
    )
    anime({
      targets: `.${styles.workContainer} .main-line`,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      direction: 'forward',
      duration: 2500,
    })

    setTimeout(() => {
      toggleHideShowElements(`.${styles.workContainer} .bar-1`, true)
      anime({
        targets: `.${styles.workContainer} .bar-1`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        duration: 150,
        direction: 'forward',
        delay: (_, i) => i * 32,
      })
    }, 260)

    setTimeout(() => {
      toggleHideShowElements(`.${styles.workContainer} .bar-2`, true)
      anime({
        targets: `.${styles.workContainer} .bar-2`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        duration: 150,
        direction: 'forward',
        delay: (_, i) => i * 32,
      })
    }, 1000)

    setTimeout(() => {
      toggleHideShowElements(`.${styles.workContainer} .bar-3`, true)
      anime({
        targets: `.${styles.workContainer} .bar-3`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        duration: 150,
        direction: 'forward',
        delay: (_, i) => i * 32,
      })
    }, 1600)

    setTimeout(() => {
      toggleHideShowElements(`.${styles.workContainer} .company-bar-h-1, .company-bar-h-2`, true)
      anime({
        targets: `.${styles.workContainer} .company-bar-h-1`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        direction: 'forward',
        duration: 350,
      })

      anime({
        targets: `.${styles.workContainer} .company-bar-h-2`,
        strokeDashoffset: [anime.setDashoffset, 70],
        easing: 'easeOutSine',
        duration: 350,
      })
    }, 2550)

    setTimeout(() => {
      toggleHideShowElements(`.${styles.workContainer} .company-bubble, .years`, true)
      anime({
        targets: `.${styles.workContainer} .company-bubble`,
        opacity: [0, 1],
        easing: 'easeInSine',
        direction: 'forward',
        duration: 350,
      })
    }, 2800)

    setTimeout(() => {
      toggleHideShowElements(`.${styles.workContainer} .question-mark`, true)
      anime({
        targets: `.${styles.workContainer} .question-mark`,
        opacity: [0, 1],
        rotate: 360,
        scale: [0.5, 1.5, 1],
        easing: 'easeInSine',
        direction: 'forward',
        duration: 1500,
      })

      anime({
        targets: `.${styles.workContainer} .company-bubble a`,
        scale: [1, 1.5, 1],
        rotate: 360,
        easing: 'easeInOutSine',
        direction: 'forward',
        duration: 500,
      })
    }, 3200)
  }, [])

  return (
    <div className={styles.workContainer}>
      <WorkTimeline onPlusClick={handlePlusClick} />
    </div>
  )
}

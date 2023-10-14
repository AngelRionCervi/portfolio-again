'use client'

import anime from 'animejs'
import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useEffect } from 'react'

export default function Work() {

  function handlePlusClick({name, x, y}: PlusPayload) {
    console.log({name, x, y})
  }

  useEffect(() => {
    // different targets to deffer animation
    anime({
      targets: `.${styles.workContainer} path`,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: (el, i) => {
        if (el.classList.contains('bar')) {
          return 200
        } else if (el.classList.contains('main-line')) {
          return 3000
        }

        return 1500
      },
      delay: (el, i) => {
        console.log(i)

        if (el.classList.contains('bar')) {
          return i * 45
        } else if (el.classList.contains('main-line')) {
          return 100
        }
        return 150
      },
      direction: 'forward',
      //loop: true,
    })
  })

  return (
    <div className={styles.workContainer}>
      <WorkTimeline onPlusClick={handlePlusClick} />
    </div>
  )
}

import { useContext, useEffect, useState } from 'react'
import anime from 'animejs'
import styles from './styles.module.scss'
import { usePage } from '@lib/hooks/usePage'
import { LeftMenuAnimationContext } from '@/context/LeftMenuAnimationContext'
import LeftAnimationTriangle from '@assets/icons/left-animation-triangle.svg'

export default function LeftMenuAnimation() {
  const { frames } = useContext(LeftMenuAnimationContext)
  const page = usePage()

  useEffect(() => {
    anime({
      targets: `.${styles.aboveFrame} svg`,
      translate: [
        { value: '-15px 15px', easing: 'easeOutSine', duration: 500 },
        { value: '0px 0px', easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [6, 6], from: 30 }),
      update: function (anim) {
        anim.animations.forEach((animation) => {
          const translateValues = animation.currentValue.split(' ').map((valPx) => Math.abs(Math.round(parseFloat(valPx))))
          animation.animatable.target.style.zIndex = (anim.animatables.length - (translateValues[0] + translateValues[1])).toString()
        })
      },
    })

    // setTimeout(() => {
    //   anime({
    //     targets: `.${styles.aboveFrame} svg`,
    //     opacity: [
    //       { value: 0, easing: 'easeOutSine', duration: 110 },
    //     ],
    //     delay: anime.stagger(200, { grid: [6, 6], from: 30 }),
    //   })
    // }, 400)


    anime({
      targets: `.${styles.triangleTopContainer}`,
      scale: [
        { value: 0, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [6, 6], from: 30 }),
    })

    anime({
      targets: `.${styles.triangleBottomContainer}`,
      scale: [
        { value: 0, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [6, 6], from: 30 }),
    })
  }, [page])

  return (
    <div className={styles.container}>
      <div className={styles.belowFrame} />
      <div className={styles.triangleTopContainer}>
        <LeftAnimationTriangle className={styles.triangleTop} width="17px" height="17px" />
      </div>
      <div className={styles.triangleBottomContainer}>
        <LeftAnimationTriangle className={styles.triangleBottom} width="17px" height="17px" />
      </div>
      <div className={styles.aboveFrame}>
        {frames[page.name].map((Frame, i) => (
          <Frame key={i} />
        ))}
      </div>
    </div>
  )
}

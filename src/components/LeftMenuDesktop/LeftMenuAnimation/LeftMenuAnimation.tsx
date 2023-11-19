import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { usePage } from '@lib/hooks/usePage'
import { LeftMenuAnimationContext } from '@/context/LeftMenuAnimationContext'

export default function LeftMenuAnimation() {
  const { frames } = useContext(LeftMenuAnimationContext)
  const page = usePage()

  return (
    <div className={styles.container}>
      <div className={styles.belowFrame} />
      <div className={styles.aboveFrame}>
        {frames[page.name].map((Frame, i) => (
          <Frame key={i} />
        ))}
      </div>
    </div>
  )
}

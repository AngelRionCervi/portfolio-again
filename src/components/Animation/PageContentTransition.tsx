import { useEffect, useRef } from "react"
import anime from "animejs"
import styles from './styles.module.scss'
import { useOnceEffect } from "@/lib/hooks/useOnceEffect"

interface FadeContainerProps {
  children: React.ReactNode
  duration?: number
}

export default function PageContentTransition({ children, duration = 150 }: FadeContainerProps) {
  const containerEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('ohohho')
    anime({
      targets: containerEl.current,
      opacity: [0, 1],
      duration,
      easing: 'easeInOutQuad'
    })
  }, [])

  return (
    <div ref={containerEl} className={styles.animationContainer}>
      {children}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import CornerTriangle from '@assets/icons/corner-triangle.svg'
import { cx } from '@lib/helpers'
import AnimationManager from './ButtonCubeAnimations'
import { useOnceEffect } from '@/lib/hooks/useOnceEffect'
import { useAfterMountEffect } from '@/lib/hooks/useAfterMountEffect'

interface ButtonCubeProps {
  children: React.ReactNode
  size: number
  id: string
}

export default function ButtonCube({ children, size, id }: ButtonCubeProps) {
  const shift = 15
  const [buttonState, setButtonState] = useState('idle')
  const animationManager = useRef<ReturnType<typeof AnimationManager> | null>(null)

  useEffect(() => {
    animationManager.current = AnimationManager({
      id,
      container: styles.container,
      aboveFrame: styles.aboveFrame,
      belowFrame: styles.belowFrame,
      triangleTopContainer: styles.triangleTopContainer,
      triangleBottomContainer: styles.triangleBottomContainer,
    })
  }, [])

  useEffect(() => {
    if (!animationManager.current) return

    if (buttonState === 'idle') {
      console.log('start idle')
      animationManager.current.idleAnimation()
    } else if (buttonState === 'enter') {
      animationManager.current.enterAnimation()
    } else if (buttonState === 'leave') {
      animationManager.current.leaveAnimation().then(() => {
        setButtonState('idle')
      })
      
    }
  }, [buttonState])

  const containerClasses = cx(styles, {
    container: true,
    containerIdle: buttonState === 'idle',
    containerEnter: buttonState === 'enter',
    containerLeave: buttonState === 'leave',
  })

  return (
    <div id={id} style={{ width: `${size + shift}px`, height: `${size + shift}px` }} className={styles.container}>
      <div style={{ width: `${size}px`, height: `${size}px` }} className={styles.belowFrame} />
      <div className={styles.triangleTopContainer}>
        <CornerTriangle className={styles.triangleTop} width="17px" height="17px" />
      </div>
      <div className={styles.triangleBottomContainer}>
        <CornerTriangle className={styles.triangleBottom} width="17px" height="17px" />
      </div>
      <button
        onMouseEnter={() => setButtonState('enter')}
        onMouseLeave={() => setButtonState('leave')}
        style={{ width: `${size}px`, height: `${size}px` }}
        className={styles.aboveFrame}
      >
        {children}
      </button>
    </div>
  )
}

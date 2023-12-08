import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import styles from './styles.module.scss'
import ButtonCubeTriangle from '@assets/icons/button-cube-triangle.svg'
import ButtonCubeAnimationManager, { AnimationType } from './ButtonCubeAnimations'
import { WorkModalContentProps } from '../WorkModalContent/WorkModalContent'

interface ButtonCubeProps {
  children: React.ReactNode
  size: number
  id: WorkModalContentProps['id']
  onClick: (id: WorkModalContentProps['id']) => void
}

const shift = 15

export default function ButtonCube({ children, size, id, onClick }: ButtonCubeProps) {
  const [buttonState, setButtonState] = useState<AnimationType | null>(null)
  const animationManager = useRef<ReturnType<typeof ButtonCubeAnimationManager> | null>(null)
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (animationManager?.current) return

    animationManager.current = ButtonCubeAnimationManager({
      id,
      aboveFrame: styles.aboveFrame,
      triangleTopContainer: styles.triangleTopContainer,
      triangleBottomContainer: styles.triangleBottomContainer,
    })

    startButtonIdle()
  }, [])

  useEffect(() => {
    if (!animationManager.current || !buttonState) return

    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current)
    }

    const { animationsPromise, currentAnimationType } = animationManager.current[`${buttonState}Animation`]()

    animationsPromise.then(() => {
      if (currentAnimationType === 'leave') {
        startButtonIdle()
      }
    })
  }, [buttonState])

  function startButtonIdle() {
    idleTimeout.current = setTimeout(() => {
      setButtonState('idle')
    }, anime.random(1000, 3000))
  }

  return (
    <button
      id={id}
      style={{ width: `${size}px`, height: `${size + shift}px` }}
      className={styles.container}
      onMouseEnter={() => setButtonState('enter')}
      onMouseLeave={() => setButtonState('leave')}
      onMouseDown={() => setButtonState('down')}
      onTouchStart={() => setButtonState('down')}
      onMouseUp={() => setButtonState('up')}
      onTouchEnd={() => setButtonState('up')}
      onClick={() => onClick(id)}
    >
      <div style={{ width: `${size - 1}px`, height: `${size - 1}px` }} className={styles.belowFrame} />
      <div className={styles.triangleTopContainer}>
        <ButtonCubeTriangle className={styles.triangleTop} width="15px" height="15px" />
      </div>
      <div className={styles.triangleBottomContainer}>
        <ButtonCubeTriangle className={styles.triangleBottom} width="15px" height="15px" />
      </div>
      <div style={{ width: `${size - 2}px`, height: `${size - 2}px` }} className={styles.aboveFrame}>
        {children}
      </div>
    </button>
  )
}

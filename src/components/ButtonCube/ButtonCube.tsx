import { useEffect, useRef, useState, useContext, useReducer } from 'react'
import anime from 'animejs'
import styles from './styles.module.scss'
import CornerTriangle from '@assets/icons/corner-triangle.svg'
import ButtonCubeAnimationManager, { AnimationType } from './ButtonCubeAnimations'
import { WorkModalContentProps } from '../WorkModalContent/WorkModalContent'

interface ButtonCubeProps {
  children: React.ReactNode
  size: number
  id: WorkModalContentProps['id']
  onClick: (id: WorkModalContentProps['id']) => void
}

export default function ButtonCube({ children, size, id, onClick }: ButtonCubeProps) {
  const shift = 15
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
      <div style={{ width: `${size}px`, height: `${size}px` }} className={styles.belowFrame} />
      <div className={styles.triangleTopContainer}>
        <CornerTriangle className={styles.triangleTop} width="17px" height="17px" />
      </div>
      <div className={styles.triangleBottomContainer}>
        <CornerTriangle className={styles.triangleBottom} width="17px" height="17px" />
      </div>
      <div style={{ width: `${size - 2}px`, height: `${size - 2}px` }} className={styles.aboveFrame}>
        {children}
      </div>
    </button>
  )
}

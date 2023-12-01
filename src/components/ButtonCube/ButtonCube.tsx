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
      belowFrame: styles.belowFrame,
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
    <div id={id} style={{ width: `${size}px`, height: `${size + shift}px` }} className={styles.container}>
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
        onMouseDown={() => setButtonState('down')}
        onMouseUp={() => setButtonState('up')}
        onClick={() => onClick(id)}
        style={{ width: `${size}px`, height: `${size}px` }}
        className={styles.aboveFrame}
      >
        {children}
      </button>
    </div>
  )
}

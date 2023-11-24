import { useContext, useState, useRef } from 'react'
import styles from './styles.module.scss'
import { usePage } from '@lib/hooks/usePage'
import { Frames, LeftMenuAnimationContext } from '@context/LeftMenuAnimationContext'
import CornerTriangle from '@assets/icons/corner-triangle.svg'
import AnimationManager from './AnimationManager'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'
import { useOnceEffect } from '@lib/hooks/useOnceEffect'

export default function LeftMenuAnimation() {
  const { frames } = useContext(LeftMenuAnimationContext)
  const page = usePage()
  const [startFrames, setStartFrames] = useState<Frames[keyof Frames] | null>(null)

  const animationManager = useRef<ReturnType<typeof AnimationManager> | null>(null)

  useOnceEffect(() => {
    setStartFrames(frames[page.name])
    animationManager.current = AnimationManager()
    animationManager.current.startLoop()
  }, [frames])

  useAfterMountEffect(() => {
    if (!animationManager.current) return

    animationManager.current.addToQueue({
      aboveFrame: styles.aboveFrame,
      triangleTopContainer: styles.triangleTopContainer,
      triangleBottomContainer: styles.triangleBottomContainer,
      newPageFrames: frames[page.name],
    })
  }, [page])

  return (
    <div className={styles.container}>
      <div className={styles.belowFrame} />
      <div className={styles.triangleTopContainer}>
        <CornerTriangle className={styles.triangleTop} width="17px" height="18px" />
      </div>
      <div className={styles.triangleBottomContainer}>
        <CornerTriangle className={styles.triangleBottom} width="17px" height="17px" />
      </div>
      <div className={styles.aboveFrame}>
        {startFrames &&
          startFrames.map((Frames, index) => (
            <div className={styles.frameContainer} key={index}>
              <Frames />
            </div>
          ))}
      </div>
    </div>
  )
}

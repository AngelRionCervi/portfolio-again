import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { getSvgFrames } from './AnimationLogic/svgLoader'
import styles from './styles.module.scss'
import CONSTANTS from '@constants'

export default function LeftMenuAnimation() {
  const [frames, setFrames] = useState<Array<React.ElementType>>([])

  const pathname = usePathname();

  //todo: prefetch all svg frames
  useEffect(() => {
    async function fetchFrames() {
      //todo: hook for this
      const page = CONSTANTS.ROUTES.find((route) => route.link === pathname) ?? CONSTANTS.ROUTES[0];
      const frames = await getSvgFrames(page.name)
      setFrames(frames)
      console.log('frames', frames)
    }
    fetchFrames()
  }, [pathname])

  return (
    <div className={styles.container}>
      {!!frames?.length &&
        frames.map((Frame, i) => (
          <Frame key={i} />
      ))}
    </div>
  )
}

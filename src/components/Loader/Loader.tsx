import { useEffect, useRef } from 'react'
import anime from 'animejs'
import LoaderSvg from '@assets/icons/loader.svg'
import styles from './styles.module.scss'

interface LoaderProps {
  size: 'm' | 's'
}

const sizeMap = {
  m: 40,
  s: 20,
}

export default function Loader({ size }: LoaderProps) {
  const containerEl = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerEl.current) return
    const duration = 1500
    const easing = 'linear'

    anime({
      targets: containerEl.current?.querySelector('svg > circle'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing,
      duration,
      direction: 'alternate',
      loop: true,
    })

    anime({
      targets: containerEl.current?.querySelector('svg'),
      rotate: [0, 720],
      easing: 'linear',
      duration: 1500,
      direction: 'forward',
      loop: true,
    })
  }, [])

  return (
    <div ref={containerEl} className={styles.container}>
      <LoaderSvg width={`${sizeMap[size]}px`} height={`${sizeMap[size]}px`} className={styles.loader} />
    </div>
  )
}

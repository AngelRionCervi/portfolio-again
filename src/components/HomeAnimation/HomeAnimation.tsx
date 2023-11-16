'use client'

import { useEffect, useState } from 'react'
import HomeAnimationWord from '@/components/HomeAnimation/HomeAnimationWord/HomeAnimationWord'
import desktopStyles from './HomeAnimationDesktop/styles.module.scss'
import mobileStyles from './HomeAnimationMobile/styles.module.scss'
import homeDesktopAnimationData, { stopAnimationDesktop } from '@components/HomeAnimation/HomeAnimationDesktop/homeDesktopAnimationData'
import homeMobileAnimationData, { stopAnimationMobile } from '@components/HomeAnimation/HomeAnimationMobile/homeMobileAnimationData'
import { useDevice } from '@lib/useDevice'
import { useMounted } from '@/lib/useMounted'

export default function HomeAnimationDesktop() {
  const isMobile = useDevice()
  const isMounted = useMounted()

  const styles = isMobile ? mobileStyles : desktopStyles

  useEffect(() => {
    if (isMounted) {
      if (isMobile) {
        homeMobileAnimationData({ doors: [styles.door1Inner, styles.door2Inner], words: [styles.word1Container, styles.word2Container] })
      } else {
        homeDesktopAnimationData({ doors: [styles.door1Inner, styles.door2Inner], words: [styles.word1Container, styles.word2Container] })
      }
    }

    return () => {
      if (isMobile) {
        stopAnimationMobile()
      } else {
        stopAnimationDesktop()
      }
    }
  }, [isMounted, isMobile, styles])

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.box}>
          <div className={styles.faceTop}>
            <div className={styles.door1Container}>
              <div className={styles.door1Inner}>
                <div className={styles.door} />
              </div>
            </div>
            <div className={styles.door2Container}>
              <div className={styles.door2Inner}>
                <div className={styles.door} />
              </div>
            </div>
          </div>
          <div className={styles.faceBottom} />
          <div className={styles.faceRight} />
        </div>
        <div className={styles.word1Container}>
          <HomeAnimationWord word="Hello" />
        </div>
        <div className={styles.word2Container}>
          <HomeAnimationWord word="there" />
        </div>
        <div className={styles.hidePanels}>
          <div className={styles.topHidePanel} />
          <div className={styles.bottomHidePanel} />
        </div>
      </div>
    </div>
  )
}

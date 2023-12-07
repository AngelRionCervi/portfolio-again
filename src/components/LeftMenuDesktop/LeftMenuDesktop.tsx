'use client'

import anime from 'animejs'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import CONSTANTS from '@constants'
import LeftMenuAnimation from './LeftMenuAnimation/LeftMenuAnimation'
import { usePage } from '@lib/hooks/usePage'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'

export default function LeftMenuDesktop() {
  const itemsContainerEl = useRef<HTMLUListElement | null>(null)
  const itemsCoords = useRef<Array<any> | null>(null)
  const [curSelectorY, setCurSelectorY] = useState<number | null>(null)
  const [oldSelectorY, setOldSelectorY] = useState<number | null>(null)
  let isFirstPass = useRef<boolean>(true)
  const page = usePage()

  const itemOffsetY = 12

  useEffect(() => {
    const allItemEl = [...((itemsContainerEl.current?.querySelectorAll('li') as NodeListOf<HTMLElement>) ?? [])]

    if (allItemEl.length) {
      itemsCoords.current = allItemEl.map((itemEl) => ({ x: itemEl.offsetLeft, y: itemEl.offsetTop + itemOffsetY, name: itemEl.innerText }))

      console.log('page', page, itemsCoords.current)

      setCurSelectorY(itemsCoords.current.find((item) => item.name === page.name).y)
    }
  }, [])

  useAfterMountEffect(() => {
    if (!isFirstPass.current) {
      anime({
        targets: `.${styles.navPointer}`,
        translateY: [oldSelectorY, curSelectorY],
        easing: 'easeOutQuad',
        duration: 250,
      })
    } else {
      isFirstPass.current = false
    }
    setOldSelectorY(curSelectorY)
  }, [curSelectorY])

  function changePage(name: string) {
    if (!itemsCoords.current) return

    const newY = itemsCoords.current.find((item) => item.name === name).y
    setCurSelectorY(newY)
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
    
          <LeftMenuAnimation />
     
        <div className={styles.navContainer}>
          <div className={styles.navInnerContainer}>
            <nav>
              <ul ref={itemsContainerEl} className={styles.navUl}>
                {CONSTANTS.ROUTES.map((item) => {
                  return (
                    <li key={item.name} className={styles.navItem}>
                      <Link href={item.link} as={item.link} onClick={() => changePage(item.name)}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div>
              <div style={{ transform: `translateY(${curSelectorY}px)` }} className={styles.navPointer}>
                <div className={styles.pointerRound} />
                <div className={styles.pointerBar} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

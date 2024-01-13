'use client'

import anime from 'animejs'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Roboto_Mono } from 'next/font/google'
import styles from './styles.module.scss'
import CONSTANTS from '@constants'
import LeftMenuAnimation from './LeftMenuAnimation/LeftMenuAnimation'
import { useBlogPost, usePage } from '@lib/hooks/usePage'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'
import BackArrow from '@assets/icons/back-arrow.svg'
import { cx } from '@lib/helpers'
import { useMounted } from '@lib/hooks/useMounted'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })
const itemOffsetY = 12

export default function LeftMenuDesktop() {
  const itemsContainerEl = useRef<HTMLUListElement | null>(null)
  const itemsCoords = useRef<Array<any> | null>(null)
  const [curSelectorY, setCurSelectorY] = useState<number | null>(null)
  const [oldSelectorY, setOldSelectorY] = useState<number | null>(null)
  let isFirstPass = useRef<boolean>(true)
  const page = usePage()
  const blogPost = useBlogPost()
  const isMounted = useMounted()

  const pointerLinkClass = cx(styles, {
    pointerContainer: true,
    pointerLink: blogPost,
  })

  useEffect(() => {
    const allItemEl = [...((itemsContainerEl.current?.querySelectorAll('li') as NodeListOf<HTMLElement>) ?? [])]

    if (allItemEl.length) {
      itemsCoords.current = allItemEl.map((itemEl) => ({ x: itemEl.offsetLeft, y: itemEl.offsetTop + itemOffsetY, name: itemEl.innerText }))
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

  useEffect(() => {
    if (!isMounted && !blogPost) return

    const easing = blogPost ? 'easeOutQuad' : 'easeInQuad'
    const duration = 350

    anime({
      targets: `.${styles.pointerRound}`,
      scale: [1, 5],
      duration,
      easing,
      direction: blogPost ? 'forward' : 'reverse',
    })

    anime({
      targets: `.${styles.pointerArrowContainer} > svg`,
      scale: [0.1, 1],
      opacity: [0, 1],
      duration: blogPost ? duration : 150,
      easing,
      direction: blogPost ? 'forward' : 'reverse',
    })

    if (blogPost) {
      anime({
        targets: `.${styles.pointerArrowContainer}`,
        translate: ['10px 0px', '-1px 0px'],
        opacity: [0, 1],
        duration,
        easing,
        direction: 'forward',
        delay: 100,
      })
    }
  }, [blogPost])

  function changePage(name: string) {
    if (!itemsCoords.current) return

    const newY = itemsCoords.current.find((item) => item.name === name).y
    setCurSelectorY(newY)
  }

  return (
    <div className={styles.container}>
      <div>
        <LeftMenuAnimation />
        <div className={styles.navContainer}>
          <nav>
            <ul ref={itemsContainerEl} className={styles.navUl}>
              {CONSTANTS.ROUTES.map((item) => {
                return (
                  <li key={item.name} className={styles.navItem}>
                    <Link className={robotoMono.className} href={item.link} as={item.link} onClick={() => changePage(item.name)}>
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div>
            <div style={{ transform: `translateY(${curSelectorY}px)` }} className={styles.navPointer}>
              <Link className={pointerLinkClass} href="/blog">
                <div className={styles.pointerRound} />
                <div className={styles.pointerArrowContainer}>
                  <BackArrow />
                </div>
              </Link>
              <div className={styles.pointerBar} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.bar} />
      </div>
    </div>
  )
}

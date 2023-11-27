'use client'

import anime from 'animejs'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { useAfterMountEffect } from '@/lib/hooks/useAfterMountEffect'

export default function BlogYearSelectorDesktop() {
  const years = [2024, 2023, 2022]

  const yearContainerRef = useRef<HTMLDivElement | null>(null)
  let yearsCoords = useRef<Array<any> | null>(null)
  let isFirstPass = useRef<boolean>(true)

  const [curSelectorY, setCurSelectorY] = useState<number | null>(null)
  const [oldSelectorY, setOldSelectorY] = useState<number | null>(null)

  useEffect(() => {
    const allYearsEls = [...((yearContainerRef.current?.querySelectorAll(`.${styles.year}`) as NodeListOf<HTMLElement>) ?? [])]

    if (allYearsEls.length) {
      yearsCoords.current = allYearsEls.map((yearEl) => {
        return { x: yearEl.offsetLeft, y: yearEl.offsetTop, year: parseInt(yearEl.innerText) }
      })

      setCurSelectorY(yearsCoords.current[0].y)
    }
  }, [])

  useAfterMountEffect(() => {
    if (!isFirstPass.current) {
      anime({
        targets: `.${styles.selection}`,
        top: [oldSelectorY, (curSelectorY ?? 0) - 1],
        easing: 'easeOutQuad',
        duration: 250,
      })
    } else {
      isFirstPass.current = false
    }

    setOldSelectorY(curSelectorY)
  }, [curSelectorY])

  function changeYear(yearToFind: number) {
    if (!yearsCoords.current) return

    const yearPosition = yearsCoords.current.find(({ year }) => year === yearToFind)
    setCurSelectorY(yearPosition.y)
  }

  return (
    <div className={styles.container}>
      {curSelectorY && <div className={styles.selection} style={{ top: `${curSelectorY}px` }} />}
      <div ref={yearContainerRef} className={styles.yearsContainer}>
        {years.map((year) => {
          return (
            <button className={styles.year} key={year} onClick={() => changeYear(year)}>
              {year}
            </button>
          )
        })}
      </div>
    </div>
  )
}

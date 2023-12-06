import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import CornerTriangle from '@assets/icons/corner-triangle.svg'
import anime from 'animejs'
import { useAfterMountEffect } from '@/lib/hooks/useAfterMountEffect'

interface BlogYearSelectorMobileProps {
  onChange: (year: number) => void
  years: Array<number>
}

export default function BlogYearSelectorMobile({ onChange, years }: BlogYearSelectorMobileProps) {
  const buttonHeight = 45
  const animDuration = 150

  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const [selectState, setSelectState] = useState<boolean>(false)

  useEffect(() => {
    setCurrentYear(years[0])
  }, [])

  useAfterMountEffect(() => {
    anime({
      targets: `.${styles.container}`,
      height: [buttonHeight, years.length * buttonHeight],
      duration: animDuration,
      easing: 'linear',
      direction: selectState ? 'forward' : 'reverse',
    })

    anime({
      targets: `.${styles.arrowDown}`,
      rotate: [-135, 45],
      duration: animDuration,
      easing: 'linear',
      direction: selectState ? 'forward' : 'reverse',
    })
  }, [selectState])

  function changeYear(year: number) {
    setCurrentYear(year)
    setSelectState(false)
    onChange(year)
  }

  function toggleSelect() {
    if (years.length <= 1) return
    setSelectState(!selectState)
  }

  return (
    <div className={styles.container}>
      <button onClick={toggleSelect} className={styles.currentYearButton}>
        <p className={styles.currentYear}>{currentYear}</p>
        <CornerTriangle width="10px" height="10px" className={styles.arrowDown} style={{ display: years.length > 1 ? 'block' : 'none' }} />
      </button>
      <div className={styles.otherYearsContainer}>
        {years
          .filter((year) => year !== currentYear)
          .map((year) => {
            return (
              <button onClick={() => changeYear(year)} key={year} className={styles.otherYear}>
                {year}
              </button>
            )
          })}
      </div>
    </div>
  )
}

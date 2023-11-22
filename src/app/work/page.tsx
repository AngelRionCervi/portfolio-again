'use client'

import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useEffect, useRef, useState } from 'react'
import workTimelineAnimation, { stopAnimation, totalDuration } from '@components/WorkTimeline/workTimelineAnimation'
import { getSeenWorkPage, setSeenWorkPage } from '@lib/sessionStorage'
import WorkTimelineModal from '@components/Modal/WorkTimelineModal'
import { useMounted } from '@/lib/hooks/useMounted'
import ButtonCube from '@components/ButtonCube/ButtonCube'

export default function Work() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(null)
  const isMounted = useMounted()

  const intervalRef = useRef(0)

  function handlePlusClick({ name, x, y, size }: PlusPayload) {
    closeModal()
    setTimeout(() => {
      setSelectedCompany({ name, position: { x, y }, size })
    })
  }

  useEffect(() => {
    if (getSeenWorkPage() !== 'true') {
      workTimelineAnimation(`.${styles.workContainer}`)
      intervalRef.current = window.setTimeout(() => {
        setSeenWorkPage()
      }, totalDuration)
    }

    return () => {
      clearTimeout(intervalRef.current)
      stopAnimation()
    }
  }, [])

  function closeModal() {
    setSelectedCompany(null)
  }

  return (
    <div className={styles.workContainer}>
      {/* {selectedCompany && <WorkTimelineModal company={selectedCompany} closeModal={closeModal} />} */}
      {/* <div style={{ visibility: isMounted ? 'visible' : 'hidden' }} className={styles.workContainerInner}>
        <WorkTimeline onPlusClick={handlePlusClick} />
      </div> */}
      <div className={styles.workButtons}>
        <ButtonCube id="hey" size={150}>hey</ButtonCube>
        {/* <ButtonCube id="oh" size={150}>oh</ButtonCube> */}
      </div>
    </div>
  )
}

'use client'

import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useContext, useEffect, useRef, useState } from 'react'
import workTimelineAnimation, { stopAnimation, totalDuration } from '@components/WorkTimeline/workTimelineAnimation'
import { getSeenWorkPage, setSeenWorkPage } from '@lib/sessionStorage'
import WorkTimelineModal from '@/components/Modal.old/WorkTimelineModal'
import { useMounted } from '@/lib/hooks/useMounted'
import ButtonCube from '@components/ButtonCube/ButtonCube'
import { ModalContext } from '@/context/ModalContext'
import WorkModalContent from '@/components/WorkModalContent/WorkModalContent'

export default function Work() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(null)
  const isMounted = useMounted()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { setModalContent, toggleModal } = useContext(ModalContext)

  function handlePlusClick({ name, x, y, size }: PlusPayload) {
    closeModal()
    setTimeout(() => {
      setSelectedCompany({ name, position: { x, y }, size })
    })
  }

  useEffect(() => {
    if (getSeenWorkPage() !== 'true') {
      workTimelineAnimation(`.${styles.workContainer}`)
      timeoutRef.current = setTimeout(() => {
        setSeenWorkPage()
      }, totalDuration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      stopAnimation()
    }
  }, [])

  function closeModal() {
    setSelectedCompany(null)
  }

  function onFrameButtonClick(id: string) {
    console.log('id eheheeh', id)
    setModalContent(<WorkModalContent />)
    toggleModal()
  }

  return (
    <div className={styles.workContainer}>
      {/* {selectedCompany && <WorkTimelineModal company={selectedCompany} closeModal={closeModal} />} */}
      {/* <div style={{ visibility: isMounted ? 'visible' : 'hidden' }} className={styles.workContainerInner}>
        <WorkTimeline onPlusClick={handlePlusClick} />
      </div> */}
      <div className={styles.workButtons}>
        <ButtonCube onClick={onFrameButtonClick} id="hey" size={150}>hey</ButtonCube>
        <ButtonCube onClick={onFrameButtonClick} id="oh" size={150}>oh</ButtonCube>
      </div>
    </div>
  )
}

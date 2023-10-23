'use client'

import styles from './style.module.scss'
import WorkTimeline from '@components/WorkTimeline/WorkTimeline'
import { useEffect, useState } from 'react'
import workTimelineAnimation, { stopAnimation, totalDuration } from '@components/WorkTimeline/workTimelineAnimation'
import { getSeenWorkPage, setSeenWorkPage } from '@lib/sessionStorage'
import WorkTimelineModal from '@/components/Modal/WorkTimelineModal'

export default function Work() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(null);

  function handlePlusClick({ name, x, y, size }: PlusPayload) {
    closeModal();
    setTimeout(() => {
      setSelectedCompany({ name, position: { x, y }, size });
    })
  }

  let setSeenTimeout: number;

  useEffect(() => {
    if (getSeenWorkPage() !== 'true') {
      workTimelineAnimation(`.${styles.workContainer}`);
      setSeenTimeout = window.setTimeout(() => {
        setSeenWorkPage();
      }, totalDuration)
    }

    return () => {
      clearTimeout(setSeenTimeout);
      stopAnimation();
    }
  }, [])

  function closeModal() {
    setSelectedCompany(null);
  }

  return (
    <div className={styles.workContainer}>
      {selectedCompany && (
        <WorkTimelineModal company={selectedCompany} closeModal={closeModal} />
      )}
      <div className={styles.workContainerInner}>
        <WorkTimeline onPlusClick={handlePlusClick} />
      </div>
    </div>
  )
}

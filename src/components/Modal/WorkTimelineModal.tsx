import CONSTANTS from '@constants'
import styles from './styles.module.scss'
import workData from '@data/work.json'
import IconExitWorkModal from '@assets/icons/icon-exit-work-modal.svg'
import { useEffect, useRef, useState } from 'react'

const WorkTimelineModal = ({ company: { name, position, size }, closeModal }: WorkTimelineModalProps) => {
  const data = (workData as { [key: string]: any })[name]

  const modalEl = useRef<HTMLDivElement | null>(null)
  const [outBottomPx, setOutBottom] = useState<number | null>(null)

  useEffect(() => {
    if (modalEl.current) {
      const rect = modalEl.current.getBoundingClientRect()

      if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
        setOutBottom(rect.height)
      }
    }
  }, [])

  return (
    <>
      <div className={styles.backdrop} onClick={closeModal} />
      <div
        id="work_modal"
        ref={modalEl}
        style={{
          boxSizing: 'border-box',
          width: `${CONSTANTS.WORK_MODAL_WIDTH}px`,
          left: `${position.x - CONSTANTS.WORK_MODAL_WIDTH + 1}px`,
          top: outBottomPx ? `${position.y - (outBottomPx ?? 0) + size + 1}px` : `${position.y + 1}px`,
        }}
        className={styles.container}
      >
        <div className={styles.containerInner}>
          <button
            style={{ width: `${size + 2}px`, height: `${size + 2}px` }}
            onClick={closeModal}
            className={`${styles.closeButton} ${outBottomPx ? styles.reverseCloseButton : ''}`}
          >
            <div style={{ width: `${size - 2}px`, height: `${size - 2}px` }} className={styles.closeButtonInner}>
              <IconExitWorkModal />
            </div>
          </button>
          <div className={styles.content}>
            <h2 className={styles.titleLink}>{data.title}</h2>
            <div className={styles.techIcons}></div>
            <p className={styles.text}>{data.text}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkTimelineModal

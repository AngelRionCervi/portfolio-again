'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { ModalContext } from '@context/ModalContext'
import { modalAnimation } from './ModalAnimations'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'
import { useOnceEffect } from '@lib/hooks/useOnceEffect'

export default function Modal() {
  const dimensions = { width: 800, height: 600 }
  const animationSelectors = { modalContainer: styles.modalContainer, modalInner: styles.modalInner, backdrop: styles.backdrop }

  const [openDone, setOpenDone] = useState(false)

  const { toggleModal, modalContent, isModalOpen, isModalClosing, forceCloseModal } = useContext(ModalContext)

  useEffect(() => {
    if (!isModalOpen) return

    modalAnimation(animationSelectors, dimensions).then(() => {
      setOpenDone(true)
    })
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalClosing) return

    modalAnimation(animationSelectors, dimensions, true)
  }, [isModalClosing])

  function closeModal() {
    if (!openDone) {
      forceCloseModal()
    } else {
      toggleModal()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={closeModal} />
      <div className={styles.modalContainer} style={{ width: dimensions.width }}>
        <div className={styles.modalInner}>{modalContent}</div>
      </div>
    </div>
  )
}

'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { ModalContext } from '@context/ModalContext'
import ModalAnimationManager from './ModalAnimations'
import CONSTANTS from '@constants'
import { useDevice } from '@lib/hooks/useDevice'

export default function Modal() {
  const isMobile = useDevice()
  console.log('ismobile', isMobile)

  const animationManager = useRef<ReturnType<typeof ModalAnimationManager> | null>(null)
  const [openDone, setOpenDone] = useState(false)
  const { toggleModal, modalContent, isModalOpen, isModalClosing, forceCloseModal } = useContext(ModalContext)

  useEffect(() => {
    animationManager.current = ModalAnimationManager({
      modalContainer: styles.modalContainer,
      modalInner: styles.modalInner,
      backdrop: styles.backdrop,
      dimensions: CONSTANTS.MODAL_DIMENSIONS_DESKTOP,
    })
  }, [])

  useEffect(() => {
    if (!isModalOpen) return

    animationManager.current?.openAnimation().then(() => {
      setOpenDone(true)
    })
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalClosing) return

    animationManager.current?.closeAnimation()
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
      <div className={styles.modalContainer}>
        <div className={styles.modalInner}>{modalContent}</div>
      </div>
    </div>
  )
}

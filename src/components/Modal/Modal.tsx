'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { ModalContext } from '@context/ModalContext'
import ModalAnimationManager from './ModalAnimations'
import CONSTANTS from '@constants'
import { useDevice } from '@lib/hooks/useDevice'
import { useAfterMountEffect } from '@lib/hooks/useAfterMountEffect'
import { isMobile } from '@/lib/helpers'

export default function Modal() {
  const animationManager = useRef<ReturnType<typeof ModalAnimationManager> | null>(null)
  const [openDone, setOpenDone] = useState(false)
  const { toggleModal, modalContent, isModalOpen, isModalClosing, forceCloseModal } = useContext(ModalContext)
  const isMobileModal = useDevice('modal')
  const [initModalType, setInitModalType] = useState<'mobile' |'desktop' | null>(null)
  const modalContainerEl = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    animationManager.current = ModalAnimationManager({
      modalContainer: styles.modalContainer,
      modalInner: styles.modalInner,
      backdrop: styles.backdrop,
      dimensions: CONSTANTS.MODAL_DIMENSIONS_DESKTOP,
    })
    setInitModalType(isMobile('modal') ? 'mobile' : 'desktop')
  }, [])

  useEffect(() => {
    console.log('isMobileModal', isMobileModal)
    if (!isModalOpen) return

    animationManager.current?.openAnimation().then(() => {
      setOpenDone(true)
    })
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalClosing) return

    animationManager.current?.closeAnimation()
  }, [isModalClosing])

  useAfterMountEffect(() => {
    const newModalType = isMobile('modal') ? 'mobile' : 'desktop'
    if (initModalType && initModalType !== newModalType) {
      toggleModal()
      setInitModalType(newModalType)
    }
  }, [isMobileModal])

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
      <div ref={modalContainerEl} className={styles.modalContainer}>
        <div className={styles.modalInner}>{modalContent}</div>
      </div>
    </div>
  )
}

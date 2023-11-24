'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useDevice } from '@/lib/hooks/useDevice'
import styles from './styles.module.scss'
import DesktopLayout from '@components/Layout/DesktopLayout/DesktopLayout'
import MobileLayout from '@components/Layout/MobileLayout/MobileLayout'
import { ModalContext } from '@context/ModalContext'
import Modal from '@components/Modal/Modal'

export default function LayoutCheck({ children }: { children: React.ReactNode }) {
  const isMobile = useDevice()
  const { isModalOpen } = useContext(ModalContext)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {isModalOpen && <Modal />}
      {!isMounted && <div className={styles.unmounted} />}
      {isMounted && (isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>)}
    </>
  )
}

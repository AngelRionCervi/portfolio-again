'use client'

import { createContext, useState } from 'react'
import CONSTANTS from '@constants'

export interface ModalContextProps {
  isModalOpen: boolean
  isModalClosing: boolean
  modalContent: React.ReactNode | null
  toggleModal: () => void
  setModalContent: (component: React.ReactNode) => void
  forceCloseModal: () => void
}

const defaultContextValues: ModalContextProps = Object.freeze({
  isModalOpen: false,
  isModalClosing: false,
  modalContent: null,
  toggleModal: () => {},
  setModalContent: () => {},
  forceCloseModal: () => {},
})

export const ModalContext = createContext<ModalContextProps>(defaultContextValues)

export default function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalClosing, setModalClosing] = useState(false)
  const [modalContent, setModalChild] = useState<React.ReactNode | null>(null)

  function toggleModal() {
    if (isModalOpen) {
      closeModal()
    } else {
      setModalOpen(true)
    }
  }

  function closeModal() {
    setModalClosing(true)

    setTimeout(() => {
      setModalOpen(false)
      setModalClosing(false)
    }, CONSTANTS.MODAL_CLOSE_ANIMATION_DURATION)
  }

  function setModalContent(component: React.ReactNode) {
    setModalChild(component)
  }

  function forceCloseModal() {
    setModalOpen(false)
    setModalClosing(false)
  }

  return (
    <ModalContext.Provider value={{ toggleModal, setModalContent, forceCloseModal, isModalClosing, isModalOpen, modalContent }}>
      {children}
    </ModalContext.Provider>
  )
}

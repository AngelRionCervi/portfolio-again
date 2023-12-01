'use client'

import styles from './style.module.scss'
import { useContext, useEffect, useState } from 'react'
import ButtonCube from '@components/ButtonCube/ButtonCube'
import { ModalContext } from '@/context/ModalContext'
import WorkModalContent, { WorkModalContentProps } from '@/components/WorkModalContent/WorkModalContent'
import { ThemeContext } from '@/context/ThemeContext'

export default function Work() {
  const { setModalContent, toggleModal } = useContext(ModalContext)
  const [display, setDisplay] = useState(true)
  const { currentTheme } = useContext(ThemeContext)

  function onFrameButtonClick(id: WorkModalContentProps['id']) {
    setModalContent(<WorkModalContent id={id} />)
    toggleModal()
  }

  // pretty bad but works for updating animejs color transitions
  useEffect(() => {
    setDisplay(false)
    setTimeout(() => setTimeout(() => setDisplay(true)))
  }, [currentTheme])

  return (
    <div className={styles.workContainer}>
      <div className={styles.workButtons}>
        {display && (
          <>
            <ButtonCube onClick={onFrameButtonClick} id="dmag" size={150}>
              Draw Me A Garden
            </ButtonCube>
            <ButtonCube onClick={onFrameButtonClick} id="mashup" size={150}>
              Mashup Studio
            </ButtonCube>
            <ButtonCube onClick={onFrameButtonClick} id="tripica" size={150}>
              tripica
            </ButtonCube>
            <ButtonCube onClick={onFrameButtonClick} id="cryptonovae" size={150}>
              Cryptonovae
            </ButtonCube>
            <ButtonCube onClick={onFrameButtonClick} id="francetv" size={150}>
              France TV
            </ButtonCube>
          </>
        )}
      </div>
    </div>
  )
}

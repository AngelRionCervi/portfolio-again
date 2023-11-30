'use client'

import styles from './style.module.scss'
import { useContext } from 'react'
import ButtonCube from '@components/ButtonCube/ButtonCube'
import { ModalContext } from '@/context/ModalContext'
import WorkModalContent, { WorkModalContentProps } from '@/components/WorkModalContent/WorkModalContent'

export default function Work() {
  const { setModalContent, toggleModal } = useContext(ModalContext)

  function onFrameButtonClick(id: WorkModalContentProps['id']) {
    console.log('id eheheeh', id)
    setModalContent(<WorkModalContent id={id} />)
    toggleModal()
  }

  return (
    <div className={styles.workContainer}>
      <div className={styles.workButtons}>
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
      </div>
    </div>
  )
}

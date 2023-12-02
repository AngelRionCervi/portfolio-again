'use client'

import classNames from 'classnames'
import styles from './style.module.scss'
import { useContext } from 'react'
import ButtonCube from '@components/ButtonCube/ButtonCube'
import { ModalContext } from '@/context/ModalContext'
import WorkModalContent, { WorkModalContentProps } from '@/components/WorkModalContent/WorkModalContent'

const cn = classNames.bind(styles)

export default function Work() {
  const { setModalContent, toggleModal } = useContext(ModalContext)

  function onFrameButtonClick(id: WorkModalContentProps['id']) {
    setModalContent(<WorkModalContent id={id} />)
    toggleModal()
  }

  return (
    <div className={styles.workContainer}>
      <div className={styles.workButtons}>
        <div className={styles.workButtonsInner}>
          <ButtonCube onClick={onFrameButtonClick} id="francetv" size={150}>
            <div className={cn([styles.buttonCubeContent, styles.frtv])}>
              <p>France</p>
              <p>TV</p>
            </div>
          </ButtonCube>
          <ButtonCube onClick={onFrameButtonClick} id="cryptonovae" size={150}>
            <div className={cn([styles.buttonCubeContent, styles.cryptonovae])}>cryptonovae</div>
          </ButtonCube>
          <ButtonCube onClick={onFrameButtonClick} id="tripica" size={150}>
            <div className={cn([styles.buttonCubeContent, styles.tripica])}>tripica</div>
          </ButtonCube>
          <ButtonCube onClick={onFrameButtonClick} id="mashup" size={150}>
            <div className={cn([styles.buttonCubeContent, styles.mashup])}>
              <div>
                <p>Mashup</p>
                <p>Studio</p>
              </div>
            </div>
          </ButtonCube>
          <ButtonCube onClick={onFrameButtonClick} id="dmag" size={150}>
            <div className={cn([styles.buttonCubeContent, styles.dmag])}>
              <p>Draw me</p>
              <p>a</p>
              <p>Garden</p>
            </div>
          </ButtonCube>
        </div>
      </div>
    </div>
  )
}

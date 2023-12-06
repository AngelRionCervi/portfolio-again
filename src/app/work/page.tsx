'use client'

import classNames from 'classnames'
import styles from './style.module.scss'
import { useContext } from 'react'
import ButtonCube from '@components/ButtonCube/ButtonCube'
import { ModalContext } from '@/context/ModalContext'
import WorkModalContent, { WorkModalContentProps } from '@/components/WorkModalContent/WorkModalContent'
import { useDevice } from '@/lib/hooks/useDevice'
import { sleep } from '@/lib/helpers'
import PageContentTransition from '@components/Animation/PageContentTransition'

const cn = classNames.bind(styles)

export default function Work() {
  const { setModalContent, toggleModal } = useContext(ModalContext)
  const isMobile = useDevice('modal')

  async function onFrameButtonClick(id: WorkModalContentProps['id']) {
    if (isMobile) {
      await sleep(100)
    }
    setModalContent(<WorkModalContent id={id} />)
    toggleModal()
  }

  return (
    <PageContentTransition>
      <div className={styles.workContainer}>
        <p className={styles.workWords}>
          I have been able to work for multiple companies in the past few years, the challenges has been varied and I feel lucky to have met so many
          cool people to work with.
        </p>
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
    </PageContentTransition>
  )
}

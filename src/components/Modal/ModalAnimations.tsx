import anime from 'animejs'
import CONSTANTS from '@constants'

interface ModalAnimationManagerProps {
  modalContainer: string
  modalInner: string
  backdrop: string
  dimensions: { width: number; height: number }
}

export default function ModalAnimationManager({ modalContainer, modalInner, backdrop, dimensions }: ModalAnimationManagerProps) {
  return {
    openAnimation() {
      const openAnimations = []

      openAnimations[0] = anime({
        targets: `.${backdrop}`,
        backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)'],
        easing: 'easeOutExpo',
        duration: CONSTANTS.MODAL_BACKDROP_ANIMATION_DURATION,
      })

      openAnimations[1] = anime({
        targets: `.${modalContainer}`,
        height: ['0', `${dimensions.height}px`],
        easing: 'easeOutExpo',
        duration: CONSTANTS.MODAL_OPEN_ANIMATION_DURATION,
        direction: 'forward',
      })

      openAnimations[2] = anime({
        targets: `.${modalInner}`,
        opacity: [0, 1],
        easing: 'linear',
        direction: 'forward',
        duration: 100,
        delay: 100,
      })

      return Promise.all(openAnimations.map((an) => an.finished))
    },
    closeAnimation() {
      const closeAnimations = []

      closeAnimations[0] = anime({
        targets: `.${backdrop}`,
        backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)'],
        easing: 'easeInExpo',
        duration: CONSTANTS.MODAL_BACKDROP_ANIMATION_DURATION * 2,
        direction: 'reverse',
      })

      closeAnimations[1] = anime({
        targets: `.${modalContainer}`,
        height: ['0', `${dimensions.height}px`],
        backgroundColor: ['white', 'black'],
        easing: 'easeInExpo',
        duration: CONSTANTS.MODAL_CLOSE_ANIMATION_DURATION * 0.5,
        direction: 'reverse',
      })

      closeAnimations[2] = anime({
        targets: `.${modalInner}`,
        opacity: [0.5, 0],
        easing: 'linear',
        direction: 'forward',
        duration: 10,
      })

      closeAnimations[3] = anime({
        targets: `.${modalContainer}`,
        width: `${dimensions.width / 4}`,
        easing: 'easeOutExpo',
        duration: 150,
        delay: 175,
      })

      closeAnimations[4] = anime({
        targets: `.${modalContainer}`,
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 100,
        delay: 275,
      })

      return Promise.all(closeAnimations.map((an) => an.finished))
    },
  }
}

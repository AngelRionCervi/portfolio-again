import anime from 'animejs'
import CONSTANTS from '@constants'

interface ModalAnimationSelector {
  modalContainer: string
  modalInner: string
  backdrop: string
}

export function modalAnimation(
  { modalContainer, modalInner, backdrop }: ModalAnimationSelector,
  dimensions: { width: number; height: number },
  reverse: boolean = false
) {
  const animations = []

  const backdropAnim = anime({
    targets: `.${backdrop}`,
    backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)'],
    easing: reverse ? 'easeInExpo' : 'easeOutExpo',
    duration: CONSTANTS.MODAL_BACKDROP_ANIMATION_DURATION,
    direction: reverse ? 'reverse' : 'forward',
  })

  const containerAnim = anime({
    targets: `.${modalContainer}`,
    height: ['0', `${dimensions.height}px`],
    backgroundColor: ['white', 'black'],
    easing: reverse ? 'easeInExpo' : 'easeOutExpo',
    duration: reverse ? CONSTANTS.MODAL_CLOSE_ANIMATION_DURATION * 0.5 : CONSTANTS.MODAL_OPEN_ANIMATION_DURATION,
    direction: reverse ? 'reverse' : 'forward',
  })

  const innerAnim = anime({
    targets: `.${modalInner}`,
    opacity: [0, 1],
    easing: 'linear',
    direction: reverse ? 'reverse' : 'forward',
    duration: 100,
    delay: 100,
  })

  animations.push(backdropAnim, containerAnim, innerAnim)

  if (reverse) {
    const rev1Anim = anime({
      targets: `.${modalContainer}`,
      width: `${dimensions.width / 4}`,
      easing: 'easeOutExpo',
      duration: 150,
      delay: 175,
    })

    const rev2Anim = anime({
      targets: `.${modalContainer}`,
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 100,
      delay: 275,
    })

    animations.push(rev1Anim, rev2Anim)
  }

  return Promise.all(animations.map((an) => an.finished))
}

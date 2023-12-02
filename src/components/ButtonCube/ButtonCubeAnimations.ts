import anime, { AnimeInstance } from 'animejs'

export type AnimationType = 'idle' | 'enter' | 'leave' | 'down' | 'up'

interface ButtonCubeAnimationElements {
  id: string
  aboveFrame: string
  belowFrame: string
  triangleTopContainer: string
  triangleBottomContainer: string
}

const idleDuration = 1200
const hoverDuration = 400
const clickDuration = 50
const animationTypes = ['idle', 'enter', 'leave', 'down', 'up'] as const

export default function ButtonCubeAnimationManager({
  id,
  aboveFrame,
  belowFrame,
  triangleTopContainer,
  triangleBottomContainer,
}: ButtonCubeAnimationElements) {
  const animations: Record<AnimationType, Array<AnimeInstance>> = {
    idle: [],
    enter: [],
    leave: [],
    down: [],
    up: [],
  }

  let currentAnimationType: AnimationType = 'idle'

  function setCurrentAnimation(animType: AnimationType) {
    animations[animType].splice(0, animations[animType].length)
    currentAnimationType = animType

    animationTypes.forEach((type) => {
      if (type !== animType) {
        animations?.[type].forEach((animInstance) => {
          animInstance.pause()
        })
      }
    })
  }

  function getAnimeState() {
    const animationsPromise = Promise.all(animations[currentAnimationType].map((an) => an.finished))

    return { currentAnimationType, animationsPromise }
  }

  return {
    idleAnimation() {
      setCurrentAnimation('idle')
      const idleAboveFrame = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: [
          { value: '-3px 3px', easing: 'easeInOutQuad', duration: idleDuration },
          { value: '0px 0px', easing: 'easeInOutQuad', duration: idleDuration },
        ],
        loop: true,
      })

      const idleTriangles = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: [
          { value: 0.85, easing: 'easeInOutQuad', duration: idleDuration },
          { value: 1, easing: 'easeInOutQuad', duration: idleDuration },
        ],
        loop: true,
      })

      animations.idle.push(idleAboveFrame, idleTriangles)

      return getAnimeState()
    },
    enterAnimation() {
      setCurrentAnimation('enter')

      const enterAboveFrame = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: '-10px 10px',
        easing: 'easeInOutQuad',
        duration: hoverDuration,
      })

      const enterTrianglesContainer = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: 0.4,
        easing: 'easeInOutQuad',
        duration: hoverDuration,
      })

      animations.enter.push(enterAboveFrame, enterTrianglesContainer)

      return getAnimeState()
    },
    leaveAnimation() {
      setCurrentAnimation('leave')

      const leaveAboveFrame = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: '0px 0px',
        easing: 'easeInOutQuad',
        duration: hoverDuration,
      })

      const leaveTrianglesContainer = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: 1,
        easing: 'easeInOutQuad',
        duration: hoverDuration,
      })
      
      animations.leave.push(leaveAboveFrame, leaveTrianglesContainer)

      return getAnimeState()
    },
    downAnimation() {
      setCurrentAnimation('down')

      const clickAboveFrame = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: '-15px 15px',
        easing: 'easeInOutQuad',
        duration: clickDuration,
      })

      const downTrianglesContainer = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: 0,
        easing: 'easeInOutQuad',
        duration: clickDuration,
      })

      animations.leave.push(clickAboveFrame, downTrianglesContainer)

      return getAnimeState()
    },
    upAnimation() {
      setCurrentAnimation('up')

      const clickAboveFrame = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: '-10px 10px',
        easing: 'easeInOutQuad',
        duration: clickDuration,
      })

      const upTrianglesContainer = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: 0.4,
        easing: 'easeInOutQuad',
        duration: clickDuration,
      })

      animations.leave.push(clickAboveFrame, upTrianglesContainer)

      return getAnimeState()
    }
  }
}

import anime, { AnimeInstance } from 'animejs'

type AnimationType = 'idle' | 'enter' | 'leave'

interface ButtonCubeAnimationElements {
  id: string
  container: string
  aboveFrame: string
  belowFrame: string
  triangleTopContainer: string
  triangleBottomContainer: string
}

export default function AnimationManager({
  id,
  container,
  aboveFrame,
  belowFrame,
  triangleTopContainer,
  triangleBottomContainer,
}: ButtonCubeAnimationElements) {
  const animations: Record<AnimationType, Array<AnimeInstance>> = {
    idle: [],
    enter: [],
    leave: [],
  }

  function pauseOtherAnimations(animType: AnimationType) {
    const animationTypes: Array<AnimationType> = ['idle', 'enter', 'leave']

    animationTypes.forEach((type) => {
      if (type !== animType && animations[type]) {
        animations?.[type].forEach((animInstance) => {
          animInstance.pause()
        })
      }
    })
  }

  return {
    idleAnimation() {
      pauseOtherAnimations('idle')
      const one = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: [
          { value: '-3px 3px', easing: 'easeInOutQuad', duration: 1200 },
          { value: '0px 0px', easing: 'easeInOutQuad', duration: 1200 },
        ],
        loop: true,
      })
      const two = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: [
          { value: 0.85, easing: 'easeInOutQuad', duration: 1200 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        loop: true,
      })

      animations.idle.splice(0, animations.idle.length)
      animations.idle.push(one, two)
    },
    enterAnimation() {
      pauseOtherAnimations('enter')
      const one = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: [{ value: '-10px 10px', easing: 'easeInOutQuad', duration: 500 }],
      })

      const two = anime({
        targets: `#${id} > .${belowFrame}`,
        backgroundColor: 'white',
        easing: 'easeInOutQuad',
        duration: 500,
      })

      const three = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: [{ value: 0.33, easing: 'easeInOutQuad', duration: 1200 }],
      })

      animations.enter.splice(0, animations.enter.length)
      animations.enter.push(one, two, three)
    },
    leaveAnimation() {
      pauseOtherAnimations('leave')
      const one = anime({
        targets: `#${id} > .${aboveFrame}`,
        translate: [{ value: '0px 0px', easing: 'easeInOutQuad', duration: 500 }],
      })

      const two = anime({
        targets: `#${id} > .${belowFrame}`,
        backgroundColor: 'black',
        easing: 'easeInOutQuad',
        duration: 500,
      })

      const three = anime({
        targets: `#${id} > .${triangleTopContainer}, #${id} > .${triangleBottomContainer}`,
        scale: [{ value: 1, easing: 'easeInOutQuad', duration: 500 }],
      })

      animations.leave.splice(0, animations.leave.length)
      animations.leave.push(one, two, three)

      return Promise.all(animations.leave.map((an) => an.finished))
    },
  }
}

import ReactDOMServer from 'react-dom/server'
import anime from 'animejs'
import { Frames } from '@context/LeftMenuAnimationContext'

interface StartAnimationProps {
  aboveFrame: string
  triangleTopContainer: string
  triangleBottomContainer: string
  newPageFrames: Frames[keyof Frames]
}

let instances = 0

export function startAnimation({ aboveFrame, triangleTopContainer, triangleBottomContainer, newPageFrames }: StartAnimationProps) {
  const alreadyDoneIds: Array<number> = []
  const newPageSvgs = newPageFrames.map((frame) => ReactDOMServer.renderToStaticMarkup(frame()))

  instances++

  anime({
    targets: `.${aboveFrame} > svg`,
    translate: [
      { value: '-15px 15px', easing: 'easeOutSine', duration: 500 },
      { value: '0px 0px', easing: 'easeInOutQuad', duration: 1200 },
    ],
    delay: anime.stagger(200, { grid: [6, 6], from: anime.random(0, newPageFrames.length - 1) }),
    begin({ animations }) {
      const topLeftAnim = animations[0]
      const bottomRightAnim = animations[animations.length - 1]

      anime({
        targets: `.${triangleTopContainer}`,
        scale: [
          { value: 0, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: topLeftAnim.delay,
      })
      anime({
        targets: `.${triangleBottomContainer}`,
        scale: [
          { value: 0, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: bottomRightAnim.delay,
      })
    },
    update({ animations, animatables }) {
      animations.forEach((animation, index) => {
        const { animatable } = animation
        const translateValues = animation.currentValue.split(' ').map((valPx) => Math.abs(Math.round(parseFloat(valPx))))
        animatable.target.style.zIndex = (animatables.length - (translateValues[0] + translateValues[1])).toString()

        if (translateValues[0] + translateValues[1] >= 30 && !alreadyDoneIds.includes(animatable.id)) {
          alreadyDoneIds.push(animatable.id)
          animatable.target.innerHTML = newPageSvgs[index]
        }
      })
    },
    complete({ animatables }) {
      instances--
      console.log('instances', instances, alreadyDoneIds.length, animatables.length)
      if (instances === 0) {
        animatables.forEach((animatable, index) => {
          animatable.target.innerHTML = newPageSvgs[index]
        })
      }
    },
  })
}

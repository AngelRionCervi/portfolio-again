import ReactDOMServer from 'react-dom/server'
import anime from 'animejs'
import { Frames } from '@context/LeftMenuAnimationContext'
import { sleep } from '@lib/helpers'
import { background } from '@styles/variables.module.scss'

interface StartAnimationProps {
  aboveFrame: string
  triangleTopContainer: string
  triangleBottomContainer: string
  newPageFrames: Frames[keyof Frames]
}

const maxClickBeforeTroll = 8

export default function AnimationManager() {
  const queue: Array<StartAnimationProps> = []
  let trollCount = 0

  function startAnimation({ aboveFrame, triangleTopContainer, triangleBottomContainer, newPageFrames }: StartAnimationProps) {
    const alreadyDoneIds: Array<number> = []
    const newPageSvgs = newPageFrames.map((frame) => ReactDOMServer.renderToStaticMarkup(frame()))

    return anime({
      targets: `.${aboveFrame} > div`,
      translate: [
        { value: '-15px 15px', easing: 'easeOutSine', duration: 500 },
        { value: '0px 0px', easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [6, 6], from: anime.random(0, newPageFrames.length - 1) }),
      round: 10,
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
          round: 10,
        })
        anime({
          targets: `.${triangleBottomContainer}`,
          scale: [
            { value: 0, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1200 },
          ],
          delay: bottomRightAnim.delay,
          round: 10,
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
    })
  }

  function noNoYouHaveToStop(anInfo: StartAnimationProps) {
    ItsAllOver(anInfo)
  }

  function plsStopThis(anInfo: StartAnimationProps) {
    noNoYouHaveToStop(anInfo)
  }

  async function ItsAllOver({ aboveFrame, triangleTopContainer, triangleBottomContainer }: StartAnimationProps) {
    console.error(new Error('here is an angry red text for you >:('))

    const roundAnim = anime({
      targets: `.${aboveFrame} > div > svg`,
      borderRadius: '100%',
      easing: 'easeOutSine',
      duration: 500,
    })

    const scaleAnim = anime({
      targets: `.${aboveFrame} > div`,
      scale: 0,
      opacity: 0,
      easing: 'linear',
      duration: 1200,
    })

    const triangleAnim = anime({
      targets: `.${triangleTopContainer}, .${triangleBottomContainer}`,
      opacity: 0,
      easing: 'linear',
      duration: 500,
    })

    await Promise.all([roundAnim.finished, scaleAnim.finished, triangleAnim.finished])

    const aboveFrameEl = document.querySelector(`.${aboveFrame}`) as HTMLElement

    aboveFrameEl.innerText = "It's broken now :/"
    aboveFrameEl.style.display = 'block'
    aboveFrameEl.style.color = background
    aboveFrameEl.style.translate = '-15px 15px'
  }

  async function resetTrollCount() {
    await sleep(5000)

    trollCount = 0
    resetTrollCount()
  }

  function heyYouStop() {
    if (trollCount >= maxClickBeforeTroll) {
      plsStopThis(queue[0])
      queue.splice(0, queue.length)
      trollCount = 0

      return true
    }

    return false
  }

  async function loopOnQueue() {
    const isTrolled = heyYouStop()

    if (isTrolled) {
      return
    }

    if (queue.length) {
      const last = queue.pop()
      queue.splice(0, queue.length)
      if (last) {
        await startAnimation(last).finished
      }
    }
    await sleep(50)

    loopOnQueue()
  }

  resetTrollCount()

  return {
    addToQueue(anInfo: StartAnimationProps) {
      queue.push(anInfo)
      trollCount++
    },
    startLoop() {
      loopOnQueue()
      heyYouStop()
    },
  }
}

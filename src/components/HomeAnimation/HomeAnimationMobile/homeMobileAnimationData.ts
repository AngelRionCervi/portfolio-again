import anime from 'animejs'
import cssVariables from '@styles/variables.module.scss'

const doorWidth = 75
const animeInstances: Array<number> = []

interface HomeMobileAnimationProps {
  doors: [string, string]
  words: [string, string]
}

export default function homeMobileAnimation({ doors, words }: HomeMobileAnimationProps) {
  animeInstances.push(
    window.setTimeout(() => {
      const doorsAnimation = anime.timeline({
        easing: 'easeInOutSine',
        direction: 'forward',
        duration: 500,
      })

      doorsAnimation.add({
        targets: `.${doors[0]} > div`,
        width: doorWidth,
      })

      doorsAnimation.add({
        targets: `.${doors[0]} > div`,
        height: 15,
        duration: 300,
        begin() {
          const doorElem = document.querySelector(`.${doors[0]} > div`) as HTMLDivElement
          if (doorElem) {
            doorElem.style.border = `1px solid ${cssVariables.black}`
          }
        },
      })

      doorsAnimation.add({
        targets: `.${words[0]} > div`,
        left: 260,
        duration: 500,
      })

      doorsAnimation.add({
        targets: `.${doors[1]} > div`,
        width: doorWidth,
      })

      doorsAnimation.add({
        targets: `.${doors[1]} > div`,
        height: 15,
        duration: 300,
        begin({ animatables }) {
          animatables[0].target.style.border = `1px solid ${cssVariables.black}`
        },
      })

      doorsAnimation.add({
        targets: `.${words[1]} > div`,
        left: 260,
        duration: 500,
      })

      doorsAnimation.add({
        targets: `.${doors[0]} > div, .${doors[1]} > div`,
        delay: 200,
        height: 0,
        complete({ animatables }) {
          animatables.forEach((animatable) => {
            animatable.target.style.border = 'none'
          })
        },
      })
    })
  )
}

export function stopAnimationMobile() {
  animeInstances.forEach((timeout: number) => clearTimeout(timeout));
}

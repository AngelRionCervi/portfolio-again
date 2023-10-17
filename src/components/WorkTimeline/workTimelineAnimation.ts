import anime from 'animejs'

const barsDelay = 32;
const animeInstances: Array<number> = [];

function toggleHideShowElements(selector: string, show: boolean) {
  document.querySelectorAll(selector).forEach((el) => {
    ; (el as HTMLElement).style.display = show ? 'block' : 'none'
  })
}

export default function workTimelineAnimation(selector: string) {
  toggleHideShowElements(
    `${selector} .bar-1, .bar-2, .bar-3, .company-bar-h-1, .company-bar-h-2, .company-bar-v, .year-bar, .company-bubble, .years, .question-mark`,
    false
  )

  anime({
    targets: `${selector} .main-line`,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    direction: 'forward',
    duration: 2500,
  })

  animeInstances.push(window.setTimeout(() => {
    toggleHideShowElements(`${selector} .bar-1`, true)
    anime({
      targets: `${selector} .bar-1`,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 150,
      direction: 'forward',
      delay: (_, i) => i * barsDelay,
    })
  }, 260))

  animeInstances.push(window.setTimeout(() => {
    toggleHideShowElements(`${selector} .bar-2`, true)
    anime({
      targets: `${selector} .bar-2`,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 150,
      direction: 'forward',
      delay: (_, i) => i * barsDelay,
    })
  }, 1000))

  animeInstances.push(window.setTimeout(() => {
    toggleHideShowElements(`${selector} .bar-3`, true)
    anime({
      targets: `${selector} .bar-3`,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 150,
      direction: 'forward',
      delay: (_, i) => i * barsDelay,
    })
  }, 1600))

  animeInstances.push(window.setTimeout(() => {
    toggleHideShowElements(`${selector} .company-bar-h-1, .company-bar-h-2`, true)
    anime({
      targets: `${selector} .company-bar-h-1`,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      direction: 'forward',
      duration: 350,
    })

    anime({
      targets: `${selector} .company-bar-h-2`,
      strokeDashoffset: [anime.setDashoffset, 70],
      easing: 'easeOutSine',
      duration: 350,
    })
  }, 2550))

  animeInstances.push(window.setTimeout(() => {
    toggleHideShowElements(`${selector} .company-bubble, .years`, true)
    anime({
      targets: `${selector} .company-bubble`,
      opacity: [0, 1],
      easing: 'easeInSine',
      direction: 'forward',
      duration: 350,
    })
  }, 2800))

  animeInstances.push(window.setTimeout(() => {
    toggleHideShowElements(`${selector} .question-mark`, true)
    anime({
      targets: `${selector} .question-mark`,
      opacity: [0, 1],
      rotate: 360,
      scale: [0.5, 1.5, 1],
      easing: 'easeInSine',
      direction: 'forward',
      duration: 1500,
    })

    anime({
      targets: `${selector} .company-bubble a`,
      scale: [1, 1.5, 1],
      rotate: 360,
      easing: 'easeInOutSine',
      direction: 'forward',
      duration: 500,
    })
  }, 3200))
}

export function stopAnimation() {
  animeInstances.forEach((timeout: number) => clearTimeout(timeout));
}

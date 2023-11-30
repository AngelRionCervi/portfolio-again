import anime from 'animejs'
import { sleep, degToRad } from '@/lib/helpers'
import { ThemeType } from '@components/ThemeSwitcher/ThemeSwitcher'

interface ThemeSwitcherAnimationProps {
  id: string
}

export default class ThemeSwicthAnimationManager {
  id: ThemeSwitcherAnimationProps['id']

  stepDuration = 200
  rayAnimationDuration = 200
  instances: Array<ThemeType> = []
  degList = [0, 45, 90, 135, 180, 225, 270, 315]

  constructor({ id }: ThemeSwitcherAnimationProps) {
    this.id = id
  }

  switchLight() {
    const anims = []

    const innerCircleTimeline = anime.timeline({
      targets: `#${this.id} .innerCircle`,
      duration: this.stepDuration,
      easing: 'linear',
    })

    innerCircleTimeline.add({
      translateX: -5,
    })

    innerCircleTimeline.add({
      scale: 0.4,
    })

    anims.push(innerCircleTimeline)

    const outerCircleAnim = anime({
      targets: `#${this.id} .outerCircle`,
      scale: 0,
      duration: this.stepDuration,
      easing: 'linear',
      delay: this.stepDuration,
    })

    anims.push(outerCircleAnim)

    for (let i = 0; i < this.degList.length; i++) {
      const deg = this.degList[i]
      const length = 8
      const x = length * Math.cos(degToRad(deg))
      const y = length * Math.sin(degToRad(deg))

      anims.push(
        anime({
          targets: `#${this.id} .ray-${i + 1}`,
          translate: `${x}px ${y}px`,
          duration: this.rayAnimationDuration,
          easing: 'easeInSine',
          delay: this.stepDuration + ((i + 1) * this.rayAnimationDuration) / 2,
        })
      )
    }

    return Promise.all(anims.map((an) => an.finished))
  }

  switchDark() {
    const anims = []

    for (let i = 0; i < this.degList.length; i++) {
      const deg = this.degList[i]
      const length = 0
      const x = length * Math.cos(degToRad(deg))
      const y = length * Math.sin(degToRad(deg))

      anims.push(
        anime({
          targets: `#${this.id} .ray-${i + 1}`,
          translate: `${x}px ${y}px`,
          duration: this.rayAnimationDuration,
          easing: 'easeOutSine',
        })
      )
    }

    const innerCircleTimeline = anime.timeline({
      targets: `#${this.id} .innerCircle`,
      duration: this.stepDuration,
      easing: 'linear',
    })

    innerCircleTimeline.add({
      delay: this.stepDuration,
      scale: 1,
    })

    innerCircleTimeline.add({
      translateX: 0,
    })

    anims.push(innerCircleTimeline)

    const outerCircleAnim = anime({
      targets: `#${this.id} .outerCircle`,
      scale: 1,
      duration: this.stepDuration,
      easing: 'linear',
      delay: this.stepDuration,
    })

    anims.push(outerCircleAnim)

    return Promise.all(anims.map((an) => an.finished))
  }

  switchTheme(themeType: ThemeType) {
    this.instances.push(themeType)
  }

  async checkInstances() {
    if (!this.instances.length) return

    const lastInstance = this.instances.pop()
    this.instances = []
    if (lastInstance === 'dark') {
      await this.switchLight()
    } else if (lastInstance === 'light') {
      await this.switchDark()
    }
  }

  async loop() {
    await sleep(50)
    await this.checkInstances()

    this.loop()
  }
}

// function switchLight(id: string) {
//   const stepDuration = 200
//   const rayAnimationDuration = 200
//   switchLightRunning = true

//   anime({
//     targets: `#${id} .innerCircle`,
//     translateX: -5,
//     duration: stepDuration,
//     easing: 'linear',
//   })

//   anime({
//     targets: `#${id} .outerCircle`,
//     scale: 0,
//     duration: stepDuration,
//     easing: 'linear',
//     delay: stepDuration,
//   })

//   setTimeout(() => {
//     anime({
//       targets: `#${id} .innerCircle`,
//       scale: 0.4,
//       duration: stepDuration,
//       easing: 'linear',
//     })
//   }, stepDuration)

//   setTimeout(async () => {
//     const degList = [0, 45, 90, 135, 180, 225, 270, 315]

//     for (let i = 0; i < degList.length; i++) {
//       const deg = degList[i]
//       const length = 8
//       const x = length * Math.cos(degToRad(deg))
//       const y = length * Math.sin(degToRad(deg))

//       if (switchDarkRunning && switchLightRunning) {
//         return
//       }

//       await sleep(rayAnimationDuration / 2)

//       if (switchDarkRunning && switchLightRunning) {
//         return
//       }

//       anime({
//         targets: `#${id} .ray-${i + 1}`,
//         translate: `${x}px ${y}px`,
//         duration: rayAnimationDuration,
//         easing: 'easeInSine',
//       })

//       if (i === degList.length - 1) {
//         switchLightRunning = false
//       }
//     }
//   }, stepDuration)
// }

// function switchDark(id: string) {
//   const stepDuration = 200
//   const rayAnimationDuration = 200
//   switchDarkRunning = true

//   const degList = [0, 45, 90, 135, 180, 225, 270, 315]

//   for (let i = 0; i < degList.length; i++) {
//     const deg = degList[i]
//     const length = 0
//     const x = length * Math.cos(degToRad(deg))
//     const y = length * Math.sin(degToRad(deg))

//     anime({
//       targets: `#${id} .ray-${i + 1}`,
//       translate: `${x}px ${y}px`,
//       duration: rayAnimationDuration,
//       easing: 'easeOutSine',
//     })
//   }

//   setTimeout(() => {
//     anime({
//       targets: `#${id} .innerCircle`,
//       scale: 1,
//       duration: stepDuration,
//       easing: 'linear',
//     })

//     anime({
//       targets: `#${id} .outerCircle`,
//       scale: 1,
//       duration: stepDuration,
//       easing: 'linear',
//     })
//   }, stepDuration)

//   setTimeout(() => {
//     anime({
//       targets: `#${id} .innerCircle`,
//       translateX: 0,
//       duration: stepDuration,
//       easing: 'linear',
//     })

//     switchDarkRunning = false
//   }, stepDuration * 2)
// }

// export default function ThemeSwitcherAnimation({ id, theme }: ThemeSwitcherAnimationProps) {
//   if (!canRun) return

//   if (theme === 'dark') {
//     switchLight(id)
//   } else if (theme === 'light') {
//     switchDark(id)
//   }
//   canRun = false

//   timeout = setTimeout(() => {
//     console.log('can run')
//     canRun = true
//   }, 500)
// }

// function degToRad(deg: number) {
//   const pi = Math.PI
//   return deg * (pi / 180)
// }

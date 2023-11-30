import { sleep } from '@/lib/helpers'
import anime from 'animejs'
import { ThemeType } from '../ThemeSwitcher'

function degToRad(deg: number) {
  const pi = Math.PI
  return deg * (pi / 180)
}

interface ThemeSwitcherAnimationProps {
  id: string
}

export class ThemeSwicthAnimationManager {
  id: ThemeSwitcherAnimationProps['id']

  stepDuration = 200
  rayAnimationDuration = 200
  instances: Array<ThemeType> = []
  degList = [0, 45, 90, 135, 180, 225, 270, 315]

  constructor({ id }: ThemeSwitcherAnimationProps) {
    this.id = id
  }

  switchLight() {
    anime({
      targets: `#${this.id} .innerCircle`,
      translateX: -5,
      duration: this.stepDuration,
      easing: 'linear',
    })

    anime({
      targets: `#${this.id} .outerCircle`,
      scale: 0,
      duration: this.stepDuration,
      easing: 'linear',
      delay: this.stepDuration,
    })

    setTimeout(() => {
      anime({
        targets: `#${this.id} .innerCircle`,
        scale: 0.4,
        duration: this.stepDuration,
        easing: 'linear',
      })
    }, this.stepDuration)

    for (let i = 0; i < this.degList.length; i++) {
      const deg = this.degList[i]
      const length = 8
      const x = length * Math.cos(degToRad(deg))
      const y = length * Math.sin(degToRad(deg))

      anime({
        targets: `#${this.id} .ray-${i + 1}`,
        translate: `${x}px ${y}px`,
        duration: this.rayAnimationDuration,
        easing: 'easeInSine',
        delay: this.stepDuration + ((i + 1) * this.rayAnimationDuration) / 2,
      })
    }
  }

  switchDark() {
    for (let i = 0; i < this.degList.length; i++) {
      const deg = this.degList[i]
      const length = 0
      const x = length * Math.cos(degToRad(deg))
      const y = length * Math.sin(degToRad(deg))

      anime({
        targets: `#${this.id} .ray-${i + 1}`,
        translate: `${x}px ${y}px`,
        duration: this.rayAnimationDuration,
        easing: 'easeOutSine',
      })
    }

    setTimeout(() => {
      anime({
        targets: `#${this.id} .innerCircle`,
        scale: 1,
        duration: this.stepDuration,
        easing: 'linear',
      })

      anime({
        targets: `#${this.id} .outerCircle`,
        scale: 1,
        duration: this.stepDuration,
        easing: 'linear',
      })
    }, this.stepDuration)

    setTimeout(() => {
      anime({
        targets: `#${this.id} .innerCircle`,
        translateX: 0,
        duration: this.stepDuration,
        easing: 'linear',
      })
    }, this.stepDuration * 2)
  }

  switchTheme(themeType: ThemeType) {
    this.instances.push(themeType)
  }

  checkInstances() {
    const lastInstance = this.instances.pop()

    if (lastInstance === 'dark') {
      this.switchLight()
    } else if (lastInstance === 'light') {
      this.switchDark()
    }
  }

  async loop() {
    await sleep(50)

    this.checkInstances()
    this.instances = []
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

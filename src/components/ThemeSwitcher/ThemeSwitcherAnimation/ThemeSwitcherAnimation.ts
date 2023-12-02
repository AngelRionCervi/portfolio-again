import anime from 'animejs'
import { sleep, degToRad } from '@/lib/helpers'
import { ThemeType } from '@context/ThemeContext'

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
      translate: "-5px 0px",
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
      translate: "0px 0px",
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

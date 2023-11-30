import anime from 'animejs'
import CONSTANTS from '@constants'
import { WorkModalTimeProps } from './WorkModalTime'

interface WorkModalTimeAnimationProps {
  tube: string
  circle: string
  dates: { top: string; bottom: string }
  periode: WorkModalTimeProps['periode']
  monthLabels: Array<string>
}

function getDates(periode: WorkModalTimeProps['periode'], monthLabels: Array<string>) {
  const generatedDates: Array<{ month: string; year: number }> = []
  const [indexStart, indexEnd] = [monthLabels.indexOf(monthLabels[periode.start[0]]), monthLabels.indexOf(monthLabels[periode.end[0]])]

  generatedDates.push(...monthLabels.slice(indexStart - 1).map((month) => ({ month, year: periode.start[1] })))

  for (let i = 1; i < Math.max(0, periode.end[1] - periode.start[1]); i++) {
    generatedDates.push(...monthLabels.map((month) => ({ month, year: periode.start[1] + i })))
  }

  generatedDates.push(...monthLabels.slice(0, indexEnd).map((month) => ({ month, year: periode.end[1] })))

  return generatedDates
}

export function workModalTimeAnimation({ dates, tube, circle, periode, monthLabels }: WorkModalTimeAnimationProps) {
  const duration = 1250
  const easing = 'easeOutQuad'
  const dateBottomEls = document.querySelectorAll(`.${dates.bottom} > p`) as NodeListOf<HTMLElement>
  const generatedDates = getDates(periode, monthLabels)
  const circleDiameter = parseInt(getComputedStyle(document.body).getPropertyValue('--workCircleDiameter'))
  const isMobile = window.innerWidth < CONSTANTS.MOBILE_BREAKPOINT

  const time = {
    index: 0,
  }

  if (isMobile) {
    anime({
      targets: `.${tube}`,
      width: window.innerWidth - 32,
      duration,
      easing,
    })
    anime({
      targets: `.${circle}`,
      left: window.innerWidth - 32 - circleDiameter - 2,
      duration,
      easing,
    })
  } else {
    anime({
      targets: `.${tube}`,
      height: CONSTANTS.MODAL_DIMENSIONS_DESKTOP.height - CONSTANTS.WORK_MODAL_PADDING * 2,
      duration,
      easing,
    })
    anime({
      targets: `.${circle}`,
      top: CONSTANTS.MODAL_DIMENSIONS_DESKTOP.height - circleDiameter - CONSTANTS.WORK_MODAL_PADDING * 2 - 2,
      duration,
      easing,
    })
  }

  anime({
    targets: time,
    index: generatedDates.length - 1,
    round: 1,
    duration,
    easing,
    update() {
      dateBottomEls[0].innerText = `${generatedDates[time.index].month}.`
      dateBottomEls[1].innerText = generatedDates[time.index].year.toString()
    },
  })
}

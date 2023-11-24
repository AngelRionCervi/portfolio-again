import anime from 'animejs'
import CONSTANTS from '@constants'
import { WorkModalTimeProps } from './WorkModalTime'

interface WorkModalTimeAnimationProps {
  tube: string
  circle: string
  container: string
  dates: { top: string; bottom: string }
  circleDiameter: number
  periode: WorkModalTimeProps['periode']
}

export function workModalTimeAnimation({ container, dates, tube, circle, circleDiameter, periode }: WorkModalTimeAnimationProps) {
  const duration = 10000
  const monthLabels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  const dateBottomEls = document.querySelectorAll(`.${dates.bottom} > p`) as NodeListOf<HTMLElement>

  const time = {
    endMonth: periode.start[0],
    endYear: periode.start[1],
  }

  const tubeAnim = anime({
    targets: `.${tube}`,
    height: CONSTANTS.MODAL_DIMENSIONS.height - CONSTANTS.WORK_MODAL_PADDING * 2,
    duration,
    easing: 'easeOutQuad',
  })

  const circleAnim = anime({
    targets: `.${circle}`,
    top: CONSTANTS.MODAL_DIMENSIONS.height - circleDiameter - CONSTANTS.WORK_MODAL_PADDING * 2 - 2,
    duration,
    easing: 'easeOutQuad',
  })

  const timeAnim = anime({
    targets: time,
    endMonth: periode.end[0],
    endYear: periode.end[1],
    round: 1,
    duration,
    easing: 'easeOutQuad',
    update() {
      dateBottomEls[0].innerText = monthLabels[time.endMonth - 1]
      dateBottomEls[1].innerText = time.endYear.toString()
    },
  })
}

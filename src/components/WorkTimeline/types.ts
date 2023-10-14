interface PlusPayload {
  name: string
  x: number
  y: number
}

interface SvgWorkTimelineProps {
  onPlusClick: (plusPayload: PlusPayload) => void
}
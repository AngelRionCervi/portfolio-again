interface PlusPayload {
  name: string
  x: number
  y: number
  size: number
}

interface SvgWorkTimelineProps {
  onPlusClick: (plusPayload: PlusPayload) => void
}
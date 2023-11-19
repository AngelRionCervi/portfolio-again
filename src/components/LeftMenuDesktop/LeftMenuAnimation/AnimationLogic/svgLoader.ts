import { ROUTES } from '@/constants/routes'

const FRAME_COUNT = 36

export async function getSvgFrames(pageName: (typeof ROUTES)[number]['name']) {
  const homeFrames: Array<React.ElementType> = []

  for (let i = 1; i <= FRAME_COUNT; i++) {
    const frame = await import(`@assets/splittedFrames/frames${pageName}/${i}.svg`)
    homeFrames.push(frame.default)
  }

  return homeFrames
}

import { ROUTES, RouteName } from '@/constants/routes'

const FRAME_COUNT = 36

export async function getSvgFrames(pageName: RouteName) {
  const homeFrames: Array<React.ElementType> = []

  for (let i = 1; i <= FRAME_COUNT; i++) {
    const frame = await import(`@assets/splittedFrames/frames${pageName}/${i}.svg`)
    homeFrames.push(frame.default)
  }

  return homeFrames
}

type Frames = Record<RouteName, Array<React.ElementType>>

export default function SvgFrames() {
  const frames: Frames = {
    Home: [],
    Blog: [],
    Work: [],
    About: [],
  }

  function getFrame(pageName: RouteName) {
    const homeFrames: Array<Promise<React.ElementType>> = []

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const frame = import(`@assets/splittedFrames/frames${pageName}/${i}.svg`)
      homeFrames.push(frame)
    }

    return Promise.all(homeFrames)
  }

  return {
    async loadFrames() {
      const pageNames = ROUTES.map((page) => page.name)
      const frames = await Promise.all(pageNames.map(async (pageName) => ({ pageName, frames: await getFrame(pageName) })))
      console.log('frames', frames)
    },
    getFrame(pageName: RouteName) {
      return frames[pageName]
    },
  }
}

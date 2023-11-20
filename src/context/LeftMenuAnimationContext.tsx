'use client'

import { createContext, useEffect, useState } from 'react'
import { RouteName } from '@/constants/routes'

const frameSvgs = require.context('@assets/splittedFrames', true, /^\.\/(framesHome|framesWork|framesBlog|framesAbout)\/\d+\.svg$/, 'sync')

export type Frames = Record<RouteName, Array<() => React.ReactElement<'svg'>>>

interface LeftMenuAnimationContextProps {
  frames: Frames
}

const defaultContextValues: LeftMenuAnimationContextProps = Object.freeze({
  frames: {
    Home: [],
    Blog: [],
    Work: [],
    About: [],
  },
})

export const LeftMenuAnimationContext = createContext<LeftMenuAnimationContextProps>(defaultContextValues)

export default function LeftMenuAnimationContextProvider({ children }: { children: React.ReactNode }) {
  const [frames, setFrames] = useState(defaultContextValues.frames)

  useEffect(() => {
    const assembledFrames = frameSvgs.keys().reduce((acc, path) => {
      const pathSplit = path.split(/(Home|Work|Blog|About)/)
      const pageName = pathSplit[1] as RouteName
      const svgIndex = parseInt(pathSplit[2].match(/\d+/)?.[0] ?? '1')

      acc[pageName] = [...(acc[pageName] || [])]
      acc[pageName][svgIndex - 1] = frameSvgs(path).default

      return acc
    }, {} as Frames)

    setFrames(assembledFrames)
  }, [])

  return <LeftMenuAnimationContext.Provider value={{ frames }}>{children}</LeftMenuAnimationContext.Provider>
}

// export default function LeftMenuAnimationContextProvider({ children }: { children: React.ReactNode }) {
//   const [areFramesLoaded, setFramesLoaded] = useState(false)
//   const [areFramesLoading, setFramesLoading] = useState(false)
//   const [frames, setFrames] = useState(defaultContextValues.frames)

//   async function fetchFrame(pageName: RouteName) {
//     const homeFrames: Array<Promise<{ default: React.ElementType }>> = []

//     // for (let i = 1; i <= frameCount; i++) {
//     //   const frame = import(`@assets/splittedFrames/frames${pageName}/${i}.svg`)
//     //   homeFrames.push(frame)
//     // }

//     return svgs.map((module) => module.default)
//   }

//   async function loadFrames() {
//     const pageNames = ROUTES.map((page) => page.name)
//     try {
//       setFramesLoading(true)

//       const fetchedFrames = await Promise.all(pageNames.map(async (pageName) => ({ pageName, svgComponent: await fetchFrame(pageName) })))
//       const createdFrames = fetchedFrames.reduce((acc, { pageName, svgComponent }) => {
//         return { ...acc, [pageName]: svgComponent }
//       }, {} as Record<RouteName, Array<React.ElementType>>)

//       setFrames(createdFrames)
//       setFramesLoaded(true)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setFramesLoading(false)
//     }
//   }

//   return (
//     <LeftMenuAnimationContext.Provider value={{ loadFrames, areFramesLoaded, frames, areFramesLoading }}>
//       {children}
//     </LeftMenuAnimationContext.Provider>
//   )
//}

'use client'

import { createContext, useEffect, useState } from 'react'

const toolModules = require.context('@assets/icons/tools', false, /^\.\/(.*?).svg$/, 'sync')

interface ToolSvgsContextProps {
  [key: string]: (() => React.ReactElement<'svg'>) | null
}

const defaultContextValues: ToolSvgsContextProps = Object.freeze({
  js: null,
  ts: null,
  php: null,
  react: null,
  redux: null,
  reactNative: null,
  svelte: null,
  electron: null,
  node: null,
  mysql: null,
  mongodb: null,
  sass: null,
  tailwind: null,
})

export const ToolSvgsContext = createContext<ToolSvgsContextProps>(defaultContextValues)

export default function ToolSvgsContextProvider({ children }: { children: React.ReactNode }) {
  const [toolSvgs, setToolSvgs] = useState(defaultContextValues)

  useEffect(() => {
    const toolSvgs = toolModules.keys().reduce((acc, path) => {
      const key = path.split('/').pop()?.split('.').shift()

      if (key) {
        return { ...acc, [key]: toolModules(path).default }
      }

      return acc
    }, {} as ToolSvgsContextProps)

    setToolSvgs(toolSvgs)
  }, [])

  return <ToolSvgsContext.Provider value={toolSvgs}>{children}</ToolSvgsContext.Provider>
}

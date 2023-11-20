import { useEffect, useRef } from 'react'

export function useOnceEffect(fn: () => void, dependencies: Array<unknown>) {
  const didMount = useRef(false)
  const didRunOnce = useRef(false)

  useEffect(() => {
    if (!didRunOnce.current && didMount.current) {
      fn()
      didRunOnce.current = true
    } else {
      didMount.current = true
    }
  }, dependencies)
}

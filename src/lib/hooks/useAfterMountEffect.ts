import { useEffect, useRef } from 'react'

export function useAfterMountEffect(fn: () => void, dependencies: Array<unknown>) {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      fn()
    } else {
      didMount.current = true
    }
  }, dependencies)
}

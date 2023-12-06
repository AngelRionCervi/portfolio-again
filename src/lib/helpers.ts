import classNames from 'classnames/bind'

export function cx(styles: { readonly [key: string]: string }, bindings: { readonly [key: string]: boolean } | Array<string>) {
  const binds = classNames.bind(styles)
  return binds(bindings)
}

export function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

export function degToRad(deg: number) {
  const pi = Math.PI
  return deg * (pi / 180)
}

export function getYears(start: number) {
  const currentYear = new Date().getFullYear()
  const years = new Array(currentYear - start + 1).fill(0)

  return years.map((_, index) => currentYear - index)
}

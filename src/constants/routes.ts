export const ROUTES = [
  { name: 'Home', link: '/home', id: '01' },
  { name: 'Blog', link: '/blog', id: '02' },
  { name: 'Work', link: '/work', id: '03' },
] as const

export type RouteName = (typeof ROUTES)[number]['name']

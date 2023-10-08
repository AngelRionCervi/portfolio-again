interface Routes {
  name: string
  link: string
  id: string
}

export const ROUTES: Array<Routes> = [
  { name: 'Home', link: '/home', id: '01' },
  { name: 'Blog', link: '/blog', id: '02' },
  { name: 'Work', link: '/work', id: '03' },
  { name: 'About', link: '/about', id: '04' },
]

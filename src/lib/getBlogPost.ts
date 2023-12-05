import fs from 'fs'
import path from 'path'

export function getBlogPost(slug: string) {
  const postDir = path.join(process.cwd(), 'src/data/posts')
  const fileNames = fs.readdirSync(postDir).map((fullName) => fullName.split('.').shift())

  if (!fileNames.includes(slug)) {
    return null
  }

  const file = fs.readFileSync(path.join(postDir, `${slug}.json`), 'utf-8')

  return JSON.parse(file)
}

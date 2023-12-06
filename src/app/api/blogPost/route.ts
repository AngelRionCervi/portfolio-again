import fsPromise from 'fs/promises'
import fs from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'

export const revalidate = 3600

export async function GET(request: NextRequest) {
  const year = parseInt(request.nextUrl.searchParams.get('year') || '0')

  if (!year) {
    return Response.json({ error: 'Inavalid year' }, { status: 500 })
  }

  const postDir = path.join(process.cwd(), 'src/data/posts')
  const files = fs.readdirSync(postDir)
  const contentsRaw = await Promise.all(files.map((file) => fsPromise.readFile(path.join(postDir, file), { encoding: 'utf8' })))
  const contents = contentsRaw.map((content) => JSON.parse(content))
  const contentByYear = contents.filter((content) => new Date(content.date).getFullYear() === year)
  const filteredContent = contentByYear.map(({ date, slug, title }) => ({ date, slug, title }))

  return Response.json({ posts: filteredContent }, { status: 200 })
}

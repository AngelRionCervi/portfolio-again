'use client'

import { createContext, useState } from 'react'
import { getBlogPostByYear } from '@/lib/server/blogPost'

type BlogPostPreview = { title: string; date: string }

export interface BlogPostContextProps {
  currentBlogPosts: Array<BlogPostPreview>
  getBlogPostForYear: (year: number) => void
}

const defaultContextValues: BlogPostContextProps = Object.freeze({
  currentBlogPosts: [],
  getBlogPostForYear: () => [],
})

export const BlogPostContext = createContext<BlogPostContextProps>(defaultContextValues)

export default function BlogPostContextProvider({ children }: { children: React.ReactNode }) {
  const [currentBlogPosts, setCurrentBlogPosts] = useState([])

  async function getBlogPostForYear(year: number) {
    const posts = await getBlogPostByYear(year)
    setCurrentBlogPosts(posts)
  }

  return <BlogPostContext.Provider value={{ currentBlogPosts, getBlogPostForYear }}>{children}</BlogPostContext.Provider>
}

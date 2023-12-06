'use client'

import { useEffect, useState } from 'react'
import BlogYearSelectorDesktop from '@components/BlogYearSelector/BlogYearSelectorDesktop/BlogYearSelectorDesktop'
import BlogYearSelectorMobile from '@components/BlogYearSelector/BlogYearSelectorMobile/BlogYearSelectorMobile'
import styles from './styles.module.scss'
import { useDevice } from '@lib/hooks/useDevice'
import { fetchBlogPostByYear } from '@/lib/fetch/blogPost'
import PostList from '@components/BlogPost/PostList/PostList'
import { BlogPostPreview } from '@components/BlogPost/BlogPost'

export default function Blog() {
  const isMobile = useDevice()
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Array<BlogPostPreview>>([])

  async function changeYear(year: number) {
    setIsLoading(true)
    const data = await fetchBlogPostByYear(year)
    setPosts(data.posts)
    console.log('end content', data)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  useEffect(() => {
    changeYear(new Date().getFullYear())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.yearSelectorContainer}>
        {isMobile ? <BlogYearSelectorMobile onChange={changeYear} /> : <BlogYearSelectorDesktop onChange={changeYear} />}
      </div>
      <div className={styles.articlesContainer}>
        <PostList posts={posts} isLoading={isLoading} />
      </div>
    </div>
  )
}

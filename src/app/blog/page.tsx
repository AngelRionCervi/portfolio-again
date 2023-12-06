'use client'

import { useEffect, useState } from 'react'
import BlogYearSelectorDesktop from '@components/BlogYearSelector/BlogYearSelectorDesktop/BlogYearSelectorDesktop'
import BlogYearSelectorMobile from '@components/BlogYearSelector/BlogYearSelectorMobile/BlogYearSelectorMobile'
import styles from './styles.module.scss'
import { useDevice } from '@lib/hooks/useDevice'
import { fetchBlogPostByYear } from '@/lib/fetch/blogPost'
import PostList from '@components/BlogPost/PostList/PostList'
import { BlogPostPreview } from '@components/BlogPost/BlogPost'
import { getYears } from '@lib/helpers'
import PageContentTransition from '@/components/Animation/PageContentTransition'

export default function Blog() {
  const isMobile = useDevice()
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Array<BlogPostPreview>>([])
  const years = getYears(2023)

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
    <PageContentTransition>
      <div className={styles.container}>
        <div className={styles.yearSelectorContainer}>
          {isMobile ? (
            <BlogYearSelectorMobile onChange={changeYear} years={years} />
          ) : (
            <BlogYearSelectorDesktop onChange={changeYear} years={years} />
          )}
        </div>
        <div className={styles.articlesContainer}>
          <PostList posts={posts} isLoading={isLoading} />
        </div>
      </div>
    </PageContentTransition>
  )
}

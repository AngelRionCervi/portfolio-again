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
import PageContentTransition from '@components/Animation/PageContentTransition'
import Loader from '@components/Loader/Loader'

export default function Blog() {
  const isMobile = useDevice()
  const [isLoading, setIsLoading] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [posts, setPosts] = useState<Array<BlogPostPreview>>([])
  const years = getYears(2023)

  async function changeYear(year: number) {
    setIsLoading(true)
    setCurrentYear(year)
    const data = await fetchBlogPostByYear(year)
    setPosts(data.posts)
    setIsLoading(false)
  }

  useEffect(() => {
    changeYear(currentYear)
  }, [])

  return (
    <PageContentTransition>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.yearSelectorContainer}>
            {isMobile ? (
              <BlogYearSelectorMobile onChange={changeYear} years={years} />
            ) : (
              <BlogYearSelectorDesktop onChange={changeYear} years={years} />
            )}
          </div>
          <div className={styles.articlesContainer}>{isLoading ? <Loader size="m" /> : <PostList posts={posts} currentYear={currentYear} />}</div>
        </div>
      </div>
    </PageContentTransition>
  )
}

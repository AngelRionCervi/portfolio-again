import Link from 'next/link'
import { BlogPostPreview } from '../BlogPost'
import styles from './styles.module.scss'

interface PostListProps {
  posts: Array<BlogPostPreview>
  isLoading: boolean
}

export default function PostList({ posts, isLoading }: PostListProps) {
  
  function getPostDate(date: string) {
    const dateObj = new Date(date)

    return new Date(dateObj).toLocaleDateString('en-US', {
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <p className={styles.postTitle}>{post.title}</p>
            <p className={styles.postDate}>{getPostDate(post.date)}</p>
          </Link>
        )
      })}
    </div>
  )
}

import Link from 'next/link'
import { BlogPostPreview } from '../BlogPost'
import styles from './styles.module.scss'

interface PostListProps {
  posts: Array<BlogPostPreview>
  isLoading: boolean
}

export default function PostList({ posts, isLoading }: PostListProps) {
  
  function getPostDate(date: string) {
    return new Date(date).toUTCString()
  }

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <p>{post.title}</p>
            <p>{getPostDate(post.date)}</p>
          </Link>
        )
      })}
    </div>
  )
}

import Link from 'next/link'
import { BlogPostPreview } from '../BlogPost'
import styles from './styles.module.scss'

interface PostListProps {
  posts: Array<BlogPostPreview>
  currentYear: number
}

export default function PostList({ posts, currentYear }: PostListProps) {
  function getPostDate(date: string) {
    const dateObj = new Date(date)

    return new Date(dateObj).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className={styles.container}>
      {posts.length ? (
        posts.map((post) => {
          return (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <p className={styles.postTitle}>{post.title}</p>
              <p className={styles.postDate}>{getPostDate(post.date)}</p>
            </Link>
          )
        })
      ) : (
        <p>No blog post for this year{currentYear === new Date().getFullYear() ? ' (yet).' : '.'}</p>
      )}
    </div>
  )
}

import { getBlogPost } from '@/lib/server/blogPost'
import styles from './styles.module.scss'
import BlogPost from '@components/BlogPost/BlogPost'

export default function Post({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className={styles.container}>
        <p>no post found</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <BlogPost data={post} />
    </div>
  )
}

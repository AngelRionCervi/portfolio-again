import CodeBlock from './CodeBlock/CodeBlock'
import styles from './styles.module.scss'

export type BlogPostPreview = { title: string; date: string; slug: string; id: string }
export type BlogPostText = { type: 'text'; content: string; id: string }
export type BlogPostImage = { type: 'image'; src: string; alt: string; id: string }
export type BlogPostCode = { type: 'code'; content: string; id: string }
export type BlogPostBlock = BlogPostText | BlogPostImage | BlogPostCode

export interface BlogPost {
  title: string
  date: string
  slug: string
  id: string
  contents: Array<BlogPostBlock>
}

export default function BlogPost({ data }: { data: BlogPost }) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>{data.title}</h1>
        {data.contents.map((block, index: number) => {
          let content = null
          if (block.type === 'text') {
            content = <span key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
          } else if (block.type === 'image') {
            content = <img key={index} src={block.src} alt={block.alt} />
          } else if (block.type === 'code') {
            content = <CodeBlock key={index} code={block.content} />
          }

          return (
            <div className={`${styles.block} ${block.type === 'image' ? styles.blockImage : ''}`} key={block.id}>
              {content}
            </div>
          )
        })}
        <div className={styles.postFooter} />
      </div>
    </div>
  )
}

import Link from 'next/link'
import CodeBlock from './CodeBlock/CodeBlock'
import styles from './styles.module.scss'
import BackArrowMenuMobile from '@assets/icons/back-arrow-menu-mobile.svg'

export type BlogPostPreview = { title: string; date: string; slug: string; id: string }
export type BlogPostText = { type: 'text'; content: string; id: string }
export type BlogPostImage = { type: 'image'; src: string; alt: string; id: string }
export type BlogPostCode = { type: 'code'; content: string; id: string }
export type BlogPostH2 = { type: 'h2'; content: string; id: string }
export type BlogPostH3 = { type: 'h3'; content: string; id: string }
export type BlogPostSeparator = { type: 'separator'; id: string }
export type BlogPostFramedText = { type: 'framedText'; content: string; id: string; subBlocks: Array<BlogPostBlock> }
export type BlogPostBlock = BlogPostText | BlogPostImage | BlogPostCode | BlogPostH2 | BlogPostH3 | BlogPostFramedText | BlogPostSeparator

export interface BlogPost {
  title: string
  date: string
  slug: string
  id: string
  contents: Array<BlogPostBlock>
}

const styleMap = {
  image: styles.blockImage,
  code: '',
  text: '',
  h2: styles.h2,
  h3: styles.h3,
  framedText: styles.framedText,
  separator: styles.separator,
}

function PostBlock({ blocks }: { blocks: Array<BlogPostBlock> }) {
  return (
    <>
      {blocks.map((block) => {
        let content = null
        if (block.type === 'text') {
          content = <span key={block.id} dangerouslySetInnerHTML={{ __html: block.content }} />
        } else if (block.type === 'image') {
          content = <img key={block.id} src={block.src} alt={block.alt} />
        } else if (block.type === 'code') {
          content = <CodeBlock key={block.id} code={block.content} />
        } else if (block.type === 'h2') {
          content = <h2 key={block.id}>{block.content}</h2>
        } else if (block.type === 'h3') {
          content = <h3 key={block.id}>{block.content}</h3>
        } else if (block.type === 'framedText') {
          content = (
            <div key={block.id}>
              <span dangerouslySetInnerHTML={{ __html: block.content }} />
            </div>
          )
        } else if (block.type === 'separator') {
          content = <div key={block.id} />
        }

        return (
          <div className={`${styles.block} ${styleMap[block.type]}`} key={block.id}>
            {content}
            {block.type === 'framedText' && block.subBlocks ? <PostBlock blocks={block.subBlocks} /> : null}
          </div>
        )
      })}
    </>
  )
}

export default function BlogPost({ data }: { data: BlogPost }) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>{data.title}</h1>
        <PostBlock blocks={data.contents} />
        <div className={styles.postFooter}>
          <Link href="/blog" className={styles.backContainer}>
            <BackArrowMenuMobile width="20px" />
            <p>Back</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

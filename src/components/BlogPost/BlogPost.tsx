import styles from './styles.module.scss'

export default function BlogPost({ data }) {
  console.log('data', data)

  return (
    <div className={styles.container}>
      {data.contents.map((block, index) => {
        let content = null

        if (block.type === 'text') {
          content = <span key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
        } else if (block.type === 'image') {
          content = <img key={index} src={block.src} alt={block.alt} />
        } else if (block.type === 'code') {
          content = <code key={index}>{block.content}</code>
        }

        return (
          <>
            {content}
            <br />
            <br />
          </>
        )
      })}
    </div>
  )
}

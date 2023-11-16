import styles from './styles.module.scss'

interface HomeAnimationWordProps {
  word: string
}

export default function HomeAnimationWord({ word }: HomeAnimationWordProps) {

  return (
    <div className={styles.container}>
      <p className={styles.repetition1}>{word}</p>
      <p className={styles.repetition2}>{word}</p>
      <p className={styles.repetition3}>{word}</p>
    </div>
  )
}

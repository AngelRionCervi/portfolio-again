import styles from './styles.module.scss'

interface TitlePageProps {
  title: string
}

function TitlePage({ title }: TitlePageProps) {
  return (
    <div className={styles.pageTitleContainer}>
      <p>{title}</p>
    </div>
  )
}

export default TitlePage

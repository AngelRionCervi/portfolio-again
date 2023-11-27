import BlogYearSelectorDesktop from '@components/BlogYearSelector/BlogYearSelectorDesktop/BlogYearSelectorDesktop'
import styles from './styles.module.scss'

export default function Blog() {
  return (
    <div className={styles.container}>
      <div className={styles.yearSelectorContainer}>
        <BlogYearSelectorDesktop />
      </div>
      <div className={styles.articlesContainer}>-articles-</div>
    </div>
  )
}

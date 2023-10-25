import styles from './styles.module.scss';

export default function BurgerMenu() {
  return (
    <div className={styles.container}>
      <button className={styles.closeButton}>close</button>
    </div>
  )
}

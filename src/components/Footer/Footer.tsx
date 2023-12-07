import Link from 'next/link'
import styles from './styles.module.scss'
import socialsData from '@data/socials.json'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {Object.values(socialsData).map(({ label, link }, index) => (
          <>
            <Link className={styles.link} key={label} target="_blank" href={link}>
              {label}
            </Link>
            {index < Object.values(socialsData).length - 1 && <div className={styles.separator} />}
          </>
        ))}
      </div>
    </div>
  )
}

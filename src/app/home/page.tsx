'use client'

import Link from 'next/link'
import styles from './styles.module.scss'
import PageContentTransition from '@/components/Animation/PageContentTransition'

export default function Home() {
  return (
    <PageContentTransition>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h1 className={styles.title}>Angel Rion - Cervi</h1>
          <div className={styles.text}>
            <p>I like crafting things for the web.</p>
            <br />
            <p>
              Currently working as a freelancer at{' '}
              <Link className={styles.link} target="_blank" href="https://www.france.tv">
                France TV
              </Link>{' '}
              doing front end development.
            </p>
            <br />
            <p>
              You can contact me at:{' '}
              <Link href="mailto:a.rioncervi@gmail.com" className={styles.email}>
                a.rioncervi@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageContentTransition>
  )
}

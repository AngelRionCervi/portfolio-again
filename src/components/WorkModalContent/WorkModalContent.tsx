import Link from 'next/link'
import { useEffect } from 'react'
import workData from '@data/work.json'
import styles from './styles.module.scss'
import WorkModalTime from './WorkModalTime/WorkModalTime'
import CONSTANTS from '@constants'

export interface WorkModalContentProps {
  id: keyof typeof workData
}

export default function WorkModalContent({ id }: WorkModalContentProps) {
  const data = workData[id]
  console.log('data', data, workData, id)

  useEffect(() => {
    console.log('data e', data)
    
  }, [data])

  return (
    <div className={styles.container} style={{padding: CONSTANTS.WORK_MODAL_PADDING}}>
      <div className={styles.leftRow}>
        <div className={styles.upperLeftRow}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.role}> {data.role}</p>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.techStack}>
            {data.techStack.map((tech) => {
              return tech
            })}
          </div>
        </div>
        <div className={styles.lowerLeftRow}>
          <Link className={styles.link} href={data.link.url} target="_blank">
            {data.link.label}
          </Link>
        </div>
      </div>
      <div className={styles.rightRow}>
        <WorkModalTime periode={data.periode} />
      </div>
    </div>
  )
}

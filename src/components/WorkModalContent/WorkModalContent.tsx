'use client'

import Link from 'next/link'
import { useEffect, useContext } from 'react'
import workData from '@data/work.json'
import styles from './styles.module.scss'
import WorkModalTime from './WorkModalTime/WorkModalTime'
import CONSTANTS from '@constants'
import { ToolSvgsContext } from '@context/ToolSvgsContext'
import CloseCross from '@assets/icons/close-cross.svg'
import { ModalContext } from '@context/ModalContext'
import { useDevice } from '@lib/hooks/useDevice'

export interface WorkModalContentProps {
  id: keyof typeof workData
}

export default function WorkModalContent({ id }: WorkModalContentProps) {
  const data = workData[id]
  const toolSvgs = useContext(ToolSvgsContext)
  const { toggleModal } = useContext(ModalContext)
  const isMobile = useDevice()

  useEffect(() => {
    //console.log('data toolSvgs', data, toolSvgs)
  }, [data])

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={toggleModal}>
        <CloseCross />
      </button>
      <div className={styles.innerContainer}>
        <div className={styles.leftRow}>
          <div className={styles.upperLeftRow}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.role}>{data.role}</p>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: data.description }} />
            <div className={styles.techStack}>
              {data.techStack.map((tech) => {
                return (
                  <div key={tech} title={tech}>
                    {toolSvgs[tech.toLowerCase()]?.()}
                  </div>
                )
              })}
            </div>
          </div>
          <Link className={styles.link} href={data.link.url} target="_blank">
            <p>{data.link.label}</p>
          </Link>
          {isMobile && <div />}
        </div>
        <div className={styles.rightRow}>
          <WorkModalTime periode={data.periode} />
        </div>
      </div>
    </div>
  )
}

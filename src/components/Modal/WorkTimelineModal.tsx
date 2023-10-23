import CONSTANTS from '@constants';
import styles from './styles.module.scss';
import workData from '@data/work.json';
import IconExitWorkModal from '@assets/icons/icon-exit-work-modal.svg';
import { useEffect } from 'react';

const WorkTimelineModal = ({ company: { name, position, size }, closeModal }: WorkTimelineModalProps) => {
    const data = (workData as { [key: string]: any })[name];

    return (
        <>
            <div className={styles.backdrop} onClick={closeModal} />
            <div id="work_modal" style={{ boxSizing: 'border-box', width: `${CONSTANTS.WORK_MODAL_WIDTH}px`, left: `${position.x - CONSTANTS.WORK_MODAL_WIDTH + 1}px`, top: `${position.y - 1}px` }} className={styles.container}>
                <div className={styles.containerInner}>
                    <button style={{ width: `${size + 2}px`, height: `${size + 2}px` }} onClick={closeModal} className={styles.closeButton}>
                        <div style={{ width: `${size - 2}px`, height: `${size - 2}px` }} className={styles.closeButtonInner}>
                            <IconExitWorkModal />
                        </div>
                    </button>
                    <div className={styles.content}>
                        <h2 className={styles.titleLink}>{data.title}</h2>
                        <div className={styles.techIcons}></div>
                        <p className={styles.text}>{data.text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkTimelineModal;

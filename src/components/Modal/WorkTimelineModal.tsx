import CONSTANTS from '@constants';
import styles from './styles.module.scss';
import workData from '@data/work.json';

const WorkTimelineModal = ({ company: { name, position }, closeModal }: WorkTimelineModalProps) => {

    const data = (workData as { [key: string]: any })[name];

    console.log('dta', data, CONSTANTS.WORK_MODAL_WIDTH);

    return (
        <div style={{ boxSizing: 'border-box', width: `${CONSTANTS.WORK_MODAL_WIDTH}px`, left: `${position.x - CONSTANTS.WORK_MODAL_WIDTH}px`, top: `${position.y}px` }} className={styles.container}>
            <button onClick={closeModal} className={styles.closeButton}>
                oh
            </button>
            <div className={styles.content}>
                <h2 className={styles.workModalH2}></h2>
                <div className={styles.workModalH2}></div>
                <p className={styles.workModalText}></p>
            </div>
        </div>
    )
}

export default WorkTimelineModal;

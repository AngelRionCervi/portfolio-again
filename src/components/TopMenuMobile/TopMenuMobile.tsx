import Link from 'next/link';
import styles from './styles.module.scss';
import BurgerMenuIcon from '@components/BurgerMenu/BurgerMenuIcon/BurgerMenuIcon';

interface TopMenuMobileProps {
    title: string
}

export default function TopMenuMobile({ title }: TopMenuMobileProps) {

    function toggleBurgerMenu() {
        console.log('toggle burger')
    }

    return (
        <div className={styles.topMenu}>
            <div>
                <Link href="/home" className={styles.arcTypo}>ARC</Link>
            </div>
            <p className={styles.menuPage}>{title}</p>
            <div className={styles.burgerMenuContainer}>
                <button className={styles.burgerMenuButton} onClick={toggleBurgerMenu}>
                    <BurgerMenuIcon />
                </button>
            </div>
        </div>
    )
}

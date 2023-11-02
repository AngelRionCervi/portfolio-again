import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import BurgerMenuIcon from '@components/BurgerMenu/BurgerMenuIcon/BurgerMenuIcon';
import { BurgerMenuContext } from '@context/BurgerMenuContext';

interface TopMenuMobileProps {
    title: string
}

export default function TopMenuMobile({ title }: TopMenuMobileProps) {
    const { toggleBurgerMenu, isBurgerMenuOpen, isBurgerMenuClosing } = useContext(BurgerMenuContext);

    return (
        <>
            <button className={styles.burgerMenuButton} onClick={toggleBurgerMenu}>
                <BurgerMenuIcon />
            </button>
            <div className={styles.topMenu}>
                <div>
                    <Link href="/home" className={styles.arcTypo}>ARC</Link>
                </div>
                <p className={styles.menuPage}>{title}</p>
                <div />
            </div>
        </>

    )
}

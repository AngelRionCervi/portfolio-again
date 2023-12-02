import { useContext } from 'react';
import styles from './styles.module.scss';
import BurgerMenuIcon from '@components/BurgerMenu/BurgerMenuIcon/BurgerMenuIcon';
import { BurgerMenuContext } from '@context/BurgerMenuContext';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';

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
                <div className={styles.themeSwitcherContainer}>
                    <ThemeSwitcher />
                </div>
                <p className={styles.menuPage}>{title}</p>
                <div />
            </div>
        </>

    )
}

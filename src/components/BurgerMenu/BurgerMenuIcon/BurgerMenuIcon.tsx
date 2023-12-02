import { useContext } from 'react';
import styles from './styles.module.scss';
import { BurgerMenuContext } from '@context/BurgerMenuContext';
import { cx } from '@lib/helpers';

export default function SvgBurgerMenuIcon () {
  const { isBurgerMenuClosing, isBurgerMenuOpen } = useContext(BurgerMenuContext);

  const topBarClass = cx(styles, {
    topBar: true,
    isClosingTopBar: isBurgerMenuClosing,
    isOpeningTopBar: isBurgerMenuOpen && !isBurgerMenuClosing,
  })

  const bottomBarClass = cx(styles, {
    bottomBar: true,
    isClosingBottomBar: isBurgerMenuClosing,
    isOpeningBottomBar: isBurgerMenuOpen && !isBurgerMenuClosing,
  })

  return (
    <svg
      width={20}
      height={15}
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className={topBarClass} width={20} height={2.14286} fill="var(--black)" />
      <rect y={6.42856} width={20} height={2.14286} fill="var(--black)" />
      <rect className={bottomBarClass} y={12.8571} width={20} height={2.14286} fill="var(--black)" />
    </svg>
  )
}

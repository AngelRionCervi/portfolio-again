import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { BurgerMenuContext } from '@context/BurgerMenuContext';
import { cx } from '@lib/helpers';

export default function BurgerMenu() {
  const { toggleBurgerMenu } = useContext(BurgerMenuContext);
  const [burgerClosing, setBurgerClosing] = useState(false);

  function closeBurgerMenu() {
    setBurgerClosing(true);

    setTimeout(() => {
      toggleBurgerMenu();
    }, 250)
  }

  const className = cx(styles, {
    container: true,
    isClosing: burgerClosing
  })

  return (
    <div className={className}>
      <div className={styles.topRow}>
        <div />
        <button onClick={closeBurgerMenu} className={styles.closeButton}>close</button>
      </div>
    </div>
  )
}

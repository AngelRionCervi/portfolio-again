'use client'

import { createContext, useState } from 'react';

export interface BurgerMenuContextProps {
    toggleBurgerMenu: () => void;
    isBurgerMenuOpen: boolean
}

const defaultContextValues: BurgerMenuContextProps = Object.freeze({
    isBurgerMenuOpen: false,
    toggleBurgerMenu: () => { }
});

export const BurgerMenuContext = createContext<BurgerMenuContextProps>(defaultContextValues);

export default function BurgerMenuContextProvider({ children }: { children: React.ReactNode }) {
    const [isBurgerMenuOpen, setBurgerMenu] = useState(false);

    function toggleBurgerMenu() {
        setBurgerMenu(!isBurgerMenuOpen);
    }

    return (
        <BurgerMenuContext.Provider value={{ toggleBurgerMenu, isBurgerMenuOpen }}>
            {children}
        </BurgerMenuContext.Provider>
    )
}


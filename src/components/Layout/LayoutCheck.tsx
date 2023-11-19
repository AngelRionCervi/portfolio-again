'use client'

import React, { useEffect, useState } from 'react'
import { useDevice } from '@/lib/hooks/useDevice';
import styles from './styles.module.scss'
import DesktopLayout from '@components/Layout/DesktopLayout/DesktopLayout'
import MobileLayout from '@components/Layout/MobileLayout/MobileLayout'

export default function LayoutCheck({ children }: { children: React.ReactNode }) {
    const isMobile = useDevice();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <>
            {!isMounted && <div className={styles.unmounted} />}
            {isMounted && (isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>)}
        </>
    )
}

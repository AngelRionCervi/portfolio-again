import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
import { Roboto_Mono } from 'next/font/google'
import './style.scss'
import '@styles/highlightThemes/panda-syntax-light.css'
import '@styles/highlightThemes/panda-syntax-dark.css'
import LayoutCheck from '@components/Layout/LayoutCheck'
import ContextReducer from '@context/ContextReducer'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Angel Rion - Cervi',
  description: 'My personal website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <ContextReducer>
          <LayoutCheck>{children}</LayoutCheck>
        </ContextReducer>
        <Analytics />
      </body>
    </html>
  )
}

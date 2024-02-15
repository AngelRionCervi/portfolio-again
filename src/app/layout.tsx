import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
import './style.scss'
import '@styles/highlightThemes/panda-syntax-light.css'
import '@styles/highlightThemes/panda-syntax-dark.css'
import LayoutCheck from '@components/Layout/LayoutCheck'
import ContextReducer from '@context/ContextReducer'

export const metadata: Metadata = {
  title: 'Angel Rion - Cervi',
  description: 'My personal website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ContextReducer>
          <LayoutCheck>{children}</LayoutCheck>
        </ContextReducer>
        <Analytics />
      </body>
    </html>
  )
}

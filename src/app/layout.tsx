import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './style.scss';
import LayoutCheck from '@components/Layout/LayoutCheck';

const inter = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutCheck>{children}</LayoutCheck>
      </body>
    </html>
  )
}

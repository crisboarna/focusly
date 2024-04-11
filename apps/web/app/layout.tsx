import { Inter } from 'next/font/google'
import Header from '@/components/header'
import './css/style.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Focusly - Active Tabs and Windows',
  description: 'Focusly is a cross-browser extension to reduce friction when alternating between tabs and the user experience is interrupted due to loss of focus by keeping focus on the tabs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}

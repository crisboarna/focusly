import Landing from '@/components/landing'
import Shields from '@/components/shields'
import Features from '@/components/features'

export const metadata = {
  title: 'Focusly - Active Tabs and Windows',
  description: 'Focusly is a cross-browser extension to reduce friction when alternating between tabs and the user experience is interrupted due to loss of focus by keeping focus on the tabs.',
}

export default function Home() {
  return (
    <>
      <Landing />
      <Shields />
      <Features />
    </>
  )
}

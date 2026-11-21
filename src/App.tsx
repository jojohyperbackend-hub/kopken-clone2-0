import { Suspense, lazy } from 'react'
import { MainLayout } from './layout/MainLayout'
import { Hero } from './components/Hero/Hero'
import { CoffeeWaves } from './components/CoffeeWaves/CoffeeWaves'
import { About } from './components/About/About'
import { VisionMission } from './components/VisionMission/VisionMission'
import { Values } from './components/Values/Values'
import { Partners } from './components/Partners/Partners'
import { CTA } from './components/CTA/CTA'

const LocationMap = lazy(() => import('./components/LocationMap/LocationMap'))

const SHOW_MITRA_LINK = false

const LocationMapFallback = () => (
  <div
    className="min-h-[480px] bg-bg-base px-5 py-section-sm md:px-10 md:py-section-md"
    aria-hidden="true"
  />
)

function App() {
  return (
    <MainLayout showMitraLink={SHOW_MITRA_LINK}>
      <Hero />
      <CoffeeWaves />
      <About />
      <VisionMission />
      <Values />
      <Suspense fallback={<LocationMapFallback />}>
        <LocationMap />
      </Suspense>
      <Partners />
      <CTA />
    </MainLayout>
  )
}

export default App

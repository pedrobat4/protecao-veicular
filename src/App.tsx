import { useState } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'
import Impact from './components/Impact'
import Simulator, { type SimAnswers } from './components/Simulator'
import LeadCapture from './components/LeadCapture'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  const [simData, setSimData] = useState<SimAnswers>({})

  return (
    <>
      <Background />
      <Header />
      <main>
        <Hero />
        <Impact />
        <Simulator onComplete={setSimData} />
        <LeadCapture simData={simData} />
        <Closing />
      </main>
      <Footer />
    </>
  )
}

import { useState } from 'react'
import './App.css'
import Header from './Header'
import HeroSection from './HeroSection'
import ResumePreview from './ResumePreview'
import FeaturesSection from './FeaturesSection'
import HowItWorks from './HowItWorks'
import FAQ from './FAQ'
import CTASection from './CTASection'
import Footer from './Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <ResumePreview />
      <FeaturesSection />
      <HowItWorks />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
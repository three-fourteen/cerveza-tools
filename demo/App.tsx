import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import HydrometerPage from './pages/calculators/HydrometerPage'
import AlcoholPage from './pages/calculators/AlcoholPage'
import EvaporationPage from './pages/calculators/EvaporationPage'
import InitialDensityPage from './pages/calculators/InitialDensityPage'
import MashTemperaturePage from './pages/calculators/MashTemperaturePage'
import MashVolumePage from './pages/calculators/MashVolumePage'
import StepMashingPage from './pages/calculators/StepMashingPage'
import WaterDilutionPage from './pages/calculators/WaterDilutionPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hydrometer" element={<HydrometerPage />} />
        <Route path="/alcohol" element={<AlcoholPage />} />
        <Route path="/evaporation" element={<EvaporationPage />} />
        <Route path="/initial-density" element={<InitialDensityPage />} />
        <Route path="/mash-temperature" element={<MashTemperaturePage />} />
        <Route path="/mash-volume" element={<MashVolumePage />} />
        <Route path="/step-mashing" element={<StepMashingPage />} />
        <Route path="/water-dilution" element={<WaterDilutionPage />} />
      </Routes>
    </HashRouter>
  )
}

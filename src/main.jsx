import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DannyPistolesi from './pages/DannyPistolesi.jsx'
import FrankieGrasso from './pages/FrankieGrasso.jsx'
import MichaelMuller from './pages/MichaelMuller.jsx'
import LynneGrasso from './pages/LynneGrasso.jsx'
import LouisGrasso from './pages/LouisGrasso.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/danny-pistolesi" element={<DannyPistolesi />} />
        <Route path="/frankie-grasso" element={<FrankieGrasso />} />
        <Route path="/michael-muller" element={<MichaelMuller />} />
        <Route path="/lynne-grasso" element={<LynneGrasso />} />
        <Route path="/louis-grasso" element={<LouisGrasso />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { Navigate, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/about-page'
import { HomePage } from './pages/home-page'

export default function HomeFeature() {
  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

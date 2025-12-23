import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/layout/LandingPage';
import { TermDetailPage } from './features/term/TermDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms/:id" element={<TermDetailPage />} />
    </Routes>
  )
}

export default App

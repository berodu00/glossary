import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/layout/LandingPage';
import { TermDetailPage } from './features/term/TermDetailPage';
import { SuggestionForm } from './features/suggestion/SuggestionForm';
import { AdminDashboard } from './features/admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms/:id" element={<TermDetailPage />} />
      <Route path="/suggestion/new" element={<SuggestionForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App

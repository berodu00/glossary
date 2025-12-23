import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/layout/LandingPage';
import { TermDetailPage } from './features/term/TermDetailPage';
import { SuggestionForm } from './features/suggestion/SuggestionForm';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { TermList } from './features/term/TermList'; // Added this import for TermList
import { MyHistory } from './features/user/MyHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TermList />} />
      <Route path="/terms/:id" element={<TermDetailPage />} />
      <Route path="/suggestion/new" element={<SuggestionForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/me" element={<MyHistory />} />
    </Routes>
  )
}

export default App

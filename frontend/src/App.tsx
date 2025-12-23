import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './features/layout/LandingPage';
import { TermDetailPage } from './features/term/TermDetailPage';
import { SuggestionForm } from './features/suggestion/SuggestionForm';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { MyHistory } from './features/user/MyHistory';
import { LoginPage } from './features/auth/LoginPage';
import { ProtectedRoute } from './features/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms/:id" element={<TermDetailPage />} />
          <Route path="/suggestion/new" element={<SuggestionForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/me" element={<MyHistory />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Centers from './pages/Centers';
import MyApplications from './pages/MyApplications';
import AdminReview from './pages/AdminReview';
import NavBar from './components/NavBar';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const trainer = localStorage.getItem('trainer');
    
    if (token && trainer) {
      setIsAuthenticated(true);
      // Store trainerId for easier access in components
      const trainerData = JSON.parse(trainer);
      localStorage.setItem('trainerId', trainerData._id);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Layout wrapper with NavBar
function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div style={{ minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with NavBar */}
        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Layout>
                <Browse />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/centers"
          element={
            <ProtectedRoute>
              <Layout>
                <Centers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Layout>
                <MyApplications />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminReview />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/browse" replace />} />
        <Route path="*" element={<Navigate to="/browse" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

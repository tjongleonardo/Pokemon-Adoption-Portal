import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login is the first screen shown */}
        <Route path="/login" element={<Login />} />

        {/* Placeholder routes — teammates fill these in */}
        <Route path="/browse" element={<div>Browse Page (Person 2)</div>} />
        <Route path="/centers" element={<div>Centers Page (Person 3)</div>} />
        <Route path="/applications" element={<div>My Applications Page (Person 4)</div>} />

        {/* Default redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

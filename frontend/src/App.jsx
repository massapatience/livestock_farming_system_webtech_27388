import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Animals from './pages/Animals';
import Health from './pages/Health';
import Breeding from './pages/Breeding';
import Feed from './pages/Feed';
import Sales from './pages/Sales';
import Users from './pages/Users';
import OAuthSuccess from './pages/OAuthSuccess';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/oauth-success" element={<OAuthSuccess />} />
    <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
      <Route index element={<Navigate to="/dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="animals" element={<Animals />} />
      <Route path="health" element={<Health />} />
      <Route path="breeding" element={<Breeding />} />
      <Route path="feed" element={<Feed />} />
      <Route path="sales" element={<Sales />} />
      <Route path="users" element={<PrivateRoute roles={['admin']}><Users /></PrivateRoute>} />
    </Route>
  </Routes>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

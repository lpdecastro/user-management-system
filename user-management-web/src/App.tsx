import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from './components/layout/AdminLayout';
import UsersPage from './pages/UsersPage';
import PlaceholderPage from './pages/PlaceholderPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path='/login' element={<LoginPage />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to='/users' replace />} />
          <Route
            path='dashboard'
            element={<PlaceholderPage title='Dashboard' />}
          />
          <Route path='users' element={<UsersPage />} />
          <Route
            path='roles'
            element={<PlaceholderPage title='Roles & Permission' />}
          />
          <Route path='teams' element={<PlaceholderPage title='Teams' />} />
          <Route
            path='audit-logs'
            element={<PlaceholderPage title='Audit Logs' />}
          />
          <Route
            path='settings'
            element={<PlaceholderPage title='Settings' />}
          />
        </Route>
      </Route>

      <Route
        path='*'
        element={<PlaceholderPage title='404 - Page Not Found' />}
      />
    </Routes>
  );
};

export default App;

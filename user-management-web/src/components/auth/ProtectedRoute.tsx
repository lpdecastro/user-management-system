import { Navigate, Outlet, useLocation } from 'react-router';
import { useCurrentUser } from '../../hooks/useAuth';
import { Alert, Box, CircularProgress } from '@mui/material';

const ProtectedRoute = () => {
  const { data: user, isPending, isError } = useCurrentUser();
  const location = useLocation();

  if (isPending) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>
        Unable to verify authentication. Please try again.
      </Alert>
    );
  }

  if (!user) {
    return (
      <Navigate
        to='/login'
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

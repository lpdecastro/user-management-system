import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { type LoginFormValues, loginSchema } from '../schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router';
import { useLogin } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const destination =
    (location.state as { from?: string } | null)?.from ?? '/users';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate(destination, { replace: true });
      },
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        bgcolor: '#f6f7f9',
        p: 2,
      }}
    >
      <Paper variant='outlined' sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant='h5' sx={{ fontWeight: 700 }}>
          Admin Console
        </Typography>

        <Typography color='text.secondary' sx={{ mt: 1, mb: 3 }}>
          Sign in to your account
        </Typography>

        {loginMutation.isError && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {loginMutation.error.message}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label='Email'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            type='password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type='submit'
            variant='contained'
            size='large'
            loading={loginMutation.isPending}
          >
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage;

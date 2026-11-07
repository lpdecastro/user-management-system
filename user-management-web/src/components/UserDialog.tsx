import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { userSchema, type UserFormValues } from '../schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser } from '../hooks/useCreateUser';
import ApiError from '../api/ApiError';
import type { User } from '../types/user';
import { useEffect } from 'react';
import useUpdateUser from '../hooks/useUpdateUser';

type Props = {
  open: boolean;
  mode: 'add' | 'edit';
  user?: User | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const emptyValues: UserFormValues = {
  name: '',
  email: '',
  role: '',
  team: '',
};

const UserDialog = ({ open, mode, user, onClose, onSuccess, onError }: Props) => {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const isPending = createUser.isPending || updateUser.isPending;

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;

    reset(
      mode === 'edit' && user
        ? {
            name: user.name,
            email: user.email,
            role: user.role,
            team: user.team,
          }
        : emptyValues
    );
  }, [open, mode, user, reset]);

  const handleError = (error: Error) => {
    if (error instanceof ApiError && error.status === 409 && error.code === 'EMAIL_ALREADY_EXISTS') {
      setError(
        'email',
        {
          type: 'server',
          message: error.message,
        },
        { shouldFocus: true }
      );

      return;
    }

    onError(error.message);
  };

  const handleClose = () => {
    if (isPending) return;

    reset();
    onClose();
  };

  const onSubmit = (values: UserFormValues) => {
    if (mode === 'add') {
      createUser.mutate(values, {
        onSuccess: () => {
          reset();
          onClose();
          onSuccess('User created successfully');
        },
        onError: handleError,
      });

      return;
    }

    if (!user) return;

    updateUser.mutate(
      { id: user.id, values },
      {
        onSuccess: () => {
          reset();
          onClose();
          onSuccess('User updated successfully');
        },
        onError: handleError,
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle>{mode === 'add' ? 'Add User' : 'Edit User'}</DialogTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label='Name'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label='Email'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label='Role'
                  defaultValue=''
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  <MenuItem value='Admin'>Admin</MenuItem>
                  <MenuItem value='Manager'>Manager</MenuItem>
                  <MenuItem value='Member'>Member</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name='team'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label='Team'
                  defaultValue=''
                  error={!!errors.team}
                  helperText={errors.team?.message}
                >
                  <MenuItem value='Engineering'>Engineering</MenuItem>
                  <MenuItem value='Marketing'>Marketing</MenuItem>
                  <MenuItem value='Design'>Design</MenuItem>
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            loading={isPending}
          >
            {mode === 'add' ? 'Create User' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getUsers } from '../api/users';
import DeleteUserDialog from '../components/DeleteUserDialog';
import UserDialog from '../components/UserDialog';
import UserSummary from '../components/UserSummary';
import UsersTable from '../components/UsersTable';
import useDeleteUser from '../hooks/useDeleteUSer';
import type { User } from '../types/user';

const UsersPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [team, setTeam] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const deleteUser = useDeleteUser();

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(0);
  }, 300);
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: [
      'users',
      search,
      role,
      team,
      page,
      rowsPerPage,
      sortBy,
      sortDirection,
    ],
    queryFn: () =>
      getUsers({
        search,
        role,
        team,
        page,
        size: rowsPerPage,
        sortBy,
        sortDirection,
      }),
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }

    setPage(0);
  };

  const handleAdd = () => {
    setDialogMode('add');
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (!userToDelete || deleteUser.isPending) return;

    deleteUser.mutate(userToDelete.id, {
      onSuccess: () => {
        setUserToDelete(null);

        setToast({
          open: true,
          severity: 'success',
          message: 'User deleted successfully',
        });
      },
      onError: (error) => {
        setToast({
          open: true,
          severity: 'error',
          message: error.message,
        });
      },
    });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4'>User Management</Typography>

        <Button variant='contained' onClick={handleAdd}>
          Add User
        </Button>
      </Box>

      <UserSummary />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          type='search'
          label='Search users'
          size='small'
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(e.target.value);
          }}
          sx={{ flex: 1 }}
        />

        <TextField
          select
          label='Role'
          size='small'
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(0);
          }}
          sx={{ width: 180 }}
        >
          <MenuItem value=''>All Roles</MenuItem>
          <MenuItem value='Admin'>Admin</MenuItem>
          <MenuItem value='Manager'>Manager</MenuItem>
          <MenuItem value='Member'>Member</MenuItem>
        </TextField>

        <TextField
          select
          label='Team'
          size='small'
          value={team}
          onChange={(e) => {
            setTeam(e.target.value);
            setPage(0);
          }}
          defaultValue='All Teams'
          sx={{ width: 180 }}
        >
          <MenuItem value=''>All Teams</MenuItem>
          <MenuItem value='Engineering'>Engineering</MenuItem>
          <MenuItem value='Marketing'>Marketing</MenuItem>
          <MenuItem value='Design'>Design</MenuItem>
        </TextField>
      </Box>

      {isPending ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity='error'>Failed to load users</Alert>
      ) : (
        <UsersTable
          users={data?.users ?? []}
          totalElements={data?.totalElements ?? 0}
          isPending={isPending}
          isError={isError}
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
          onPageChange={setPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setPage(0);
          }}
          onEdit={handleEdit}
          onDelete={setUserToDelete}
        />
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;

          setToast((prev) => ({ ...prev, open: false }));
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          severity={toast.severity}
          variant='filled'
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <UserDialog
        open={dialogOpen}
        mode={dialogMode}
        user={selectedUser}
        onClose={handleClose}
        onSuccess={(message) => {
          setToast({
            open: true,
            severity: 'success',
            message,
          });
        }}
        onError={(message) => {
          setToast({
            open: true,
            severity: 'error',
            message,
          });
        }}
      />

      <DeleteUserDialog
        open={!!userToDelete}
        user={userToDelete}
        loading={deleteUser.isPending}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default UsersPage;

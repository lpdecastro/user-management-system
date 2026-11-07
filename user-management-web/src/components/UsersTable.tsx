import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TablePagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../types/user';

export type UsersTableProps = {
  users: User[];
  totalElements: number;
  isPending: boolean;
  isError: boolean;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UsersTable = ({
  users,
  totalElements,
  isPending,
  isError,
  page,
  rowsPerPage,
  sortBy,
  sortDirection,
  onSort,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: UsersTableProps) => {
  if (isPending) return <CircularProgress />;

  if (isError) return <Alert severity='error'>Failed to load users</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {(['id', 'name', 'email', 'role', 'team'] as const).map(
              (column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={sortBy === column}
                    direction={sortBy === column ? sortDirection : 'asc'}
                    onClick={() => onSort(column)}
                  >
                    {column.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              )
            )}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.team}</TableCell>
              <TableCell>
                <IconButton
                  size='small'
                  aria-label={`Edit ${user.name}`}
                  onClick={() => onEdit(user)}
                >
                  <EditIcon fontSize='small' />
                </IconButton>

                <IconButton
                  color='error'
                  size='small'
                  aria-label={`Delete ${user.name}`}
                  onClick={() => onDelete(user)}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component='div'
        count={totalElements ?? 0}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      />
    </TableContainer>
  );
};

export default UsersTable;

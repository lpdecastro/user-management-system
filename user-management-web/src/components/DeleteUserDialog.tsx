import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type { User } from '../types/user';

type Props = {
  open: boolean;
  user: User | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteUserDialog = ({ open, user, loading, onClose, onConfirm }: Props) => {
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {user?.name}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          color='error'
          variant='contained'
          loading={loading}
          onClick={onConfirm}
        >
          Delete User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;

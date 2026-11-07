import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/users';

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};

export default useDeleteUser;

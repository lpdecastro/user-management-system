import { useQuery } from '@tanstack/react-query';
import { getUserSummary } from '../api/userSummary';

const useUserSummary = () => {
  return useQuery({
    queryKey: ['users', 'summary'],
    queryFn: getUserSummary,
  });
};

export default useUserSummary;

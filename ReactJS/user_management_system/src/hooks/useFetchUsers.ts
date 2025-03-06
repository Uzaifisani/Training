import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAllUsers } from '../apis/api';
import { useUserStore } from '../store/userStore';

const useFetchUsers = () => {
  const addUsers = useUserStore((state) => state.addUsers);
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["All Users"],
    queryFn: getAllUsers,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, 
  });

  useEffect(() => {
    if (isSuccess && data) {
      addUsers(data.data);
    }
  }, [isSuccess, data, addUsers]);

 
  return { data,isLoading, isSuccess, isError };
};

export default useFetchUsers;
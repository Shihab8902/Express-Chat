import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { UserContext } from '../Context/AuthProvider';


const useGetSecure = (queryKey, url) => {

    const { loading } = useContext(UserContext);

    const axiosSecure = useAxiosSecure();

    const { data, isPending, refetch } = useQuery({
        queryKey: queryKey,
        enabled: !loading,
        queryFn: async () => {
            const result = await axiosSecure.get(url);
            return result.data;
        }
    });


    return { data, isPending, refetch }



}

export default useGetSecure
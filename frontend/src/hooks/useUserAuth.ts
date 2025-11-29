import { UserService } from '../api/service';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys';
import { useLocation } from 'react-router';

const useUserAuth = () => {
    const location = useLocation()
    const { data: user, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.USER],
        queryFn: UserService.getUserProfile,
        enabled: location.pathname !== '/login' && location.pathname !== '/signup',
    });

    return {
        user,
        isLoading,

    }
}

export default useUserAuth
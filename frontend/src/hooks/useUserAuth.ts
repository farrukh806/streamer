import { UserService } from '../api/user-service';
import { useQuery } from '@tanstack/react-query';

const useUserAuth = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: UserService.getUserProfile,
    });

    return {
        user,
        isLoading,

    }
}

export default useUserAuth
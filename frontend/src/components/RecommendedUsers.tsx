import { useQuery } from '@tanstack/react-query'
import { UserService } from '../api/user-service'
import LoadingSpinner from './LoadingSpinner'
import { handleError } from '../lib/utils'
import RecommendedUser from './RecommendedUser'
import { QUERY_KEYS } from '../constants/query-keys'

const RecommendedUsers = () => {

    const { data: recommendations, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.RECOMMENDATIONS],
        queryFn: UserService.getRecommendations,
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })
    if (isLoading) return <LoadingSpinner />

    if (!recommendations?.data || recommendations.data.length === 0) {
        return null
    }

    return (
        <div className="space-y-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Meet New Learners</h2>
                <p className="text-base-content/60 text-sm">Discover perfect language exchange partners based on your profile</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.data.map((user) => (
                    <RecommendedUser key={user._id} user={user}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecommendedUsers

import { useQuery } from '@tanstack/react-query'
import { UserService } from '../api/service'
import { Users, UserPlus } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import { handleError } from '../lib/utils'
import UserCard from './UserCard'
import { QUERY_KEYS } from '../constants/query-keys'
import { Link } from 'react-router'

const FriendList = () => {
    const { data: friends, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.FRIENDS],
        queryFn: UserService.getFriends,
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })

    if (isLoading) return <LoadingSpinner />

    if (!friends?.data || friends.data.length === 0) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Friends</h2>

                <div className="card bg-base-200 border border-base-300 shadow-sm">
                    <div className="card-body items-center text-center py-12 px-6">
                        <div className="avatar placeholder mb-4">
                            <div className="bg-base-300 rounded-full w-24 h-24 flex items-center justify-center">
                                <Users size={48} className="text-base-content/40" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2">No friends yet</h3>
                        <p className="text-base-content/60 max-w-md mb-6">
                            Start building your language learning network! Connect with other learners to practice together and improve your skills.
                        </p>

                        <div className="flex items-center gap-2 text-sm text-base-content/50">
                            <UserPlus size={16} />
                            <span>Scroll down to discover recommended users</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Friends</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.data.map((friend) => (
                    <UserCard
                        key={friend._id}
                        user={friend}
                        actionButton={
                            <Link to={`/chat/${friend._id}`} className="btn btn-outline btn-block btn-sm rounded-full hover:bg-base-content hover:text-base-100">
                                Message
                            </Link>
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default FriendList

import { Bell, UserPlus, UserCheck } from 'lucide-react'
import IncomingFriendRequests from '../components/IncomingFriendRequests'
import SectionHeader from '../components/SectionHeader'
import NotificationItem from '../components/NotificationItem'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '../api/user-service'
import { QUERY_KEYS } from '../constants/query-keys'
import { handleError } from '../lib/utils'

const Notifications = () => {
    // Fetch incoming friend requests to get count
    const { data: incomingRequests } = useQuery({
        queryKey: [QUERY_KEYS.INCOMING_FRIEND_REQUESTS],
        queryFn: UserService.getIncomingFriendRequests,
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })

    // Sample new connections data (will be replaced with actual API data later)
    const newConnections = [
        {
            id: 1,
            avatar: '',
            name: 'Kyle Doe',
            message: 'Kyle Doe accepted your friend request',
            timestamp: 'Recently'
        }
    ]

    const friendRequestCount = incomingRequests?.data?.filter((request: any) => {
        const sender = typeof request.sender === 'string' ? null : request.sender
        return sender !== null
    }).length || 0

    return (
        <div className="container mx-auto max-w-7xl space-y-8 pb-12">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Notifications</h1>
            </div>

            {/* Friend Requests Section */}
            {friendRequestCount > 0 && (
                <section className="space-y-4">
                    <SectionHeader
                        icon={<UserPlus size={24} />}
                        title="Friend Requests"
                        count={friendRequestCount}
                    />
                    <IncomingFriendRequests />
                </section>
            )}

            {/* Divider */}
            {friendRequestCount > 0 && newConnections.length > 0 && (
                <div className="divider"></div>
            )}

            {/* New Connections Section */}
            {newConnections.length > 0 && (
                <section className="space-y-4">
                    <SectionHeader
                        icon={<Bell size={24} />}
                        title="New Connections"
                    />
                    <div className="bg-base-200 rounded-lg border border-base-300 divide-y divide-base-300">
                        {newConnections.map((connection) => (
                            <NotificationItem
                                key={connection.id}
                                avatar={connection.avatar}
                                title={connection.name}
                                message={connection.message}
                                timestamp={connection.timestamp}
                                badge="New Friend"
                                badgeIcon={<UserCheck size={16} />}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {friendRequestCount === 0 && newConnections.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Bell size={64} className="text-base-content/20 mb-4" />
                    <h2 className="text-xl font-semibold text-base-content/60 mb-2">No notifications yet</h2>
                    <p className="text-sm text-base-content/40">We'll notify you when something arrives</p>
                </div>
            )}
        </div>
    )
}

export default Notifications

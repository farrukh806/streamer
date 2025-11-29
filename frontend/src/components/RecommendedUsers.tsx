import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from '../api/user-service'
import { UserPlus, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from './LoadingSpinner'
import { handleError } from '../lib/utils'
import type { IApiError } from '../types/api'
import UserCard from './UserCard'
import Button from './Button'

const RecommendedUsers = () => {
    const queryClient = useQueryClient()

    const { data: recommendations, isLoading } = useQuery({
        queryKey: ['recommendations'],
        queryFn: UserService.getRecommendations,
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })

    const { data: sentRequests } = useQuery({
        queryKey: ['sent-friend-requests'],
        queryFn: UserService.getSentFriendRequests,
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })

    const sendRequestMutation = useMutation({
        mutationFn: UserService.sendFriendRequest,
        onSuccess: () => {
            toast.success('Friend request sent!')
            queryClient.invalidateQueries({ queryKey: ['recommendations'] })
            queryClient.invalidateQueries({ queryKey: ['sent-friend-requests'] })
        },
        onError: (error: IApiError) => {
            handleError(error.response?.data?.message)
        }
    })

    const handleConnect = (userId: string) => {
        sendRequestMutation.mutate(userId)
    }

    const hasStatusRequest = (userId: string, status: string): boolean => {
        if (!sentRequests?.data) return false
        return sentRequests.data.some((request) => {
            const recipientId = typeof request.recipient === 'string'
                ? request.recipient
                : request.recipient._id
            return recipientId === userId && request.status === status
        })
    }

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
                    <UserCard key={user._id} user={user}
                        actionButton={
                            <Button
                                onClick={() => handleConnect(user._id)}
                                disabled={sendRequestMutation.isPending || hasStatusRequest(user._id, "pending") || hasStatusRequest(user._id, "rejected")}
                                className="btn btn-success btn-block rounded-full text-white hover:bg-success/90 border-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sendRequestMutation.isPending ? (
                                    <LoadingSpinner />
                                ) : hasStatusRequest(user._id, "pending") ? (
                                    <>
                                        <Check size={18} />
                                        Request Sent
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        Send Friend Request
                                    </>
                                )}
                            </Button>
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default RecommendedUsers

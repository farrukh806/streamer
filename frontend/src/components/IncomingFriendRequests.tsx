import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { UserService } from '../api/service'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from './LoadingSpinner'
import { handleError } from '../lib/utils'
import UserCard from './UserCard'
import type { IFriendRequest } from '../types/user-types'
import Button from './Button'
import { QUERY_KEYS } from '../constants/query-keys'
import type { IApiError } from '../types/api'

const IncomingFriendRequests = () => {
    const queryClient = useQueryClient()
    const [processingRequestId, setProcessingRequestId] = useState<string | null>(null)

    const { data: incomingRequests, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.INCOMING_FRIEND_REQUESTS],
        queryFn: UserService.getIncomingFriendRequests,
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })

    const acceptMutation = useMutation({
        mutationFn: (friendRequestId: string) =>
            UserService.updateFriendRequestStatus(friendRequestId, 'accepted'),
        onSuccess: () => {
            toast.success('Friend request accepted!')
            setProcessingRequestId(null)
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INCOMING_FRIEND_REQUESTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FRIENDS] })
        },
        onError: (error: IApiError) => {
            setProcessingRequestId(null)
            handleError(error.response?.data?.message || 'Failed to accept friend request')
        }
    })

    const rejectMutation = useMutation({
        mutationFn: (friendRequestId: string) =>
            UserService.updateFriendRequestStatus(friendRequestId, 'rejected'),
        onSuccess: () => {
            toast.success('Friend request rejected')
            setProcessingRequestId(null)
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INCOMING_FRIEND_REQUESTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SENT_FRIEND_REQUESTS] })
        },
        onError: (error: IApiError) => {
            setProcessingRequestId(null)
            handleError(error.response?.data?.message || 'Failed to reject friend request')
        }
    })

    const handleAccept = (friendRequestId: string) => {
        setProcessingRequestId(friendRequestId)
        acceptMutation.mutate(friendRequestId)
    }

    const handleReject = (friendRequestId: string) => {
        setProcessingRequestId(friendRequestId)
        rejectMutation.mutate(friendRequestId)
    }

    if (isLoading) return <LoadingSpinner />

    if (!incomingRequests?.data || incomingRequests.data.length === 0) {
        return null
    }

    // Filter out any requests where sender is not populated
    const validRequests = incomingRequests.data.filter((request: IFriendRequest) => {
        const sender = typeof request.sender === 'string' ? null : request.sender
        return sender !== null
    })

    if (validRequests.length === 0) {
        return null
    }

    return (
        <div className="space-y-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Friend Requests</h2>
                <p className="text-base-content/60 text-sm">You have {validRequests.length} pending friend request{validRequests.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {validRequests.map((request: IFriendRequest) => {
                    const sender = typeof request.sender === 'string' ? null : request.sender
                    if (!sender) return null

                    return (
                        <UserCard
                            key={request._id}
                            user={sender}
                            showBio={true}
                            actionButton={
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleAccept(request._id)}
                                        disabled={processingRequestId === request._id}
                                        className="btn btn-success btn-sm flex-1 rounded-full text-white hover:bg-success/90 border-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processingRequestId === request._id && acceptMutation.isPending ? (
                                            <span className="loading loading-spinner loading-xs"></span>
                                        ) : (
                                            <>
                                                <Check size={16} />
                                                Accept
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(request._id)}
                                        disabled={processingRequestId === request._id}
                                        className="btn btn-error btn-sm flex-1 rounded-full text-white hover:bg-error/90 border-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processingRequestId === request._id && rejectMutation.isPending ? (
                                            <span className="loading loading-spinner loading-xs"></span>
                                        ) : (
                                            <>
                                                <X size={16} />
                                                Reject
                                            </>
                                        )}
                                    </Button>
                                </div>
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default IncomingFriendRequests


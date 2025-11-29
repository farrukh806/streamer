import UserCard from './UserCard'
import { type IUser } from '../types/user-types'
import Button from './Button'
import LoadingSpinner from './LoadingSpinner'
import { Check, UserPlus, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from '../api/service'
import toast from 'react-hot-toast'
import { handleError } from '../lib/utils'
import type { IApiError } from '../types/api'
import { QUERY_KEYS } from '../constants/query-keys'

const RecommendedUser = ({ user }: { user: IUser }) => {
    const queryClient = useQueryClient()

    const { data: sentRequests, isLoading: isLoadingSentRequests } = useQuery({
        queryKey: [QUERY_KEYS.SENT_FRIEND_REQUESTS],
        queryFn: UserService.getSentFriendRequests,
        refetchOnMount: true, // Refetch to catch status updates from recipients
        throwOnError: (error) => {
            handleError(error)
            return true
        },
    })

    const sendRequestMutation = useMutation({
        mutationFn: UserService.sendFriendRequest,
        onSuccess: () => {
            toast.success('Friend request sent!')
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECOMMENDATIONS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SENT_FRIEND_REQUESTS] })
        },
        onError: (error: IApiError) => {
            handleError(error.response?.data?.message)
        }
    })

    const handleConnect = (userId: string) => {
        // Double check before sending to prevent race conditions
        if (hasPendingRequest || hasRejectedRequest) {
            return
        }
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

    const hasPendingRequest = hasStatusRequest(user._id, "pending")
    const hasRejectedRequest = hasStatusRequest(user._id, "rejected")
    const isDisabled = isLoadingSentRequests || sendRequestMutation.isPending || hasPendingRequest || hasRejectedRequest

    return (
        <UserCard key={user._id} user={user}
            actionButton={
                <Button
                    onClick={() => handleConnect(user._id)}
                    disabled={isDisabled}
                    className="btn btn-success btn-block rounded-full text-white hover:bg-success/90 border-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {sendRequestMutation.isPending ? (
                        <LoadingSpinner />
                    ) : hasPendingRequest ? (
                        <>
                            <Check size={18} />
                            Request Sent
                        </>
                    ) : hasRejectedRequest ? (
                        <>
                            <X size={18} />
                            Request Rejected
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
    )
}

export default RecommendedUser
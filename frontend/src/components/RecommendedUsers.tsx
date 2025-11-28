import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from '../api/user-service'
import { User, UserPlus, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from './LoadingSpinner'
import { getFlagUrl, handleError } from '../lib/utils'
import type { IApiError } from '../types/api'

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

    const hasSentRequest = (userId: string): boolean => {
        if (!sentRequests?.data) return false
        return sentRequests.data.some((request) => {
            const recipientId = typeof request.recipient === 'string'
                ? request.recipient
                : request.recipient._id
            return recipientId === userId && request.status === 'pending'
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
                    <div key={user._id} className="card bg-base-200 shadow-sm border border-base-300">
                        <div className="card-body p-5">
                            {/* Header: Avatar & Name */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="avatar">
                                    <div className="w-12 h-12 rounded-full">
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt={user.fullName} />
                                        ) : (
                                            <div className="bg-base-300 w-full h-full flex items-center justify-center">
                                                <User size={20} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">{user.fullName}</h3>
                                    {/* Location placeholder if we had it */}
                                    {/* <div className="flex items-center gap-1 text-xs text-base-content/60">
                                        <MapPin size={12} />
                                        <span>Istanbul, Turkey</span>
                                    </div> */}
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className="badge badge-success gap-1 p-3 text-xs font-medium text-white border-none">
                                    <img
                                        src={getFlagUrl(user.nativeLanguage, 'w20')}
                                        alt={user.nativeLanguage}
                                        className="w-4 h-3 object-cover rounded-sm"
                                    />
                                    <span>Native: {user.nativeLanguage.toLowerCase()}</span>
                                </div>
                                <div className="badge badge-outline gap-1 p-3 text-xs font-medium border-base-content/20">
                                    <img
                                        src={getFlagUrl(user.learningLanguage, 'w20')}
                                        alt={user.learningLanguage}
                                        className="w-4 h-3 object-cover rounded-sm"
                                    />
                                    <span>Learning: {user.learningLanguage.toLowerCase()}</span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-4 min-h-[3rem]">
                                <p className="text-sm text-base-content/60 line-clamp-2">
                                    {user.bio || "No bio available"}
                                </p>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => handleConnect(user._id)}
                                disabled={sendRequestMutation.isPending || hasSentRequest(user._id)}
                                className="btn btn-success btn-block rounded-full text-white hover:bg-success/90 border-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sendRequestMutation.isPending ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : hasSentRequest(user._id) ? (
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
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecommendedUsers

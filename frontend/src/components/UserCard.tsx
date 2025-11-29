import { User } from 'lucide-react'
import { getFlagUrl } from '../lib/utils'
import type { IUser } from '../types/user'

interface UserCardProps {
    user: IUser
    actionButton?: React.ReactNode
    showBio?: boolean
}

const UserCard = ({ user, actionButton, showBio = false }: UserCardProps) => {
    return (
        <div className="card bg-base-200 shadow-sm border border-base-300">
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
                        <span>Native: {user.nativeLanguage}</span>
                    </div>
                    <div className="badge badge-outline gap-1 p-3 text-xs font-medium border-base-content/20">
                        <img 
                            src={getFlagUrl(user.learningLanguage, 'w20')} 
                            alt={user.learningLanguage}
                            className="w-4 h-3 object-cover rounded-sm"
                        />
                        <span>Learning: {user.learningLanguage}</span>
                    </div>
                </div>

                {/* Bio */}
                {showBio && (
                    <div className="mb-4 min-h-12">
                        <p className="text-sm text-base-content/60 line-clamp-2">
                            {user.bio || "No bio available"}
                        </p>
                    </div>
                )}

                {/* Action Button */}
                {actionButton}
            </div>
        </div>
    )
}

export default UserCard


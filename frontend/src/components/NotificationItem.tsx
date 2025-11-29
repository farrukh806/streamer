import { Clock, User } from 'lucide-react'

interface NotificationItemProps {
    avatar?: string
    title: string
    message: string
    timestamp: string
    badge?: string
    badgeIcon?: React.ReactNode
}

const NotificationItem = ({
    avatar,
    title,
    message,
    timestamp,
    badge,
    badgeIcon
}: NotificationItemProps) => {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors">
            {/* Left side: Avatar + Content */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                        {avatar ? (
                            <img src={avatar} alt={title} />
                        ) : (
                            <div className="bg-base-300 w-full h-full flex items-center justify-center">
                                <User size={20} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h3 className="font-semibold text-base">{title}</h3>
                    <p className="text-sm text-base-content/70">{message}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-base-content/50">
                        <Clock size={12} />
                        <span>{timestamp}</span>
                    </div>
                </div>
            </div>

            {/* Right side: Badge */}
            {badge && (
                <div className="badge badge-success gap-2 px-3 py-3 text-white">
                    {badgeIcon}
                    {badge}
                </div>
            )}
        </div>
    )
}

export default NotificationItem

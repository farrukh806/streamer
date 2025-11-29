import { useState, useRef, useEffect } from 'react'
import { Bell, UserPlus, Video, TrendingUp, MessageCircle, X } from 'lucide-react'
import Button from './Button'

interface Notification {
    id: number
    type: 'follow' | 'video' | 'milestone' | 'comment'
    message: string
    time: string
    read: boolean
}

const NotificationsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Sample notifications with types (will be replaced with actual data later)
    const sampleNotifications: Notification[] = [
        { id: 1, type: 'follow', message: 'John Doe started following you', time: '2 hours ago', read: false },
        { id: 2, type: 'video', message: 'New video uploaded by Jane Smith', time: '5 hours ago', read: false },
        { id: 3, type: 'milestone', message: 'Your video reached 1000 views!', time: '1 day ago', read: true },
        { id: 4, type: 'comment', message: 'Sarah commented on your video', time: '2 days ago', read: true },
    ]

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const unreadCount = sampleNotifications.filter(n => !n.read).length

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'follow':
                return <UserPlus size={18} className="text-primary" />
            case 'video':
                return <Video size={18} className="text-secondary" />
            case 'milestone':
                return <TrendingUp size={18} className="text-success" />
            case 'comment':
                return <MessageCircle size={18} className="text-info" />
            default:
                return <Bell size={18} />
        }
    }

    return (
        <div className="dropdown dropdown-end" ref={dropdownRef}>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle relative indicator"
            >
                <Bell size={22} />
                {unreadCount > 0 && (
                    <span className="indicator-item badge badge-secondary badge-sm">{unreadCount}</span>
                )}
            </Button>

            {/* Notifications Dropdown Menu */}
            {isOpen && (
                <div className="dropdown-content card card-compact w-96 bg-base-200 shadow-2xl mt-3 z-50 border border-base-300">
                    <div className="card-body p-0">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-base-300">
                            <div>
                                <h3 className="font-bold text-lg">Notifications</h3>
                                {unreadCount > 0 && (
                                    <p className="text-xs text-base-content/60">{unreadCount} unread</p>
                                )}
                            </div>
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="btn btn-ghost btn-sm btn-circle"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-112 overflow-y-auto">
                            {sampleNotifications.length > 0 ? (
                                <div className="divide-y divide-base-300">
                                    {sampleNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 hover:bg-base-300/50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-primary/5' : ''
                                                }`}
                                        >
                                            {/* Icon */}
                                            <div className="shrink-0 mt-1">
                                                <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="text-xs text-base-content/60">{notification.time}</p>
                                                    {!notification.read && (
                                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <Bell size={48} className="mx-auto text-base-content/20 mb-3" />
                                    <p className="text-sm text-base-content/60">No notifications yet</p>
                                    <p className="text-xs text-base-content/40 mt-1">We'll notify you when something arrives</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {sampleNotifications.length > 0 && (
                            <div className="p-3 border-t border-base-300 bg-base-300/30">
                                <Button className="btn btn-ghost btn-sm w-full text-primary hover:bg-primary/10">
                                    View all notifications
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationsDropdown

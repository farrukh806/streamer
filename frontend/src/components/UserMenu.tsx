import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { User, Settings, LogOut } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useUserAuth from '../hooks/useUserAuth'
import { UserService } from '../api/user-service'
import Button from './Button'

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { user } = useUserAuth()

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: UserService.logout,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null)
            toast.success('Logged out successfully')
            navigate('/login')
        },
        onError: () => {
            toast.error('Failed to logout')
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="dropdown dropdown-end" ref={menuRef}>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`btn btn-circle border-none hover:shadow-lg hover:shadow-primary/30 transition-all ${user?.data?.profilePicture ? 'p-0 overflow-hidden' : 'bg-linear-to-r from-primary to-secondary'
                    }`}
            >
                {user?.data?.profilePicture ? (
                    <img
                        src={user.data.profilePicture}
                        alt={user.data.fullName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={20} />
                )}
            </Button>

            {/* User Menu Dropdown */}
            {isOpen && (
                <div className="dropdown-content menu bg-base-200 rounded-box w-56 shadow-xl mt-2 z-50">
                    <div className="px-4 py-3 border-b border-base-300">
                        <p className="text-sm font-medium truncate">{user?.data?.fullName}</p>
                        <p className="text-xs text-base-content/50 truncate">@{user?.data?.email}</p>
                    </div>
                    <ul className="p-2">
                        <li>
                            <Link
                                to="/settings"
                                className="flex items-center gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings size={18} />
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Button
                                onClick={() => {
                                    setIsOpen(false)
                                    handleLogout()
                                }}
                                disabled={logoutMutation.isPending}
                                className="flex items-center gap-3 text-error hover:bg-error/10"
                            >
                                <LogOut size={18} />
                                <span>
                                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                                </span>
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserMenu

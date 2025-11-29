import { Link, useLocation } from 'react-router'
import { Home, Users, Menu, X } from 'lucide-react'

interface SidebarProps {
    isOpen: boolean
    onToggle: () => void
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
    const location = useLocation()

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Friends', icon: Users, path: '/friends' },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <aside
            className={`${isOpen ? 'w-64' : 'w-20'} bg-base-200 border-r border-base-300 transition-all duration-300 ease-in-out flex flex-col`}
        >
            {/* Sidebar Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-base-300">
                {isOpen && (
                    <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Streamify
                    </h1>
                )}
                <button
                    onClick={onToggle}
                    className="btn btn-ghost btn-sm btn-square"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 py-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`btn btn-ghost flex items-center gap-3 justify-start ${active
                                ? 'bg-linear-to-r from-primary to-secondary text-primary-content shadow-lg'
                                : 'text-base-content/70 hover:text-base-content'
                                }`}
                        >
                            <Icon size={22} />
                            {isOpen && (
                                <span className="font-medium">{item.name}</span>
                            )}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar

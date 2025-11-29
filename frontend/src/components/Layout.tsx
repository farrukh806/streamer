import { type ReactNode, useState } from 'react'
import { Search } from 'lucide-react'
import Sidebar from './Sidebar'
import UserMenu from './UserMenu'
import ThemeSelector from './ThemeSelector'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-base-100 text-base-content">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="h-16 bg-base-200 border-b border-base-300 flex items-center justify-between px-6">
                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-10" size={20} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="input input-bordered w-full pl-10 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* Theme Selector */}
                        <ThemeSelector />

                        {/* User Menu Dropdown */}
                        <UserMenu />
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-auto bg-base-100">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout

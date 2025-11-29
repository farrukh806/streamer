import { useState, useRef, useEffect } from 'react'
import { Palette, Check } from 'lucide-react'

const ThemeSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentTheme, setCurrentTheme] = useState('night')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Popular DaisyUI themes
    const themes = [
        { name: 'light', label: 'Light', colors: ['#ffffff', '#f3f4f6', '#3b82f6'] },
        { name: 'dark', label: 'Dark', colors: ['#1f2937', '#111827', '#3b82f6'] },
        { name: 'night', label: 'Night', colors: ['#0f172a', '#1e293b', '#38bdf8'] },
        { name: 'cupcake', label: 'Cupcake', colors: ['#faf7f5', '#e0f2fe', '#65c3c8'] },
        { name: 'bumblebee', label: 'Bumblebee', colors: ['#fef3c7', '#fcd34d', '#f59e0b'] },
        { name: 'emerald', label: 'Emerald', colors: ['#ecfdf5', '#10b981', '#059669'] },
        { name: 'corporate', label: 'Corporate', colors: ['#ffffff', '#4b5563', '#3b82f6'] },
        { name: 'synthwave', label: 'Synthwave', colors: ['#1a103d', '#e779c1', '#58c7f3'] },
        { name: 'retro', label: 'Retro', colors: ['#ede6d6', '#ef9995', '#e4a672'] },
        { name: 'cyberpunk', label: 'Cyberpunk', colors: ['#ffee00', '#ff00ff', '#00ffff'] },
        { name: 'valentine', label: 'Valentine', colors: ['#fecdd3', '#e11d48', '#be123c'] },
        { name: 'halloween', label: 'Halloween', colors: ['#1f2937', '#f97316', '#a855f7'] },
        { name: 'garden', label: 'Garden', colors: ['#e9f3ec', '#5c7f67', '#90b77d'] },
        { name: 'forest', label: 'Forest', colors: ['#171212', '#1eb854', '#1fd65f'] },
        { name: 'aqua', label: 'Aqua', colors: ['#1e3a5f', '#3abff8', '#1fb2a6'] },
        { name: 'lofi', label: 'Lo-Fi', colors: ['#0f0f0f', '#ffffff', '#808080'] },
        { name: 'pastel', label: 'Pastel', colors: ['#ffffff', '#d1c1d7', '#f9a8d4'] },
        { name: 'fantasy', label: 'Fantasy', colors: ['#1f2937', '#6e0b75', '#c026d3'] },
        { name: 'wireframe', label: 'Wireframe', colors: ['#ffffff', '#000000', '#b8b8b8'] },
        { name: 'black', label: 'Black', colors: ['#000000', '#1f1f1f', '#373737'] },
        { name: 'luxury', label: 'Luxury', colors: ['#09090b', '#ffffff', '#ca8a04'] },
        { name: 'dracula', label: 'Dracula', colors: ['#282a36', '#ff79c6', '#bd93f9'] },
        { name: 'cmyk', label: 'CMYK', colors: ['#ffffff', '#00bfff', '#ff00ff'] },
        { name: 'autumn', label: 'Autumn', colors: ['#8c0327', '#a91e2f', '#e8b4b8'] },
        { name: 'business', label: 'Business', colors: ['#1f2937', '#3b82f6', '#1e40af'] },
        { name: 'acid', label: 'Acid', colors: ['#fafafa', '#ff00ff', '#ffff00'] },
        { name: 'lemonade', label: 'Lemonade', colors: ['#ffffff', '#519903', '#fbbf24'] },
        { name: 'coffee', label: 'Coffee', colors: ['#1b1917', '#db924b', '#a16207'] },
        { name: 'winter', label: 'Winter', colors: ['#ffffff', '#047aed', '#1e3a8a'] },
        { name: 'dim', label: 'Dim', colors: ['#1f2937', '#9ca3af', '#3b82f6'] },
        { name: 'nord', label: 'Nord', colors: ['#2e3440', '#5e81ac', '#88c0d0'] },
        { name: 'sunset', label: 'Sunset', colors: ['#1e293b', '#ff6b6b', '#fbbf24'] },
    ]
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        const savedTheme = localStorage.getItem('theme') || 'night'
        setCurrentTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleThemeChange = (themeName: string) => {
        setCurrentTheme(themeName)
        document.documentElement.setAttribute('data-theme', themeName)
        localStorage.setItem('theme', themeName)
        setIsOpen(false)
    }

    return (
        <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle"
                title="Change theme"
            >
                <Palette size={22} />
            </button>

            {/* Theme Selector Dropdown */}
            {isOpen && (
                <div className="dropdown-content card card-compact w-80 bg-base-200 shadow-2xl mt-3 z-50 border border-base-300">
                    <div className="card-body p-0">
                        {/* Header */}
                        <div className="p-4 border-b border-base-300">
                            <h3 className="font-bold text-lg">Choose Theme</h3>
                            <p className="text-xs text-base-content/60 mt-1">Select your preferred color scheme</p>
                        </div>

                        {/* Themes Grid */}
                        <div className="max-h-96 overflow-y-auto p-3">
                            <div className="grid grid-cols-1 gap-2">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.name}
                                        onClick={() => handleThemeChange(theme.name)}
                                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors ${currentTheme === theme.name ? 'bg-base-300 ring-2 ring-primary' : ''
                                            }`}
                                    >
                                        {/* Color Preview */}
                                        <div className="flex gap-1">
                                            {theme.colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="w-4 h-8 rounded"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>

                                        {/* Theme Name */}
                                        <span className="flex-1 text-left font-medium">{theme.label}</span>

                                        {/* Check Icon */}
                                        {currentTheme === theme.name && (
                                            <Check size={18} className="text-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ThemeSelector

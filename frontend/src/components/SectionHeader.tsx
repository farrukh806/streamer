import { type ReactNode } from 'react'

interface SectionHeaderProps {
    icon: ReactNode
    title: string
    count?: number
}

const SectionHeader = ({ icon, title, count }: SectionHeaderProps) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
                <div className="text-success">
                    {icon}
                </div>
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            {count !== undefined && count > 0 && (
                <span className="badge badge-success badge-sm text-white">
                    {count}
                </span>
            )}
        </div>
    )
}

export default SectionHeader

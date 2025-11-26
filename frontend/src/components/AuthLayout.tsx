import { type ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    rightContent?: ReactNode;
}

const AuthLayout = ({ children, rightContent }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen grid lg:grid-cols-2" data-theme="night">
            {/* Left Side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>

            {/* Right Side */}
            {rightContent}
        </div>
    );
};

export default AuthLayout;

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
}

const Button = ({
    children,
    isLoading = false,
    loadingText = "Loading...",
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-primary w-full ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-spinner loading-sm"></span>
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;

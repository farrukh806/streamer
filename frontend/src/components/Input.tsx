import { forwardRef, type InputHTMLAttributes } from "react";
import { type FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className = "", ...props }, ref) => {
        return (
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">{label}</span>
                </label>
                <div className="relative mt-1">
                    <input
                        ref={ref}
                        className={`input focus:border-none w-full ${icon ? "pl-10" : ""} ${error ? "input-error" : ""
                            } ${className}`}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                            {icon}
                        </div>
                    )}
                </div>
                <ErrorMessage error={error?.message} />
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;

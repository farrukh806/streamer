import { forwardRef, type InputHTMLAttributes } from "react";
import { type FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="form-control">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
                <input
                    ref={ref}
                    className={`input input-bordered w-full ${error ? "input-error" : ""
                        } ${className}`}
                    {...props}
                />
                <ErrorMessage error={error?.message} />
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;

import { forwardRef, type SelectHTMLAttributes } from "react";
import { type FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: FieldError;
    icon?: React.ReactNode;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, icon, options, placeholder = "Select an option", className = "", ...props }, ref) => {
        return (
            <div className="form-control w-full">
                <Label label={label} />
                <div className="relative mt-1">
                    {icon && (
                        <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <select
                        ref={ref}
                        className={`select select-bordered focus:border-none focus-within:border-none w-full ${icon ? "pl-10" : ""
                            } ${error ? "select-error" : ""} ${className}`}
                        {...props}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <ErrorMessage error={error?.message} />
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;

import { type ReactNode } from "react";

interface FormContainerProps {
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}

const FormContainer = ({ title, children, footer }: FormContainerProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold text-center mb-6">
                        {title}
                    </h2>
                    {children}
                    {footer && (
                        <>
                            <div className="divider">OR</div>
                            {footer}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormContainer;

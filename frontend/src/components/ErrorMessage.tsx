const ErrorMessage = ({ error }: { error?: string }) => {
    return (
        error && <span className="text-red-500">{error}</span>
    )
}

export default ErrorMessage
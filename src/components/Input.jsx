const Input = ({ label, type = "text", placeholder, className = "",error, name, ...props }) => {
    const errorId=`${name}-error`;

    return (
        <div className="flex flex-col gap-2 mt-6">
            <label htmlFor={name} className="font-header text-sm text-primary-dark ml-1">{label}</label>
            <input
                {...props}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                className={`w-full min-h-12 px-4 rounded-lg border border-primary-dark bg-white
                           placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-primary-dark/20 ${className}`}
            />
            {error && (
                <span id={errorId} className="text-primary text-xs mt-1 ml-1" role="alert">{error}</span>
            )}
        </div>
    )
}
export default Input;
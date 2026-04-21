const Input = ({ label, type = "text", placeholder, ...props }) => {
    return (
        <div className="flex flex-col gap-2 mt-6">
            {/* Erişilebilirlik için label eklemek iyidir, gizlemek istersen sr-only kullanabilirsin */}
            <label className="font-header text-sm text-primary-dark ml-1">{label}</label>
            <input
                {...props}
                type={type}
                placeholder={placeholder}
                className="w-full min-h-12 px-4 rounded-lg border border-primary-dark bg-white
                           placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-primary-dark/20"
            />
        </div>
    )
}
export default Input;
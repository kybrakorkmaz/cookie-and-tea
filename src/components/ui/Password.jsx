import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = ({ label, placeholder, className = "", error, name, ...props }) => {
    const [isEye, setIsEye] = useState(false);
    const errorId = `${name}-error`;

    return (
        <div className="flex flex-col gap-2 mt-6">
            <label htmlFor={name} className="font-header text-sm text-primary-dark ml-1">
                {label}
            </label>
            <div className="flex relative">
                <input
                    {...props}
                    id={name}
                    name={name}
                    type={isEye ? "text" : "password"}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? errorId : undefined}
                    className={`w-full min-h-12 px-4 rounded-lg border border-primary-dark bg-white
                           placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-primary-dark/20 ${className}`}
                />
                <button
                    type="button"
                    onClick={() => setIsEye(!isEye)}
                    aria-pressed={isEye}
                    aria-label={isEye ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/3 cursor-pointer text-primary-dark/70 hover:text-primary-dark select-none z-10 bg-transparent border-none focus:outline-none"
                >
                    {isEye ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                </button>
            </div>
            {error && (
                <span id={errorId} className="text-primary text-xs mt-1 ml-1" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default Password;
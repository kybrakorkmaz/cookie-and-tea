import {Navigate, useNavigate} from "react-router";

export const PrimaryButton = ({ text, type, onClick, disabled, bgColor, textColor, textPosition }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${bgColor} ${textColor} ${textPosition} px-8 py-3 rounded-lg transition-all 
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 active:scale-95"}`}
        >
            {text}
        </button>
    );
};
export const SecondaryButton = ({ text, type = "button", path, ...buttonProps }) => {
    const navigate = useNavigate();
    return(
        <button
            {...buttonProps}
            type={type}
            className="bg-primary-dark min-w-64 max-w-full min-h-12 md:min-h-16 px-6 rounded-3xl text-white font-paragraph font-bold mx-auto my-10 cursor-pointer"
            onClick={(e)=>{
                e.preventDefault();
                //console.log("clicked");
                navigate(path)
            }}
        >
            {text}
        </button>
    )
}
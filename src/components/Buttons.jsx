import {Navigate, useNavigate} from "react-router";

export const PrimaryButton = ({ text, textPosition="text-left", textColor, bgColor, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full md:w-32 h-12 ${textPosition} md:text-center pl-1 md:pl-0 ${bgColor} rounded-lg md:rounded-button ${textColor}`}
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
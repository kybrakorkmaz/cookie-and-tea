import {Navigate, useNavigate} from "react-router";

export const PrimaryButton = ({ text }) => {
    return (
        <button className="w-full md:w-32 h-12 text-left md:text-center pl-1 md:pl-0 bg-cream rounded-lg md:rounded-button text-black">
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
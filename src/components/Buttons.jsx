export const PrimaryButton = ({ text }) => {
    return (
        <button className="w-full md:w-32 h-12 text-left md:text-center pl-1 md:pl-0 bg-cream rounded-lg md:rounded-button text-black">
            {text}
        </button>
    );
};

export const SecondaryButton=({text})=>{
    return(
        <button className=" bg-primary-dark md:min-w-64 md:min-h-16 rounded-3xl text-white font-paragraph font-bold mx-auto my-10">{text}</button>
    )
}
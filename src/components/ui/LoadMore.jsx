const LoadMore = ({onClick, disabled = false, text = "Load More"}) =>{
    return(
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="block w-fit mx-auto px-10 py-3 bg-primary-dark text-white rounded-full font-bold hover:bg-primary-dark/90 transition-all disabled:opacity-50"
        >
            {text}
        </button>
    )
}

export  default LoadMore;

const LoadMore = ({onClick}) =>{
    return(
        <button
            type="button"
            onClick={onClick}
            className="mx-auto px-10 py-3 bg-primary-dark text-white rounded-full font-bold hover:bg-primary-dark/90 transition-all"
        >
            Load More
        </button>
    )
}

export  default LoadMore;
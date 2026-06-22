const LoadMore = ({setVisibleCount}) =>{
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };
    return(
        <button
            type="button"
            onClick={handleLoadMore}
            className="mx-auto px-10 py-3 bg-primary-dark text-white rounded-full font-bold hover:bg-opacity-90 transition-all"
        >
            Load More
        </button>
    )
}

export  default LoadMore;
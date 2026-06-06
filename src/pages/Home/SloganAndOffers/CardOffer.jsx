const CardOffer=({text})=>{
    return(
        <div className="card-offer p-12 max-w-sm min-h-2/5">
            <div className="rounded-2xl h-full  bg-primary p-8 ">
                <p className="text-center text-base text-white  font-header text-sh">
                    {text}
                </p>
            </div>
        </div>

    )
}
export default CardOffer;
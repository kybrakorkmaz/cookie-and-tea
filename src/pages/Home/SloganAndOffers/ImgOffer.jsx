const ImgOffer=({url, alt})=>{
    return(
        <img className="inline-block w-8 h-8 mx-1 max-w-14 max-h-14 lg:min-w-14 lg:min-h-14" src={url} alt={alt}/>
    )
}
export default ImgOffer;
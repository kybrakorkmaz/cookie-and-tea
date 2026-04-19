import {offerImages, offers} from "../../../constants/index.js";
import CardOffer from "../../../components/CardOffer.jsx";
import ImgOffer from "../../../components/ImgOffer.jsx";
import {useEffect} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Offers=()=>{
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".card-offer", {
                opacity: 0,
                y: 60,
                duration: 0.6,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".card-offer-wrapper",
                    start: "top 80%",
                }
            });
        });

        return () => ctx.revert(); // cleanup (kritik)
    }, []);
    return(
        // Card Container
        <div className="card-offer-wrapper flex flex-wrap justify-center mt-40">
            {/* Offer with images **/}
            <div className="card-offer p-12 max-w-sm  min-h-2/5">
                <div className="rounded-2xl h-full dark:bg-gray-800 bg-primary p-14 md:p-8">
                    <p className= "inline-block text-center text-base text-white dark:text-gray-300 font-header text-sh">
                        Donate a 5$ <ImgOffer url={offerImages.img1} alt={offerImages.alt1}/>or
                        a 7$ <ImgOffer url={offerImages.img2} alt={offerImages.alt2}/> or
                        both! <ImgOffer url={offerImages.img3} alt={offerImages.alt3}/>
                    </p>
                </div>
            </div>
            {/* Offer without images **/}
            {offers.map(offer=>(<CardOffer key={offer.id} id={offer.id} text={offer.text}/>))}
        </div>
    )
}
export default Offers;
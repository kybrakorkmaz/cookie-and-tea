import {SecondaryButton} from "../../../components/Buttons.jsx";

const Slogan=()=>{
    return(
        <div>
            <p className="font-header text-h-2 text-center py-10 font-bold">SHARE YOUR CREATIVE WORK <br/>
                OR <br/>
                SUPPORT OTHERS <br/>
                EITHER WAY WE ARE WITH YOU!
            </p>
            <p className="font-header text-sh text-center">
                Donate people’s work or send them a support message. <br/>With CAT, everything is so simple
            </p>
            <div className="flex   ">
                <SecondaryButton text={"Show your passion!"}/>
            </div>
        </div>
    )
}

export default Slogan;
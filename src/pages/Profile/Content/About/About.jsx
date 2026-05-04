import {FaPenToSquare} from "react-icons/fa6";
import {useEffect, useState} from "react";
import AboutEdit from "./AboutEdit.jsx";

const About = ({about}) => {
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [currentAbout, setCurrentAbout] = useState(about || "");

    useEffect(() => {
        setCurrentAbout(about || "");
    }, [about]);

    // if edit icon clicked prevent scrolling
    useEffect(() => {
        document.body.style.overflow = isEditClicked ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEditClicked]);


    const handleSaveAbout = async (updatedAbout) =>{
        const previousAbout = currentAbout;

        setCurrentAbout(updatedAbout);

        if(updatedAbout && updatedAbout.trim() !== "") {
            setCurrentAbout(updatedAbout);
        }

        try{
            const response = await fetch("url", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization":`Bearer ${token}`if user authenticated
                },
                body: JSON.stringify({about: updatedAbout})
            });

            if(!response.ok) throw new Error("Error Occurred");

            //close modal
            setIsEditClicked(false);
        }catch (error){
            //if error occurs rollback
            setCurrentAbout(previousAbout);
            console.error(error);
            alert("Changes couldn't be saved. Please try again!");
        }
    }


    return(
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-header text-sh text-primary-dark">About</h3>
                <button
                    onClick={()=>setIsEditClicked(true)}
                    className={"text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"}
                >
                    <FaPenToSquare className="w-5 h-5 "/>
                </button>
            </div>
            <hr className="border-gray-200 mb-6"/>
            <p className="font-paragraph text-gray-700 leading-relaxed">{currentAbout}</p>
            {isEditClicked && (
                <AboutEdit
                    about={currentAbout}
                    onClose={()=>setIsEditClicked(false)}
                    onSave={handleSaveAbout}
                />
            )}
        </div>
    )
}

export default About;
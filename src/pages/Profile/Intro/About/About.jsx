import {FaPenToSquare} from "react-icons/fa6";
import {useEffect, useState} from "react";
import AboutEdit from "./AboutEdit.jsx";
import apiClient from "../../../../api/axios.js";
import {useParams} from "react-router";

const About = ({about}) => {
    const {username} = useParams();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [currentAbout, setCurrentAbout] = useState(about || "");

    // Sync state safely only when the parent value actually shifts
    useEffect(() => {
        setCurrentAbout(about || "");
    }, [about]);

    // if edit icon clicked prevent scrolling
    useEffect(() => {
        document.body.style.overflow = isEditClicked ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEditClicked]);


    const handleSaveAbout = async (updatedAbout) =>{
        // Terminate instantly if invoked by mount-lifecycle automation
        if(updatedAbout===undefined){
            //setIsEditClicked(false);
            return;
        }
        const previousAbout = currentAbout;

        // Short-circuit if nothing changed to prevent wasteful network requests
        if(previousAbout === updatedAbout) {
            setIsEditClicked(false);
            return;
        }

        // Optimistic UI Update: change screen instantly for maximum perceived speed
        setCurrentAbout(updatedAbout);

        try{
           // Send payload inside an JSON request object body
            const response = await apiClient.put(`/api/v1/profile/${username}/about`, {
                about:updatedAbout
            });
            if (response.data?.about !== undefined) {
                setCurrentAbout(response.data.about);
            }
            //close modal
            setIsEditClicked(false);
        }catch (error){
            // Rollback state if network pipes break or fail schema check constraints
            setCurrentAbout(previousAbout);
            console.error("Failed saving profile about context:", error.message);
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
            <p className="font-paragraph text-gray-700 leading-relaxed">{currentAbout || "This person is so lazy to introduce themselves."}</p>
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
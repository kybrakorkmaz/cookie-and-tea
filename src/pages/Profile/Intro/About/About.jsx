import {FaPenToSquare} from "react-icons/fa6";
import AboutEdit from "./AboutEdit.jsx";
import {useProfileAbout} from "../../hooks/useProfileAbout.js";

const About = ({about}) => {
    const {
        currentAbout,
        handleSaveAbout,
        isEditClicked,
        setIsEditClicked
    } = useProfileAbout(about);

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
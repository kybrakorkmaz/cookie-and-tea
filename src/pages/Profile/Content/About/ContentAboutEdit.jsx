import {useState} from "react";

const ContentAboutEdit = ({about, onClose, onSave}) =>{
    const [currentAbout, setCurrentAbout] = useState(about || "");
    const LAZY_MESSAGE = "This person is so lazy to introduce themselves.";

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-heavy p-8">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-header text-xl text-primary-dark">Edit About</h4>
                    <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-2xl transition-colors">✕</button>
                </div>

                {/* About Section */}
                <textarea
                    name="about-textarea" id="about-textarea" rows="6"
                    onChange={(e) => setCurrentAbout(e.target.value)}
                    value={currentAbout}
                    className="w-full p-1 rounded-lg border bg-white focus:border-primary-dark focus:outline-none focus:ring-2 resize-none transition-all overflow-y-scroll scrollbar"
                />

                <div className="mt-8 flex justify-end gap-3 font-paragraph">
                    <button
                        onClick={() => onSave(LAZY_MESSAGE)}
                        className="px-4 py-2 text-red-400 hover:text-red-600 font-bold transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={() => {
                            const finalValue = currentAbout.trim() === "" ? LAZY_MESSAGE : currentAbout;
                            onSave(finalValue);
                        }}
                        className="bg-primary-dark text-white px-8 py-3 rounded-xl text-sm font-bold active:scale-95 transition-all hover:bg-opacity-90"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ContentAboutEdit;
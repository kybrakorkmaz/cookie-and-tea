import { FaXTwitter, FaSquarePinterest, FaYoutube, FaInstagram } from "react-icons/fa6";
import { useState } from "react";

const ICON_MAP = {
    twitter: FaXTwitter,
    instagram: FaInstagram,
    pinterest: FaSquarePinterest,
    youtube: FaYoutube,
};

const ContentSocialEdit = ({ socials, onClose, onSave }) => {
    // to store all data as state only store selected one's name. With name pick its url
    const [accountList, setAccountList] = useState(socials);
    const [selectedName, setSelectedName] = useState("");

    // update the list when input changes
    const handleUrlChange = (newUrl) => {
        setAccountList(prev => {
            // if account already added only update the url
            const exists = prev.find(acc => acc.name === selectedName);
            if (exists) {
                return prev.map(acc =>
                    acc.name === selectedName ? { ...acc, url: newUrl } : acc
                );
            }
            // if account does not exist in the list add new account and return
            return [...prev, { name: selectedName, url: newUrl }];
        });
    };

    // find selected one's url or return empty
    const currentUrl = accountList.find(acc => acc.name === selectedName)?.url || "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-heavy p-8">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-header text-xl text-primary-dark">Edit Socials</h4>
                    <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-2xl transition-colors">✕</button>
                </div>

                <div className="space-y-6">
                    {/* Social media icons */}
                    <div className="flex gap-4 justify-center">
                        {Object.entries(ICON_MAP).map(([name, IconComponent]) => (
                            <button
                                type="button"
                                key={name}
                                onClick={() => setSelectedName(name)}
                                className={`p-2 rounded-full transition-all border-2 ${
                                    selectedName === name
                                        ? 'border-primary-dark bg-primary-dark/10 scale-110'
                                        : 'border-transparent hover:bg-cream'
                                }`}
                            >
                                <IconComponent className="w-8 h-8 text-primary-dark" />
                            </button>
                        ))}
                    </div>

                    {/* when one icon is selected, input is pop up */}
                    <div className={`transition-all duration-300 ${selectedName ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                        <label className="text-xs font-bold text-primary-dark uppercase mb-2 block tracking-wider">
                            {selectedName} Profile Link
                        </label>
                        <input
                            type="text"
                            className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-primary-dark outline-none transition-colors font-paragraph text-sm"
                            placeholder="https://..."
                            value={currentUrl}
                            onChange={(e) => handleUrlChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-10 flex justify-end gap-3 font-paragraph">
                    <button onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-gray-600 font-bold transition-colors">Cancel</button>
                    <button
                        onClick={() => { onSave(accountList); onClose(); }}
                        className="bg-primary-dark text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all hover:bg-opacity-90"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentSocialEdit;
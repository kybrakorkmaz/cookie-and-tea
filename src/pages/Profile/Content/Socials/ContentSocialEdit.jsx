import { FaXTwitter, FaSquarePinterest, FaYoutube, FaInstagram } from "react-icons/fa6";
import {useEffect, useState} from "react";

const ICON_MAP = {
    twitter: FaXTwitter,
    instagram: FaInstagram,
    pinterest: FaSquarePinterest,
    youtube: FaYoutube,
};

const ContentSocialEdit = ({ socials, onClose, onSave }) => {
    // to store all data as state only store selected one's name. With name pick its url
    const [accountList, setAccountList] = useState(socials ?? []); // add fallback tto initialize
    const [selectedName, setSelectedName] = useState("");


    useEffect(() => {
        setAccountList(socials || []);
    }, [socials]);


    // update the list when input changes
    const handleUrlChange = (newUrl) => {
        setAccountList(prev => {
            const trimmedUrl = newUrl.trim();
            // if account already added only update the url
            const exists = prev.find(acc => acc.name === selectedName);

            // 1. If url is empty and the list has this account, remove the account
            if (trimmedUrl === "") {
                if (exists) {
                    return prev.filter(acc => acc.name !== selectedName);
                }
                // if the account not in the list do nothing
                return prev;
            }
            // if url is filled and in the list, update url
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
                    {selectedName && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="text-xs font-bold text-primary-dark uppercase mb-2 block">
                                {selectedName} Profile Link
                            </label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-primary-dark outline-none"
                                value={currentUrl}
                                onChange={(e) => handleUrlChange(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                    )}
                </div>

                <div className="mt-10 flex justify-end gap-3 font-paragraph">
                    <button
                        onClick={()=>{
                            if (!selectedName) return;
                            const updatedList = accountList.filter(acc => acc.name !== selectedName);
                            onSave(updatedList);
                        }}
                        className="px-4 py-2 text-gray-400 hover:text-gray-600 font-bold transition-colors"
                    >Remove
                    </button>
                    <button
                        onClick={() => {
                            const cleaned = accountList
                                .map(a => ({ ...a, url: a.url.trim() }))
                                .filter(a => a.url !== "");
                            onSave(cleaned);
                            onClose();
                        }
                    }
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
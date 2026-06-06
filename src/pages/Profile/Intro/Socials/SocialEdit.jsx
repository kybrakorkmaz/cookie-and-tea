import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {ICON_MAP} from "../../constants/profileConstants.js";


const SocialEdit = ({ socials, onClose, onSave }) => {
    const [accountList, setAccountList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")

    // Keep track of submission loading states to prevent double-clicks
    const [isSaving, setIsSaving] = useState(false);

    // Map incoming backend props into our state with a platform-index ID
    useEffect(() => {
        if (!socials) return;

        const formattedSocials = socials.map((s, index) => ({
            id: `${s.socialMedia}-${index}`,
            socialMedia: s.socialMedia,
            socialUrl: s.socialUrl || ""
        }));
        setAccountList(formattedSocials);
    }, [socials]);

    // Update the specific URL text using its unique compound ID
    const handleUrlChange = (targetId, newUrl) => {
        const updated = accountList.map(acc => {
            if (acc.id === targetId) {
                return { ...acc, socialUrl: newUrl };
            }
            return acc;
        });
        setAccountList(updated);
    };

    // Add a brand-new clean link input box for the active platform category
    const handleAddNewSlot = () => {
        const uniqueId = `${selectedCategory}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
        const newSlot = {
            id: uniqueId,
            socialMedia: selectedCategory,
            socialUrl: "" // Starts empty for the user to type into
        };
        setAccountList([...accountList, newSlot]);
    };
    // Remove a single specific input slot from our local state list
    const handleRemoveSlot = (targetId) => {
        const filtered = accountList.filter(acc => acc.id !== targetId);
        setAccountList(filtered);
    };

    // Filter out all links belonging to the clicked platform icon tab
    const filteredInputs = accountList.filter(acc => acc.socialMedia === selectedCategory);

    // Await the execution of onSave before closing the modal container
    const handleFormSubmit = async () => {
        const cleaned = accountList
            .map(a => ({ ...a, socialUrl: a.socialUrl.trim() }))
            .filter(a => a.socialUrl !== "");

        try {
            setIsSaving(true);
            // Wait for backend validation and resolution inside Socials.jsx handleSaveSocials
            await onSave(cleaned);
            // Only closes down if the network execution succeeded smoothly!
            onClose();
        } catch (error) {
            // Keep the modal open so the user doesn't lose data inputs on network dropouts
            console.error("Modal save intercept failed:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-heavy p-8">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-header text-xl text-primary-dark">Edit Socials</h4>
                    <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-2xl transition-colors cursor-pointer">✕</button>
                </div>

                <div className="space-y-6">
                    {/* Platform Selector Buttons */}
                    <div className="flex gap-4 justify-center">
                        {Object.entries(ICON_MAP).map(([name, IconComponent]) => (
                            <button
                                type="button"
                                key={name}
                                onClick={() => setSelectedCategory(name)}
                                className={`p-2 rounded-full transition-all border-2 cursor-pointer ${
                                    selectedCategory === name
                                        ? 'border-primary-dark bg-primary-dark/10 scale-110'
                                        : 'border-transparent hover:bg-cream'
                                }`}
                            >
                                <IconComponent className="w-8 h-8 text-primary-dark" />
                            </button>
                        ))}
                    </div>

                    {/* Active Form Inputs Block */}
                    {selectedCategory && (
                        <div className="space-y-4 border-t pt-4 border-gray-100 max-h-60 overflow-y-auto pr-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase">{selectedCategory} Profiles</span>
                                <button
                                    type="button"
                                    onClick={handleAddNewSlot}
                                    className="text-xs bg-cream text-primary-dark px-2 py-1 rounded-md font-bold flex items-center gap-1 hover:bg-primary-dark/10 transition-colors cursor-pointer"
                                >
                                    <FaPlus className="w-3 h-3"/> Add Link
                                </button>
                            </div>

                            {/* If the user doesn't have any links yet for this icon */}
                            {filteredInputs.length === 0 && (
                                <p className="text-sm text-gray-400 italic py-2">No links added yet. Click "Add Link" above.</p>
                            )}

                            {/* Loop over the filtered list so existing data displays instantly! */}
                            {filteredInputs.map((acc, index) => (
                                <div key={acc.id} className="flex gap-2 items-center animate-in fade-in slide-in-from-top-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-primary-dark outline-none text-sm"
                                            value={acc.socialUrl} // 🚀 Maps the existing URL string directly into the box!
                                            onChange={(e) => handleUrlChange(acc.id, e.target.value)}
                                            placeholder={`Account #${index + 1} URL (https://...)`}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSlot(acc.id)}
                                        className="text-gray-300 hover:text-red-500 font-bold p-2 text-sm transition-colors cursor-pointer"
                                        title="Delete this specific link"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="mt-10 flex justify-end gap-3 font-paragraph">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-gray-600 font-bold transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFormSubmit}
                        disabled={isSaving}
                        className="bg-primary-dark text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all hover:bg-opacity-90 cursor-pointer disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialEdit;
import { useState } from "react";
import { z } from "zod";

const aboutSchema = z.string().max(1000, { message: "Maximum 1000 characters allowed." });

const AboutEdit = ({ about, onClose, onSave }) => {
    const [currentAbout, setCurrentAbout] = useState(about || "");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false); // Multi-click guard protection


    const LAZY_MESSAGE = "This person is so lazy to introduce themselves.";

    const handleChange = (e) => {
        const val = e.target.value;
        // Validate with Zod
        const result = aboutSchema.safeParse(val);

        if (!result.success) {
            setError(result.error.issues[0].message);
        } else {
            setError("");
        }

        setCurrentAbout(val);
    };

    // Form transaction orchestrator
    const executeSavePipeline = async (valueToSend) => {
        try {
            setIsSaving(true);
            await onSave(valueToSend);
            onClose(); // Only fires if the promise resolves smoothly!
        } catch (err) {
            console.error("Modal about submit failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveInternal = () => {
        // Final Zod check
        const result = aboutSchema.safeParse(currentAbout);

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        const finalValue = currentAbout.trim() === "" ? LAZY_MESSAGE : currentAbout;
        onSave(finalValue);
    };

    const handleClearAll = () => {
        executeSavePipeline(LAZY_MESSAGE);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-heavy p-8">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-header text-xl text-primary-dark">Edit About</h4>
                    <button onClick={onClose} disabled={isSaving} className="text-gray-400 hover:text-black font-bold text-2xl transition-colors">✕</button>
                </div>

                {/* About Section */}
                <label htmlFor="about-textarea" className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                    About you
                </label>
                <textarea
                    name="about-textarea"
                    id="about-textarea"
                    rows="6"
                    maxLength={1000} // Hard limit at browser level
                    onChange={handleChange}
                    value={currentAbout}
                    className={`w-full p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 resize-none transition-all overflow-y-scroll scrollbar ${
                        error ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-primary-dark focus:ring-primary-dark/20"
                    }`}
                />

                <div className="flex justify-between items-center mt-2">
                    {/* Error Message */}
                    <span className="text-red-500 text-xs font-bold">{error}</span>

                    {/* Character Counter */}
                    <span className={`text-xs font-bold ${currentAbout.length >= 1000 ? "text-red-500" : "text-gray-400"}`}>
                        {currentAbout.length} / 1,000
                    </span>
                </div>

                <div className="mt-8 flex justify-end gap-3 font-paragraph">
                    <button
                        type="button"
                        onClick={handleClearAll}
                        disabled={isSaving}
                        className="px-4 py-2 text-red-400 hover:text-red-600 font-bold transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveInternal}
                        disabled={!!error || isSaving}
                        className="bg-primary-dark text-white px-8 py-3 rounded-xl text-sm font-bold active:scale-95 transition-all hover:bg-opacity-90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutEdit;
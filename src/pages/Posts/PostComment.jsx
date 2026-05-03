import { GrSend } from "react-icons/gr";
import { z } from "zod";
import { useState, useMemo } from "react";

const PostComment = ({oldComment="", onSend, update}) => {
    const [newComment, setNewComment] = useState(oldComment);
    const [status, setStatus] = useState({ message: "", type: "" });
    const MAX_CHARS = 500;

    const commentSchema = useMemo(() =>
        z.string()
            .min(1, "Comment cannot be empty!")
            .max(MAX_CHARS, `Too long! (Max ${MAX_CHARS})`), []);

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS + 10) setNewComment(value);
        if (status.type === "error") setStatus({ message: "", type: "" });
    };

    const handleSend = async () => {
        const trimmed = newComment.trim();
        const result = commentSchema.safeParse(trimmed);

        if (!result.success) {
            const errorMessage = result.error.issues[0]?.message || "Invalid input";
            setStatus({ message: errorMessage, type: "error" });
            return;
        }

        // Success Logic
        setStatus({ message: "Comment posted!", type: "success" });
        setNewComment("");
        setTimeout(() => setStatus({ message: "", type: "" }), 4000);
        if (update) {
            // Mode: EDITING
            update(trimmed); // Send back to parent
        } else {
            // Mode: NEW COMMENT
            console.log("Posting new comment...");
            setNewComment("");
        }

        if (onSend) onSend(); // Closes the edit toggle
    };

    // --- NEW: Key Handling Logic ---
    const handleKeyDown = (e) => {
        // If user presses Enter without Shift
        if (e.key === "Enter" && !e.shiftKey) {
            // Prevent default behavior (new line) and trigger send
            e.preventDefault();
            handleSend();
        }
        // If user presses Shift + Enter, it will naturally create a new line
    };

    return (
        <div className="flex flex-col w-full items-start py-4 mt-4">
            <div className="group relative w-full">
                <textarea
                    id="comment"
                    placeholder=" "
                    rows="1"
                    value={newComment}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} // Triggered on Enter

                    /* --- MOBILE OPTIMIZATIONS --- */
                    enterKeyHint="send"      // Changes mobile 'Return' button to 'Send'
                    autoComplete="off"       // Prevents weird browser overlays
                    spellCheck="true"        // Helpful for mobile typing

                    aria-invalid={status.type === "error"}
                    className={`peer w-full min-h-13 rounded-xl border-2 bg-white p-4 pr-14 text-sm outline-none transition-all resize-y
                        ${status.type === "error"
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-gray-900"
                    }`}
                />

                <label
                    htmlFor="comment"
                    className={`absolute left-4 top-4 origin-left -translate-y-8 scale-85 transform bg-white px-2 text-sm font-medium duration-200
                               peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                               peer-focus:-translate-y-8 peer-focus:scale-85
                               ${status.type === "error" ? "text-red-500" : "text-gray-500 peer-focus:text-gray-900"}`}
                >
                    Your Message
                </label>

                <button
                    type="button"
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 active:scale-90"
                >
                    <GrSend className="rotate-45" size={20} />
                </button>
            </div>

            <div className="flex justify-between w-full mt-1.5 px-1">
                <div aria-live="polite">
                    {status.message && (
                        <span className={`text-[11px] font-semibold flex items-center gap-1
                            ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                            {status.type === "success" && "✓ "}{status.message}
                        </span>
                    )}
                </div>
                <div className={`text-[10px] font-medium transition-colors ${newComment.length >= MAX_CHARS ? "text-red-500" : "text-gray-400"}`}>
                    {newComment.length} / {MAX_CHARS}
                </div>
            </div>
        </div>
    );
};

export default PostComment;
const toneClass = {
    success: "bg-green-700",
    error: "bg-red-500",
};

const Toast = ({ tone = "error", onClose, children }) => {
    const isError = tone === "error";
    return (
        <div
            className={`fixed bottom-4 right-4 flex items-center gap-3 ${toneClass[tone]} text-white px-6 py-3 rounded-xl shadow-lg z-[110] max-w-md`}
            role={isError ? "alert" : "status"}
        >
            <div className="font-paragraph text-p flex flex-col gap-0.5">
                {children}
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close notification"
                    className="hover:opacity-75 font-bold border-l border-white/40 pl-3 shrink-0 focus:outline-none cursor-pointer"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default Toast;

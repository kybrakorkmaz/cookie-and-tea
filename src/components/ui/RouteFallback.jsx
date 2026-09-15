const RouteFallback = ({ fullScreen = false }) => (
    <div
        className={
            fullScreen
                ? "min-h-screen flex items-center justify-center bg-cream"
                : "min-h-[40vh] flex items-center justify-center"
        }
        role="status"
        aria-label="Loading page"
    >
        <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary-dark border-t-transparent rounded-full animate-spin" />
            <p className="font-paragraph text-sm text-primary-dark/70">Loading page…</p>
        </div>
    </div>
);

export default RouteFallback;

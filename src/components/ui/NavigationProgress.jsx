import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Visible cue on every pathname change. Lazy chunks can load too fast for
// Suspense to paint; this bar still fires so a route switch is obvious.
const NavigationProgress = () => {
    const { pathname } = useLocation();
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
        const done = window.setTimeout(() => setActive(false), 450);
        return () => window.clearTimeout(done);
    }, [pathname]);

    if (!active) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[200] h-1 bg-primary-dark/20 overflow-hidden"
            role="progressbar"
            aria-label="Navigating"
        >
            <div className="h-full w-1/3 bg-primary-dark animate-pulse" />
        </div>
    );
};

export default NavigationProgress;

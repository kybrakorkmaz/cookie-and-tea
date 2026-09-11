// Global client-side error reporting.
//
// SIDE-EFFECT MODULE — must stay the FIRST import in main.jsx. ES modules
// evaluate imports in order, so registering handlers here guarantees they are
// active before App/axios/envValidation are evaluated — which is what lets us
// capture even module-scope crashes (e.g. a failed env validation throw).
import { logClientEvent } from "./utils/clientLogger.js";

window.addEventListener("error", (event) => {
    logClientEvent("error", event.message, {
        source: event.filename,
        line: event.lineno,
    });
});

window.addEventListener("unhandledrejection", (event) => {
    logClientEvent("error", "Unhandled promise rejection", {
        reason: String(event.reason),
    });
});

// One boot event per page load in production: records which API URL the
// deployed bundle was built with — the first thing to check when the app
// can't reach the backend.
if (import.meta.env.PROD) {
    logClientEvent("info", "Client boot", {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "MISSING",
        path: window.location.pathname,
    });
}

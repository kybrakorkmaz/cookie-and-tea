// Sends browser-side log events to the backend, which re-logs them through
// winston — making frontend errors visible in the backend's Vercel Runtime Logs.
//
// NOTE: reads import.meta.env directly instead of src/validations/envValidation.js
// on purpose: if env validation itself fails, this logger must still work.

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = baseUrl ? `${baseUrl}/api/v1/logs/client` : null;

const safeSerialize = (meta) => {
    try {
        return JSON.parse(JSON.stringify(meta));
    } catch {
        return { note: "meta could not be serialized" };
    }
};

// Fire-and-forget: logging must never throw, block rendering, or break the app.
export const logClientEvent = (level, message, meta) => {
    if (!endpoint) return; // API URL missing — nowhere to send (env misconfiguration)
    try {
        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                level,
                message: String(message).slice(0, 500),
                meta: safeSerialize(meta),
            }),
            keepalive: true, // lets the request survive page unload/crash
        }).catch(() => {});
    } catch {
        // a logger must never throw
    }
};

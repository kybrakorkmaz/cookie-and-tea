// tests/auth/register.js

export const registerUserViaApi = async (request, options = {}) => {
    const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8001';

    //  Enforce a fail-closed policy. Fail fast if the environment didn't supply the secret.
    const bypassSecret = process.env.BYPASS_SECRET || options.headers?.['x-test-bypass'];
    if (!bypassSecret) {
        throw new Error("CRITICAL: BYPASS_SECRET environment variable is missing in registerUserViaApi execution context.");
    }

    //  Combined timestamp with a random alphanumeric slice to prevent database collisions in parallel workers
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const uniqueId = `user_${Date.now()}_${randomSuffix}`;
    const password = "test-dev-bypass-key-123!";

    const response = await request.post(`${backendUrl}/api/v1/auth/sign-up`, {
        data: {
            name: "Kubra Integration Test",
            username: uniqueId,
            email: `${uniqueId}@cookieandtea.com`,
            password: password,
            confirmPassword: password
        },
        headers: {
            'x-test-bypass': bypassSecret,
            ...options.headers
        }
    });

    if (response.status() !== 201) {
        const text = await response.text();
        throw new Error(`Backend registration failed with status ${response.status()}: ${text}`);
    }

    const body = await response.json();
    return {
        username: uniqueId,
        email: `${uniqueId}@cookieandtea.com`,
        password: password,
        ...body.user
    };
};

export const loginUserViaUI = async (page, identifier, password) => {
    await page.goto("/login");
    await page.getByLabel(/username\/email|email|username/i).fill(identifier);

    // Explicitly target the native password input field attribute to bypass visibility eye-toggle button strings
    await page.locator('input[name="password"]').fill(password);

    //  Removed the strict regex boundary anchors (^ and $) to safely find custom wrapped buttons
    await page.locator('button[type="submit"], input[type="submit"], [type="submit"]').click();
};
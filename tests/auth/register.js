// tests/auth/register.js

export const registerUserViaApi = async (request, options = {}) => {
    const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8001';
    const bypassSecret = process.env.BYPASS_SECRET || 'test-dev-bypass-key-123!';

    const uniqueId = `user_${Date.now()}`;
    const password = "test-dev-bypass-key-123!";

    const response = await request.post(`${backendUrl}/api/v1/auth/sign-up`, {
        data: {
            name: "Kubra Integration Test",
            username: uniqueId,
            email: `${uniqueId}@cookieandtea.com`,
            password: password,
            confirmPassword: password // ✅ Satisfies Backend Zod Schema Refinement
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
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: /^log in$/i }).click();
};
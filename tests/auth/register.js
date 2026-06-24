/**
 * Headless Helper: Registers and prepares a user profile for active login flows.
 * @param {import('@playwright/test').Page} request
 * @returns {Promise<{username: string, email: string, password: string}>}
 */
export async function registerUserViaApi(request) {
    const uniqueId = `tester_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const email = `${uniqueId}@cookieandtea.com`;
    const password = "Secret123!";
    const confirmPassword = "Secret123!";

    const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8001';

    // 1. Create the user profile across the router wire
    const response = await request.post(`${backendUrl}/api/v1/auth/sign-up`, {
        data: {
            name: "Kubra Integration Test",
            username: uniqueId,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
    });

    if (response.status() !== 201) {
        throw new Error(`Headless background registration failed with status ${response.status()}`);
    }

    return { username: uniqueId, email, password };
}

/**
 * Shared UI Interaction Helper: Fills the frontend login form inputs
 * @param {import('@playwright/test').Page} page
 * @param {string} identifier
 * @param {string} password
 */
export async function loginUserViaUI(page, identifier, password) {
    await page.goto("/login");

    await page.locator('input[name="identifier"]').fill(identifier);
    await page.locator('input[name="password"]').fill(password);

    await page.getByRole('button', { name: /^login$/i }).click();
}
import {ENV} from "../../src/validations/envValidation.js";

/**
 * Headless Helper: Registers a unique user directly over the network API bypass.
 * Fast and avoids loading the heavy React UI, great for setting up login prerequisites.
 * @param page
 * @returns {Promise<{username: string, email: string, password: string}>}
 */
export async function registerUserViaApi(page){
    const uniqueId = `tester_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const email = `${uniqueId}@cookieandtea.com`;
    const password = "Secret123!";
    const confirmPassword = "Secret123!";

    const backendUrl = ENV.VITE_API_BASE_URL;

    // Direct http call targeting your running API router pipeline
    const response = await page.request.post(`${backendUrl}/api/v1/auth/sign-up`, {
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

export async function loginUserViaUI(page, identifier, password) {
    await page.goto("/login"); // Go to frontend route

    // interact with inputs
    await page.locator('input[name="identifier"]').fill(identifier);
    await page.locator('input[name="password"]').fill(password);

    // Trigger submission
    await page.getByRole('button', {name: /^login$/i}).click();
}
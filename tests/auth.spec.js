import { test, expect } from "@playwright/test";
//Import your headless helpers alongside your UI action
import { loginUserViaUI, registerUserViaApi } from "./utils/register.js";

test.describe("Sign Up & Login & Logout Full-Stack Integration", () => {

    // Pull 'context' from the Playwright fixtures object explicitly
    test.beforeEach(async ({ page, context }) => {
        // Set systemic headers globally across the sandbox context
        await context.setExtraHTTPHeaders({
            'x-test-bypass': 'secret-test-key'
        });

        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`Browser Error: ${msg.text()}`);
        });
        page.on('requestfailed', request => {
            console.log(`Network Failure. ${request.url()} || Error: ${request.failure()?.errorText}`);
        });
    });

    test("should successfully communicate with cat_test_api on port 8001 to register a user", async ({ page }) => {
        const registerResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/sign-up") && response.request().method() === "POST"
        );

        await page.goto("/sign-up");
        const uniqueId = `tester_${Date.now()}`;

        await page.getByLabel('Name', { exact: true }).fill("Kubra Test");
        await page.getByLabel('Username', { exact: true }).fill(uniqueId);
        await page.getByLabel('Email', { exact: true }).fill(`${uniqueId}@cookieandtea.com`);
        await page.getByLabel('Password', { exact: true }).fill("Secret123!");
        await page.getByLabel('Confirm Password', { exact: true }).pressSequentially("Secret123!", { delay: 50 });

        await expect(page.getByRole('alert')).not.toBeVisible();
        await page.getByRole('button', { name: /create my account!/i }).click();

        const response = await registerResponsePromise;
        expect(response.status()).toBe(201);
        await expect(page.getByLabel('Username', { exact: true })).toHaveValue('');
    });

    // Use API generation to isolate the login scenario
    test("Should log in users using username as identifier", async ({ page }) => {
        // Use headless helper to seed the backend database instantly
        const credentials = await registerUserViaApi(page);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        // Run UI action with username
        await loginUserViaUI(page, credentials.username, credentials.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);
        // Wait for a specific UI element on the /feed page to load.
        // Replace 'text=Feed' or 'nav' with an actual selector on your feed view.
        // Example: await page.waitForSelector('main'); or await page.getByRole('heading', { name: /feed/i }).waitFor();

        await page.waitForURL(/\/feed\/?$/); // Let Playwright patiently wait for the route to catch up
        await expect(page).toHaveURL(/\/feed\/?$/);
    });

    test("Should log in users using email as identifier", async ({ page }) => {
        // Use headless helper to seed the backend database instantly
        const credentials = await registerUserViaApi(page);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        // Run UI action with email
        await loginUserViaUI(page, credentials.email, credentials.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);

        await page.waitForURL(/\/feed\/?$/); // Let Playwright patiently wait for the route to catch up
        await expect(page).toHaveURL(/\/feed\/?$/);
    });
});
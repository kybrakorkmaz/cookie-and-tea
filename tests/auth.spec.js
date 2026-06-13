import { test, expect } from "@playwright/test";
import {loginUserViaUI, registerUserViaApi} from "./utils/register.js";

/** @param {import('@playwright/test').Page} page */
test.describe("Sign Up & Login & Logout Full-Stack Integration", () => {

    // Setting global error logging listeners before each test runs
    test.beforeEach(async ({page}) => {
        page.on('console', msg => {
            if(msg.type() === 'error') console.log(`Browser Error: ${msg.text()}`);
        });
        page.on('requestfailed', request => {
            console.log(`Network Failure. ${request.url()} || Error: ${request.failure()?.errorText}`);
        });
    });

    test("should successfully communicate with cat_test_api on port 8001 to register a user", async ({ page }) => {
        // 1. Set up the network response promise listener (STRICT METHOD CHECK)
        const registerResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/sign-up") && response.request().method() === "POST"
        );

        // 2. Navigate to the frontend sign-up page
        await page.goto("/sign-up");

        // 3. Generate a dynamic, unique user profile identifier
        const uniqueId = `tester_${Date.now()}`;

        // 4. Fill form fields using bulletproof, user-accessible labels
        await page.getByLabel('Name', { exact: true }).fill("Kubra Test");
        await page.getByLabel('Username', { exact: true }).fill(uniqueId);
        await page.getByLabel('Email', { exact: true }).fill(`${uniqueId}@cookieandtea.com`);

        // 5. Fill both password fields identically
        await page.getByLabel('Password', { exact: true }).fill("Secret123!");
        await page.getByLabel('Confirm Password', { exact: true }).pressSequentially("Secret123!", { delay: 50 });

        // 6. Assert that NO validation alert error banner is blocking the form submission path
        await expect(page.getByRole('alert')).not.toBeVisible();

        // 7. Click the submission action button
        await page.getByRole('button', { name: /create my account!/i }).click();

        // 8. Capture the completed API payload promise execution context
        const response = await registerResponsePromise;
        expect(response.status()).toBe(201);

        // 9. Confirm form states clean up nicely back to default empty tracking targets
        await expect(page.getByLabel('Username', { exact: true })).toHaveValue('');
    });

    test("Should log in users using username", async ({page}) => {
        // Direct backend database seed utilizing our headless helper
        const testUser = await registerUserViaApi(page);
        // Open the network response listener trap for the login checkpoint
        const loginResponsePromise = page.waitForResponse( response =>
        response.url().includes("/api/v1/auth/login") && response.request().method() === "POST");
        // Phase 3: Execute UI form submission interactions via our shared utility
        await loginUserViaUI(page, testUser.username, testUser.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);

        // Assert that your app successfully sets cookies and transitions pages (e.g. redirects your dashboard/feed)
        await expect(page).toHaveURL(/\/feed|\/dashboard|\//);
    })
});
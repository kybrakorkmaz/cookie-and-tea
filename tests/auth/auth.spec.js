// tests/auth/auth.test.js
import { test, expect } from "@playwright/test";
import { loginUserViaUI, registerUserViaApi } from "./register.js";

test.describe("Sign Up & Login & Logout Full-Stack Integration", () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ page }) => {
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

        await page.locator('input[name="password"]').fill("Secret123!");
        await page.locator('input[name="confirmPassword"]').fill("Secret123!");

        await expect(page.getByRole('alert')).not.toBeVisible();
        await page.getByRole('button', { name: /create my account!/i }).click();

        const response = await registerResponsePromise;
        expect(response.status()).toBe(201);
        await expect(page.getByLabel('Username', { exact: true })).toHaveValue('');
    });

    test("Should log in users using username as identifier", async ({ page, request }) => {
        const credentials = await registerUserViaApi(request);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        await loginUserViaUI(page, credentials.username, credentials.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);

        await page.waitForURL(/\/feed\/[^/]+\/?$/);
        await expect(page).toHaveURL(/\/feed\/[^/]+\/?$/);
    });

    test("Should log in users using email as identifier", async ({ page, request }) => {
        const credentials = await registerUserViaApi(request);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        await loginUserViaUI(page, credentials.email, credentials.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);

        await page.waitForURL(/\/feed\/[^/]+\/?$/);
        await expect(page).toHaveURL(/\/feed\/[^/]+\/?$/);
    });
});